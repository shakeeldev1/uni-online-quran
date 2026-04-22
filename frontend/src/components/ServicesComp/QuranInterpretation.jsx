import React from "react";
import { FaBookOpen, FaLanguage, FaHeadphonesAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const INTERPRETATION_CARDS = [
  {
    id: 1,
    title: "Translation & Meaning",
    description:
      "Read authentic translations of the Holy Qur’an in multiple languages to understand the divine message clearly.",
    image:
      "https://img.freepik.com/premium-photo/midsection-man-reading-spiritual-book_1048944-9083481.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80",
    icon: <FaLanguage className="text-3xl text-[#AC7D40]" />,
  },
  {
    id: 2,
    title: "Tafsir (Interpretation)",
    description:
      "Explore classical and modern Tafsir explaining the context, wisdom, and depth of each verse of the Qur’an.",
    image:
      "https://pictures.abebooks.com/isbn/9783821702339-us.jpg",
    icon: <FaBookOpen className="text-3xl text-[#AC7D40]" />,
  },
  {
    id: 3,
    title: "Transliteration & Recitation",
    description:
      "Follow transliteration to improve your pronunciation and listen to recitations by renowned Qaris.",
    image:
      "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80",
    icon: <FaHeadphonesAlt className="text-3xl text-[#AC7D40]" />,
  },
];

export default function QuranInterpretation() {
  return (
    <section className="bg-[#F9F9F9] py-16 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[#0E7C5A] mb-3">
          Qur’an Interpretation & Translation
        </h2>
        <div className="w-24 h-1 bg-[#AC7D40] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Discover the true essence of the Qur’an through accurate translations,
          scholarly interpretations, and beautiful recitations  all designed to
          help you understand and connect with Allah’s words deeply.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {INTERPRETATION_CARDS.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border-t-4 border-[#0E7C5A]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-[#0E7C5A]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-12">
        <Link
          to="/services"
          rel="noopener noreferrer"
          className="inline-block bg-[#0E7C5A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#AC7D40] transition duration-300"
        >
          Explore Qur’an Online
        </Link>
      </div>
    </section>
  );
}
