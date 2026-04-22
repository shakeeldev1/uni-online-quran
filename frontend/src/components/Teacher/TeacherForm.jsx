import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { teacherApplicationsAPI } from "../../features/teacherApplicationsAPI";

const TeacherForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    whatsapp: "",
    email: "",
    address: "",
    country: "",
    education: "",
    specialization: "",
    experience: "",
    // youtubeLink: "",
    languages: [],
    courses: [],
    gender: "",
    certificate: null,
    cnic: null,
    cv: null,
    about: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value);
      return { ...prev, [field]: updated };
    });
  };

  const validate = () => {
    let temp = {};

    if (!form.fullName.trim()) temp.fullName = "Full name is required.";
    if (!form.fatherName.trim()) temp.fatherName = "Father name is required.";
    if (!form.whatsapp.match(/^03\d{9}$/))
      temp.whatsapp = "Enter valid WhatsApp (e.g., 03xx-xxxxxxx)";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      temp.email = "Enter a valid email.";
    if (!form.address.trim()) temp.address = "Address is required.";
    if (!form.country.trim()) temp.country = "Country is required.";
    if (!form.education.trim()) temp.education = "Education is required.";
    if (!form.specialization.trim())
      temp.specialization = "Specialization is required.";
    if (!form.experience.trim()) temp.experience = "Experience is required.";
    // if (!form.youtubeLink.match(/^https?:\/\/(www\.)?youtube\.com/))
    //   temp.youtubeLink = "Please provide a valid YouTube link.";
    if (form.languages.length === 0)
      temp.languages = "Select at least one language.";
    if (form.courses.length === 0)
      temp.courses = "Select at least one course.";
    if (!form.gender) temp.gender = "Select your gender.";
    if (!form.certificate) temp.certificate = "Upload certificate file.";
    if (!form.cnic) temp.cnic = "Upload CNIC file.";
    if (!form.cv) temp.cv = "Upload CV file.";
    if (form.about.trim().length < 100)
      temp.about = "Description must be at least 100 words.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    
    if (validate()) {
      setLoading(true);
      try {
        // Create FormData for file uploads
        const formData = new FormData();
        
        // Append all text fields
        formData.append("fullName", form.fullName);
        formData.append("fatherName", form.fatherName);
        formData.append("whatsapp", form.whatsapp);
        formData.append("email", form.email);
        formData.append("address", form.address);
        formData.append("country", form.country);
        formData.append("education", form.education);
        formData.append("specialization", form.specialization);
        formData.append("experience", form.experience);
        formData.append("gender", form.gender);
        formData.append("about", form.about);
        
        // Append arrays as JSON strings
        formData.append("languages", JSON.stringify(form.languages));
        formData.append("courses", JSON.stringify(form.courses));
        
        // Append files
        if (form.certificate) {
          formData.append("certificate", form.certificate);
        }
        if (form.cnic) {
          formData.append("cnic", form.cnic);
        }
        if (form.cv) {
          formData.append("cv", form.cv);
        }

        console.log("📤 Submitting teacher application...");
        console.log("📋 Form fields:", {
          fullName: form.fullName,
          fatherName: form.fatherName,
          whatsapp: form.whatsapp,
          email: form.email,
          address: form.address,
          country: form.country,
          education: form.education,
          specialization: form.specialization,
          experience: form.experience,
          gender: form.gender,
          languages: form.languages,
          courses: form.courses,
          about: form.about.substring(0, 50) + "...",
          hasCertificate: !!form.certificate,
          hasCnic: !!form.cnic,
          hasCv: !!form.cv,
        });

        const response = await teacherApplicationsAPI.submitApplication(formData);
        
        console.log("✅ Application submitted successfully:", response);
        
        if (response.success) {
          setSubmitted(true);
          alert("✅ Your application has been submitted successfully! We will review it and get back to you soon.");
        }
      } catch (error) {
        console.error("❌ Error submitting application:", error);
        const errorMessage = error?.message || error?.error || "Failed to submit application. Please try again.";
        setSubmitError(errorMessage);
        alert("❌ " + errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0E7C5A] focus:border-[#0E7C5A] outline-none transition-all";

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-6 md:px-20 bg-white">
      <div
        data-aos="fade-up"
        className="max-w-[1200px] w-full mx-auto shadow-2xl rounded-3xl p-10 md:p-16 border-t-[10px]"
        style={{
          borderColor: "#0E7C5A",
          boxShadow: "0px 0px 30px #B08A51",
        }}
      >
        <h1
          data-aos="fade-down"
          className="text-4xl font-extrabold text-center mb-12"
          style={{ color: "#0E7C5A" }}
        >
          Teacher Application Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 text-gray-800">
          {/* Basic Info */}
          <div data-aos="fade-up" className="grid md:grid-cols-3 gap-6">
            {[
              { name: "fullName", label: "Full Name", placeholder: "Enter your full name" },
              { name: "fatherName", label: "Father Name", placeholder: "Enter your father's name" },
              { name: "whatsapp", label: "Your WhatsApp", placeholder: "03xx-xxxxxxx" },
            ].map((item) => (
              <div key={item.name}>
                <label className="block font-semibold mb-2">{item.label}</label>
                <input
                  name={item.name}
                  value={form[item.name]}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  className={inputClass}
                />
                {errors[item.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" className="grid md:grid-cols-3 gap-6">
            {[
              { name: "email", label: "Email", placeholder: "example@gmail.com" },
              { name: "address", label: "Address", placeholder: "Enter your address" },
              { name: "country", label: "Country", placeholder: "Enter your country" },
            ].map((item) => (
              <div key={item.name}>
                <label className="block font-semibold mb-2">{item.label}</label>
                <input
                  name={item.name}
                  value={form[item.name]}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  className={inputClass}
                />
                {errors[item.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div data-aos="fade-up" className="grid md:grid-cols-3 gap-6">
            {[
              { name: "education", label: "Education", placeholder: "Your highest qualification" },
              { name: "specialization", label: "Specialization", placeholder: "Your area of expertise" },
              { name: "experience", label: "Experience", placeholder: "e.g., 3 years of Quran teaching" },
            ].map((item) => (
              <div key={item.name}>
                <label className="block font-semibold mb-2">{item.label}</label>
                <input
                  name={item.name}
                  value={form[item.name]}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  className={inputClass}
                />
                {errors[item.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* YouTube Intro */}
          {/* <div data-aos="fade-up">
            <label className="block font-semibold mb-2">
              Intro Video Link (YouTube)
            </label>
            <input
              name="youtubeLink"
              value={form.youtubeLink}
              onChange={handleChange}
              placeholder="Paste intro video link"
              className={inputClass}
            />
            {errors.youtubeLink && (
              <p className="text-red-500 text-sm mt-1">{errors.youtubeLink}</p>
            )}
          </div> */}

          {/* Languages */}
          <div data-aos="fade-up">
            <h2 className="font-semibold mb-2">Languages You Speak</h2>
            <div className="flex flex-wrap gap-4">
              {["English", "Urdu", "Hindi", "Arabic", "Pashto"].map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={form.languages.includes(lang)}
                    onChange={(e) => handleCheckboxChange(e, "languages")}
                    className="accent-[#0E7C5A]"
                  />
                  {lang}
                </label>
              ))}
            </div>
            {errors.languages && (
              <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
            )}
          </div>

          {/* Courses */}
          <div data-aos="fade-up">
            <h2 className="font-semibold mb-2">Courses You Can Teach</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                "Noorani Qaida Course",
                "Quran Memorization",
                "Ijazah Course",
                "Hadith Course",
                "Arabic Language Course",
                "Tajweed Course",
                "Islamic Studies Course",
                "Qiraat Course",
                "Tafseer Course",
                "Nazra Quran Course",
                "Quran Recitation Course",
                "Quran Translation Course",
                "Quran Reading Course",
              ].map((course) => (
                <label key={course} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={course}
                    checked={form.courses.includes(course)}
                    onChange={(e) => handleCheckboxChange(e, "courses")}
                    className="accent-[#0E7C5A]"
                  />
                  {course}
                </label>
              ))}
            </div>
            {errors.courses && (
              <p className="text-red-500 text-sm mt-1">{errors.courses}</p>
            )}
          </div>

          {/* Gender */}
          <div data-aos="fade-up">
            <h2 className="font-semibold mb-2">Gender</h2>
            <div className="flex gap-8">
              {["Male", "Female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                    className="accent-[#0E7C5A]"
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* File Uploads */}
          <div data-aos="fade-up" className="grid md:grid-cols-3 gap-6">
            {[
              { name: "certificate", label: "Upload Certificate" },
              { name: "cnic", label: "Upload CNIC (png, jpg, pdf)" },
              { name: "cv", label: "Upload CV (png, jpg, pdf)" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block font-semibold mb-2">{f.label}</label>
                <input
                  type="file"
                  name={f.name}
                  accept=".png,.jpg,.pdf"
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors[f.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[f.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* About */}
          <div data-aos="fade-up">
            <label className="block font-semibold mb-2">
              Write About Yourself (100+ words)
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your experience, goals, and personality..."
              className={inputClass}
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">{errors.about}</p>
            )}
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="text-red-500 text-center p-3 bg-red-50 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Submit */}
          <div data-aos="zoom-in" className="text-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="text-white px-10 py-3 rounded-full font-semibold text-lg transition-all duration-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#0E7C5A",
                boxShadow: "0px 8px 25px rgba(14, 124, 90, 0.4)",
              }}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
