import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PaymentModal from "../FeePlan/PaymentModal";

const ScienceObligatory = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const scienceData = {
    title: "Science in the Light of the Quran",
    subtitle: "Bridging Divine Revelation with Modern Discovery",
    description:
      "Explore how Quranic guidance inspires scientific curiosity — merging divine revelation with human intellect to understand the universe, nature, and life itself. This program connects spiritual knowledge with scientific research, helping you see science not as contradiction, but as confirmation of Allah’s signs.",
    features: [
      {
        icon: "🌍",
        title: "Earth & Creation",
        description:
          "Discover how the Quran describes mountains, seas, and balance on Earth — linking divine words with geological realities.",
      },
      {
        icon: "🌙",
        title: "Astronomy & Cosmos",
        description:
          "Study the Quranic mentions of stars, orbits, and cosmic expansion that align with modern astronomy.",
      },
      {
        icon: "💧",
        title: "Water & Life",
        description:
          "‘And We made from water every living thing’ — explore how life scientifically confirms this divine truth.",
      },
      {
        icon: "🧬",
        title: "Human Creation & Genetics",
        description:
          "Understand the Quranic stages of human creation through modern embryology and genetic studies.",
      },
    ],
  };

  const courses = [
    {
      id: 1,
      title: "1️ Quranic Cosmology & Modern Physics",
      highlight: "Understanding the Universe Through Revelation",
      description:
        "Dive deep into the Quranic verses that describe the cosmos — from the Big Bang to the expansion of the universe. Learn how revelation predates discovery, aligning divine guidance with astrophysical laws.",
      duration: "8 Weeks",
      level: "Intermediate – Advanced",
    },
    {
      id: 2,
      title: "2️ The Science of Human Creation",
      highlight: "Embryology, Genetics & the Quranic Process",
      description:
        "Uncover the divine precision in the stages of human creation mentioned in the Quran. This course bridges Quranic descriptions with modern embryology and molecular genetics for a holistic understanding of life.",
      duration: "6 Weeks",
      level: "Beginner – Intermediate",
    },
    {
      id: 3,
      title: "3️ Environmental Harmony in Islam",
      highlight: "Divine Balance Between Nature & Humanity",
      description:
        "Explore the Quran’s ecological wisdom — from sustainable living to the preservation of Earth’s balance. Learn how environmental science aligns with the Islamic responsibility of stewardship (Khilafah).",
      duration: "5 Weeks",
      level: "All Levels",
    },
  ];

  const handleEnroll = () => {
    setSelectedPlan({
      name: "Science in the Light of the Quran",
      fee: 35,
      duration: "8 weeks",
      sessions: "24",
    });
    setShowPaymentModal(true);
  };

  return (
    <section className="min-h-screen py-24 relative overflow-hidden bg-[#011C16]">
      {/* Ambient Glows */}
      <div className="absolute top-20 right-40 w-96 h-96 bg-[#0E7C5A]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-40 w-[30rem] h-[30rem] bg-[#B18E56]/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center px-5 py-2 rounded-full border border-[#B18E56]/40 bg-[#0E7C5A]/10 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 bg-[#B18E56] rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-[#B18E56] uppercase tracking-wider">
              Divine Knowledge Program
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 text-[#B18E56]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {scienceData.title}
          </motion.h1>
          <p className="text-xl text-[#CDE9D7] font-light mb-6 max-w-3xl mx-auto leading-relaxed">
            {scienceData.subtitle}
          </p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {scienceData.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {scienceData.features.map((feature, i) => (
            <motion.div
              key={i}
              className="group bg-[#052921] border border-[#0E7C5A]/40 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(14,124,90,0.3)] transition-all duration-500 hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-[#B18E56] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="w-0 h-1 mt-6 bg-[#0E7C5A] group-hover:w-full transition-all duration-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* --- New Section: Featured Courses --- */}
        <motion.div
          className="text-center max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#B18E56] mb-10">
            Featured Courses in Quranic Science
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-16">
            Unlock the depth of divine wisdom through science — where revelation
            inspires exploration, and knowledge strengthens faith. Each course
            is carefully designed for thinkers, seekers, and believers who wish
            to merge faith with factual understanding.
          </p>

          <div className="space-y-14 text-left">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="border-l-4 border-[#B18E56] pl-6 hover:pl-8 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-[#B18E56] mb-2">
                  {course.title}
                </h3>
                <h4 className="text-lg text-[#CDE9D7] italic mb-3">
                  {course.highlight}
                </h4>
                <p className="text-gray-300 text-base leading-relaxed mb-3">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <span className="bg-[#0E7C5A]/10 px-4 py-1 rounded-full border border-[#0E7C5A]/40">
                    Duration: {course.duration}
                  </span>
                  <span className="bg-[#B18E56]/10 px-4 py-1 rounded-full border border-[#B18E56]/40">
                    Level: {course.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enroll Button */}
        <div className="text-center mt-20">
          <motion.button
            onClick={handleEnroll}
            className="bg-[#0E7C5A] cursor-pointer text-white font-semibold py-4 px-12 rounded-full shadow-md hover:shadow-[#B18E56]/30 transition-all duration-300 hover:scale-105"
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now & Begin Your Journey
          </motion.button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        plan={selectedPlan} 
        currency={currency}
      />
    </section>
  );
};

export default ScienceObligatory;
