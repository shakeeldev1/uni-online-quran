import Tutor from "../models/Tutor.js";
import { uploadProfileImage } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

// Get all tutors
export const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find()
      .select(
        "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
      data: tutors,
    });
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tutors",
      error: error.message,
    });
  }
};

// Get tutor by ID
export const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findById(id).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor fetched successfully",
      data: tutor,
    });
  } catch (error) {
    console.error("Error fetching tutor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tutor",
      error: error.message,
    });
  }
};

// Create new tutor
export const createTutor = async (req, res) => {
  try {
    console.log("📥 Received tutor creation request");
    console.log("📋 Request body:", req.body);
    console.log("📎 Request file:", req.file ? "File attached" : "No file");

    const {
      username,
      email,
      password,
      role,
      gender,
      experience,
      phone,
      bio,
      address,
      teachingSubjects,
      availableHours,
    } = req.body;

    console.log("🎯 Teaching subjects received:", teachingSubjects);

    // Check if email already exists
    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Handle profile image upload
    let profileImage = "";
    let cloudinaryPublicId = "";

    if (req.file) {
      try {
        const uploadResult = await uploadProfileImage(req.file.buffer, email);
        profileImage = uploadResult.url;
        cloudinaryPublicId = uploadResult.public_id;
      } catch (error) {
        console.error("Profile image upload failed:", error);
        // Continue without image if upload fails
      }
    }

    // Parse and validate teaching subjects
    const validSubjects = [
      "Quran Reading",
      "Tajweed",
      "Hifz",
      "Islamic Studies",
      "Arabic",
      "Tafseer",
    ];

    let parsedTeachingSubjects = [];
    if (teachingSubjects) {
      try {
        const subjects =
          typeof teachingSubjects === "string"
            ? JSON.parse(teachingSubjects)
            : teachingSubjects;

        // Filter to only include valid subjects
        parsedTeachingSubjects = subjects.filter((subject) =>
          validSubjects.includes(subject)
        );

        console.log("✅ Filtered teaching subjects:", parsedTeachingSubjects);
      } catch (error) {
        parsedTeachingSubjects = [];
      }
    }

    // Create new tutor
    const newTutor = new Tutor({
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      experience,
      phone,
      bio,
      address,
      teachingSubjects: parsedTeachingSubjects,
      availableHours,
      profileImage,
      cloudinaryPublicId,
    });

    const savedTutor = await newTutor.save();

    // Remove sensitive data from response
    const tutorResponse = await Tutor.findById(savedTutor._id).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(201).json({
      success: true,
      message: "Tutor created successfully",
      data: tutorResponse,
    });
  } catch (error) {
    console.error("Error creating tutor:", error);

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
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create tutor",
      error: error.message,
    });
  }
};

// Update tutor
export const updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      role,
      gender,
      experience,
      phone,
      bio,
      address,
      qualifications,
      certifications,
      teachingSubjects,
      availableHours,
      studentsAssigned,
      reviews,
    } = req.body;

    // Check if tutor exists
    const existingTutor = await Tutor.findById(id);
    if (!existingTutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== existingTutor.email) {
      const emailExists = await Tutor.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Update tutor
    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      {
        username,
        email,
        role,
        gender,
        experience,
        phone,
        bio,
        address,
        qualifications,
        certifications,
        teachingSubjects,
        availableHours,
        studentsAssigned,
        reviews,
      },
      { new: true, runValidators: true }
    ).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(200).json({
      success: true,
      message: "Tutor updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    console.error("Error updating tutor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update tutor",
      error: error.message,
    });
  }
};

// Delete tutor
export const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    await Tutor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tutor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tutor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete tutor",
      error: error.message,
    });
  }
};

// Toggle tutor status (activate/deactivate)
export const toggleTutorStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    // Toggle active status
    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      { isActive: !tutor.isActive },
      { new: true }
    ).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(200).json({
      success: true,
      message: `Tutor ${
        updatedTutor.isActive ? "activated" : "deactivated"
      } successfully`,
      data: updatedTutor,
    });
  } catch (error) {
    console.error("Error toggling tutor status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle tutor status",
      error: error.message,
    });
  }
};

// Assign student to tutor
export const assignStudentToTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { increment = 1 } = req.body; // Number of students to add/remove

    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    const newCount = Math.max(0, tutor.studentsAssigned + increment);

    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      { studentsAssigned: newCount },
      { new: true }
    ).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(200).json({
      success: true,
      message: "Student assignment updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    console.error("Error updating student assignment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student assignment",
      error: error.message,
    });
  }
};
