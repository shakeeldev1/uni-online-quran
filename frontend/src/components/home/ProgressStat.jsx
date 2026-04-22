import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { 
  FaCalendarAlt, 
  FaSmile, 
  FaGlobeAmericas, 
  FaChartBar, 
  FaChartLine 
} from "react-icons/fa";

const ProgressStats = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const stats = [
    { value: 12, suffix: "+", label: "Years of Experience", icon: <FaCalendarAlt className="text-3xl" />, animation: "fade-up", delay: 0 },
    { value: 50, suffix: "+", label: "Satisfied Clients", icon: <FaSmile className="text-3xl" />, animation: "fade-right", delay: 150 },
    { value: 17, suffix: "+", label: "Countries We Operate", icon: <FaGlobeAmericas className="text-3xl" />, animation: "zoom-in", delay: 300 },
    { value: 200, suffix: "K+", label: "Managed Marketing", icon: <FaChartBar className="text-3xl" />, animation: "flip-left", delay: 450 },
    { value: 2.9, suffix: "M+", label: "Clients Gain", icon: <FaChartLine className="text-3xl" />, animation: "fade-left", delay: 600 },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-15 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#0E7C5A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4AF37] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1
            data-aos="zoom-in"
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-[#0E7C5A] bg-clip-text text-transparent"
          >
            Our <span className="text-[#0E7C5A]">Progress</span>
          </h1>

          {/* Quran Verse */}
          <div 
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative inline-block mb-4"
          >
            <p className="italic text-lg md:text-xl font-medium text-[#D4AF37] mb-2 max-w-2xl mx-auto relative z-10">
              "And that there is not for man except that [good] for which he strives."
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0E7C5A] to-[#D4AF37] rounded-full opacity-70"></div>
          </div>
          
          <span
            className="text-gray-600 text-base font-medium block mt-3"
            data-aos="fade-in"
            data-aos-delay="200"
          >
            (Surah An-Najm 53:39)
          </span>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-gray-700 text-lg md:text-xl text-center leading-relaxed bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50"
          >
            TOJO GLOBAL connects your business directly to your target audience,
            eliminating the need to search for clients. With us, they'll find their
            way to you.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced StatCard component
const StatCard = ({ stat, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setStart(true), index * 300); // stagger delay
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="group flex flex-col justify-center items-center 
                 bg-gradient-to-br from-white to-gray-50 
                 border border-gray-200 rounded-2xl text-gray-800 hover:shadow-sm transition-all duration-300
                 p-6 relative overflow-hidden"
      data-aos={stat.animation}
      data-aos-delay={stat.delay}
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0E7C5A] to-[#D4AF37]"></div>
      
      {/* Icon */}
      <div 
        className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-360 text-[#0E7C5A]"
        data-aos="zoom-in"
        data-aos-delay={stat.delay + 50}
      >
        {stat.icon}
      </div>
      
      {/* Number */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 group-hover:text-[#0E7C5A]"
        data-aos="zoom-in"
        data-aos-delay={stat.delay + 100}
        aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
      >
        {start ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.5}
            decimals={stat.value % 1 !== 0 ? 1 : 0}
            suffix={stat.suffix}
          />
        ) : (
          "0" + stat.suffix
        )}
      </h2>
      
      {/* Label */}
      <p
        className="text-sm font-medium text-center text-gray-600 transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold"
        data-aos="fade-up"
        data-aos-delay={stat.delay + 200}
      >
        {stat.label}
      </p>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E7C5A]/5 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
};

export default ProgressStats;