import React, { useState, useEffect, useRef } from "react";
import { GoDot } from "react-icons/go";
import { IoMdStar, IoMdStarOutline, IoIosQuote } from "react-icons/io";
import { FaUserGraduate, FaUserTie, FaUser } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import ReviewFormModal from "../home/model/ReviewFormModal";

const TestomonialArray = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1678559460700-8a1d42ce8239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltJTIwbWFufGVufDB8fDB8fHww",
    stars: 5,
    msg: "Alhamdulillah, learning Quran online has been life-changing. The teacher is patient and explains with tajweed rules clearly. My recitation has improved a lot.",
    name: "Ahmed Khan",
    position: "Student",
    icon: <FaUserGraduate />
  },
  {
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1677014616443-2954b327f404?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmF0aW1hJTIwWmFocmElMjBtdXNsaW18ZW58MHx8MHx8fDA%3D",
    stars: 5,
    msg: "The one-on-one classes are excellent. My daughter has memorized several surahs already and enjoys every session with her ustadha.",
    name: "Fatima Zahra",
    position: "Parent",
    icon: <FaUserTie />
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1627091908405-30bd51eec537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzbGltJTIwbWFufGVufDB8fDB8fHww",
    stars: 4,
    msg: "I live abroad and this academy made it easy to stay connected with the Quran. Flexible timing helps me manage my busy schedule.",
    name: "Muhammad Ali",
    position: "Professional",
    icon: <FaUser />
  },
];

const Testomonial = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      offset: 100 // Increased offset to prevent early triggering
    });
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TestomonialArray.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleDotClick = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <div className="px-4 sm:px-6 py-16 mb-5 bg-gradient-to-br from-[#644E38] to-[#D4B183] relative overflow-hidden w-full">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      
      {/* Heading */}
      <div className="text-center mb-12 relative z-10 max-w-6xl mx-auto">
        <h1
          className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md"
          data-aos="fade-down"
        >
          What Our Students Say
        </h1>

        <div
          className="flex items-center justify-center gap-4 text-lg font-semibold text-white"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <hr className="w-20 border-t-2 border-[#AC7D40]" />
          <span className="tracking-wider">STUDENT TESTIMONIALS</span>
          <hr className="w-20 border-t-2 border-[#AC7D40]" />
        </div>
      </div>

      {/* Slider Container - Fixed overflow */}
      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div 
          ref={sliderRef}
          className="overflow-hidden rounded-2xl"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {TestomonialArray.map((item, index) => (
              <div
                key={item.id}
                className="w-full flex-shrink-0 flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-white/95 shadow-2xl border border-white/30 p-6 md:p-8 relative"
                data-aos="zoom-in"
                data-aos-delay={index * 200}
              >
                {/* Quote Icon */}
                <div className="absolute top-2 left-4 bg-gradient-to-r from-[#644E38] to-[#D4B183] p-2 rounded-full shadow-lg">
                  <IoIosQuote className="text-2xl text-white" />
                </div>

                {/* Image Container */}
                <div className="flex flex-col items-center mt-6 md:mt-0">
                  <div
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#AC7D40] hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg relative"
                    data-aos="flip-left"
                    data-aos-delay="300"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Role Icon */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#644E38] to-[#D4B183] p-2 rounded-full text-white text-lg shadow-md">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Name and Position */}
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-lg text-[#644E38]">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                  {/* Star Rating */}
                  <div
                    className="flex justify-center md:justify-start text-[#AC7D40] text-xl mb-4"
                    data-aos="fade-right"
                    data-aos-delay="400"
                  >
                    {Array.from({ length: 5 }).map((_, idx) =>
                      idx < item.stars ? (
                        <IoMdStar key={idx} className="drop-shadow-sm" />
                      ) : (
                        <IoMdStarOutline key={idx} />
                      )
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <p
                    className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 italic relative px-2"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <span className="absolute -left-1 -top-3 text-2xl text-[#D4B183]">"</span>
                    {item.msg}
                    <span className="absolute -right-1 -bottom-3 text-2xl text-[#D4B183]">"</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div
        className="flex justify-center items-center gap-3 mt-8 relative z-10"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        {TestomonialArray.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className="focus:outline-none group"
          >
            <div className={`p-1 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-yellow-500/30 scale-125" 
                : "bg-white/20 hover:bg-white/30"
            }`}>
              <GoDot
                className={`text-xl transition-all duration-300 ${
                  current === index 
                    ? "text-white scale-110" 
                    : "text-white group-hover:text-yellow-500"
                }`}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Testomonial;