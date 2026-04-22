import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaGlobeAmericas,
  FaChalkboardTeacher,
  FaQuran,
  FaHeart,
  FaAward,
  FaUsers,
  FaStar,
  FaBookOpen,
  FaGraduationCap,
  FaHandsHelping,
  FaLaptop
} from "react-icons/fa";

const Intro = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ahmed Al-Misri",
      role: "Founder & Senior Quran Teacher",
      experience: "25+ years",
      specialization: "Tajweed and Qira'at",
      image: "https://plus.unsplash.com/premium_photo-1664300894274-cfdf8cd3af6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
      description: "PhD in Islamic Studies from Al-Azhar University. Dedicated to teaching Quran with proper Tajweed for over two decades.",
      icon: <FaQuran className="text-amber-600" />
    },
    {
      id: 2,
      name: "Sister Fatima Khan",
      role: "Head of Women's Education",
      experience: "15+ years",
      specialization: "Quran Memorization",
      image: "https://plus.unsplash.com/premium_photo-1681493954097-3a8190323231?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8",
      description: "Specializes in Hifz programs for women and children. Certified Quran teacher with Ijazah in Hafs 'an Asim.",
      icon: <FaBookOpen className="text-amber-600" />
    },
    {
      id: 3,
      name: "Sheikh Ibrahim Malik",
      role: "Senior Qari & Instructor",
      experience: "20+ years",
      specialization: "Advanced Tajweed",
      image: "https://plus.unsplash.com/premium_photo-1677523780272-b89f5f128472?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExOHx8fGVufDB8fHx8fA%3D%3D",
      description: "Renowned Qari with participation in international Quran competitions. Expert in teaching proper pronunciation and melody.",
      icon: <FaGraduationCap className="text-amber-600" />
    },
    {
      id: 4,
      name: "Sister Aisha Rahman",
      role: "Children's Program Director",
      experience: "12+ years",
      specialization: "Quran for Kids",
      image: "https://plus.unsplash.com/premium_photo-1683134266530-425af5d86e67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      description: "Develops engaging Quran learning programs for children. Specialized in child education psychology and Islamic pedagogy.",
      icon: <FaHandsHelping className="text-amber-600" />
    },
    {
      id: 5,
      name: "Brother Yusuf Hassan",
      role: "Technology & Education Specialist",
      experience: "8+ years",
      specialization: "Digital Learning",
      image: "https://img.freepik.com/premium-photo/portrait-young-man-sitting-sofa-home_1048944-3615539.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
      description: "Combines traditional Quran teaching with modern technology. Manages our online learning platform and digital resources.",
      icon: <FaLaptop className="text-amber-600" />
    },
    {
      id: 6,
      name: "Sister Zainab Ali",
      role: "Student Support Coordinator",
      experience: "10+ years",
      specialization: "Student Counseling",
      image: "https://plus.unsplash.com/premium_photo-1681492187779-5b021b43f4de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
      description: "Provides guidance and support to students throughout their Quran learning journey. Ensures smooth learning experience.",
      icon: <FaUsers className="text-amber-600" />
    },
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We maintain the authentic teachings of Quran with proper Tajweed and Tafsir",
      icon: <FaQuran className="text-[#AC7D40]" />
    },
    {
      title: "Compassion",
      description: "We teach with patience and understanding, creating a supportive environment",
      icon: <FaHeart className="text-[#AC7D40]" />
    },
    {
      title: "Excellence",
      description: "We strive for excellence in Quranic education through continuous improvement",
      icon: <FaAward className="text-[#AC7D40]" />
    },
    {
      title: "Community",
      description: "We build a global community of Quran learners supporting each other",
      icon: <FaUsers className="text-[#AC7D40]" />
    },
  ];

  const stats = [
    { number: "5,000+", label: "Students Taught", icon: <FaUserGraduate className="text-[#AC7D40]" /> },
    { number: "20+", label: "Years Experience", icon: <FaCalendarAlt className="text-[#AC7D40]" /> },
    { number: "15+", label: "Countries Served", icon: <FaGlobeAmericas className="text-[#AC7D40]" /> },
    { number: "50+", label: "Qualified Teachers", icon: <FaChalkboardTeacher className="text-[#AC7D40]" /> },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Enhanced Header Section */}
        <div className="text-center mb-20 relative" data-aos="fade-down">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#AC7D40] to-[#0E7C5A] rounded-full"></div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#0E7C5A] mb-4 font-bold tracking-tight">
            Who We Are
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Meet the dedicated team behind Online Quran Academy, passionate educators committed to spreading Quranic knowledge with authenticity and love.
          </p>
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 border border-amber-100"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors duration-300">
                  <div className="text-3xl">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#0E7C5A] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Our Story Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20 border border-amber-100" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <FaStar className="text-[#AC7D40]" />
                </div>
                <h2 className="text-3xl md:text-4xl text-[#0E7C5A] font-serif font-bold">Our Story</h2>
              </div>
              <div data-aos="fade-right" data-aos-delay="200">
                <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                  Founded in 2003, Online Quran Academy began with a simple mission: to make authentic Quranic education accessible to Muslims worldwide. Our vision was to bridge the gap between traditional Islamic education and modern technology.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                  Our founder, Dr. Ahmed Al-Misri, recognized the challenges many Muslims faced in accessing qualified Quran teachers. With dedication and divine guidance, we've grown into a global institution serving thousands of students.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Today, we take pride in our team of certified teachers who carry the legacy of authentic Islamic knowledge while embracing innovative teaching methodologies.
                </p>
              </div>
            </div>
            <div className="relative min-h-96 group overflow-hidden rounded-2xl shadow-xl" data-aos="zoom-in" data-aos-delay="400">
              {/* Background Image */}
              <img
                src="https://plus.unsplash.com/premium_photo-1678490286446-71e04ddce2dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                alt="Quran Teaching"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-amber-900/10 to-amber-700/20"></div>

              {/* ✨ Shine Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="shine"></div>
              </div>

              {/* Shine CSS */}
              <style jsx>{`
    .shine {
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewY(-10deg);
    }
    .group:hover .shine {
      animation: shineDown 1.8s ease forwards;
    }
    @keyframes shineDown {
      0% {
        top: -100%;
      }
      100% {
        top: 150%;
      }
    }
  `}</style>
            </div>

          </div>
        </div>

        {/* Enhanced Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#0E7C5A] font-serif font-bold mb-4" data-aos="fade-down">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              The principles that guide our mission and shape our educational approach
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center border border-amber-100 group hover:shadow-sm transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-amber-50 rounded-2xl group-hover:bg-amber-100 transition-colors duration-300">
                    <div className="text-4xl">
                      {value.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Team Members */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#0E7C5A] font-serif font-bold mb-4" data-aos="fade-down">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Dedicated educators committed to your Quranic learning journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100 group"
                data-aos="flip-left"
                data-aos-delay={index * 150}
              >
                <div className="relative overflow-hidden group rounded-xl">
                  {/* Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-right badge */}
                  <div className="absolute top-4 right-4 bg-[#AC7D40] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaCalendarAlt className="mr-1" /> {member.experience}
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* ✨ Shine Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="shine"></div>
                  </div>

                  {/* Shine CSS */}
                  <style jsx>{`
    .shine {
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewY(-10deg);
    }
    .group:hover .shine {
      animation: shineDown 1.5s ease forwards;
    }
    @keyframes shineDown {
      0% {
        top: -100%;
      }
      100% {
        top: 150%;
      }
    }
  `}</style>
                </div>

                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-amber-50 rounded-lg mr-4 group-hover:bg-amber-100 transition-colors duration-300">
                      <div className="text-xl">
                        {member.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-[#0E7C5A] font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-amber-50 text-[#AC7D40] px-3 py-1 rounded-full text-sm font-medium">
                      {member.specialization}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;