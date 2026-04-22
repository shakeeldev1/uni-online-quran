import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * Middleware to verify admin access
 * Must be used AFTER authenticate middleware
 */
export const adminAuth = async (req, res, next) => {
  try {
    // Check if user is authenticated (from authenticate middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: "Authentication required" 
      });
    }

    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        success: false,
        message: "Access denied. Admin privileges required." 
      });
    }

    // Optionally verify admin exists in database
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: "Admin not found" 
      });
    }

    // Attach admin to request for further use
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Server error in admin authorization" 
    });
  }
};

/**
 * Optional: Combined middleware for authenticate + admin check
 */
export const requireAdmin = [
  // First authenticate the user
  (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Access denied. No token provided." 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔐 requireAdmin - Decoded token:", decoded);
      req.user = decoded;
      next();
    } catch (err) {
      console.error("❌ requireAdmin - Token verification failed:", err.message);
      return res.status(403).json({ 
        success: false,
        message: "Invalid or expired token" 
      });
    }
  },
  // Then check for admin role (accept both role === "admin" or isAdmin === true)
  async (req, res, next) => {
    try {
      const { role, isAdmin } = req.user || {};
      console.log("🔐 requireAdmin - Checking role:", role, "isAdmin:", isAdmin);
      
      // Accept if role is "admin" OR isAdmin is true
      if (role !== "admin" && isAdmin !== true) {
        console.log("❌ requireAdmin - Access denied for role:", role);
        return res.status(403).json({ 
          success: false,
          message: "Access denied. Admin privileges required." 
        });
      }
      console.log("✅ requireAdmin - Access granted");
      next();
    } catch (error) {
      console.error("❌ requireAdmin - Error:", error.message);
      return res.status(500).json({ 
        success: false,
        message: "Server error in authorization" 
      });
    }
  }
];
