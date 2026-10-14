import "dotenv/config";
import transporter from "./config/mailer.js";

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Cedar Court" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Cedar Court Email Test",
      text: "This is a test email from the Cedar Court backend.",
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Email failed:");
    console.error(error);
  }
};

sendTestEmail();