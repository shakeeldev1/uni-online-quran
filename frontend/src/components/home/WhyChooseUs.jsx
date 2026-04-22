import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaBullseye,
  FaStar,
  FaBrain,
  FaChalkboardTeacher,
  FaGlobeAmericas,
  FaArrowRight
} from "react-icons/fa";
import image2 from "../../assets/recite.jpg";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const PRIMARY = "#0E7C5A"; // Deep green
  const ACCENT = "#D4AF37"; // Gold
  const LIGHT = "#F8F5E6"; // Cream
  const DARK = "#2C3E50"; // Dark navy

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: LIGHT }}
      ></div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${PRIMARY.substring(1)}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4 border-2"
            style={{ borderColor: ACCENT }}
          >
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: ACCENT }}
            >
              Excellence in Quran Education
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 font-serif"
            style={{ color: DARK }}
          >
            Why <span style={{ color: ACCENT }}>Choose Us?</span>
          </h2>
          <div
            className="w-24 h-1.5 rounded-full mx-auto mb-2"
            style={{ backgroundColor: ACCENT }}
          ></div>
          <div
            className="w-16 h-1 rounded-full mx-auto opacity-70"
            style={{ backgroundColor: PRIMARY }}
          ></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image Column - Enhanced */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div
                className="absolute -inset-4 rounded-3xl"
                data-aos="fade-in"
                data-aos-delay="300"
              ></div>

              <div
                className="relative rounded-xl overflow-hidden shadow-xl group"
                style={{
                  border: `4px solid ${PRIMARY}20`,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.1)`
                }}
              >
                {/* Image */}
                <img
                  loading="lazy"
                  width="480"
                  height="600"
                  src={image2}
                  className="w-full h-[600px] object-cover transition-all duration-700 group-hover:scale-110"
                  alt="Quran Learning Experience"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${PRIMARY}10, ${ACCENT}10)`
                  }}
                ></div>

                {/* ✨ Shine Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="shine"></div>
                </div>

                {/* Decorative Corners */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ borderColor: ACCENT }}
                ></div>
                <div
                  className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ borderColor: ACCENT }}
                ></div>
              </div>

              {/* Floating Circle */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl"
                style={{ backgroundColor: PRIMARY }}
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <FaBook className="text-3xl" />
              </div>
            </div>

            {/* Shine CSS */}
            <style jsx>{`
    .shine {
      position: absolute;
      top: 0;
      left: -75%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
    }
    .group:hover .shine {
      animation: shineMove 1s ease forwards;
    }
    @keyframes shineMove {
      0% {
        left: -75%;
      }
      100% {
        left: 125%;
      }
    }
  `}</style>
          </div>


          {/* Content Column - Enhanced */}
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <p
              className="mb-5 leading-relaxed text-lg rounded-2xl p-4 backdrop-blur-sm"
              style={{
                color: DARK,
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: `1px solid ${PRIMARY}20`
              }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              At <span style={{ color: PRIMARY, fontWeight: '600' }}>Quran Learn Academy</span>, we strive to enlighten Muslims with the
              teachings of the Holy Quran, guiding lives according to the
              principles of Islam. With a step-by-step process and focus on{" "}
              <span style={{ color: ACCENT, fontWeight: '600' }}>Tajweed</span>, we ensure a
              comprehensive learning experience for every student.
            </p>

            <p
              className="mb-5 leading-relaxed text-lg rounded-2xl p-4 backdrop-blur-sm"
              style={{
                color: DARK,
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: `1px solid ${PRIMARY}20`
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Our flexible online classes allow you to learn at your own pace,
              from the comfort of your home—anytime, anywhere. Whether at home
              or traveling, your connection with the Quran continues without
              interruption.
            </p>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { text: "Free Trial Classes", icon: <FaBullseye className="text-lg" /> },
                { text: "Word by word Quran learning with Tajweed", icon: <FaBook className="text-lg" /> },
                { text: "Special focus on slow learners", icon: <FaStar className="text-lg" /> },
                { text: "Online Quran memorization", icon: <FaBrain className="text-lg" /> },
                { text: "Female Quran teachers for women & children", icon: <FaChalkboardTeacher className="text-lg" /> },
                { text: "Expert Quran teachers with English fluency", icon: <FaGlobeAmericas className="text-lg" /> },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl p-4  hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    border: `1px solid ${PRIMARY}30`,
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 500}
                >
                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}08 0%, ${ACCENT}08 100%)`
                    }}
                  ></div>

                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                      style={{
                        backgroundColor: PRIMARY,
                        color: LIGHT,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <span
                      className="font-medium leading-snug"
                      style={{ color: DARK }}
                    >
                      {feature.text}
                    </span>
                  </div>

                  {/* Animated underline on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: ACCENT }}
                  ></div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className="mt-10 text-center lg:text-left"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <Link to='/services'>
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg group text-white"
                  style={{
                    backgroundColor: ACCENT,

                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Your Journey
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;