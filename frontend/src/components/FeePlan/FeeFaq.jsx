import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronDown } from "lucide-react";


const FeeFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const faqs = [
    {
      question: "What type of payments do you accept?",
      answer: "We accept all major debit/credit cards and PayPal payments.",
    },
    {
      question: "When should I pay my monthly fee?",
      answer:
        "Your monthly fee is collected within the first week of every month in advance.",
    },
    {
      question: "Do I have to give credit card information to anyone?",
      answer:
        "No. You are not required to give credit card information to anyone. You will make payment online in a very secure environment.",
    },
    {
      question: "Is there any discount for family members?",
      answer:
        "Yes, there is a discount for multiple members of a family. See our Family Package for details.",
    },
    {
      question: "What if I want to cancel my classes?",
      answer:
        "You may cancel your subscription any time by giving one month’s notice.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image */}
        <div data-aos="fade-right" className="flex justify-center order-1 md:order-none">
          <img
            src='/src/Images/Faq.png'
            alt="FAQ Illustration"
            className="rounded-2xl shadow-xl w-full max-w-[450px] sm:max-w-[500px] md:max-w-[570px] h-auto object-cover"
          />
        </div>

        {/* Right Side - FAQ Section */}
        <div
          data-aos="fade-left"
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0E7C5A] mb-6 sm:mb-8">
            Fee & Payment FAQs
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center bg-[#0E7C5A] text-white px-4 sm:px-5 py-3 sm:py-4 text-left text-base sm:text-lg font-medium focus:outline-none hover:bg-[#0c6a4d] transition-all"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 sm:w-6 h-5 sm:h-6 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openIndex === index
                      ? "max-h-40 opacity-100 py-3 sm:py-4 px-4 sm:px-5"
                      : "max-h-0 opacity-0 px-4 sm:px-5"
                  }`}
                >
                  <p className="text-gray-700 text-sm sm:text-base">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeFaq;
