import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import madani from '../../Images/madani.jpg'
import pad from '../../Images/noraniQaida.pdf'
import { BookOpen, Globe2, MonitorCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentModal from "../FeePlan/PaymentModal";

const MadaniQaida = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleEnroll = () => {
    setSelectedPlan({
      name: "Madani Qaida Course",
      fee: 35,
      duration: "8 weeks",
      sessions: "24",
    });
    setShowPaymentModal(true);
  };

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 font-serif">
      {/* Page Title */}
      <h1
        className="text-4xl md:text-5xl font-bold text-center text-[#B08B53] mb-10 tracking-wide"
        data-aos="fade-down"
      >
        Learn <span className="text-emerald-700">Madani Qaida</span>
      </h1>

      {/* Large Description */}
      <p
        className="max-w-4xl mx-auto text-center text-lg md:text-xl text-gray-700 leading-relaxed mb-16"
        data-aos="fade-up"
      >
        The <strong>Madani Qaida</strong> is your first step toward mastering the
        sacred art of Quranic recitation. With expert guidance, you’ll learn
        Tajweed, correct pronunciation, and the spiritual essence of each verse —
        creating a deep connection with the Divine words.
      </p>

      {/* Info Section with Divider Line */}
      <div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 relative"
        data-aos="fade-up"
      >
        {/* Left Text Section */}
        <div
          className="md:w-1/2 space-y-8 bg-[#0C6A4D] text-white p-10 rounded-3xl shadow-xl relative"
          data-aos="fade-right"
        >
          {[
            {
              title: "Personalized Learning Path",
              desc: "Our teachers customize your lessons according to your pace and level, ensuring that every concept is understood with clarity and confidence.",
            },
            {
              title: "Learn with Ease and Comfort",
              desc: "Enjoy structured online classes that fit your daily routine. Learn peacefully from your home while staying spiritually connected.",
            },
            {
              title: "Build a Strong Quranic Foundation",
              desc: "Master the basics of Tajweed and gain fluency in recitation, preparing you for lifelong spiritual excellence and Quranic proficiency.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 hover:bg-white/20 transition-all duration-500 p-5 rounded-2xl cursor-pointer border-l-4 border-[#B08B53]"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <h2 className="text-2xl font-semibold mb-2 text-[#FFD580]">
                {item.title}
              </h2>
              <p className="text-lg leading-relaxed text-emerald-50">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[3px] h-[90%] bg-[#B08B53] rounded-full"></div>

        {/* Right Image Section */}
        <div
          className="relative w-full md:w-1/2 flex flex-col items-center"
          data-aos="zoom-in"
        >
          {/* Buttons Above Image */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            data-aos="fade-up"
          >
            <button
              onClick={handleEnroll}
              className="bg-[#B08B53] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md 
                         hover:bg-[#09573E] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Start Learning Now
            </button>

            <a
              href={pad}
              download
              className="bg-[#09573E] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md 
                         hover:bg-[#B08B53] hover:scale-105 transition-all duration-300 cursor-pointer 
                         flex items-center justify-center"
            >
              Download Qaida
            </a>
          </div>

          {/* Quran Image */}
          <div className="relative w-full overflow-hidden rounded-3xl shadow-lg group">
            <img
              src={madani}
              alt="Madani Qaida Learning"
              className="w-full h-[550px] object-cover rounded-3xl transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-all duration-700 rounded-3xl"></div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div
        className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        data-aos="fade-up"
      >
        {[
          {
            title: "Who Will Teach Me?",
            desc: "Our certified Quran tutors are professionals in Tajweed and Arabic phonetics, offering one-on-one mentorship with care and dedication.",
            icon: <BookOpen className="w-12 h-12 text-emerald-600" />,
            bg: "bg-emerald-50",
          },
          {
            title: "Multilingual Teachers",
            desc: "You can learn in English, Urdu, or Arabic — we ensure everyone across the world can access authentic Quranic learning easily.",
            icon: <Globe2 className="w-12 h-12 text-emerald-600" />,
            bg: "bg-emerald-100",
          },
          {
            title: "How Do Online Classes Work?",
            desc: "Classes are conducted live via Zoom or Google Meet with screen sharing, recitation practice, and real-time corrections by teachers.",
            icon: <MonitorCheck className="w-12 h-12 text-emerald-600" />,
            bg: "bg-emerald-50",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`${card.bg} rounded-3xl shadow-lg p-10 text-center hover:shadow-2xl group`}
            data-aos="zoom-in"
            data-aos-delay={i * 150}
          >
            <div className="flex justify-center mb-4 transition-transform duration-700 group-hover:scale-110">
              {card.icon}
            </div>
            <h3 className="text-2xl font-semibold text-[#B08B53] mb-3">
              {card.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
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

export default MadaniQaida;
