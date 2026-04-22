import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaBook, 
  FaBalanceScale, 
  FaStar, 
  FaBullseye, 
  FaHistory, 
  FaHeart,
  FaQuran,
  FaMosque,
  FaPray
} from "react-icons/fa";

export default function IslamicStudies() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  const categories = [
    {
      icon: FaBook,
      title: "Hadith Studies",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/8522577/pexels-photo-8522577.jpeg",
      items: [
        "Learning selected authentic Hadith",
        "Understanding the meanings & lessons behind Hadith",
        "Applying Sunnah in daily life",
      ],
    },
    {
      icon: FaBalanceScale,
      title: "Fiqh (Islamic Jurisprudence)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/33761507/pexels-photo-33761507.jpeg",
      items: [
        "Basics of prayer, fasting, zakat, hajj",
        "Halal & Haram in everyday life",
        "Purification (Taharah) and daily rulings",
        "Golden Islamic Civilizations",
      ],
    },
    {
      icon: FaStar,
      title: "Seerah (Life of Prophet Muhammad ﷺ)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg",
      items: [
        "Stories from the life of the Prophet ﷺ",
        "His character, struggles, and leadership",
        "Lessons for children, youth, and families",
        "Great Scholars of Islam",
      ],
    },
    {
      icon: FaBullseye,
      title: "Aqeedah (Beliefs & Creed)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/16732789/pexels-photo-16732789.jpeg",
      items: [
        "Belief in Allah, Angels, Books, Prophets, Qiyamah, Qadr",
        "Understanding the foundations of Islamic faith",
        "Quranic Sciences & Tafsir",
      ],
    },
    {
      icon: FaHistory,
      title: "Islamic History",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/1827943/pexels-photo-1827943.jpeg",
      items: [
        "Stories of Prophets",
        "Golden Islamic civilizations",
        "Great scholars of Islam",
        "Islamic History & Battles",
      ],
    },
    {
      icon: FaHeart,
      title: "Manners & Etiquette (Adab & Akhlaq)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/8164745/pexels-photo-8164745.jpeg",
      items: [
        "Islamic manners in daily life",
        "Respect for parents, teachers, neighbors, and others",
        "Building good character according to Sunnah",
      ],
    },
  ];

  return (
    <section className="relative py-20 px-6 lg:px-16 bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <div
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-amber-500 text-white px-6 py-3 rounded-full text-base font-semibold mb-6 shadow-lg"
            data-aos="zoom-in"
          >
            <FaQuran className="mr-2" />
            Premium Islamic Education
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            data-aos="fade-up"
          >
            Comprehensive <span className="text-[#D4AF37] relative">
              Islamic Studies
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></span>
            </span>
          </h2>

          <p
            className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Deepen your understanding of Islam through our structured and engaging courses designed for all ages and knowledge levels
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform  border border-amber-100"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Image */}
             <div className="relative h-48 overflow-hidden group">
  <img
    src={category.image}
    alt={category.title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

  {/* Icon Badge */}
  <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white/30"
      style={{ backgroundColor: category.color }}
      data-aos="zoom-in"
    >
      <category.icon className="text-xl" />
    </div>
  </div>

  {/* Category Title Overlay */}
  <div className="absolute bottom-4 left-4 right-4">
    <h3
      className="text-xl font-bold text-white"
      data-aos="fade-up"
      data-aos-delay="50"
    >
      {category.title}
    </h3>
  </div>

  {/* ✨ Shine Effect */}
  <div className="shine"></div>

  {/* CSS for Shine */}
  <style jsx>{`
    .shine {
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewY(-10deg);
      pointer-events: none;
    }
    .group:hover .shine {
      animation: shineDown 1.8s ease forwards;
    }
    @keyframes shineDown {
      0% {
        top: -100%;
      }
      100% {
        top: 150%;
      }
    }
  `}</style>
</div>


              {/* Content */}
              <div className="p-6">
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start group/item"
                      data-aos="fade-right"
                      data-aos-delay={itemIndex * 50}
                    >
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* View More Button */}
                <div className="mt-6 pt-4 border-t border-amber-100">
                  <button className="flex items-center text-[#D4AF37] font-medium hover:text-amber-700 transition-colors duration-300 group/btn">
                    <span>Explore Course</span>
                    <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div 
          className="text-center mt-16 pt-8 border-t border-amber-200"
          data-aos="fade-up"
        >
          <p className="text-gray-700 mb-6">Ready to begin your Islamic learning journey?</p>
          <button className="bg-gradient-to-r from-[#D4AF37] to-amber-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto">
            <FaMosque className="mr-2" />
            Enroll Now
          </button>
          <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
            <FaPray className="mr-1" /> 
            Knowledge is light that guides to the right path
          </p>
        </div>
      </div>
    </section>
  );
}