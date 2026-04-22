import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaChalkboardTeacher,
  FaGlobeAmericas,
  FaLaptop,
  FaHeadphones,
  FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";

const KeyFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Define color variables for consistency
  const PRIMARY = "#0E7C5A";
  const SECONDARY = "#2C3E50";
  const ACCENT = "#D4AF37";
  const LIGHT = "#F8F5E6";

  const features = [
    {
      icon: <FaBook className="text-xl" />,
      text: "One-on-One Quran Classes",
      animation: "fade-up",
      duration: 800,
    },
    {
      icon: <FaChalkboardTeacher className="text-xl" />,
      text: "Qualified Male & Female Tutors",
      animation: "fade-up",
      duration: 900,
    },
    {
      icon: <FaGlobeAmericas className="text-xl" />,
      text: "Flexible Timings & Time Zones",
      animation: "fade-up",
      duration: 1000,
    },
    {
      icon: <FaLaptop className="text-xl" />,
      text: "Interactive Online Learning",
      animation: "fade-up",
      duration: 1100,
    },
    {
      icon: <FaHeadphones className="text-xl" />,
      text: "Free Trial Classes Available",
      animation: "fade-up",
      duration: 1200,
    },
    {
      icon: <FaStar className="text-xl" />,
      text: "Monthly Progress Reports",
      animation: "fade-up",
      duration: 1300,
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with improved overlay */}
      <div
        className="absolute inset-0  bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.shutterstock.com/image-photo/group-children-reading-holy-book-260nw-2134069425.jpg')",
          backgroundSize: '100% 120%'
        }}
      ></div>

      {/* Enhanced gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${SECONDARY}CC 0%, ${PRIMARY}99 50%, ${SECONDARY}CC 100%)`
        }}
      ></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${LIGHT.substring(1)}' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-block px-4 py-2 rounded-full mb-4 border-2"
            style={{ borderColor: ACCENT }}
            data-aos="fade-up"
          >
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: ACCENT }}
            >
              Why Choose Us
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: LIGHT }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our Key Features
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ backgroundColor: ACCENT }}
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Circle Element */}
          <div
            className="flex-shrink-0 mb-10 lg:mb-0"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl group cursor-pointer transition-all duration-700 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                border: `4px solid ${ACCENT}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px ${ACCENT}40`
              }}
            >
              {/* Inner circle effect */}
              <div
                className="absolute inset-4 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`
                }}
              ></div>

              <h3
                className="text-2xl md:text-3xl font-bold text-center relative z-10 leading-tight tracking-wide transition-all duration-500 group-hover:scale-110"
                style={{ color: LIGHT }}
              >
                KEY<br />FEATURES
              </h3>

              {/* Animated orbiting dots */}
              <div className="absolute inset-0 rounded-full">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor: ACCENT,
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 90}deg) translate(120px) rotate(-${i * 90}deg)`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {features.map((feature, index) => (
              <div
                key={index}
                data-aos={feature.animation}
                data-aos-duration={feature.duration}
                data-aos-delay={index * 100}
                className={`group relative overflow-hidden rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-${ACCENT}/50`}
                style={{
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Hover effect background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY}20 0%, ${ACCENT}20 100%)`
                  }}
                ></div>

                <div className="flex items-center gap-4 relative z-10">
                  {/* Icon Container */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg"
                    style={{
                      backgroundColor: PRIMARY,
                      color: LIGHT,
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <span
                    className="font-semibold text-lg transition-colors duration-300"
                    style={{ color: LIGHT }}
                  >
                    {feature.text}
                  </span>
                </div>

                {/* Connecting line for visual flow */}
                <div
                  className="absolute bottom-0 left-12 h-0.5 w-0 group-hover:w-40 transition-all duration-700 ease-out"
                  style={{ backgroundColor: ACCENT }}
                ></div>

              </div>

            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center w-[70%] mt-2 mx-auto "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p
            className="text-lg mb-6 text-center  lg:text-end"
            style={{ color: LIGHT }}
          >
            Experience the difference with our comprehensive Quran learning platform
          </p>
          <Link to='/services'>
            <button
              className="px-6 py-3 mr-[12%] rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white"
              style={{
                backgroundColor: ACCENT,

              }}
            >
              Start Learning Today
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;