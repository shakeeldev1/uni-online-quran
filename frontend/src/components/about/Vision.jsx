import React, { useEffect } from "react";
import { 
  FaGlobe, 
  FaBookOpen, 
  FaUsers, 
  FaQuoteLeft, 
  FaStar,
  FaLeaf,
  FaCircle,
  FaRegCircle
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Vision = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      mirror: false,
    });
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#f8f4ec] to-[#f0e9d9] overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-5 opacity-10">
        <FaLeaf className="text-[#B49762] text-6xl rotate-45" />
      </div>
      <div className="absolute bottom-10 right-5 opacity-10">
        <FaLeaf className="text-[#B49762] text-6xl -rotate-45" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Section Header with Enhanced Design */}
        <div className="relative mb-16 md:mb-20">
          <div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-[#B49762] to-transparent rounded-full"
            data-aos="fade-down"
            data-aos-delay="100"
          ></div>
          <div className="relative inline-block">
            <h2
              className="text-4xl md:text-5xl text-center mb-6 font-serif font-bold text-[#B49762] relative"
              data-aos="fade-down"
            >
              <span className="relative z-10">Our Vision</span>
              <span className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-[#B49762]/5 rounded-full blur-sm"></span>
            </h2>
            {/* <FaQuoteLeft className="absolute -top-4 -right-6 text-2xl md:text-3xl text-[#B49762]/30" /> */}
          </div>
          <p
            className="text-lg md:text-xl  max-w-4xl mx-auto leading-relaxed text-[#B49762] font-medium relative py-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="bg-white/70 px-4 py-2 rounded-lg inline-block">
              Our vision is to make the Holy Quran accessible to every Muslim around
              the globe, regardless of age, location, or background. We aim to
              connect students with qualified Quran teachers who guide them with
              love, patience, and authentic knowledge.
            </span>
          </p>
        </div>

        {/* Vision Points - Enhanced Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Card 1 */}
          <div
            className="relative bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border-l-4 border-[#B49762] transform "
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B49762] to-[#EBC693]"></div>
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#B49762] to-[#EBC693] rounded-full flex items-center justify-center shadow-lg">
                  <FaGlobe className="text-2xl md:text-3xl text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#B49762] rounded-full flex items-center justify-center">
                  <FaCircle className="text-white text-xs" />
                </div>
              </div>
              
              <div className="mb-4 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#B49762] text-sm md:text-base" />
                ))}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#B49762] font-serif relative inline-block">
                Global Reach
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49762] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </h3>
              
              <p className="text-[#B49762]/90 leading-relaxed text-base md:text-lg">
                Spreading Quran education worldwide through online classes that
                break barriers of distance and language.
              </p>
            </div>
            
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B49762]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </div>

          {/* Card 2 - Featured Card */}
          <div
            className="relative bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border-l-4 border-[#B49762] transform "
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B49762] to-[#EBC693]"></div>
            <div className="absolute -top-1 right-2 bg-[#B49762] text-white text-xs font-bold px-3 py-1 rounded-full z-20">
              Featured
            </div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#B49762] to-[#EBC693] rounded-full flex items-center justify-center shadow-lg">
                  <FaBookOpen className="text-2xl md:text-3xl text-white" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#B49762] rounded-full flex items-center justify-center">
                  <FaRegCircle className="text-white text-xs" />
                </div>
              </div>
              
              <div className="mb-4 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#B49762] text-sm md:text-base" />
                ))}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#B49762] font-serif relative inline-block">
                Authentic Knowledge
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49762] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </h3>
              
              <p className="text-[#B49762]/90 leading-relaxed text-base md:text-lg">
                Teaching the Quran with Tajweed, Tafseer, and Islamic values to
                nurture true understanding and love for the Book of Allah.
              </p>
            </div>
            
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B49762]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </div>

          {/* Card 3 */}
          <div
            className="relative bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border-l-4 border-[#B49762] transform "
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B49762] to-[#EBC693]"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#B49762] to-[#EBC693] rounded-full flex items-center justify-center shadow-lg">
                  <FaUsers className="text-2xl md:text-3xl text-white" />
                </div>
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#B49762] rounded-full flex items-center justify-center">
                  <FaCircle className="text-white text-xs" />
                </div>
              </div>
              
              <div className="mb-4 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#B49762] text-sm md:text-base" />
                ))}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#B49762] font-serif relative inline-block">
                Community Growth
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49762] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </h3>
              
              <p className="text-[#B49762]/90 leading-relaxed text-base md:text-lg">
                Building a strong Muslim community of learners who live by the
                Quran and Sunnah, guiding future generations.
              </p>
            </div>
            
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B49762]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div 
          className="mt-16 md:mt-20 flex justify-center items-center space-x-2"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="w-8 h-1 bg-[#B49762] rounded-full"></div>
          <div className="w-12 h-1 bg-[#B49762] rounded-full"></div>
          <div className="w-8 h-1 bg-[#B49762] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Vision;