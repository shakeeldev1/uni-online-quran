import React, { useEffect } from "react";
import { FaUserPlus, FaChalkboardTeacher, FaComments, FaAward } from "react-icons/fa";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const TeachingMethod = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-4xl text-[#AC7D40]" />,
      title: "Step 1: Registration",
      desc: "Students register through our website or WhatsApp. We collect details such as age, time zone, and preferred schedule.",
      aos: "fade-right"
    },
    {
      id: 2,
      icon: <FaComments className="text-4xl text-[#AC7D40]" />,
      title: "Step 2: Free Trial Class",
      desc: "We provide a free trial session to introduce our teaching style and ensure student comfort.",
      aos: "fade-up"
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher className="text-4xl text-[#AC7D40]" />,
      title: "Step 3: Teacher Assignment",
      desc: "Based on the student’s level and preference, we assign a qualified Quran teacher.",
      aos: "fade-left"
    },
    {
      id: 4,
      icon: <MdOutlineLaptopChromebook className="text-4xl text-[#AC7D40]" />,
      title: "Step 4: Online Classes",
      desc: "Regular online Quran sessions begin through Zoom or Skype, with focus on Tajweed, memorization, and recitation.",
      aos: "zoom-in-up"
    },
    {
      id: 5,
      icon: <FaAward className="text-4xl text-[#AC7D40]" />,
      title: "Step 5: Progress & Certification",
      desc: "We track student progress and provide certificates upon successful course completion.",
      aos: "flip-left"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#AC7D40] to-[#0E7C5A] min-h-screen py-16 px-4 overflow-hidden">
      <div
        className="max-w-4xl mx-auto text-center mb-16"
        data-aos="zoom-in"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#EBC693]"
        >
          Our Online Quran Teaching Procedure
        </h1>
        <p className="mt-5 text-lg md:text-xl text-white/80 font-medium">
          We follow a structured process to ensure smooth learning for every student.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group bg-white backdrop-blur-lg border-2 border-[#EBC693] shadow-xl rounded-2xl px-8 py-10 flex flex-col items-center text-center  hover:border-[#fac093]  hover:shadow-2xl transition-all duration-300"
            data-aos={step.aos}
            data-aos-delay={index * 150}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-4 bg-gradient-to-br from-[] via-white to-[#AC7D40] shadow-lg group-hover:rotate-12 transition-all duration-300">
              {step.icon}
            </span>
            <h2 className="pt-8 text-xl font-bold text-[#3a291c] mb-3 drop-shadow">
              {step.title}
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingMethod;