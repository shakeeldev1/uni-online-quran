import nodemailer from "nodemailer";

// Create transporter object using SMTP transport
const createTransporter = () => {
  // Check if required environment variables are present
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error(
      "❌ EMAIL_USER and EMAIL_PASS are required in environment variables"
    );
    throw new Error("Email configuration is incomplete");
  }

  console.log("📧 Setting up Nodemailer transporter...");
  console.log("   Service:", process.env.EMAIL_SERVICE || "Custom SMTP");
  console.log("   Host:", process.env.EMAIL_HOST);
  console.log("   Port:", process.env.EMAIL_PORT);
  console.log("   User:", process.env.EMAIL_USER);

  const transportConfig = {
    service: process.env.EMAIL_SERVICE || undefined,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Additional security options
    tls: {
      rejectUnauthorized: false, // Don't fail on invalid certs
    },
  };

  // Remove undefined values for cleaner config
  Object.keys(transportConfig).forEach((key) => {
    if (transportConfig[key] === undefined) {
      delete transportConfig[key];
    }
  });

  return nodemailer.createTransport(transportConfig);
};

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("📧 Preparing to send email...");
    console.log("   To:", to);
    console.log("   From:", process.env.EMAIL_FROM);
    console.log("   Subject:", subject);

    const transporter = createTransporter();

    // Verify transporter configuration
    console.log("🔍 Verifying transporter configuration...");
    await transporter.verify();
    console.log("✅ Transporter verified successfully");

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error("❌ Nodemailer error:");
    console.error("   Error code:", error.code);
    console.error("   Error message:", error.message);

    if (error.response) {
      console.error("   Server response:", error.response);
    }

    // Provide helpful error messages
    if (error.code === "EAUTH") {
      console.error(
        "   💡 Authentication failed. Check your email credentials."
      );
      console.error(
        "   💡 For Gmail, make sure you're using an App Password, not your regular password."
      );
    } else if (error.code === "ECONNECTION") {
      console.error(
        "   💡 Connection failed. Check your SMTP settings and internet connection."
      );
    }

    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Test email configuration
export const testEmailConfiguration = async () => {
  try {
    console.log("🧪 Testing email configuration...");
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email configuration is valid!");
    return true;
  } catch (error) {
    console.error("❌ Email configuration test failed:", error.message);
    return false;
  }
};
