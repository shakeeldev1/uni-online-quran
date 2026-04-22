import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaClock, FaUsers, FaCalendarAlt, FaBolt, FaGlobe, FaUserTie, FaGraduationCap } from "react-icons/fa";

export default function FlexibleSchedule() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      icon: FaClock,
      title: "24/7 Availability",
      desc: "Round-the-clock access for all time zones with flexible timing options.",
      bgColor: "bg-[#D4AF37]"
    },
    {
      icon: FaUsers,
      title: "Personalized Attention",
      desc: "One-on-one classes tailored to your learning pace and requirements.",
      bgColor: "bg-[#D4AF37]"
    },
    {
      icon: FaCalendarAlt,
      title: "Ideal for Busy Lives",
      desc: "Perfect for students, professionals, and working individuals.",
      bgColor: "bg-[#D4AF37]"
    },
  ];

  return (
    <section className="relative py-20 px-6 lg:px-12 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-down"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
            data-aos="zoom-in"
          >
            <FaBolt className="text-lg" />
            <span>Always Available • Flexible Timing</span>
          </motion.div>

          {/* Main Heading */}
          <h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            data-aos="fade-up"
          >
            Learn At Your <span className="text-[#D4AF37]">Own Pace</span>
          </h2>

          {/* Divider */}
          <div 
            className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-amber-200 mx-auto rounded-full mb-6"
            data-aos="fade-right"
          ></div>

          <p 
            className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            Flexible Quran learning schedule that adapts to your busy lifestyle - learn anytime, anywhere in the world
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div 
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-[#D4AF37]/40 shadow-2xl hover:shadow-xl transition-all duration-300"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 100}
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* Icon Container */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div 
                      className={`w-20 h-20 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      data-aos="zoom-in"
                    >
                      <IconComponent className="text-3xl text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
              <FaGlobe className="text-2xl text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Global Access</h4>
              <p className="text-gray-300 text-sm">Available for students worldwide in all time zones</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
              <FaUserTie className="text-2xl text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Expert Teachers</h4>
              <p className="text-gray-300 text-sm">Qualified instructors available round the clock</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
          data-aos="zoom-in"
        >
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-[#D4AF37] to-amber-300 text-black font-bold py-4 px-12 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-300"></div>
              
              {/* Button Content */}
              <span className="relative flex items-center gap-3 text-lg text-nowrap">
                <FaGraduationCap className="text-xl" />
                Book Your Free Trial Class
              </span>
            </motion.button>
          </Link>
          
          {/* Additional Text */}
          <p className="text-gray-400 text-sm mt-4" data-aos="fade-up" data-aos-delay="200">
            No credit card required • 30-minute session • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}