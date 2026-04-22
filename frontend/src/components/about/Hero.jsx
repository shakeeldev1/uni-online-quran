import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaQuran, FaChalkboardTeacher, FaGlobeAmericas, FaPlay, FaStar, FaArrowRight } from "react-icons/fa";

const swiperAry = [
  {
    id: 1,
    bgimg: "https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?w=1200&auto=format&fit=crop&q=60",
    heading: "Learn Quran Online",
    desc: "Start your journey with professional Quran tutors from the comfort of your home.",
    icon: <FaQuran className="text-white" />
  },
  {
    id: 2,
    bgimg: "https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?w=1200&auto=format&fit=crop&q=60",
    heading: "One-on-One Classes",
    desc: "Personalized teaching method tailored to each student's learning pace.",
    icon: <FaChalkboardTeacher className="text-white" />
  },
  {
    id: 3,
    bgimg: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&auto=format&fit=crop&q=60",
    heading: "Worldwide Access",
    desc: "Learn from anywhere, anytime with flexible scheduling options.",
    icon: <FaGlobeAmericas className="text-white" />
  },
];

const Hero = () => {
  useEffect(() => {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1200,
    });

    // AOS init
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto pt-20 sm:pt-8 px-4">
      {/* Enhanced Title Section */}
      <div className="text-center mb-16 relative">
        
        <h1
          className="text-4xl md:text-5xl pt-3 sm:pt-0 font-bold text-[#0E7C5A] font-serif max-w-3xl mx-auto leading-tight"
          data-aos="fade-down"
        >
          Discover the Beauty of Quranic Learning
        </h1>
        <p
          className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Embark on a transformative journey with our expert teachers and innovative learning platform designed for spiritual growth.
        </p>
      </div>

      {/* Enhanced Swiper */}
      <div className="swiper mySwiper w-full h-[550px] rounded-3xl shadow-2xl overflow-hidden relative group">
        <div className="swiper-wrapper">
          {swiperAry.map((item, i) => (
            <div
              key={item.id}
              className="swiper-slide flex items-center justify-center relative"
            >
              {/* Background Image with Enhanced Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${item.bgimg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E7C5A] to-[#AC7D40]/70"></div>
              </div>

              {/* Enhanced Content */}
              <div className="relative z-10 flex flex-col h-full justify-center items-center text-white text-center w-full px-6 max-w-4xl mx-auto">
                {/* Icon Badge */}
                <div 
                  className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="text-4xl">
                    {item.icon}
                  </div>
                </div>
                
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                  data-aos="zoom-in-up"
                  data-aos-delay="200"
                >
                  {item.heading}
                </h2>
                <p
                  className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {item.desc}
                </p>
                <div
                  className="mt-10 flex gap-4"
                  data-aos="flip-up"
                  data-aos-delay="600"
                >
                  <Link to="/course">
                    <button className="bg-[#AC7D40] border border-[#AC7D40] hover:border-[#AC7D40] hover:bg-transparent text-white font-semibold py-3 px-7 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 text-nowrap">
                      Start Learning <FaArrowRight className="text-sm" />
                    </button>
                  </Link>
                  <Link to="/about">
                    <button className="bg-transparent border-2 border-white/60 hover:border-white text-white font-semibold py-3 px-7 rounded-full transition-all duration-300 backdrop-blur-sm text-nowrap">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="swiper-pagination !bottom-8 [&>.swiper-pagination-bullet]:bg-white [&>.swiper-pagination-bullet]:opacity-60 [&>.swiper-pagination-bullet-active]:bg-amber-400 [&>.swiper-pagination-bullet-active]:opacity-100 [&>.swiper-pagination-bullet]:w-3 [&>.swiper-pagination-bullet]:h-3 [&>.swiper-pagination-bullet]:mx-1"></div>
        
        {/* Enhanced Navigation with Icons */}
        <div className="!hidden md:!flex swiper-button-prev !text-white !left-4 after:!content-none !w-12 !h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 items-center justify-center hover:bg-black/30 transition-all duration-3!00">
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</div>

        <div className="!hidden md:!flex swiper-button-next !text-white !right-4 after:!content-none !w-12 !h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/30 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Overlay Gradient at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;