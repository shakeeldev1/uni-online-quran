import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import video from '../../assets/quran.mp4'
import { Link } from "react-router-dom";

const QuranLearningSteps = () => {
  // Islamic color palette (same as before)
  const PRIMARY = "#0E7C5A"; // Deep green
  const ACCENT = "#D4AF37"; // Gold
  const LIGHT = "#F8F5E6"; // Cream
  const DARK = "#2C3E50"; // Dark navy

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);


  const videoRef = useRef(null);

  // Try to programmatically play the video on mount. Many browsers require the
  // video to be muted for autoplay to be allowed; adding muted + playsInline helps
  // on mobile (iOS). We attempt to play and gracefully handle promise rejection.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch((err) => {
        console.warn('Video autoplay prevented:', err);
      });
    }
  }, []);


  return (
    <section className="w-full bg-gradient-to-br from-[#F8F5E6] to-[#f0ebd6] py-20 px-4 md:px-8 overflow-hidden relative">
      {/* Enhanced decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat pattern-islamic scale-110"></div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#0E7C5A]/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Title & Intro */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-4" data-aos="fade-down">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight font-serif text-[#2C3E50] relative z-10">
              Begin Your <span style={{ color: ACCENT }}>Quranic Journey</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-[#D4AF37]/20 rounded-full"></div>
          </div>

          <h3
            className="text-xl md:text-2xl font-medium text-gray-700 mb-6 relative"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Just 3 Simple Steps to Get Started
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-[#0E7C5A]/30 rounded-full"></span>
          </h3>

          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed bg-white/50 p-6 rounded-2xl shadow-sm"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            At Quran Learn Academy, we&apos;ve made it easy to begin your sacred
            educational journey. Follow these quick steps to register and
            start learning with our certified tutors.
          </p>
        </div>

        {/* Steps + Image - Enhanced Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Steps List - Enhanced */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Step 1 - Enhanced */}
            <div
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
              style={{ borderLeftColor: ACCENT }}
              data-aos="fade-right"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 relative">
                  <div
                    className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderColor: ACCENT,
                      background: `linear-gradient(135deg, ${LIGHT} 0%, white 100%)`
                    }}
                  >
                    <img
                      loading="lazy"
                      width="40"
                      height="40"
                      src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/register1.1.png"
                      className="object-contain"
                      alt="Register icon"
                    />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    1
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3
                    className="text-xl font-semibold mb-3 tracking-tight"
                    style={{ color: DARK }}
                  >
                    Complete Your{" "}
                    <span style={{ color: ACCENT }}>Online Registration</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Start by clicking on{" "}
                    <span style={{ color: ACCENT, fontWeight: '600' }}>&quot;Register Online&quot;</span>. Fill
                    in your basic details securely and complete your registration in
                    minutes.
                  </p>
                </div>
              </div>
              {/* Step connector line */}
              <div className="absolute left-8 top-full h-8 w-0.5 bg-gradient-to-b from-[#D4AF37]/40 to-transparent ml-4"></div>
            </div>

            {/* Step 2 - Enhanced */}
            <div
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
              style={{ borderLeftColor: ACCENT }}
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 relative">
                  <div
                    className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderColor: ACCENT,
                      background: `linear-gradient(135deg, ${LIGHT} 0%, white 100%)`
                    }}
                  >
                    <img
                      loading="lazy"
                      width="40"
                      height="40"
                      src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/calendar1.1.png"
                      className="object-contain"
                      alt="Calendar icon"
                    />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    2
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3
                    className="text-xl font-semibold mb-3 tracking-tight"
                    style={{ color: DARK }}
                  >
                    Schedule Your{" "}
                    <span style={{ color: ACCENT }}>Free Trial Class</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    After registration, we&apos;ll reach out to schedule your{" "}
                    <span style={{ color: ACCENT, fontWeight: '600' }}>free trial</span>. You&apos;ll also learn
                    more about our teaching process and get personalized guidance.
                  </p>
                </div>
              </div>
              {/* Step connector line */}
              <div className="absolute left-8 top-full h-8 w-0.5 bg-gradient-to-b from-[#D4AF37]/40 to-transparent ml-4"></div>
            </div>

            {/* Step 3 - Enhanced */}
            <div
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
              style={{ borderLeftColor: ACCENT }}
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 relative">
                  <div
                    className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderColor: ACCENT,
                      background: `linear-gradient(135deg, ${LIGHT} 0%, white 100%)`
                    }}
                  >
                    <img
                      loading="lazy"
                      width="40"
                      height="40"
                      src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/quran1.1.png"
                      className="object-contain"
                      alt="Quran icon"
                    />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    3
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3
                    className="text-xl font-semibold mb-3 tracking-tight"
                    style={{ color: DARK }}
                  >
                    Begin Your <span style={{ color: ACCENT }}>Learning Journey</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Log in with your credentials and attend your{" "}
                    <span style={{ color: ACCENT, fontWeight: '600' }}>first class</span> with our qualified
                    Quran tutors—anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Side Image */}
          <div
            className="w-full lg:w-1/2 flex justify-center relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="relative max-w-md group">
              <div className="relative z-10  rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={video}
                  ref={videoRef}
                  autoPlay
                  loop
                  
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />

              </div>

              {/* Decorative layers */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#0E7C5A]/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute -z-20 -inset-6 bg-gradient-to-tr from-[#D4AF37]/10 to-[#0E7C5A]/10 rounded-3xl transform -rotate-3"></div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4AF37]/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#0E7C5A]/10 rounded-full"></div>

              {/* CSS for shine */}
              <style jsx>{`
    .shine {
      position: absolute;
      top: 0;
      left: -75%;
      width: 30%;
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

          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div
          className="text-center mt-16"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <Link to="/login" className="inline-block">
            <button
              className="px-5 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              style={{
                backgroundColor: PRIMARY,
                color: LIGHT,
              }}
            >
              <span className="relative z-10">Begin Your Registration Now</span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              ></div>
            </button>
          </Link>

        </div>
      </div>

      {/* Add some CSS for the Islamic pattern if needed */}
      <style jsx>{`
        .pattern-islamic {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C35 20 20 35 20 50s15 30 30 30 30-15 30-30S65 20 50 20zm0 10c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z' fill='%230E7C5A' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};

export default QuranLearningSteps;