import multer from "multer";

// Configure multer for memory storage (since we're uploading to Cloudinary)
const storage = multer.memoryStorage();

// File filter to allow images and PDFs
const fileFilter = (req, file, cb) => {
  console.log("Uploaded file type:", file.mimetype); 
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "image/avif",
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, png, gif, webp) and PDFs are allowed!"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for documents
  },
});

// Export the upload instance
export { upload };

// Middleware for single profile image upload
export const uploadProfileImage = upload.single("profileImage");

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message === "Only image files (jpeg, png, gif, webp) and PDFs are allowed!") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
};
