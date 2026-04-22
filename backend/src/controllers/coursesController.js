import Course from "../models/Course.js";
import Tutor from "../models/Tutor.js";
import { uploadProfileImage } from "../utils/cloudinary.js";

// Get all courses (public - no authentication required)
export const getPublicCourses = async (req, res) => {
  try {
    // Only get active courses for public display
    const courses = await Course.find({ status: "Active" })
      .populate("instructorId", "username role experience teachingSubjects")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error getting public courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve courses",
      error: error.message,
    });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructorId", "username role experience teachingSubjects")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve courses",
      error: error.message,
    });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate(
      "instructorId",
      "username role experience teachingSubjects"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve course",
      error: error.message,
    });
  }
};

// Create new course
export const createCourse = async (req, res) => {
  try {
    console.log("📥 Received course creation request");
    console.log("📋 Request body:", req.body);
    console.log("📎 Request file:", req.file ? "File attached" : "No file");

    const {
      title,
      category,
      level,
      instructorId,
      duration,
      sessions,
      price,
      description,
    } = req.body;

    // Handle thumbnail upload
    let thumbnail = "";
    let cloudinaryPublicId = "";

    if (req.file) {
      try {
        const uploadResult = await uploadProfileImage(req.file.buffer, title);
        thumbnail = uploadResult.url;
        cloudinaryPublicId = uploadResult.public_id;
        console.log("✅ Course thumbnail uploaded successfully");
      } catch (error) {
        console.error("Thumbnail upload failed:", error);
        // Continue without image if upload fails
      }
    }

    // Create new course
    const newCourse = new Course({
      title,
      category,
      level,
      instructorId,
      duration,
      sessions: parseInt(sessions),
      price,
      description,
      thumbnail,
      cloudinaryPublicId,
      status:  "Active",
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);

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
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    console.log("📥 Received course update request");
    console.log("📋 Request body:", req.body);
    console.log("📎 Request file:", req.file ? "File attached" : "No file");

    const { id } = req.params;
    const {
      title,
      category,
      level,
      instructorId,
      duration,
      sessions,
      price,
      description,
      status,
    } = req.body;

    // Prepare update data
    const updateData = {
      title,
      category,
      level,
      instructorId,
      duration,
      sessions: parseInt(sessions),
      price,
      description,
      status,
    };

    // Handle thumbnail upload if new file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadProfileImage(req.file.buffer, title);
        updateData.thumbnail = uploadResult.url;
        updateData.cloudinaryPublicId = uploadResult.public_id;
        console.log("✅ Course thumbnail updated successfully");
      } catch (error) {
        console.error("Thumbnail upload failed:", error);
        // Continue without updating image if upload fails
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("instructorId", "username role experience teachingSubjects");

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);

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
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

// Toggle course status
export const toggleCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const newStatus = course.status === "Active" ? "Inactive" : "Active";
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Course status updated to ${newStatus}`,
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error toggling course status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update course status",
      error: error.message,
    });
  }
};

// Update students enrolled count
export const updateStudentsEnrolled = async (req, res) => {
  try {
    const { id } = req.params;
    const { increment = 1 } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const newCount = Math.max(0, course.studentsEnrolled + increment);
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { studentsEnrolled: newCount },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Students enrolled count updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating students enrolled:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update students enrolled count",
      error: error.message,
    });
  }
};
