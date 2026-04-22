import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBookQuran } from "react-icons/fa6";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import PaymentModal from "../../FeePlan/PaymentModal";

export default function NazraHeader() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const handleEnroll = () => {
    setSelectedPlan({
      name: "Nazra Quran with Tajweed",
      fee: 35,
      duration: "8 weeks",
      sessions: "24",
    });
    setShowPaymentModal(true);
  };

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:"url('https://img.freepik.com/premium-photo/koran-holy-book-muslims-public-item-all-muslims-table_44074-502.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 max-w-3xl"
      >
        

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Learn <span className="text-[#AC7D40]">Nazra Quran</span> with Tajweed
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          Begin your journey to recite the Holy Quran beautifully and accurately with expert tutors guiding you step-by-step.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleEnroll}
            className="bg-[#0E7C5A] hover:bg-transparent hover:border-[#0E7C5A] border  border-[#0E7C5A] text-white px-8 py-3 rounded-full font-medium shadow-lg transition cursor-pointer"
          >
            Start Free Trial
          </button>
          <Link
            to="/services"
            className="flex items-center gap-2 border border-white/70 hover:border-[#AC7D40] hover:text-[#AC7D40] px-8 py-3 rounded-full font-medium transition"
          >
            <BsPlayCircle className="text-xl" /> View Course Details
          </Link>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        plan={selectedPlan} 
        currency={currency}
      />
    </section>
  );
}
