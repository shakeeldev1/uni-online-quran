import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate configuration
const validateCloudinaryConfig = () => {
  const requiredEnvVars = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error(
      "❌ Missing Cloudinary environment variables:",
      missingVars.join(", ")
    );
    throw new Error(
      `Missing required Cloudinary configuration: ${missingVars.join(", ")}`
    );
  }

  console.log("✅ Cloudinary configuration loaded successfully");
  console.log("   Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log(
    "   API Key:",
    process.env.CLOUDINARY_API_KEY?.substring(0, 8) + "..."
  );
};

// Upload image to Cloudinary
export const uploadToCloudinary = async (fileBuffer, options = {}) => {
  try {
    validateCloudinaryConfig();

    const defaultOptions = {
      folder: process.env.CLOUDINARY_FOLDER || "online-quran",
      resource_type: "image",
      transformation: [
        { width: 500, height: 500, crop: "fill", quality: "auto" },
        { fetch_format: "auto" },
      ],
      ...options,
    };

    console.log("📤 Uploading image to Cloudinary...");
    console.log("   Folder:", defaultOptions.folder);
    console.log(
      "   Transformations:",
      JSON.stringify(defaultOptions.transformation)
    );

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(defaultOptions, (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            console.log("✅ Image uploaded successfully");
            console.log("   Public ID:", result.public_id);
            console.log("   URL:", result.secure_url);
            console.log("   Size:", `${result.width}x${result.height}`);
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
              created_at: result.created_at,
            });
          }
        })
        .end(fileBuffer);
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    validateCloudinaryConfig();

    if (!publicId) {
      throw new Error("Public ID is required for deletion");
    }

    console.log("🗑️ Deleting image from Cloudinary...");
    console.log("   Public ID:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("✅ Image deleted successfully");
      return { success: true, result: result.result };
    } else {
      console.log("⚠️ Image deletion result:", result.result);
      return { success: false, result: result.result };
    }
  } catch (error) {
    console.error("❌ Cloudinary deletion error:", error.message);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

// Get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  try {
    validateCloudinaryConfig();

    if (!publicId) {
      throw new Error("Public ID is required");
    }

    const defaultOptions = {
      width: 300,
      height: 300,
      crop: "fill",
      quality: "auto",
      fetch_format: "auto",
      ...options,
    };

    const optimizedUrl = cloudinary.url(publicId, defaultOptions);

    console.log("🔧 Generated optimized URL:", optimizedUrl);
    return optimizedUrl;
  } catch (error) {
    console.error("❌ Error generating optimized URL:", error.message);
    throw error;
  }
};

// Upload profile image with specific transformations
export const uploadProfileImage = async (fileBuffer, userId) => {
  try {
    const options = {
      folder: `${process.env.CLOUDINARY_FOLDER || "online-quran"}/profiles`,
      public_id: `profile_${userId}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
      overwrite: true,
      invalidate: true,
    };

    return await uploadToCloudinary(fileBuffer, options);
  } catch (error) {
    console.error("❌ Profile image upload error:", error.message);
    throw error;
  }
};

// Generic file upload for documents (certificates, CNIC, CV)
export const uploadFile = async (fileBuffer, publicId) => {
  try {
    validateCloudinaryConfig();

    // Detect if file is PDF
    const isPdf = publicId.toLowerCase().includes('.pdf');
    
    const options = {
      folder: process.env.CLOUDINARY_FOLDER || "online-quran",
      public_id: publicId,
      resource_type: isPdf ? "raw" : "image",
      ...(isPdf ? {
        format: "pdf",
        type: "upload",
      } : {
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
      }),
    };

    console.log("📤 Uploading file to Cloudinary...");
    console.log("   Folder:", options.folder);
    console.log("   Public ID:", publicId);
    console.log("   Resource type:", options.resource_type);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            console.log("✅ File uploaded successfully");
            console.log("   Public ID:", result.public_id);
            console.log("   URL:", result.secure_url);
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
              format: result.format,
              bytes: result.bytes,
              created_at: result.created_at,
            });
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl || typeof cloudinaryUrl !== "string") {
      return null;
    }

    // Handle different Cloudinary URL formats
    const urlParts = cloudinaryUrl.split("/");
    const imageIndex = urlParts.findIndex(
      (part) => part === "image" || part === "upload"
    );

    if (imageIndex === -1) {
      return null;
    }

    // Get the part after 'upload' (skipping version if present)
    let publicIdParts = urlParts.slice(imageIndex + 1);

    // Remove version if present (starts with 'v' followed by numbers)
    if (publicIdParts[0] && /^v\d+$/.test(publicIdParts[0])) {
      publicIdParts = publicIdParts.slice(1);
    }

    // Join the remaining parts and remove file extension
    const publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");

    console.log("🔍 Extracted public ID:", publicId);
    return publicId;
  } catch (error) {
    console.error("❌ Error extracting public ID:", error.message);
    return null;
  }
};

// Test Cloudinary configuration
export const testCloudinaryConnection = async () => {
  try {
    validateCloudinaryConfig();

    console.log("🧪 Testing Cloudinary connection...");

    const result = await cloudinary.api.ping();

    if (result.status === "ok") {
      console.log("✅ Cloudinary connection successful!");
      return { success: true, status: result.status };
    } else {
      console.log("❌ Cloudinary connection failed:", result);
      return { success: false, status: result.status };
    }
  } catch (error) {
    console.error("❌ Cloudinary connection test failed:", error.message);
    return { success: false, error: error.message };
  }
};

export default cloudinary;
