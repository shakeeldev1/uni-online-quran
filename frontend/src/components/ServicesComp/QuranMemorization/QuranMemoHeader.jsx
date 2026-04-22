import React from "react";
import { Link } from "react-router-dom";

export default function QuranMemorizationHeader() {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat h-[80vh] flex items-center justify-center text-center text-white"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/rear-view-man-using-mobile-phone_1048944-28571822.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80')",
            }}
        >
            {/* Overlay with color gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E7C5A]/90 to-[#AC7D40]/80">
        </div>

            {/* Text Content */}
            <div className="relative z-10 px-6 max-w-3xl">
                <h1 className="text-2xl md:text-5xl font-bold mb-4">
                    Quran Memorization (Hifz-ul-Quran)
                </h1>
                <p className="text-md md:text-xl leading-relaxed text-gray-100">
                    Our online Hifz Quran course is designed for students of all ages to memorize
                    the Holy Quran efficiently and accurately. With one-on-one classes, certified
                    teachers, and flexible schedules, we ensure a balanced approach to memorization
                    and revision.
                </p>
                <Link to={'/contact'}>
                    <button className="mt-8 bg-white text-[#0E7C5A] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
                        Start Your Hifz Journey
                    </button>
                </Link>
            </div>
        </section>
    );
}
