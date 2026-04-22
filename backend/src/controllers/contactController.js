import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, fatherName, phone, email, message } = req.body;

    // Validate required fields
    if (!name || !fatherName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Create new contact submission
    const contact = new Contact({
      name,
      fatherName,
      phone,
      email,
      message,
    });

    await contact.save();

    // Send thank you email to user
    try {
      await sendEmail({
        to: email,
        subject: "Thank you for contacting Online Quran Academy",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #D4AF37, #B8860B); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🕌 Online Quran Academy</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Spiritual Learning Partner</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #2C3E50; margin-bottom: 20px;">Assalamu Alaikum ${name}!</h2>
              
              <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
                Thank you for reaching out to Online Quran Academy. We have received your inquiry and our team will get back to you within 24 hours.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #D4AF37; margin-top: 0;">Your Submission Details:</h3>
                <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Father's Name:</strong> ${fatherName}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Message:</strong> ${message}</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #0E7C5A, #065a42); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: white; margin-top: 0;">🎁 Get Your FREE Trial Class!</h3>
                <p style="color: white; margin-bottom: 15px;">Start your Quran learning journey with a complimentary one-on-one session.</p>
                <ul style="color: white; margin: 10px 0;">
                  <li>✓ Certified and experienced Quran teachers</li>
                  <li>✓ Flexible scheduling to fit your routine</li>
                  <li>✓ Interactive and engaging teaching methods</li>
                  <li>✓ Safe and secure online environment</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #555; margin-bottom: 15px;">Have questions? Contact us directly:</p>
                <div style="display: inline-block; margin: 0 10px;">
                  <p style="margin: 5px 0; color: #D4AF37; font-weight: bold;">📞 +997 979 797</p>
                  <p style="margin: 5px 0; color: #0E7C5A; font-weight: bold;">📧 onlinequran234@gmail.com</p>
                  <p style="margin: 5px 0; color: #25D366; font-weight: bold;">💬 WhatsApp: +997 979 797</p>
                </div>
              </div>
              
              <div style="text-align: center; padding: 20px 0; border-top: 2px solid #f0f0f0;">
                <p style="color: #888; font-size: 14px; margin: 0;">
                  Barakallahu feeki for choosing Online Quran Academy<br>
                  May Allah bless your learning journey! 🤲
                </p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending thank you email:", emailError);
      // Don't fail the request if email fails
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: "onlinequran234@gmail.com", // Admin email
        subject: "New Contact Form Submission - Online Quran Academy",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #2C3E50; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0;">🚨 New Contact Inquiry</h1>
              <p style="margin: 10px 0 0 0;">Online Quran Academy Dashboard</p>
            </div>
            
            <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #D4AF37; margin-bottom: 20px;">Contact Details:</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Father's Name:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${fatherName}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Submitted:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px; padding: 15px; background: #ffffcc; border-left: 4px solid #D4AF37; border-radius: 5px;">
                <p style="margin: 0; font-weight: bold; color: #B8860B;">
                  📞 Remember to follow up with this potential student within 24 hours!
                </p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
    }

    res.status(201).json({
      success: true,
      message: "Thank you for your inquiry! We will contact you soon.",
      data: {
        id: contact._id,
        submittedAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form. Please try again.",
      error: error.message,
    });
  }
};

// Get all contact submissions (Admin only)
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    const skip = (page - 1) * limit;
    let query = {};

    // Filter by status if provided
    if (status && status !== "all") {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);

    // Get status counts
    const statusCounts = await Contact.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const newCount = await Contact.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalContacts,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
        statusCounts,
        newCount,
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// Get contact by ID (Admin only)
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.status(200).json({
      success: true,
      message: "Contact fetched successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact",
      error: error.message,
    });
  }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (status) contact.status = status;
    if (adminNotes !== undefined) contact.adminNotes = adminNotes;
    contact.isRead = true;

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message,
    });
  }
};

// Delete contact (Admin only)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};
