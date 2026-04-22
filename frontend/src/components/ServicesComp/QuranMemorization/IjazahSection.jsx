import React from "react";
import { FaCertificate, FaBookOpen, FaCheckCircle, FaGraduationCap } from "react-icons/fa";

const ijazahData = [
    {
        icon: <FaCertificate className="text-[#AC7D40]" />,
        title: "Ijazah Requirements",
        items: [
            "Complete memorization of the Holy Quran (Hafs 'an 'Asim – Shatibiyyah narration).",
            "Pass the Tajweed rules examination with excellence.",
            "Demonstrate accurate and fluent recitation throughout the entire Quran.",
        ]
    },
    {
        icon: <FaBookOpen className="text-[#AC7D40]" />,
        title: "Learning Goals",
        items: [
            "Achieve accurate memorization of the Book of Allah.",
            "Understand the general meanings of the verses.",
            "Learn the reasons for revelation (Asbab al-Nuzul)."
        ]
    },
    {
        icon: <FaGraduationCap className="text-[#AC7D40]" />,
        title: "Available Memorization Options",
        items: [
            "Memorizing the last Juz (30).",
            "Memorizing the short Surahs.",
            "Memorizing selected Surahs chosen by the student.",
            "Memorizing the entire Quran (for Ijazah certification)."
        ]
    }
];

export default function IjazahSection() {
    return (
        <section className="bg-white py-10 px-6 lg:px-20 mb-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 lg:mb-7">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E7C5A] mb-4">
                        Quran Memorization Ijazah Program
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-4">
                        “Ijazah” is an official certification granted by a qualified tutor, authorizing a student to recite and transmit the Quran after mastering memorization and Tajweed.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {ijazahData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#0E7C5A]/20"
                        >
                            <h3 className="text-lg sm:text-xl font-semibold text-[#0E7C5A] mb-4 flex items-center gap-3">
                                <div className="p-2 bg-[#AC7D40]/10 rounded-lg">
                                    {item.icon}
                                </div>
                                {item.title}
                            </h3>
                            <ul className="space-y-3">
                                {item.items.map((listItem, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                                    >
                                        <div className="w-2 h-2 bg-[#AC7D40] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{listItem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}