// src/middleware/auth.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader) return res.status(401).json({ message: "No token, access denied" });

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded; // decoded should include role/isAdmin
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
  return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = (req, res, next) => {
  const user = req.user || {};
  // Accept either explicit isAdmin boolean OR role === 'admin'
  if (!(user.isAdmin === true || user.role === "admin")) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
