import React from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaClock, FaCheckCircle, FaBookOpen, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const hifzFeatures = [
    {
        icon: <FaChalkboardTeacher className="text-[#AC7D40] text-xl" />,
        title: "Certified Huffaz & Teachers",
        desc: "Learn from Ijaza-certified Quran instructors ensuring authentic memorization and recitation.",
    },
    {
        icon: <FaUserGraduate className="text-[#AC7D40] text-xl" />,
        title: "Personalized Learning Plans",
        desc: "Customized one-on-one sessions with tailored memorization and revision strategies.",
    },
    {
        icon: <FaClock className="text-[#AC7D40] text-xl" />,
        title: "Flexible Scheduling",
        desc: "24/7 availability across time zones, perfect for students and professionals worldwide.",
    },
    {
        icon: <FaBookOpen className="text-[#AC7D40] text-xl" />,
        title: "Structured Curriculum",
        desc: "Progressive memorization methodology focused on long-term retention and fluency.",
    },
    {
        icon: <FaCheckCircle className="text-[#AC7D40] text-xl" />,
        title: "Tajweed Excellence",
        desc: "Master proper pronunciation and recitation rules with expert guidance.",
    },
];

export default function QuranMemorizationSection() {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-[#0E7C5A]/10 py-20 px-6 lg:px-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#0E7C5A]/20 rounded-full opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#AC7D40]/20 rounded-full opacity-50"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left: Image with Content Overlay */}
                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://img.freepik.com/premium-photo/rear-view-man-using-mobile-phone_1048944-28571822.jpg?ga=GA1.1.1029239798.1754464986&semt=ais_hybrid&w=740&q=80"
                            alt="Professional Quran Memorization Program"
                            className="w-full h-[500px] object-cover"
                        />
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/30">
                                <FaCheckCircle className="text-white" />
                                Trusted by Students Worldwide
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                                Master Quran Memorization with{" "}
                                <span className="text-[#AC7D40]">Expert Guidance</span>
                            </h2>

                            <p className="text-white/90 leading-relaxed">
                                Our comprehensive Hifz program combines traditional teaching methods with
                                modern technology to help you memorize the Quran effectively.
                            </p>
                        </div>
                    </div>


                </div>

                {/* Right: Features Grid */}
                <div className="space-y-8">
                    {/* Enhanced Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hifzFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#0E7C5A]/30 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#AC7D40]/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#0E7C5A] transition-colors">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced CTA Section */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Link to={'/contact'}>
                            <button className="bg-gradient-to-r from-[#0E7C5A] to-[#0E7C5A]/90 text-white px-8 py-4 rounded-xl font-semibold hover:from-[#0E7C5A]/90 hover:to-[#0E7C5A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Start Your Free Trial
                            </button>
                        </Link>


                    </div>
                </div>
            </div>
        </section>
    );
}