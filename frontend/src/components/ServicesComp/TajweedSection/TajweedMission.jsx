import React from "react";



export default function TajweedMission() {
  return (
    <section className="bg-[#F9F9F9] py-16 px-6">
      {/* Mission Header */}
      <div className="relative max-w-5xl mx-auto text-center mb-16 px-6">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0E7C5A] mb-4 tracking-tight">
          Our Mission
        </h2>

        {/* Accent Line */}
        <div className="w-24 h-1 bg-[#AC7D40] mx-auto mb-6 rounded-full shadow-md shadow-[#0E7C5A]/40"></div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10 text-lg">
          Our goal is to explain the principles of <span className="text-[#0E7C5A] font-semibold">Tajweed </span> 
          and help non-Arabs recite the Qur’an beautifully and correctly. We share
          short, practical Tajweed lessons and answer student questions with clarity and care.
        </p>

        {/* Hadith Card */}
        <div className="relative bg-gradient-to-r from-[#0E7C5A]/10 to-[#AC7D40]/10 p-8 rounded-3xl border border-[#0E7C5A]/20 shadow-lg shadow-[#0E7C5A]/20 max-w-3xl mx-auto">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0E7C5A] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
            Hadith on Recitation
          </div>

          <p className="text-gray-800 italic text-lg leading-relaxed mt-4">
            “The one who was devoted to the Qur'an will be told on the Day of Resurrection:
            <br />
            <span className="text-[#0E7C5A] font-semibold">
              ‘Recite and ascend (in ranks) as you used to recite in the world.
              Your rank will be at the last Ayah you recite.’
            </span>”
          </p>

          <p className="text-[#AC7D40] font-semibold mt-4">
            — Prophet Muhammad ﷺ <br />
            <span className="text-gray-600 text-sm">
              (Reported by Abdullah bin ‘Amr bin Al-‘As)
            </span>
          </p>
        </div>
      </div>


      {/* What is Tajweed Se  ction */}
      <div className="max-w-5xl mx-auto text-center mb-3">
        <h3 className="text-3xl font-semibold text-[#0E7C5A] mb-3">
          What is Tajweed?
        </h3>
        <p className="text-gray-700 leading-relaxed">
          The word <strong>“Tajweed”</strong> means to improve or make better. It
          is the knowledge and application of rules of recitation so that the
          Qur’an is read as it was revealed to Prophet Muhammad ﷺ with clarity
          and beauty.
        </p>
      </div>

      <TajweedRulesCards/>
    </section>
  );
}



import { FaListAlt, FaChalkboardTeacher, FaBookReader, FaDownload } from "react-icons/fa";

const TAJWEED_CARDS = [
  {
    id: 1,
    title: "Tajweed Rules Cheat Sheet",
    description: (
      <>
        <p className="mb-2">
          A quick overview of essential Tajweed symbols and pronunciation rules:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700">
          <li>Zabr, Zer, Pesh</li>
          <li>Standing Zabr, Standing Zer, Reverse Pesh</li>
          <li>Double Zabr, Double Zer, Double Pesh</li>
          <li>Jazam and Qalqala Letters</li>
          <li>Wao Leen, Wao Madda, Yaa e Leen, Yaa e Madda, Alif Madda....</li>
          {/* <li>Throat Letters, Ikhfa, Idghaam, Tashdeed, Ghunna, Iqlaab</li>
          <li>
            Stopping Rules — Double Zabr, Round Ta, Standing Signs, Madda, Leen, Ghunna
          </li> */}
        </ul>
      </>
    ),
    icon: <FaBookReader className="text-3xl text-[#AC7D40]" />,
    link: "/tajweedcheatsheet.pdf",
  },
  {
    id: 2,
    title: "Signs and Stopping Rules",
    description: (
      <>
        <p className="mb-2">
          Mastering Tajweed requires understanding how to stop and continue correctly:
        </p>
        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700">
          <li>Recognize signs of stopping (Waqf symbols)</li>
          <li>Practice stopping on Madda and Leen letters properly</li>
          <li>Maintain correct Ghunna and nasal sounds when pausing</li>
          <li>Understand when to stop on Small Meem and Double Zabr</li>
        </ul>
      </>
    ),
    icon: <FaListAlt className="text-3xl text-[#AC7D40]" />,
    link: "/AsanTajweed.pdf",
  },
  {
    id: 3,
    title: "Four Rules of Learning Tajweed",
    description: (
      <>
        <p className="mb-2">
          Every student should remember these guiding principles:
        </p>
        <ul className="list-decimal list-inside text-sm leading-relaxed text-gray-700">
          <li>Learn the foundations well</li>
          <li>Practice consistently and correctly</li>
          <li>Admit and correct mistakes without hesitation</li>
          <li>Stay motivated and keep improving — don’t get discouraged</li>
        </ul>
      </>
    ),
    icon: <FaChalkboardTeacher className="text-3xl text-[#AC7D40]" />,
    link: "/rulesoftajweed.pdf",
  },
];

 function TajweedRulesCards() {
  return (
    <section className="bg-[#F9F9F9] py-16 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-4">
        <h2 className="text-4xl font-bold text-[#0E7C5A] mb-3">
          Tajweed Rules Cheat Sheet
        </h2>
        <div className="w-24 h-1 bg-[#AC7D40] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-700 max-w-3xl mx-auto">
          A simple guide to help learners understand, remember, and apply the
          core pronunciation and stopping rules of Tajweed effectively.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {TAJWEED_CARDS.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#0E7C5A] text-left group"
          >
            <div className="flex items-center gap-3 mb-4">
              {card.icon}
              <h3 className="text-xl font-semibold text-[#0E7C5A]">
                {card.title}
              </h3>
            </div>

            <div className="text-gray-700 mb-4">{card.description}</div>

            {/* Download Button */}
            <a
              href={card.link}
              download
              target="_blank"
              // rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#0E7C5A] px-4 py-2 rounded-lg hover:bg-[#AC7D40] transition duration-300"
            >
              <FaDownload />
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
