
import Newsletter from "../models/newsletter_schema.js";
import nodemailer from "nodemailer";
import { isValidObjectId } from "mongoose";

// Configure Nodemailer using the existing Cedar email credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const getUnsubscribeUrl = (token) => {
  const apiUrl = (
    process.env.API_URL || "http://localhost:9000"
  ).replace(/\/+$/, "");

  return `${apiUrl}/api/newsletter/unsubscribe/${token}`;
};

// --------------------------------------------------
// PUBLIC: SUBSCRIBE TO THE NEWSLETTER
// POST /api/newsletter/subscribe
// --------------------------------------------------
export const subscribeNewsletter = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    let subscriber = await Newsletter.findOne({ email });

    if (subscriber && subscriber.status === "active") {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed.",
      });
    }

    if (subscriber) {
      // Allow a previously unsubscribed person to subscribe again.
      subscriber.status = "active";
      subscriber.subscribedAt = new Date();
      subscriber.unsubscribedAt = null;

      await subscriber.save();
    } else {
      subscriber = await Newsletter.create({ email });
    }

    return res.status(201).json({
      success: true,
      message: "You have successfully subscribed to Cedar Court updates.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to subscribe right now. Please try again.",
    });
  }
};

// --------------------------------------------------
// ADMIN: GET ALL SUBSCRIBERS
// GET /api/newsletter/all
// --------------------------------------------------
export const getNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .select("-unsubscribeToken -__v")
      .sort({ subscribedAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      total: subscribers.length,
      subscribers: subscribers.map((subscriber) => ({
        ...subscriber,
        id: subscriber._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Get newsletter subscribers error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load newsletter subscribers.",
    });
  }
};

// --------------------------------------------------
// ADMIN: CHANGE SUBSCRIBER STATUS
// PATCH /api/newsletter/:id/status
// --------------------------------------------------
export const updateNewsletterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID.",
      });
    }

    if (!["active", "unsubscribed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be active or unsubscribed.",
      });
    }

    const subscriber = await Newsletter.findById(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found.",
      });
    }

    subscriber.status = status;
    subscriber.unsubscribedAt =
      status === "unsubscribed" ? new Date() : null;

    if (status === "active") {
      subscriber.subscribedAt = new Date();
    }

    await subscriber.save();

    return res.status(200).json({
      success: true,
      message: "Subscriber status updated.",
      subscriber: {
        id: subscriber._id.toString(),
        email: subscriber.email,
        status: subscriber.status,
        subscribedAt: subscriber.subscribedAt,
        unsubscribedAt: subscriber.unsubscribedAt,
      },
    });
  } catch (error) {
    console.error("Update newsletter status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update subscriber status.",
    });
  }
};

// --------------------------------------------------
// ADMIN: DELETE A SUBSCRIBER
// DELETE /api/newsletter/:id
// --------------------------------------------------
export const deleteNewsletterSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID.",
      });
    }

    const subscriber = await Newsletter.findByIdAndDelete(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully.",
    });
  } catch (error) {
    console.error("Delete newsletter subscriber error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete subscriber.",
    });
  }
};

// --------------------------------------------------
// ADMIN: SEND A NEWSLETTER TO ACTIVE SUBSCRIBERS ONLY
// POST /api/newsletter/send
// --------------------------------------------------
export const sendNewsletter = async (req, res) => {
  try {
    const { subject, heading, message, ctaText, ctaUrl } = req.body;

    if (
      typeof subject !== "string" ||
      typeof heading !== "string" ||
      typeof message !== "string" ||
      !subject.trim() ||
      !heading.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Subject, heading, and message are required.",
      });
    }

    if (
      subject.length > 200 ||
      heading.length > 200 ||
      message.length > 10000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more newsletter fields are too long.",
      });
    }

    let safeCtaUrl = "";

    if (ctaUrl) {
      try {
        const parsedUrl = new URL(ctaUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid URL protocol");
        }

        safeCtaUrl = parsedUrl.toString();
      } catch {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid CTA link.",
        });
      }

      if (typeof ctaText !== "string" || !ctaText.trim()) {
        return res.status(400).json({
          success: false,
          message: "Button text is required when a CTA link is provided.",
        });
      }
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured on the server.",
      });
    }

    // CRITICAL: only active subscribers are selected.
    const subscribers = await Newsletter.find({ status: "active" })
      .select("email unsubscribeToken")
      .lean();

    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There are no active subscribers to email.",
      });
    }

    // Escape user-entered text before inserting it into HTML.
    const safeHeading = escapeHtml(heading.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br />");
    const safeCtaText = escapeHtml(ctaText || "Learn More");

    let sent = 0;
    const failed = [];

    // Send individual emails, rather than exposing the recipient list.
    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = getUnsubscribeUrl(
          subscriber.unsubscribeToken
        );

        await transporter.sendMail({
          from: `"Cedar Court" <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: subject.trim(),
          text: `${heading.trim()}\n\n${message.trim()}\n\nUnsubscribe: ${unsubscribeUrl}`,
          html: `
            <!DOCTYPE html>
            <html>
              <body style="margin:0;background:#0c0a08;color:#ede4d4;font-family:Arial,sans-serif;padding:32px 16px;">
                <div style="max-width:600px;margin:0 auto;background:#161310;border:1px solid #393129;padding:32px;">
                  <p style="color:#c4954a;letter-spacing:4px;font-size:12px;">CEDAR COURT</p>
                  <h1 style="color:#ede4d4;font-size:28px;line-height:1.4;">${safeHeading}</h1>
                  <div style="color:#c8bba7;font-size:15px;line-height:1.9;">${safeMessage}</div>
                  ${
                    safeCtaUrl
                      ? `<p style="margin:28px 0;">
                          <a href="${escapeHtml(safeCtaUrl)}"
                            style="display:inline-block;background:#c4954a;color:#0c0a08;text-decoration:none;padding:14px 22px;font-weight:bold;">
                            ${safeCtaText}
                          </a>
                        </p>`
                      : ""
                  }
                  <hr style="border:0;border-top:1px solid #393129;margin:32px 0 20px;" />
                  <p style="color:#8a7d6a;font-size:12px;line-height:1.7;">
                    You received this email because you subscribed to Cedar Court updates.
                    <a href="${escapeHtml(unsubscribeUrl)}" style="color:#c4954a;">Unsubscribe</a>
                  </p>
                </div>
              </body>
            </html>
          `,
        });

        sent += 1;
      } catch (emailError) {
        console.error(
          `Newsletter delivery failed for ${subscriber.email}:`,
          emailError.message
        );

        failed.push(subscriber.email);
      }
    }

    return res.status(200).json({
      success: failed.length === 0,
      message:
        failed.length === 0
          ? "Newsletter sent successfully."
          : "Newsletter sending finished with some failed deliveries.",
      totalRecipients: subscribers.length,
      sent,
      failed: failed.length,
      failedEmails: failed,
    });
  } catch (error) {
    console.error("Send newsletter error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send the newsletter.",
    });
  }
};

// --------------------------------------------------
// PUBLIC: UNSUBSCRIBE THROUGH THE EMAIL LINK
// GET /api/newsletter/unsubscribe/:token
// --------------------------------------------------
export const unsubscribeFromNewsletter = async (req, res) => {
  try {
    const subscriber = await Newsletter.findOne({
      unsubscribeToken: req.params.token,
    });

    if (!subscriber) {
      return res.status(404).send(
        "This unsubscribe link is invalid or has expired."
      );
    }

    if (subscriber.status !== "unsubscribed") {
      subscriber.status = "unsubscribed";
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();
    }

    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <body style="font-family:Arial,sans-serif;background:#0c0a08;color:#ede4d4;padding:48px 20px;text-align:center;">
          <h1 style="color:#c4954a;">Cedar Court</h1>
          <h2>You have been unsubscribed</h2>
          <p>You will no longer receive Cedar Court newsletter emails.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);

    return res.status(500).send(
      "Unable to process your request. Please try again later."
    );
  }
};
