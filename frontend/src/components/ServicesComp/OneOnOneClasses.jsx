import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function OneOnOneClasses() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    "Personalized attention from certified tutors",
    "Flexible scheduling to suit your lifestyle",
    "Interactive lessons with real-time feedback",
    "Progress tracking for continuous improvement",
  ];

  return (
    <section className="bg-black min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* Left Side - Content */}
        <div className="text-center lg:text-left">
          <h1
            data-aos="fade-down"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight sm:leading-snug"
          >
            <span className="text-white">One-on-One </span>
            <span style={{ color: "#D4AF37" }}>Quran Classes</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Experience the beauty of the Quran through personalized{" "}
            <span className="font-semibold text-white">one-on-one sessions</span>{" "}
            with certified teachers. Learn at your own pace with flexible
            scheduling and complete guidance.
          </p>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {features.map((feature, i) => (
              <div
                key={i}
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={i * 150}
                className="flex items-start sm:items-center gap-3"
              >
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4AF37] mt-1 sm:mt-0 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base md:text-lg text-left">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/contact">
            <button
              data-aos="zoom-in"
              data-aos-delay="700"
              className="inline-block px-6 py-3 cursor-pointer sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-2xl sm:rounded-3xl text-white bg-[#D4AF37] font-medium text-sm sm:text-base md:text-lg shadow-lg transition"
            >
              Start Your Trial Class
            </button>
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none group overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
  {/* Tooltip */}
  <div
    data-aos="fade-down"
    data-aos-delay="500"
    className="absolute top-0 sm:-top-6 md:-top-2 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-4 py-1 sm:px-5 sm:py-2 rounded-full shadow-md text-xs sm:text-sm md:text-base font-medium whitespace-nowrap z-50"
  >
    Live Interactive Session
  </div>

  {/* Image */}
  <img
    data-aos="fade-up"
    data-aos-delay="600"
    src="https://equraneducation.com/wp-content/uploads/2024/01/learn-quran-online-one-on-one-quran-class.jpg"
    alt="One-on-One Quran Classes"
    className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
  />

  {/* Shine Effect */}
  <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
    <div className="shine"></div>
  </div>

  {/* CSS for Shine */}
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
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
    }
    .group:hover .shine {
      animation: shineMove 1.5s ease;
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

      </div>
    </section>
  );
}
