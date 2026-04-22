import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import { uploadProfileImage } from "../utils/cloudinary.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select(
        "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve students",
      error: error.message,
    });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    console.error("Error getting student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student",
      error: error.message,
    });
  }
};

// Create new student
export const createStudent = async (req, res) => {
  try {
    console.log("📥 Received student creation request");
    console.log("📋 Request body:", req.body);
    console.log("📎 Request file:", req.file ? "File attached" : "No file");

    const {
      name,
      email,
      password,
      phone,
      class: studentClass,
      gender,
      age,
    } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
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
        console.log("✅ Profile image uploaded successfully for student");
      } catch (error) {
        console.error("Profile image upload failed:", error);
        // Continue without image if upload fails
      }
    }

    // Create new student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      class: studentClass,
      gender,
      age: parseInt(age),
      profileImage,
      cloudinaryPublicId,
    });

    const savedStudent = await newStudent.save();

    // Remove sensitive data from response
    const studentResponse = await Student.findById(savedStudent._id).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: studentResponse,
    });
  } catch (error) {
    console.error("Error creating student:", error);

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
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      class: studentClass,
      gender,
      age,
      status,
    } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        class: studentClass,
        gender,
        age: parseInt(age),
        status,
      },
      { new: true, runValidators: true }
    ).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);

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

    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

// Toggle student status
export const toggleStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const newStatus = student.status === "Active" ? "Inactive" : "Active";
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    ).select(
      "-password -refreshTokens -resetPasswordToken -otp -emailChangeOtp"
    );

    res.status(200).json({
      success: true,
      message: `Student status updated to ${newStatus}`,
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error toggling student status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student status",
      error: error.message,
    });
  }
};
