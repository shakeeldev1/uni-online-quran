import React, { useEffect } from "react";
import { HeartHandshake, ShieldCheck, BookOpenCheck, Star, Quote } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import image3 from "../../assets/quran3.jpg";

const OurValueSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  const values = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Faith & Integrity",
      description: "We teach the Quran with honesty and sincerity, staying true to Islamic principles.",
      animation: "fade-up",
      gradient: "from-[#0E7C5A] to-[#1a9368]",
    },
    {
      icon: <HeartHandshake className="w-10 h-10 text-white" />,
      title: "Trust & Respect",
      description: "Building strong bonds with students and families through trust and mutual respect.",
      animation: "fade-left",
      gradient: "from-[#D4AF37] to-[#e6c252]",
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-white" />,
      title: "Excellence in Teaching",
      description: "Delivering high-quality Quran education with focus on Tajweed, Hifz, and Tafseer.",
      animation: "fade-right",
      gradient: "from-[#2C3E50] to-[#3c5670]",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-[#F8F5E6] to-[#f1ecda] py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Enhanced decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat pattern-islamic scale-110"></div>
      
      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#0E7C5A]/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-10 w-6 h-6 bg-[#D4AF37]/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-5 w-4 h-4 bg-[#0E7C5A]/20 rounded-full animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#2C3E50]/20 rounded-full animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Left Content - Enhanced */}
        <div className="w-full lg:w-1/2">
          <div className="mb-2 flex items-center gap-3" data-aos="fade-right">
            <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full"></div>
            <span className="text-[#0E7C5A] font-medium uppercase tracking-wider text-sm">Our Foundation</span>
          </div>
          
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2C3E50] leading-tight"
            data-aos="fade-up"
          >
            Our Core <span className="text-[#D4AF37] relative">Values
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4AF37]/30 rounded-full"></span>
            </span>
          </h2>
          
          <div className="w-24 h-1 mb-8 bg-gradient-to-r from-[#D4AF37] to-[#0E7C5A] rounded-full" 
               data-aos="fade-right" 
               data-aos-delay="200">
          </div>

          <p
            className="text-lg md:text-xl mb-7 text-gray-700 leading-relaxed bg-white/50 p-6 rounded-2xl shadow-sm border-l-4"
            style={{borderLeftColor: "#D4AF37"}}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            The foundation of our Quranic journey - guiding every lesson with purpose and devotion.
          </p>

          <div className="flex flex-col gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-400"
                style={{borderLeftColor: "#D4AF37"}}
                data-aos={value.animation}
                data-aos-delay={index * 200}
              >
                <div className="flex items-start gap-5">
                  <div 
                    className={`relative p-4 rounded-xl shadow-lg flex items-center justify-center bg-gradient-to-br ${value.gradient} group-hover:scale-110 transition-transform duration-300`}
                    data-aos="zoom-in"
                    data-aos-delay={index * 250}
                  >
                    {value.icon}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-current" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-3 text-[#2C3E50] group-hover:text-[#0E7C5A] transition-colors duration-300"
                      data-aos="fade-up"
                      data-aos-delay={index * 300}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-gray-700 leading-relaxed"
                      data-aos="fade-in"
                      data-aos-delay={index * 350}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
          
          {/* Testimonial Quote */}
          <div 
            className="mt-8 p-6 rounded-2xl relative overflow-hidden"
            style={{backgroundColor: "#0E7C5A"}}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="absolute top-4 left-4 opacity-10">
              <Quote className="w-16 h-16 text-white" />
            </div>
            <p className="text-white text-lg italic relative z-10">
              "Quran Learn Academy embodies these values in every lesson, creating a truly authentic Islamic learning environment."
            </p>
            <div className="flex items-center mt-4">
              <div className="w-8 h-0.5 bg-[#D4AF37] mr-3"></div>
              <span className="text-[#D4AF37] font-medium">Parent Testimonial</span>
            </div>
          </div>
        </div>

        {/* Right Image - Enhanced */}
        <div
          className="w-full lg:w-1/2 flex justify-center items-stretch"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div className="relative w-full max-w-lg group">
  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
    <img
      alt="Quran learning values"
      className="w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
      loading="lazy"
      src={image3}
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/40 to-transparent"></div>

    {/* ✨ Shine effect */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="shine"></div>
    </div>

    {/* Image caption */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-[#2C3E50] to-transparent rounded-b-2xl">
      <h3 className="font-semibold text-lg">Authentic Islamic Education</h3>
      <p className="text-sm opacity-90">Teaching with devotion since 2010</p>
    </div>
  </div>

  {/* Decorative frames */}
  <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#0E7C5A]/20 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
  <div className="absolute -z-20 -inset-6 bg-gradient-to-tr from-[#D4AF37]/10 to-[#0E7C5A]/10 rounded-3xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>

  {/* Floating elements */}
  <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D4AF37]/10 rounded-full animate-pulse"></div>
  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#0E7C5A]/10 rounded-full animate-pulse delay-500"></div>

  {/* Shine CSS */}
  <style jsx>{`
    .shine {
      position: absolute;
      top: 0;
      left: -75%;
      width: 40%;
      height: 100%;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
    }
    .group:hover .shine {
      animation: shineMove 1s ease forwards;
    }
    @keyframes shineMove {
      0% {
        left: -75%;
      }
      100% {
        left: 125%;
      }
    }
  `}</style>
</div>

        </div>
      </div>

      {/* Add CSS for pattern */}
      <style jsx>{`
        .pattern-islamic {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C35 20 20 35 20 50s15 30 30 30 30-15 30-30S65 20 50 20zm0 10c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z' fill='%230E7C5A' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};

export default OurValueSection;