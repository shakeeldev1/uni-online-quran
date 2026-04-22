import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Video, BookOpen } from "lucide-react";

const TeacherHead = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start">
      {/* ===== Hero Section ===== */}
      <div className="w-full h-60 sm:h-72 md:h-80 relative overflow-hidden">
        <img
          src="https://deenalfurqan.com/wp-content/uploads/2025/09/best-quran-teacher-online-muslim-tutors-1024x683.png"
          alt="Teacher Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1
            className="text-[#AF864C] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg"
            data-aos="fade-up"
          >
            Become a Teacher
          </h1>
        </div>
      </div>

      {/* ===== Description Section ===== */}
      <div
        className="max-w-5xl w-full px-6 py-12 flex flex-col items-center text-center"
        data-aos="fade-up"
      >
        <p className="text-[#0C6A4D] text-lg md:text-xl mb-10 leading-relaxed">
          Join our global teaching community and inspire students around the
          world. Complete the following requirements to begin your journey with
          us.
        </p>

        {/* ===== Cards Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1 */}
          <div
            className="bg-white group rounded-2xl shadow-lg p-8 transition-all duration-500 ease-in-out delay-150   hover:shadow-2xl hover:shadow-[#0E7C5A]/30 "
            data-aos="zoom-in"
          >
            <div className="flex flex-col  items-center text-center space-y-4">
              <div className="bg-[#0E7C5A]/10 p-4 rounded-full  ">
                <Video className="text-[#0E7C5A] w-10 h-10 group-hover:scale-75 transition-all duration-300 ease-in-out delay-100" />
              </div>
              <h2 className="text-2xl font-semibold text-[#0E7C5A]">
                Prepare a Video Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Intl requires a short video introduction to showcase your
                teaching style and personality. This helps students know you
                better before classes begin.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white group rounded-2xl shadow-lg p-8 transition-all duration-500 ease-in-out delay-150 hover:shadow-2xl hover:shadow-[#0E7C5A]/30"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-[#0E7C5A]/10 p-4 rounded-full group-hover:scale-75 transition-all duration-300 ease-in-out delay-100">
                <BookOpen className="text-[#0E7C5A] w-10 h-10" />
              </div>
              <h2 className="text-2xl font-semibold text-[#0E7C5A]">
                Teaching Certifications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Intl requires valid teaching certifications to ensure quality
                education and maintain high standards across our teaching
                network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHead;
