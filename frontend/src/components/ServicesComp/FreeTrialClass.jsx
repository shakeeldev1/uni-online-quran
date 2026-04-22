import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaShieldAlt,
  FaCheckCircle,
  FaPlay,
  FaGift,
  FaCertificate,
  FaChalkboardTeacher,
  FaRegSmileBeam
} from "react-icons/fa";

export default function FreeTrialClass() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const benefits = [
    {
      icon: FaChalkboardTeacher,
      title: "Meet Your Teacher",
      desc: "Get matched with a certified Quran teacher who understands your learning goals",
    },
    {
      icon: FaClock,
      title: "Flexible Timing",
      desc: "Choose class times that perfectly fit your schedule and lifestyle",
    },
    {
      icon: FaCalendarAlt,
      title: "No Commitment",
      desc: "Continue only if you're completely satisfied with the teaching style",
    },
  ];

  const trialFeatures = [
    { icon: FaCheckCircle, text: "30-minute personalized session" },
    { icon: FaCheckCircle, text: "Level assessment & learning plan" },
    { icon: FaCheckCircle, text: "Interactive teaching methods" },
    { icon: FaCheckCircle, text: "Q&A with teacher" },
  ];

  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#AC7D40] via-[#0E7C5A] to-gray-800 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full translate-x-32 translate-y-32"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
            <FaGift className="text-[#D4AF37] text-sm" />
            <span className="text-[#D4AF37] text-sm font-medium">Limited Time Offer</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text ">
              3-Day Free Trial
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience our premium Quran teaching style with zero obligation and discover why thousands choose us
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {benefits.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 p-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#D4AF37] mb-2 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/30 rounded-2xl p-6 border border-[#D4AF37]/10"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaCertificate className="text-[#D4AF37]" />
                What's Included:
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {trialFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconComponent className="text-[#D4AF37] text-sm flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Card */}
            <div className=" rounded-2xl p-8 border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
              
              {/* Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              
              {/* Price Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r mt-2 from-[#D4AF37] to-[#F4D03F] text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                  FREE TRIAL
                </div>
              </div>

              <div className="text-center pt-4">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <FaRegSmileBeam className="text-black text-3xl" />
                </div>
                
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
                  Start Your Journey Today
                </h2>
                
                {/* Pricing Comparison */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <span className="text-white">Regular Price</span>
                    <span className="text-lg line-through text-white">$25/class</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <span className="text-white">Trial Offer</span>
                    <span className="text-2xl font-bold text-white">FREE</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-white">Classes Included</span>
                    <span className="text-white font-semibold">3 Sessions</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to="/contact">
                  <button className="w-full py-4 text-lg bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 mb-4">
                    {/* <FaPlay className="text-black text-sm" /> */}
                    Claim Your Free Trial
                  </button>
                </Link>
                
                <p className="text-sm text-white flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-[#D4AF37]" />
                  No credit card required • 100% Risk-Free
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-4 right-4 opacity-20">
                <FaStar className="text-[#D4AF37] text-4xl" />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -left-2 w-6 h-6 bg-[#D4AF37] rounded-full opacity-60"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#D4AF37] rounded-full opacity-40"
            ></motion.div>
          </motion.div>
        </div>

        {/* Bottom Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-gray-800"
        >
          <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 px-6 py-3 rounded-2xl border border-[#D4AF37]/30">
            <FaShieldAlt className="text-[#D4AF37] text-xl" />
            <div>
              <div className="text-[#D4AF37] font-semibold">100% Satisfaction Guarantee</div>
              <div className="text-white text-sm">Love it or pay nothing - no questions asked</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}