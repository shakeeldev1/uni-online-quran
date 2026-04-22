import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pad1 from '../../Images/noraniQaida.pdf'

import { UserRound, Clock, Baby } from "lucide-react"; // icons
import { Link } from "react-router-dom";
import PaymentModal from "../FeePlan/PaymentModal";

const NoraaniQaida = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleEnroll = () => {
    setSelectedPlan({
      name: "Norani Qaida Course",
      fee: 35,
      duration: "8 weeks",
      sessions: "24",
    });
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen py-6 px-6 md:px-12 font-serif">
      {/* Page Heading */}
      <h1
        className="text-4xl md:text-5xl font-bold text-[#B08B53] mb-14 text-center tracking-wide"
        data-aos="fade-down"
      >
        Learn Norani Qaida
      </h1>

      {/* Main Intro Section */}
      <div
        className="max-w-7xl mx-auto rounded-3xl py-1 overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 p-6 "
        data-aos="fade-up"
      >
        {/* Image Section (Hover effect only on image) */}
        <div
          className="md:w-1/2 flex flex-col items-center"
          data-aos="zoom-in"
        >
          <div className="relative overflow-hidden rounded-2xl w-full group">
            <div className="flex flex-col">
              <img
                src="https://www.knowledgequran.com/wp-content/uploads/2024/02/32febf4b-01cf-4b4e-b025-927d27add271.jpg"
                alt="Norani Qaida"
                className="w-full h-[550px] object-cover rounded-2xl transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-all duration-700 rounded-2xl"></div>

            </div>


            {/* Enroll Button Below Image */}

          </div>


        </div>

        {/* Content Section */}
        <div
          className="md:w-1/2 flex flex-col justify-center text-gray-800 space-y-8"
          data-aos="fade-left"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#0C6A4D] mb-3">
              Introduction
            </h2>
            <p className="text-lg leading-relaxed">
              The <strong>Norani Qaida Course</strong> is the foundation for
              anyone who wishes to learn how to read the Quran fluently. It
              introduces Arabic letters, pronunciation, and Tajweed rules in a
              simple, structured, and effective way — perfect for both children
              and adults starting their Quranic journey.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#0C6A4D] mb-3">
              Why It’s Important
            </h2>
            <p className="text-lg leading-relaxed">
              Learning Norani Qaida builds the base for correct Quran recitation.
              By mastering these basics, students can recognize every Arabic
              letter, understand its sound, and pronounce words accurately. This
              skill enhances fluency and brings confidence when reading the Quran.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#0C6A4D] mb-3">
              Learn From Anywhere
            </h2>
            <p className="text-lg leading-relaxed">
              Our certified tutors make learning flexible and personalized.
              Through online sessions on <strong>Zoom</strong> or
              <strong> Skype</strong>, students can join from any country and
              learn at their own pace. Our interactive lessons make every class
              engaging and effective — no matter your age or background.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <button
              onClick={handleEnroll}
              className="bg-[#B08B53] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md 
               hover:bg-[#09573E] hover:scale-105 transition-all duration-300 cursor-pointer"
              data-aos="zoom-in-up"
            >
              Start Learning Now
            </button>

            <a
              href={pad1}
              download
              className="bg-[#09573E] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md 
               hover:bg-[#B08B53] hover:scale-105 transition-all duration-300 cursor-pointer 
               flex items-center justify-center"
              data-aos="zoom-in-up"
            >
              Download Qaida
            </a>
          </div>

        </div>
      </div>

      {/* Info Cards Section */}
      <div className="py-5 px-6 sm:px-12 lg:px-20">
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div
            className="relative bg-white rounded-tr-[80px] shadow-xl overflow-hidden border border-emerald-200 hover:shadow-2xl transition-transform transform group"
            data-aos="zoom-in"
          >
            <div className="overflow-hidden relative">
              <img
                src="https://img.freepik.com/premium-photo/muslim-boy-student-studying-online-computer-laptop_1292429-5315.jpg"
                alt="Online Quran Teacher"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
            </div>
            <div className="p-7 space-y-3 relative">
              <h2 className="text-2xl font-semibold text-emerald-700 flex items-center gap-2">
                You Can Get Your Own Teacher
              </h2>
              <p className="text-[#B08B53] text-base leading-relaxed">
                Learn comfortably at home with your personal Quran tutor who will
                guide you step-by-step through every lesson with patience and care.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div
            className="relative bg-white rounded-tr-[80px] shadow-xl overflow-hidden border border-emerald-100 hover:shadow-2xl transition-transform transform group"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="overflow-hidden relative">
              <img
                src="https://thumbs.dreamstime.com/b/computer-room-medrese-little-boy-sitting-front-monitor-computer-islamic-culture-centre-computer-room-275207822.jpg"
                alt="Class Duration"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
            </div>
            <div className="p-7 space-y-3 relative">
              <h2 className="text-2xl font-semibold text-emerald-700 flex items-center gap-2">

                How Long Are Classes?
              </h2>
              <p className="text-[#B08B53] text-base leading-relaxed">
                Each class lasts between 20–30 minutes, designed to keep students
                focused and engaged without feeling overwhelmed. Duration can be
                adjusted to your schedule for maximum flexibility.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="relative bg-white rounded-tr-[80px] shadow-xl overflow-hidden border border-emerald-100 hover:shadow-2xl transition-transform transform  group"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="overflow-hidden relative">
              <img
                src="https://hafizon.com/wp-content/uploads/Best-Online-Quran-Classes-for-Kids-Teens-Adults-Seniors-%E2%80%93-Affordable-Flexible-Certified-Global-Tutors.png"
                alt="Starting Age"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
            </div>
            <div className="p-7 space-y-3 relative">
              <h2 className="text-2xl font-semibold text-emerald-700 flex items-center gap-2">

                What Age Can I Start?
              </h2>
              <p className="text-[#B08B53] text-base leading-relaxed">
                Children as young as 4 can begin! We also welcome beginners of all
                ages who wish to strengthen their Quran foundation in a supportive,
                peaceful environment.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        plan={selectedPlan} 
        currency={currency}
      />
    </div>
  );
};

export default NoraaniQaida;
