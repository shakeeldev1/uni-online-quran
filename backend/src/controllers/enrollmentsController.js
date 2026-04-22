import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("courseId", "title category level")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Enrollments retrieved successfully",
      data: enrollments,
    });
  } catch (error) {
    console.error("Error getting enrollments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrollments",
      error: error.message,
    });
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findById(id).populate(
      "courseId",
      "title category level instructor"
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment retrieved successfully",
      data: enrollment,
    });
  } catch (error) {
    console.error("Error getting enrollment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrollment",
      error: error.message,
    });
  }
};

// Create new enrollment
export const createEnrollment = async (req, res) => {
  try {
    console.log("📥 Received enrollment request");
    console.log("📋 Request body:", req.body);

    const {
      courseId,
      courseName,
      instructor,
      instructorRole,
      price,
      duration,
      sessions,
      studentData,
    } = req.body;

    // Validate required fields
    if (!courseId || !courseName || !studentData) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate student data
    const { fullName, email, phone, age } = studentData;
    if (!fullName || !email || !phone || !age) {
      return res.status(400).json({
        success: false,
        message: "Missing required student information",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check for duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({
      courseId: courseId,
      "studentData.email": email,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "Student is already enrolled in this course",
      });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({
      courseId,
      courseName,
      instructor,
      instructorRole,
      price,
      duration,
      sessions,
      studentData,
      status: "Pending",
      enrollmentDate: new Date(),
    });

    const savedEnrollment = await newEnrollment.save();
    console.log("✅ Enrollment created successfully");

    res.status(201).json({
      success: true,
      message: "Enrollment submitted successfully",
      data: savedEnrollment,
    });
  } catch (error) {
    console.error("Error creating enrollment:", error);

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
      message: "Failed to create enrollment",
      error: error.message,
    });
  }
};

// Update enrollment status
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    // Validate status
    const validStatuses = ["Pending", "Approved", "Rejected", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        status,
        adminNotes: adminNotes || undefined,
      },
      { new: true, runValidators: true }
    ).populate("courseId", "title category level");

    if (!updatedEnrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment status updated successfully",
      data: updatedEnrollment,
    });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update enrollment",
      error: error.message,
    });
  }
};

// Delete enrollment
export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);

    if (!deletedEnrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete enrollment",
      error: error.message,
    });
  }
};

// Get enrollments by course
export const getEnrollmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollments = await Enrollment.find({ courseId })
      .populate("courseId", "title category level")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Course enrollments retrieved successfully",
      data: enrollments,
    });
  } catch (error) {
    console.error("Error getting course enrollments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve course enrollments",
      error: error.message,
    });
  }
};

// Get enrollment statistics
export const getEnrollmentStats = async (req, res) => {
  try {
    const stats = await Enrollment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
      success: true,
      message: "Enrollment statistics retrieved successfully",
      data: {
        total: totalEnrollments,
        byStatus: stats,
      },
    });
  } catch (error) {
    console.error("Error getting enrollment stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrollment statistics",
      error: error.message,
    });
  }
};
