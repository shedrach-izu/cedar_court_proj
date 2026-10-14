import Message from "../models/message_schema.js";
import transporter from "../config/mailer.js";

/* =========================================================
   CREATE MESSAGE
   Public — Contact form
========================================================= */

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);

    return res.status(500).json({
      message: "Unable to send message",
    });
  }
};


/* =========================================================
   GET ALL MESSAGES
   Admin only
========================================================= */

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);

    return res.status(500).json({
      message: "Unable to fetch messages",
    });
  }
};


/* =========================================================
   GET SINGLE MESSAGE
   Admin only
========================================================= */

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message,
    });
  } catch (error) {
    console.error("Error fetching message:", error);

    return res.status(500).json({
      message: "Unable to fetch message",
    });
  }
};


/* =========================================================
   MARK MESSAGE AS READ
   Admin only
========================================================= */

export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    console.error("Error marking message as read:", error);

    return res.status(500).json({
      message: "Unable to update message",
    });
  }
};


/* =========================================================
   MARK MESSAGE AS UNREAD
   Admin only
========================================================= */

export const markMessageAsUnread = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndUpdate(
      id,
      { read: false },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message: "Message marked as unread",
      data: message,
    });
  } catch (error) {
    console.error("Error marking message as unread:", error);

    return res.status(500).json({
      message: "Unable to update message",
    });
  }
};


/* =========================================================
   DELETE MESSAGE
   Admin only
========================================================= */

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);

    return res.status(500).json({
      message: "Unable to delete message",
    });
  }
};


/* =========================================================
   REPLY TO MESSAGE
   Admin only

   1. Find the message
   2. Send email through Gmail/Nodemailer
   3. Save the reply in MongoDB
========================================================= */

// export const replyToMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reply } = req.body;

//     if (!reply || !reply.trim()) {
//       return res.status(400).json({
//         message: "Reply message is required",
//       });
//     }

//     // Find the original contact message
//     const existingMessage = await Message.findById(id);

//     if (!existingMessage) {
//       return res.status(404).json({
//         message: "Message not found",
//       });
//     }

//     // Send email to the person who contacted Cedar Court
//     await transporter.sendMail({
//         from: `"Cedar Court" <${process.env.EMAIL_USER}>`,
//         to: existingMessage.email,
//         subject: `Re: ${existingMessage.subject}`,

//         text: `Hello ${existingMessage.name},

//             Thank you for contacting Cedar Court.

//             ${reply.trim()}

//             Kind regards,
//             Cedar Court`,
//     });

//     // Save reply in MongoDB
//     existingMessage.reply = {
//       message: reply.trim(),
//       repliedAt: new Date(),
//     };

//     existingMessage.replied = true;
//     existingMessage.read = true;

//     await existingMessage.save();

//     return res.status(200).json({
//       message: "Reply sent successfully",
//       data: existingMessage,
//     });

//   } catch (error) {
//     console.error("Error replying to message:", error);

//     return res.status(500).json({
//       message: "Unable to send reply. Please try again.",
//     });
//   }
// };



export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    console.log("=================================");
    console.log("REPLY REQUEST");
    console.log("Message ID:", id);
    console.log("Reply:", reply);
    console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("=================================");

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        message: "Reply message is required",
      });
    }

    const existingMessage = await Message.findById(id);

    if (!existingMessage) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    console.log("Sending email to:", existingMessage.email);

    const emailResult = await transporter.sendMail({
      from: `"Cedar Court" <${process.env.EMAIL_USER}>`,

      to: existingMessage.email,

      subject: `Re: ${existingMessage.subject}`,

      text: `Hello ${existingMessage.name},

            Thank you for contacting Cedar Court.

            ${reply.trim()}

            Kind regards,
            Cedar Court
            ${process.env.EMAIL_FROM}`,
    });

    console.log("=================================");
    console.log("EMAIL SENT");
    console.log("Message ID:", emailResult.messageId);
    console.log("Accepted:", emailResult.accepted);
    console.log("Rejected:", emailResult.rejected);
    console.log("Response:", emailResult.response);
    console.log("=================================");

    existingMessage.reply = {
      message: reply.trim(),
      repliedAt: new Date(),
    };

    existingMessage.replied = true;
    existingMessage.read = true;

    await existingMessage.save();

    return res.status(200).json({
      message: "Reply sent successfully",
      data: existingMessage,
      emailMessageId: emailResult.messageId,
      accepted: emailResult.accepted,
      rejected: emailResult.rejected,
      response: emailResult.response,
    });

  } catch (error) {
    console.error("=================================");
    console.error("ERROR SENDING REPLY");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      message: "Unable to send reply. Please try again.",
      error: error.message,
    });
  }
};