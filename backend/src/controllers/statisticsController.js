import User from "../models/User.js";
import Tutor from "../models/Tutor.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Contact from "../models/Contact.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    console.log("📊 Fetching dashboard statistics...");

    // Run all count queries in parallel
    const [
      totalUsers,
      totalTutors,
      totalStudents,
      totalCourses,
      totalContacts,
      activeUsers,
      activeTutors,
      activeStudents,
      activeCourses,
      newContacts,
    ] = await Promise.all([
      User.countDocuments(),
      Tutor.countDocuments(),
      Student.countDocuments(),
      Course.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments({ isVerified: true }),
      Tutor.countDocuments({ isActive: true }),
      Student.countDocuments({ status: "Active" }),
      Course.countDocuments({ status: "Active" }),
      Contact.countDocuments({ status: "new" }),
    ]);

    console.log("✅ Statistics fetched successfully");

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
      },
      tutors: {
        total: totalTutors,
        active: activeTutors,
        inactive: totalTutors - activeTutors,
      },
      students: {
        total: totalStudents,
        active: activeStudents,
        inactive: totalStudents - activeStudents,
      },
      courses: {
        total: totalCourses,
        active: activeCourses,
        inactive: totalCourses - activeCourses,
      },
      contacts: {
        total: totalContacts,
        new: newContacts,
        processed: totalContacts - newContacts,
      },
    };

    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

// Get detailed statistics for specific entity
export const getEntityStats = async (req, res) => {
  const { entity } = req.params;

  try {
    let stats = {};

    switch (entity) {
      case "users":
        const users = await User.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              verified: {
                $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
              },
              unverified: {
                $sum: { $cond: [{ $eq: ["$isVerified", false] }, 1, 0] },
              },
            },
          },
        ]);
        stats = users[0] || { total: 0, verified: 0, unverified: 0 };
        break;

      case "tutors":
        const tutors = await Tutor.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: { $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } },
              inactive: {
                $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
              },
              totalStudents: { $sum: "$studentsAssigned" },
              avgRating: { $avg: "$reviews" },
            },
          },
        ]);
        stats = tutors[0] || {
          total: 0,
          active: 0,
          inactive: 0,
          totalStudents: 0,
          avgRating: 0,
        };
        break;

      case "students":
        const students = await Student.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: {
                $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] },
              },
              inactive: {
                $sum: { $cond: [{ $eq: ["$status", "Inactive"] }, 1, 0] },
              },
              avgAge: { $avg: "$age" },
            },
          },
        ]);
        stats = students[0] || { total: 0, active: 0, inactive: 0, avgAge: 0 };
        break;

      case "courses":
        const courses = await Course.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: {
                $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] },
              },
              inactive: {
                $sum: { $cond: [{ $eq: ["$status", "Inactive"] }, 1, 0] },
              },
              totalEnrolled: { $sum: "$studentsEnrolled" },
            },
          },
        ]);
        stats = courses[0] || {
          total: 0,
          active: 0,
          inactive: 0,
          totalEnrolled: 0,
        };
        break;

      case "services":
        const services = await Course.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: {
                $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] },
              },
              inactive: {
                $sum: { $cond: [{ $eq: ["$status", "Inactive"] }, 1, 0] },
              },
            },
          },
        ]);
        stats = services[0] || {
          total: 0,
          active: 0,
          inactive: 0,
        };
        break;

      case "contacts":
        const contacts = await Contact.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]);
        const contactStats = {
          total: 0,
          new: 0,
          contacted: 0,
          enrolled: 0,
          "not-interested": 0,
        };
        contacts.forEach((item) => {
          contactStats[item._id] = item.count;
          contactStats.total += item.count;
        });
        stats = contactStats;
        break;

      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid entity. Valid entities: users, tutors, students, courses, contacts",
        });
    }

    res.status(200).json({
      success: true,
      message: `${entity} statistics fetched successfully`,
      data: stats,
    });
  } catch (error) {
    console.error(`Error fetching ${entity} statistics:`, error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch ${entity} statistics`,
      error: error.message,
    });
  }
};

// Get recent activity (for dashboard insights)
export const getRecentActivity = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);

    // Get recent contacts, users, and tutors
    const [
      recentContacts,
      recentUsers,
      recentTutors,
      recentStudents,
      recentCourses,
    ] = await Promise.all([
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .select("name email status createdAt"),
      User.find()
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .select("username email isVerified createdAt"),
      Tutor.find()
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .select("username email isActive createdAt"),
      Student.find()
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .select("name email status createdAt"),
      Course.find()
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .select("title status studentsEnrolled createdAt")
        .populate("instructorId", "username"),
    ]);

    res.status(200).json({
      success: true,
      message: "Recent activity fetched successfully",
      data: {
        contacts: recentContacts,
        users: recentUsers,
        tutors: recentTutors,
        students: recentStudents,
        courses: recentCourses,
      },
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity",
      error: error.message,
    });
  }
};

// Get growth statistics (monthly growth)
export const getGrowthStats = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const monthsNum = parseInt(months);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsNum);

    // Get monthly growth data
    const growthData = await Promise.all([
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Tutor.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Student.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Course.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      message: "Growth statistics fetched successfully",
      data: {
        users: growthData[0],
        tutors: growthData[1],
        students: growthData[2],
        courses: growthData[3],
      },
    });
  } catch (error) {
    console.error("Error fetching growth statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch growth statistics",
      error: error.message,
    });
  }
};
