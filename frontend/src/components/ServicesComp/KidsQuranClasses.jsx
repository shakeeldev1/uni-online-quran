import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBook, FaGamepad, FaStar, FaChild, FaSmile } from "react-icons/fa";

export default function KidsQuranClasses() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Fun & Interactive Lessons",
      desc: "Specially designed lessons with stories, visuals, and activities that make learning enjoyable for kids.",
      icon: FaGamepad,
      color: "bg-[#D4AF37]"
    },
    {
      title: "Activities & Quizzes",
      desc: "Engaging exercises and quizzes to help children learn faster and stay motivated throughout their journey.",
      icon: FaStar,
      color: "bg-[#D4AF37]"
    },
    {
      title: "Noorani Qaida & Beginner Tajweed",
      desc: "Focus on Noorani Qaida and simple Tajweed rules to give children the right foundation in Quran reading.",
      icon: FaBook,
      color: "bg-[#D4AF37]"
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <div className="inline-flex items-center gap-3 mb-4" data-aos="zoom-in">
            <FaChild className="text-3xl text-[#D4AF37]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
              Kids Quran Classes
            </h2>
            <FaSmile className="text-3xl text-[#D4AF37]" />
          </div>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-200 mx-auto rounded-full mb-6" data-aos="fade-right"></div>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up">
            Engaging and interactive Quran learning designed specifically for children with fun activities and qualified teachers
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
            data-aos="fade-right"
          >
            <div className="relative group" data-aos="zoom-in">
  {/* Outer Glow */}
  <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-amber-200 rounded-2xl blur-lg opacity-30"></div>

  {/* Image Container */}
  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <img
      src="https://media.istockphoto.com/id/2199040166/photo/a-muslim-child-girl-reading-a-quran-inside-the-mosque.webp?a=1&b=1&s=612x612&w=0&k=20&c=LeP_B3pGJroJRkvdgDHnk6tjMMY_iCWcM-59SlD5Kok="
      alt="Child learning Quran"
      className="w-full h-[450px] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

    {/* Shine Effect */}
    <div className="shine"></div>
  </div>

  {/* Shine Animation CSS */}
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

          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
            data-aos="fade-left"
          >
            <div className="space-y-6">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div 
                      className="flex items-start gap-6 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group-hover:border-[#D4AF37]/20"
                      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    >
                      {/* Icon Container */}
                      <div className="relative">
                        <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="text-2xl text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[#D4AF37] font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-[#D4AF37] to-amber-200 rounded-xl shadow-lg"
              data-aos="fade-up"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <FaChild className="text-2xl text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Specialized for Kids</h4>
                  <p className="text-white/90 text-sm">Age-appropriate teaching methods and friendly instructors</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}