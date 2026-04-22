import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaBook, 
  FaCalendarCheck, 
  FaSync, 
  FaTimes,
  FaStar,
  FaUsers,
  FaGraduationCap,
  FaQuran,
  FaClock,
  FaChartLine,
  FaPlay,
  FaCheckCircle
} from "react-icons/fa";

export default function HifzSection() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Customized Hifz Plans",
      desc: "Personalized memorization schedules crafted to suit each student's pace and ability.",
      more: "Each student gets a structured plan tailored by qualified teachers, focusing on memorization, revision, and fluency to ensure long-term retention. Our plans include daily targets, revision cycles, and periodic assessments.",
      icon: FaBook,
      stats: { students: "1000+", success: "95%", duration: "Flexible" }
    },
    {
      title: "Daily/Weekly Tracking",
      desc: "Stay consistent with structured tracking tools ensuring steady memorization progress.",
      more: "Track your progress through digital and teacher-assisted monitoring tools that help you stay motivated and disciplined throughout your journey. Receive detailed reports and personalized feedback.",
      icon: FaCalendarCheck,
      stats: { students: "850+", success: "92%", duration: "Ongoing" }
    },
    {
      title: "Special Revision Sessions",
      desc: "Strengthen your memory with guided revision lessons to retain and perfect memorization.",
      more: "Our revision sessions are designed to reinforce previously memorized portions, ensuring accuracy and confidence in every recitation. Advanced techniques for long-term memory retention.",
      icon: FaSync,
      stats: { students: "1200+", success: "98%", duration: "Regular" }
    },
  ];

  const programBenefits = [
    { icon: FaStar, text: "Certified Hifz Teachers" },
    { icon: FaClock, text: "Flexible Timings" },
    { icon: FaChartLine, text: "Progress Reports" },
    { icon: FaUsers, text: "Small Group Sessions" },
    { icon: FaGraduationCap, text: "Ijazah Certification" },
    { icon: FaQuran, text: "Tajweed Integration" },
  ];

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-amber-50 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full -translate-y-36 translate-x-36"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full translate-y-48 -translate-x-48"></div>

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
            <FaQuran className="text-[#D4AF37] text-sm" />
            <span className="text-[#D4AF37] text-sm font-medium">Memorization Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Quran <span className="text-[#D4AF37]">Memorization</span> (Hifz Program)
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your spiritual journey with our structured Hifz program designed for lasting memorization and deep connection with the Quran
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedFeature(item)}
              >
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl p-6 lg:p-8 border-2 border-transparent group-hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Stats Preview */}
                  <div className="flex justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <span>{item.stats.students} Students</span>
                    <span>{item.stats.success} Success</span>
                    <span>{item.stats.duration}</span>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute top-18 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <FaPlay className="text-white text-sm ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Program Benefits */}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {programBenefits.map((benefit, index) => {
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
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#D4AF37] transition-colors duration-300">
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
          <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3">
            Start Your Hifz Journey
            {/* <FaPlay className="text-white text-sm" /> */}
          </button>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {selectedFeature.icon && React.createElement(selectedFeature.icon, { className: "text-2xl" })}
                  </div>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    <FaTimes className="text-white text-sm" />
                  </button>
                </div>
                <h3 className="text-xl font-bold">{selectedFeature.title}</h3>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedFeature.more}
                </p>

                {/* Stats in Modal */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#D4AF37]">{selectedFeature.stats.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#D4AF37]">{selectedFeature.stats.success}</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#D4AF37]">{selectedFeature.stats.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#B8941F] transition-colors duration-300 flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-white" />
                  Enroll in Program
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}