import React from "react";
import { FaHome, FaLaptopHouse, FaArrowUp } from "react-icons/fa";
import { FaBookQuran } from "react-icons/fa6";

export default function HifzOverviewSection() {
  return (
    <section className="bg-white mb-2  px-6 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         {/* Right: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E7C5A] mb-4">
            Hifz Quran Online Course
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Hifz Quran online course enables students to memorize the entire Quran
            from the comfort of their homes. With the guidance of qualified Huffaz and
            proven memorization techniques, learners progress verse by verse until they
            reach full completion. Memorizing the Quran is an honor that elevates one’s
            rank in this life and the Hereafter.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <FaBookQuran className="text-[#AC7D40] text-lg mt-1" />
              <p className="text-gray-700 text-sm">
                Structured and guided memorization program designed for steady progress.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaHome className="text-[#AC7D40] text-lg mt-1" />
              <p className="text-gray-700 text-sm">
                Learn and memorize from home through interactive online sessions.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaLaptopHouse className="text-[#AC7D40] text-lg mt-1" />
              <p className="text-gray-700 text-sm">
                Qualified tutors with experience in online Quran teaching for all age groups.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaArrowUp className="text-[#AC7D40] text-lg mt-1" />
              <p className="text-gray-700 text-sm">
                Personalized guidance that helps every student steadily achieve memorization excellence.
              </p>
            </div>
          </div>

          {/* Quran Verse */}
          <div className="bg-[#0E7C5A]/10 border-l-4 border-[#0E7C5A] p-4 rounded-md">
            <p className="font-arabic text-xl text-[#0E7C5A] mb-2">
              وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِنْ مُدَّكِرٍ
            </p>
            <p className="text-gray-700 text-sm italic">
              “And We have certainly made the Qur’an easy for remembrance, so is there
              any who will remember?” (Qur’an 54:17)
            </p>
          </div>

      
        </div>
       
        {/* Left: Image */}
        <div className="relative">
          <img
            src="https://img.freepik.com/premium-photo/high-angle-view-woman-reading-book_1048944-7821018.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80"
            alt="Hifz Quran Online"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E7C5A]/40 to-[#AC7D40]/40 rounded-2xl"></div>
        </div>

       
      </div>
    </section>
  );
}
