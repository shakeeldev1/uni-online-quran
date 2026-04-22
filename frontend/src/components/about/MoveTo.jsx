import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBook, FaArrowRight, FaStar, FaPrayingHands } from "react-icons/fa";

const MoveTo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100, // Added offset to prevent early triggering
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto my-16 px-4 sm:px-5 overflow-hidden">
      <div className="bg-gradient-to-r from-[#AB7C3E] to-[#C99A5D] rounded-2xl py-10 md:py-12 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements - Fixed positioning and sizing */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 text-white opacity-20">
          <FaBook className="text-4xl md:text-6xl lg:text-7xl" />
        </div>
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-white opacity-20 rotate-12">
          <FaPrayingHands className="text-5xl md:text-7xl lg:text-8xl" />
        </div>
        
        {/* Text content with icon */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 z-10 w-full md:w-auto">
          <div 
            className=" bg-opacity-20 p-3 md:p-4 rounded-full flex-shrink-0"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <FaBook className="text-[#c8a87f] text-2xl md:text-4xl" />
          </div>
          <div className="flex-1 max-w-full">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white drop-shadow-md leading-tight mb-2 break-words"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Ready to Start Your Quran Learning Journey?
            </h2>
            <div 
              className="flex items-center justify-center md:justify-start gap-2 text-white text-opacity-90 flex-wrap"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <FaStar className="text-yellow-200 text-sm md:text-base flex-shrink-0" />
              <span className="text-base md:text-lg break-words">Join hundreds of satisfied students</span>
              <FaStar className="text-yellow-200 text-sm md:text-base flex-shrink-0" />
            </div>
          </div>
        </div>
        
        {/* Button with icon */}
        <div className="z-10 w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
          <Link
            to="/contact"
            className="group bg-white text-[#F38E44] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-[#fef4f0] transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center text-nowrap"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            Contact Us
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm md:text-base" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoveTo;