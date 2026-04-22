import TeacherApplication from "../models/TeacherApplication.js";
import { uploadFile } from "../utils/cloudinary.js";

// Get all teacher applications (for admin dashboard)
export const getAllApplications = async (req, res) => {
  try {
    console.log("📥 Fetching all teacher applications");
    
    const applications = await TeacherApplication.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Teacher applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching teacher applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher applications",
      error: error.message,
    });
  }
};

// Get single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await TeacherApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};

// Create new teacher application (public endpoint - no auth required)
export const createApplication = async (req, res) => {
  try {
    console.log("📥 Received teacher application request");
    console.log("📋 Request body:", req.body);
    console.log("📎 Request files:", req.files ? Object.keys(req.files) : "No files");

    const {
      fullName,
      fatherName,
      whatsapp,
      email,
      address,
      country,
      education,
      specialization,
      experience,
      languages,
      courses,
      gender,
      about,
    } = req.body;

    // Check if email already exists
    const existingApplication = await TeacherApplication.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "An application with this email already exists",
      });
    }

    // Handle file uploads
    let certificateUrl = "";
    let cnicUrl = "";
    let cvUrl = "";

    if (req.files) {
      try {
        // Upload certificate
        if (req.files.certificate && req.files.certificate[0]) {
          const certResult = await uploadFile(req.files.certificate[0].buffer, `certificate_${email}`);
          certificateUrl = certResult.url;
          console.log("✅ Certificate uploaded:", certificateUrl);
        }

        // Upload CNIC
        if (req.files.cnic && req.files.cnic[0]) {
          const cnicResult = await uploadFile(req.files.cnic[0].buffer, `cnic_${email}`);
          cnicUrl = cnicResult.url;
          console.log("✅ CNIC uploaded:", cnicUrl);
        }

        // Upload CV
        if (req.files.cv && req.files.cv[0]) {
          const cvResult = await uploadFile(req.files.cv[0].buffer, `cv_${email}`);
          cvUrl = cvResult.url;
          console.log("✅ CV uploaded:", cvUrl);
        }
      } catch (uploadError) {
        console.error("❌ File upload error:", uploadError);
        // Continue without file uploads - don't fail the whole application
      }
    }

    // Parse languages and courses if they come as strings
    let parsedLanguages = [];
    let parsedCourses = [];

    try {
      parsedLanguages = typeof languages === "string" ? JSON.parse(languages) : languages;
      parsedCourses = typeof courses === "string" ? JSON.parse(courses) : courses;
    } catch (parseError) {
      console.error("Error parsing languages/courses:", parseError);
    }

    // Create new application
    const newApplication = new TeacherApplication({
      fullName,
      fatherName,
      whatsapp,
      email,
      address,
      country,
      education,
      specialization,
      experience,
      languages: parsedLanguages || [],
      courses: parsedCourses || [],
      gender,
      certificate: certificateUrl,
      cnic: cnicUrl,
      cv: cvUrl,
      about,
      status: "pending",
    });

    const savedApplication = await newApplication.save();

    console.log("✅ Teacher application saved:", savedApplication._id);

    res.status(201).json({
      success: true,
      message: "Your application has been submitted successfully! We will review it and get back to you soon.",
      data: savedApplication,
    });
  } catch (error) {
    console.error("Error creating teacher application:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "An application with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

// Update application status (approve/reject)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    console.log(`📝 Updating application ${id} status to: ${status}`);

    const application = await TeacherApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    if (notes) {
      application.notes = notes;
    }

    const updatedApplication = await application.save();

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await TeacherApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await TeacherApplication.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};
