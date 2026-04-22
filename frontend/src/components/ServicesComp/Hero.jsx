// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import {
//   FaQuran,
//   FaMicrophone,
//   FaBrain,
//   FaBook,
//   FaChild,
//   FaStar,
//   FaClock,
//   FaFemale,
//   FaGraduationCap,
//   FaSearch,
//   FaArrowRight
// } from "react-icons/fa";

// export default function Hero() {
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   const services = [
//     {
//       title: "One-on-One Quran Classes",
//       desc: "Personalized learning experience with certified Quran teachers.",
//       img: "https://equraneducation.com/wp-content/uploads/2024/01/learn-quran-online-one-on-one-quran-class.jpg",
//       action: "OneOnOneClasses",
//       icon: FaQuran
//     },
//     {
//       title: "Tajweed & Pronunciation",
//       desc: "Master the art of Tajweed with guided lessons and practice.",
//       img: "https://i.ytimg.com/vi/kcUB97nEFKA/hq720.jpg",
//       action: "TajweedSection",
//       icon: FaMicrophone, link: '/tajweed'
//     },
//     {
//       title: "Quran Memorization (Hifz)",
//       desc: "Structured Hifz programs for kids and adults at any level.",
//       img: "https://quranhost.com/wp-content/uploads/2022/06/dl.beatsnoop.com-1654254712.jpg",
//       action: "HifzSection",
//       icon: FaBrain,link:'/courses/quran-memorization'
//     },
//     {
//       title: "Translation & Tafseer Sessions",
//       desc: "Word-by-word translation, detailed Tafseer explained by certified scholars.",
//       img: "https://itqanelquran.com/wp-content/uploads/2021/09/8-3.jpg",
//       action: "TafseerSection",
//       icon: FaBook,link:'/courses/quran-translation'
//     },
//     {
//       title: "Kids Quran Classes",
//       desc: "Interactive, fun-based Quran learning designed for children.",
//       img: "https://learnqurankids.com/wp-content/uploads/2021/08/learn-qurn-online.png",
//       action: "KidsQuranClasses",
//       icon: FaChild
//     },
//     {
//       title: "Free Trial Class",
//       desc: "Experience the teaching style before you decide. First class completely free.",
//       img: "https://quranforkids.com/wp-content/uploads/2023/09/3-days-free-trial-quran-classes-1-1024x717.webp",
//       action: "FreeTrialClass",
//       icon: FaStar
//     },
//     {
//       title: "24/7 Flexible Scheduling",
//       desc: "Learn at your convenience with flexible online class timings.",
//       img: "https://www.pngkey.com/png/detail/863-8638358_24-7-flexible-schedule-24-hour-service.png",
//       action: "FlexibleSchedule",
//       icon: FaClock
//     },
//     {
//       title: "Female Quran Tutors",
//       desc: "Qualified female teachers available for sisters and kids.",
//       img: "https://www.equranschool.com/images/female-quran-tutor.jpg",
//       action: "FemaleTutors",
//       icon: FaFemale
//     },
//     {
//       title: "Islamic Studies",
//       desc: "Learn Hadith, Fiqh, and basic Islamic knowledge with guidance.",
//       img: "https://qurantutorsacademy.com/wp-content/uploads/2024/07/Islamic-Studies-Course.jpg",
//       action: "IslamicStudies",
//       icon: FaGraduationCap
//     },
//   ];

//   const filteredServices = services.filter(
//     (service) =>
//       service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       service.desc.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAction = (section) => {
//     const target = document.getElementById(section);
//     if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="">
//       {/* ===== Enhanced Hero Banner ===== */}
//       <div className="relative min-h-[100vh] w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
//         <div className="absolute inset-0 bg-black/40 z-0" />
//         <img
//           src="https://riyadalquran.com/wp-content/uploads/2019/07/readquranbook.jpg"
//           alt="Quran Learning"
//           className="h-full w-full object-cover absolute inset-0 mix-blend-overlay"
//         />

//         {/* Decorative Islamic Pattern */}
//         <div className="absolute inset-0 opacity-10 bg-repeat" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C50 8.954 59.954-1 71-1S92 8.954 92 20S82.046 41 71 41 50 31.046 50 20zm0 60c0-11.046 9.954-21 21-21s21 9.954 21 21-9.954 21-21 21-21-9.954-21-21z' fill='%23D4AF37' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
//         }} />

//         <div className="relative z-10 pt-20 sm:pt-5 px-6 sm:px-12 lg:px-20 max-w-6xl text-center">
//           <div
//             data-aos="fade-down"
//             className="inline-flex items-center gap-2 px-4 py-2  rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6"
//           >
//             <FaQuran className="text-[#D4AF37] text-sm" />
//             <span className="text-[#D4AF37] text-sm font-medium">Premium Quran Education</span>
//           </div>

//           <h1
//             data-aos="fade-down"
//             data-aos-delay="100"
//             className="text-4xl sm:text-5xl md:text-5xl mb-2 font-bold text-white leading-tight "
//           >
//             Discover The Beauty Of&nbsp;
//             <span className="text-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
//               Quran Learning
//             </span>
//           </h1>

//           <p
//             data-aos="fade-up"
//             data-aos-delay="200"
//             className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
//           >
//             Transform your spiritual journey with certified teachers, flexible schedules,
//             and personalized Quran learning programs tailored for every age and level.
//           </p>

//           <div
//             data-aos="fade-up"
//             data-aos-delay="300"
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <Link to="/contact">
//               <button className="px-8 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#B8941F] transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Start Learning Today
//               </button>
//             </Link>
//             <button
//               onClick={() => handleAction("services")}
//               className="px-12 sm:px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
//             >
//               Explore Services
//             </button>
//           </div>
//         </div>

//         {/* Enhanced Wave Divider */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden hidden md:flex">
//           <svg
//             className="relative block w-full h-20"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
//               opacity=".25"
//               fill="#D4AF37"
//             ></path>
//             <path
//               d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
//               opacity=".5"
//               fill="#D4AF37"
//             ></path>
//             <path
//               d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
//               fill="#D4AF37"
//             ></path>
//           </svg>
//         </div>
//       </div>

//       {/* ===== Enhanced Services Section ===== */}
//       <div id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto">
//           {/* Section Header */}
//           <div className="text-center mb-12">
//             <h2
//               data-aos="fade-up"
//               className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
//             >
//               Our <span className="text-[#D4AF37]">Quran Services</span>
//             </h2>
//             <p
//               data-aos="fade-up"
//               data-aos-delay="100"
//               className="text-lg text-gray-600 max-w-2xl mx-auto"
//             >
//               Comprehensive Quran learning solutions designed to meet your spiritual and educational needs
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-12 max-w-md mx-auto">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-gray-300 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent shadow-sm text-base bg-white/80 backdrop-blur-sm"
//                 data-aos="fade-right"
//               />
//             </div>
//             {searchQuery && (
//               <p data-aos="fade-left" className="text-sm text-gray-500 mt-2 text-center">
//                 Showing {filteredServices.length} of {services.length} services
//               </p>
//             )}
//           </div>

//           {/* Services Grid */}
//           {filteredServices.length === 0 ? (
//             <div className="text-center py-12">
//               <div data-aos="zoom-in" className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
//                 <FaSearch className="text-gray-400 text-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                 No services found
//               </h3>
//               <p className="text-gray-500">
//                 Try searching with different keywords
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredServices.map((service, index) => {
//                 const IconComponent = service.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="group relative bg-white rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
//                     data-aos="fade-up"
//                     data-aos-delay={index * 100}
//                   >
//                     {/* Icon Badge */}
//                     <div className="absolute top-1 right-2 z-10">
//                       <div className="flex items-center justify-center w-12 h-12 bg-[#D4AF37] rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                         <IconComponent className="text-white text-xl" />
//                       </div>
//                     </div>

//                     {/* Image Container */}
//                     <div className="h-48 w-full overflow-hidden relative group">
//                       {/* Image */}
//                       <img
//                         src={service.img}
//                         alt={service.title}
//                         className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
//                         onError={(e) => {
//                           e.target.src =
//                             "https://via.placeholder.com/400x300/EDF2F7/718096?text=Quran+Learning";
//                         }}
//                       />

//                       {/* Gradient overlay (dark at bottom) */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

//                       {/* Shine Effect */}
//                       <div className="absolute inset-0 overflow-hidden">
//                         <div className="shine"></div>
//                       </div>

//                       {/* Custom CSS */}
//                       <style jsx>{`
//     .shine {
//       position: absolute;
//       top: 0;
//       left: -75%;
//       width: 50%;
//       height: 100%;
//       background: linear-gradient(
//         120deg,
//         rgba(255, 255, 255, 0) 0%,
//         rgba(255, 255, 255, 0.5) 50%,
//         rgba(255, 255, 255, 0) 100%
//       );
//       transform: skewX(-25deg);
//     }
//     .group:hover .shine {
//       animation: shineMove 1.5s ease;
//     }
//     @keyframes shineMove {
//       0% {
//         left: -75%;
//       }
//       100% {
//         left: 125%;
//       }
//     }
//   `}</style>
//                     </div>


//                     {/* Content */}
//                     <div className="p-6 pt-8">
//                       <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
//                         {service.title}
//                       </h3>
//                       <p className="text-gray-600 leading-relaxed mb-6">
//                         {service.desc}
//                       </p>

//                       <Link to={service.link ? service.link : "/contact"}>
//                         <button
//                           onClick={() => handleAction(service.action)}
//                           className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white font-semibold rounded-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 group/btn"
//                         >
//                           Explore more
//                           <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaArrowRight, FaQuran } from "react-icons/fa";
import { servicesAPI } from "../../features/servicesAPI";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAllServices();
      if (response.success) {
        const activeServices = response.data.filter((s) => s.status === "Active");
        setServices(activeServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.description &&
        service.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAction = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      {/* ===== Hero Banner ===== */}
      <div className="relative min-h-[100vh] w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <img
          src="https://riyadalquran.com/wp-content/uploads/2019/07/readquranbook.jpg"
          alt="Quran Learning"
          className="h-full w-full object-cover absolute inset-0 mix-blend-overlay"
        />

        <div className="absolute inset-0 opacity-10 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C50 8.954 59.954-1 71-1S92 8.954 92 20S82.046 41 71 41 50 31.046 50 20zm0 60c0-11.046 9.954-21 21-21s21 9.954 21 21-9.954 21-21 21-21-9.954-21-21z' fill='%23D4AF37' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 pt-20 sm:pt-5 px-6 sm:px-12 lg:px-20 max-w-6xl text-center">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
            <FaQuran className="text-[#D4AF37] text-sm" />
            <span className="text-[#D4AF37] text-sm font-medium">Premium Quran Education</span>
          </div>

          <h1 data-aos="fade-down" data-aos-delay="100" className="text-4xl sm:text-5xl md:text-5xl mb-2 font-bold text-white leading-tight">
            Discover The Beauty Of&nbsp;
            <span className="text-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
              Quran Learning
            </span>
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your spiritual journey with certified teachers, flexible schedules,
            and personalized Quran learning programs tailored for every age and level.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <button className="px-8 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#B8941F] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Learning Today
              </button>
            </Link>
            <button
              onClick={() => handleAction("services")}
              className="px-12 sm:px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* ===== Services Section ===== */}
      <div id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#D4AF37]">Quran Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our professional Quran learning services
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          {/* Loading / Empty / Services Grid */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading services...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No services found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service._id} className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden" data-aos="fade-up">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={service.image || "https://via.placeholder.com/400x300?text=Service"}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Link to={service.link || "/contact"}>
                      <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition">
                        Explore More <FaArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}