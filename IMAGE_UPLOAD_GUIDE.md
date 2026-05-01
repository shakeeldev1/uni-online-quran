# Image Upload Implementation Guide

## Overview
A reusable **CloudinaryUpload** component has been created for image uploads across the application. This guide shows how to integrate it into dashboard pages and user profiles.

## Files Created
- [CloudinaryUpload.jsx](frontend/src/components/common/CloudinaryUpload.jsx)

## Setup Required

### 1. Frontend Environment Variables
Add to `frontend/.env`:
```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Cloudinary Configuration
You need an upload preset configured in Cloudinary:
1. Go to Cloudinary Dashboard → Settings → Upload
2. Create unsigned upload preset (or use existing)
3. Add your folder configuration

## Component Usage

### Basic Import
```javascript
import CloudinaryUpload from "../common/CloudinaryUpload";
```

### Example 1: Profile Picture Upload
```jsx
import { useState, useContext } from "react";
import CloudinaryUpload from "../common/CloudinaryUpload";
import { AuthContext } from "../../context/AuthContext";

function ProfilePictureSection() {
  const { user, setUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  const handleImageUpload = async (imageUrl) => {
    setProfileImage(imageUrl);
    
    // Update user profile with new image
    try {
      const response = await fetch("/api/protected/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          profileImage: imageUrl,
        }),
      });
      
      if (response.ok) {
        const updatedUser = { ...user, profileImage: imageUrl };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Profile Picture</h3>
      <CloudinaryUpload
        onImageUpload={handleImageUpload}
        preview={profileImage}
        folder="online-quran/profiles"
        label="Upload Your Profile Picture"
      />
    </div>
  );
}
```

### Example 2: Course Image Upload (Dashboard)
```jsx
import { useState } from "react";
import CloudinaryUpload from "../common/CloudinaryUpload";

function CourseForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    // ... other fields
  });

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Course Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <CloudinaryUpload
        onImageUpload={handleImageUpload}
        preview={formData.image}
        folder="online-quran/courses"
        label="Course Cover Image"
      />

      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Create Course
      </button>
    </form>
  );
}
```

### Example 3: Tutor Profile Image (Dashboard)
```jsx
import CloudinaryUpload from "../common/CloudinaryUpload";

function TutorForm({ initialData = {} }) {
  const [tutorData, setTutorData] = useState({
    username: initialData.username || "",
    bio: initialData.bio || "",
    profileImage: initialData.profileImage || null,
    // ... other fields
  });

  const handleProfileImageUpload = (imageUrl) => {
    setTutorData(prev => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Other form fields */}
      
      <CloudinaryUpload
        onImageUpload={handleProfileImageUpload}
        preview={tutorData.profileImage}
        folder="online-quran/tutors"
        label="Tutor Profile Picture"
        className="mb-6"
      />

      {/* Submit button */}
    </div>
  );
}
```

### Example 4: Service Image Upload (Dashboard)
```jsx
import CloudinaryUpload from "../common/CloudinaryUpload";

function ServiceForm() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
  });

  const handleImageUpload = (imageUrl) => {
    setServiceData(prev => ({
      ...prev,
      image: imageUrl,
    }));
  };

  return (
    <form className="space-y-6">
      <input
        type="text"
        placeholder="Service Name"
        value={serviceData.name}
        onChange={(e) => setServiceData(prev => ({ ...prev, name: e.target.value }))}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <CloudinaryUpload
        onImageUpload={handleImageUpload}
        preview={serviceData.image}
        folder="online-quran/services"
        label="Service Image"
      />

      <textarea
        placeholder="Service Description"
        value={serviceData.description}
        onChange={(e) => setServiceData(prev => ({ ...prev, description: e.target.value }))}
        className="w-full px-4 py-2 border rounded-lg h-32"
      />

      <input
        type="number"
        placeholder="Price"
        value={serviceData.price}
        onChange={(e) => setServiceData(prev => ({ ...prev, price: e.target.value }))}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg">
        Create Service
      </button>
    </form>
  );
}
```

## Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onImageUpload` | Function | ✅ | Callback when image is uploaded. Receives image URL |
| `preview` | String | ❌ | Current image URL for preview |
| `folder` | String | ❌ | Cloudinary folder path (default: "online-quran") |
| `label` | String | ❌ | Input label text |
| `accept` | String | ❌ | File accept attribute (default: "image/*") |
| `className` | String | ❌ | Additional CSS classes |

## Features
- ✅ Drag & drop file selection
- ✅ Real-time preview
- ✅ File size validation (max 5MB)
- ✅ File type validation
- ✅ Loading state with spinner
- ✅ Remove image button
- ✅ Edit image button (upload new)
- ✅ Error handling with toast notifications
- ✅ Mobile responsive

## Dashboard Pages to Update

### 1. Tutors Page (`/dashboard/tutors`)
- Add image upload when creating tutor
- Add image upload when editing tutor
- Use folder: `online-quran/tutors`

### 2. Courses Page (`/dashboard/courses`)
- Add image upload when creating course
- Add image upload when editing course
- Use folder: `online-quran/courses`

### 3. Services Page (`/dashboard/services`)
- Add image upload when creating service
- Add image upload when editing service
- Use folder: `online-quran/services`

### 4. User Profile
- Allow users to change their profile picture
- Use folder: `online-quran/profiles`
- Update AuthContext after upload

## Backend Considerations

When receiving image URLs from frontend:

### Course Model
```javascript
{
  title: String,
  description: String,
  image: String,  // Cloudinary URL
  // ... other fields
}
```

### Tutor Model
```javascript
{
  username: String,
  bio: String,
  profileImage: String,  // Cloudinary URL
  // ... other fields
}
```

### Service Model
```javascript
{
  name: String,
  description: String,
  image: String,  // Cloudinary URL
  price: Number,
  // ... other fields
}
```

### User Model
```javascript
{
  username: String,
  email: String,
  profileImage: String,  // Cloudinary URL
  // ... other fields
}
```

## API Endpoint Updates Required

You may need to add/update endpoints:

1. **Update User Profile**
   - `PUT /api/protected/profile`
   - Accept `profileImage` field

2. **Create/Update Course**
   - `POST /api/courses` (ensure `image` field is accepted)
   - `PUT /api/courses/:id` (ensure `image` field is accepted)

3. **Create/Update Tutor**
   - `POST /api/tutors`
   - `PUT /api/tutors/:id`

4. **Create/Update Service**
   - `POST /api/services`
   - `PUT /api/services/:id`

## Error Handling

The component automatically handles:
- File type validation (images only)
- File size validation (max 5MB)
- Upload errors
- Network errors

All errors are shown via toast notifications:
```javascript
toast.error("Image size must be less than 5MB");
toast.success("Image uploaded successfully");
```

## Performance Tips

1. **Compress images before upload** - Consider adding image compression library
2. **Lazy load images** - Use lazy loading on list pages
3. **Cache Cloudinary URLs** - URLs can be cached indefinitely
4. **Use responsive transforms** - Example: `https://res.cloudinary.com/.../image.jpg?w=800&q=80`

## Security Notes

- ✅ Unsigned uploads with upload presets (safer than signed)
- ✅ File type validation on client
- ✅ File size limits
- ✅ Cloudinary folder organization
- ⚠️ Ensure backend validates image URLs are from Cloudinary
