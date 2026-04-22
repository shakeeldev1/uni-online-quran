import React, { useState, useEffect } from "react";
import { coursesAPI } from "../../features/coursesAPI";
import EnrollmentModal from "./EnrollmentModal"; // Course application modal

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllCourses();
      if (response.success) {
        // Filter only active courses for public display
        const activeCourses = response.data.filter(
          (course) => course.status === "Active"
        );
        setCourses(activeCourses);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCourse = (course) => {
    setSelectedCourse(course);
    setShowStudentModal(true);
  };

  const handleCloseModal = () => {
    setShowStudentModal(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Featured <span className="text-emerald-600">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive Quran learning programs designed by
              expert instructors to guide you on your spiritual journey.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No active courses available at the moment.
              </p>
            </div>
          ) : (
            /* Courses Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-20">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {course.title}
                    </h3>

                    <p
                      className="text-gray-600 mb-4 text-sm leading-relaxed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {course.description ||
                        "Comprehensive Quran learning program designed to enhance your understanding and recitation skills."}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {course.instructorId?.username
                          ?.charAt(0)
                          ?.toUpperCase() || "I"}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">
                          {course.instructorId?.username || "Instructor"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {course.instructorId?.role || "Teacher"} •{" "}
                          {course.instructorId?.experience || 0} years exp.
                        </p>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <p className="text-emerald-600 font-bold text-lg">
                          {course.sessions}
                        </p>
                        <p className="text-sm text-gray-600">Sessions</p>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <p className="text-emerald-600 font-bold text-lg">
                          {course.duration}
                        </p>
                        <p className="text-sm text-gray-600">Duration</p>
                      </div>
                    </div>

                    {/* Price and Enroll Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-emerald-600">
                          {course.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">
                          /course
                        </span>
                      </div>
                      <button
                        onClick={() => handleJoinCourse(course)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Course Application Modal */}
      {showStudentModal && (
        <EnrollmentModal course={selectedCourse} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AdminCourses;
