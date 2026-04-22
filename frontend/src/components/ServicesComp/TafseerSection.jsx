import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaBook,
  FaUserGraduate,
  FaLightbulb,
  FaQuran,
  FaLanguage,
  FaHistory,
  FaUsers,
  FaStar,
  FaPlay,
  FaCheckCircle
} from "react-icons/fa";

export default function TafseerSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Word-by-Word Translation",
      desc: "Understand the Quran deeply with translations in both Urdu and English, explained clearly for learners.",
      more: "Our detailed word-by-word translation helps you understand the literal meaning of each Arabic word, making it easier to comprehend the divine message.",
      img: "https://images.pexels.com/photos/3074209/pexels-photo-3074209.jpeg",
      icon: FaLanguage,
      stats: { students: "2000+", languages: "2", accuracy: "100%" }
    },
    {
      title: "Detailed Tafseer",
      desc: "Learn the wisdom of the Quran with comprehensive Tafseer taught by certified scholars.",
      more: "Study authentic Tafseer from renowned scholars to understand the context, reasons of revelation, and deeper meanings of Quranic verses.",
      img: "https://media.istockphoto.com/id/2159138944/photo/boy-recite-the-quran.webp?a=1&b=1&s=612x612&w=0&k=20&c=JFx8vUUYC1FfMEVjulBXtdom-RuWjRjTdwl-Wiqa6ME=",
      icon: FaUserGraduate,
      stats: { scholars: "Certified", depth: "Comprehensive", sources: "Authentic" }
    },
    {
      title: "Context & Wisdom",
      desc: "Discover the context, wisdom, and lessons of verses to apply them in daily life effectively.",
      more: "Learn the historical context and practical wisdom behind each verse to apply Quranic teachings in your daily life and modern situations.",
      img: "https://images.pexels.com/photos/9127603/pexels-photo-9127603.jpeg",
      icon: FaLightbulb,
      stats: { lessons: "Practical", application: "Daily Life", wisdom: "Timeless" }
    },
  ];

  const benefits = [
    { icon: FaBook, text: "Authentic Sources" },
    { icon: FaHistory, text: "Historical Context" },
    { icon: FaUsers, text: "Group Discussions" },
    { icon: FaStar, text: "Certified Teachers" },
    { icon: FaCheckCircle, text: "Practical Application" },
    { icon: FaQuran, text: "Quranic Wisdom" },
  ];

  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-white to-gray-50 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full translate-x-32 translate-y-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
            <FaBook className="text-[#D4AF37] text-sm" />
            <span className="text-[#D4AF37] text-sm font-medium">Quranic Understanding</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Translation & <span className="text-[#D4AF37]">Tafseer Sessions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deepen your connection with the Quran through comprehensive translation and authentic Tafseer sessions with certified scholars
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-12 lg:mb-16">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#D4AF37] h-full">
                  
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden rounded-xl group">
  {/* Image */}
  <img
    src={item.img}
    alt={item.title}
    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

  {/* Icon Overlay */}
  <div className="absolute top-4 right-4">
    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center shadow-lg">
      <IconComponent className="text-white text-lg" />
    </div>
  </div>

  {/* Index Badge */}
  <div className="absolute top-4 left-4 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
    <span className="text-white text-sm font-bold">{index + 1}</span>
  </div>

  {/* Shine Effect */}
  <div className="absolute inset-0 overflow-hidden rounded-xl">
    <div className="shine"></div>
  </div>

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
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      {Object.entries(item.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="font-semibold text-[#D4AF37]">{value}</div>
                          <div className="capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connecting Line for Desktop */}
                {index < features.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2">
                    <div className="w-10 h-0.5 bg-[#D4AF37]/30 relative">
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 border-r-2 border-b-2 border-[#D4AF37] rotate-45"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#D4AF37]/5 to-amber-50 rounded-2xl p-8 lg:p-12 border border-[#D4AF37]/20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
            Program <span className="text-[#D4AF37]">Benefits</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
                    {benefit.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3">
              Start Tafseer Sessions
              {/* <FaPlay className="text-white text-sm" /> */}
            </button>
            <button className="px-10 sm:px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300 inline-flex items-center gap-3">
              Free Trial Class
              <FaStar className="text-sm" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}