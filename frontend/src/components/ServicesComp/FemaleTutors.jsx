import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaUser,
  FaShieldAlt,
  FaClock,
  FaHeart,
  FaChalkboardTeacher,
  FaUsers,
  FaGraduationCap,
  FaStar,
  FaPlay,
  FaCheckCircle,
  FaLock,
  FaChild,
  FaSmile
} from "react-icons/fa";

export default function FemaleTutors() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      icon: FaChalkboardTeacher,
      title: "Certified Female Teachers",
      description: "Specialized female tutors exclusively for sisters and children with proper Islamic guidelines",
      stats: "50+ Qualified Tutors"
    },
    {
      icon: FaLock,
      title: "Private & Comfortable",
      description: "Secure and comfortable learning environment ensuring privacy and focused study",
      stats: "100% Privacy Guaranteed"
    },
    {
      icon: FaClock,
      title: "Flexible Timings",
      description: "Schedule classes around your daily routine, household, and personal commitments",
      stats: "24/7 Availability"
    },
    {
      icon: FaHeart,
      title: "Supportive Approach",
      description: "Caring and patient teaching methodology tailored for female learners of all ages",
      stats: "95% Satisfaction Rate"
    },
  ];

  const benefits = [
    { icon: FaGraduationCap, text: "Ijazah Certified" },
    { icon: FaChild, text: "Kids Specialist" },
    { icon: FaUsers, text: "Group Sessions" },
    { icon: FaStar, text: "5-Star Rated" },
    { icon: FaCheckCircle, text: "Progress Tracking" },
    { icon: FaSmile, text: "Patient Teaching" },
  ];

  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.equranschool.com/images/female-quran-tutor.jpg"
          alt="Female Quran Tutor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-full font-semibold mb-6 shadow-2xl"
          >
            <FaUser className="text-lg" />
            <span>Exclusive for Sisters & Children</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Professional <span className="text-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">Female Quran Tutors</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn from certified female teachers in a comfortable, private, and supportive environment designed specifically for sisters and young learners
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-[#D4AF37] transition-all duration-300 h-full text-center relative overflow-hidden">
                  
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="text-black text-2xl" />
                    </div>
                    
                    <h3 className="text-lg lg:text-xl font-bold text-[#D4AF37] mb-3 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="text-xs text-[#D4AF37] font-semibold bg-black/30 px-3 py-1 rounded-full inline-block">
                      {feature.stats}
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaStar className="text-[#D4AF37] text-sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl p-8 lg:p-12 mb-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8">
            Why Choose <span className="text-[#D4AF37]">Female Tutors?</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="text-black text-lg" />
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors duration-300">
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
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Start Your Quran Journey with Female Tutors
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join our community of sisters and children learning Quran in a comfortable, private, and supportive environment tailored for female learners
              </p>
            </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start">
  <Link to="/contact" className="w-full sm:w-auto">
    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
      Connect with a Female Tutor
    </button>
  </Link>

  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
    <FaStar className="text-sm" />
    Free Trial Class
  </button>
</div>


            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-6 border-t border-gray-700"
            >
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                Certified female teachers
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                Complete privacy guaranteed
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                Flexible scheduling options
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-4 h-4 bg-[#D4AF37] rounded-full opacity-30"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 w-3 h-3 bg-[#D4AF37] rounded-full opacity-40"
      ></motion.div>
    </section>
  );
}