import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaQuran, FaGraduationCap, FaGlobe, FaHeart, FaUsers, FaAward, FaCheck, FaStar, FaUserGraduate, FaChalkboardTeacher, FaMapMarkerAlt, FaSmile } from "react-icons/fa";

const Mission = () => {
  const missionCards = [
    {
      id: 1,
      title: "Preserve Quranic Knowledge",
      description: "To preserve and propagate the authentic teachings of the Holy Quran through modern digital means while maintaining traditional values and accuracy.",
      features: ["Authentic Tajweed", "Original Arabic", "Traditional Methods"],
      aos: "fade-right",
      icon: FaQuran,
      iconColor: "text-[#AC7D40]"
    },
    {
      id: 2,
      title: "Quality Education for All",
      description: "To make quality Quranic education accessible to everyone regardless of age, location, or background through affordable online classes.",
      features: ["Affordable Pricing", "All Age Groups", "Flexible Scheduling"],
      aos: "fade-up",
      icon: FaGraduationCap,
      iconColor: "text-[#AC7D40]"
    },
    {
      id: 3,
      title: "Global Reach",
      description: "To connect students worldwide with certified Quran teachers, breaking geographical barriers and creating a global Muslim learning community.",
      features: ["Worldwide Access", "Cultural Diversity", "24/7 Availability"],
      aos: "fade-left",
      icon: FaGlobe,
      iconColor: "text-[#AC7D40]"
    },
    {
      id: 4,
      title: "Spiritual Development",
      description: "To nurture spiritual growth and Islamic values through Quranic education, helping students develop a deeper connection with Allah.",
      features: ["Character Building", "Islamic Values", "Spiritual Guidance"],
      aos: "zoom-in-up",
      icon: FaHeart,
      iconColor: "text-[#AC7D40]"
    },
    {
      id: 5,
      title: "Community Building",
      description: "To create a supportive online community where students can learn, grow, and connect with fellow Muslims from around the world.",
      features: ["Group Sessions", "Community Events", "Peer Support"],
      aos: "flip-up",
      icon: FaUsers,
      iconColor: "text-[#AC7D40]"
    },
    {
      id: 6,
      title: "Excellence in Teaching",
      description: "To maintain the highest standards of teaching through continuous teacher training, curriculum development, and quality assurance.",
      features: ["Certified Teachers", "Regular Training", "Quality Control"],
      aos: "zoom-in",
      icon: FaAward,
      iconColor: "text-[#AC7D40]"
    },
  ];

  const statistics = [
    { number: "5,000+", label: "Students Enrolled", icon: FaUserGraduate, color: "text-[#AC7D40]" },
    { number: "50+", label: "Certified Teachers", icon: FaChalkboardTeacher, color: "text-[#AC7D40]" },
    { number: "15+", label: "Countries Served", icon: FaMapMarkerAlt, color: "text-[#AC7D40]" },
    { number: "99%", label: "Satisfaction Rate", icon: FaSmile, color: "text-[#AC7D40]" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50, // Reduced offset to trigger animations earlier
      mirror: false, // Don't animate elements again when scrolling back up
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 py-16 px-4 overflow-hidden"> {/* Added overflow-hidden */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="zoom-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#0E7C5A] to-[#AC7D40] rounded-full mb-6">
            <FaQuran className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Our <span className="text-[#AC7D40]">Mission</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EBC693] to-[#AC7D40] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated to spreading the light of Quranic knowledge through
            innovative online education that respects tradition while embracing technology.
          </p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {missionCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform  p-8 border border-gray-100 overflow-hidden" // Reduced translate-y from -3 to -2
                data-aos={card.aos}
                data-aos-delay={index * 100}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-amber-50 rounded-bl-3xl opacity-60"></div>
                
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br from-green-50 to-amber-50 group-hover:scale-105 transition-transform duration-300 ${card.iconColor}`}> {/* Reduced scale from 110 to 105 */}
                  <IconComponent className="text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#AC7D40] transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {card.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-700"
                      data-aos="fade-right"
                      data-aos-delay={i * 100 + index * 50}
                      data-aos-anchor-placement="top-bottom" // Added anchor placement
                    >
                      <div className="flex items-center justify-center w-6 h-6 bg-[#AC7D40] rounded-full mr-3 transition-colors duration-300">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 transform " // Reduced translate-y from -2 to -1
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-amber-50 mb-4 group-hover:scale-105 transition-transform duration-300"> {/* Reduced scale from 110 to 105 */}
                  <IconComponent className={`text-2xl text-[#0E7C5A] `} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

      
      </div>
    </div>
  );
};

export default Mission;