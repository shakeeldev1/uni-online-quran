import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaLaptop,
  FaBrain,
  FaMusic,
  FaChild,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight
} from "react-icons/fa";
import image4 from "../../assets/pexels-a-darmel-8164434.jpg";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [closingIndex, setClosingIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqData = [
    {
      question: "How to learn Norani Qaida?",
      answer:
        "Our Norani Qaida course is designed for beginners to learn the Arabic alphabet and basic pronunciation rules. We use interactive methods, visual aids, and gradual progression to ensure students master the fundamentals before moving to Quranic reading.",
      icon: <FaBook className="text-[#0C7655]" />,
    },
    {
      question: "How to learn Quran online effectively?",
      answer:
        "We provide structured one-on-one sessions with certified tutors, interactive learning materials, and regular assessments. Our platform allows flexible scheduling, progress tracking, and personalized learning paths tailored to each student's pace and goals.",
      icon: <FaLaptop className="text-[#0C7655]" />,
    },
    {
      question: "Why memorize (Hifz) the Holy Quran?",
      answer:
        "Memorizing the Quran brings immense spiritual rewards, strengthens faith, and provides lifelong guidance. It preserves the Quran in your heart, connects you with Islamic tradition, and earns blessings in this life and the hereafter.",
      icon: <FaBrain className="text-[#0C7655]" />,
    },
    {
      question: "What is Tajweed and why is it important?",
      answer:
        "Tajweed is the set of rules for correct pronunciation during Quran recitation. It ensures each letter is articulated properly, preserving the meaning and beauty of Allah's words. Proper Tajweed is essential for respectful and accurate Quran recitation.",
      icon: <FaMusic className="text-[#0C7655]" />,
    },
    {
      question: "How do you teach Tajweed to children?",
      answer:
        "We use child-friendly methods including visual aids, games, repetition, and positive reinforcement. Our teachers are specially trained to work with children, making learning enjoyable while ensuring proper technique through gradual, step-by-step instruction.",
      icon: <FaChild className="text-[#0C7655]" />,
    },
    {
      question: "What is Tafseer and when should I study it?",
      answer:
        "Tafseer is the scholarly interpretation and explanation of the Quran's meanings. We recommend starting Tafseer after establishing basic Quran reading skills. Our courses provide context, historical background, and deeper understanding of Quranic verses.",
      icon: <FaSearch className="text-[#0C7655]" />,
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setClosingIndex(index);
      setTimeout(() => {
        setActiveIndex(null);
        setClosingIndex(null);
      }, 300);
    } else {
      if (activeIndex !== null) {
        setClosingIndex(activeIndex);
        setTimeout(() => {
          setActiveIndex(index);
          setClosingIndex(null);
        }, 300);
      } else {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-emerald-50 to-amber-50  px-4 md:px-8 relative overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-[#0C7655] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-4" data-aos="zoom-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0C7655] to-[#D4AF37] rounded-lg blur opacity-20"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold text-[#0C7655] font-serif bg-white/80 px-6 py-3 rounded-lg">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>
          </div>
          <div
            className="w-24 h-1.5 bg-gradient-to-r from-[#0C7655] to-[#D4AF37] mx-auto mb-6 rounded-full"
            data-aos="zoom-in"
          ></div>
          <p
            className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
          >
            Find answers to common questions about our Quranic education
            programs. We're here to guide you on your spiritual learning journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Enhanced FAQ List */}
          <div className="lg:w-1/2 w-full space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl border border-white/50"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <button
                  className={`w-full text-left p-6 bg-white/90 hover:bg-white transition-all duration-300 flex justify-between items-center group ${activeIndex === index ? "rounded-t-2xl bg-white" : "rounded-2xl"
                    }`}
                  onClick={() => toggleFAQ(index)}
                  data-aos=""
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl" data-aos="zoom-in">
                        {faq.icon}
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-lg md:text-xl text-gray-800 group-hover:text-[#0C7655] transition-colors duration-300"
                      data-aos=""
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4 min-w-[24px] flex items-center justify-center">
                    {activeIndex === index ? (
                      <FaChevronUp className="text-[#D4AF37] text-lg transition-transform duration-300" />
                    ) : (
                      <FaChevronDown className="text-[#0C7655] text-lg transition-transform duration-300 group-hover:text-[#D4AF37]" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeIndex === index
                      ? "max-h-screen opacity-100"
                      : closingIndex === index
                        ? "max-h-0 opacity-0"
                        : "max-h-0 opacity-0"
                    }`}
                  style={{
                    transition:
                      activeIndex === index
                        ? "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out 0.1s"
                        : "max-height 0.5s ease-in-out, opacity 0.2s ease-in-out",
                  }}
                >
                  <div
                    className="p-6 bg-white/80 border-t border-emerald-100/50 rounded-b-2xl"
                    data-aos="fade-up"
                  >
                    <p className="text-gray-600 leading-relaxed" data-aos="fade-up">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Right Column (Image + Support) */}
          <div className="lg:w-1/2 w-full" data-aos="fade-left">
            <div className="relative group" data-aos="zoom-in-up">
              <div className="shine-wrapper rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    alt="Quran learning illustration"
                    className="w-full h-auto rounded-2xl transform transition-transform duration-700 "
                    src={image4}
                    data-aos="flip-left"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* ✨ Shine effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="shine"></div>
                  </div>
                </div>

                {/* Shine CSS */}
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
      animation: shineDown 2s ease forwards;
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


              {/* Enhanced hover element */}
              <div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0"
                data-aos="fade-up"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0C7655] to-[#D4AF37] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <FaArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Additional info card */}
              <div className="absolute -bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-xs transform transition-transform duration-500 group-hover:-translate-y-2">
                <h4 className="font-bold text-[#0C7655] text-lg mb-2">Need More Help?</h4>
                <p className="text-gray-600 text-sm mb-3">Our support team is available 24/7 to answer your questions.</p>
                <button className="text-sm font-medium text-[#D4AF37] hover:text-[#0C7655] transition-colors duration-300 flex items-center">
                  Contact Support <FaArrowRight className="ml-1 text-xs" />
                </button>
              </div>
            </div>

            {/* Additional info section */}
            <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="font-bold text-xl text-[#0C7655] mb-3">Still Have Questions?</h3>
              <p className="text-gray-600 mb-4">We understand that every learner's journey is unique. If you have specific questions not covered here, don't hesitate to reach out.</p>
              <div className="flex flex-wrap gap-3">
                <Link to='/contact'>
                  <button className="px-4 py-2 bg-[#0C7655] text-white rounded-lg text-sm font-medium hover:bg-[#0a5e44] transition-colors duration-300">
                    Contact Us
                  </button>
                </Link>
                {/* <button className="px-4 py-2 bg-gradient-to-r from-[#0C7655] to-[#D4AF37] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-300">
                  Schedule a Call
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;