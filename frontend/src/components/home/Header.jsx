import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
register();

function Header() {
  const swiperRef = useRef(null);

  const PRIMARY = "#0E7C5A"; 
  const SECONDARY = "#2C3E50"; 
  const ACCENT = "#D4AF37"; 
  const LIGHT = "#F8F5E6"; 

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1665564309098-b7c40a22176d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
      title: "Online Noorani Qaida Course",
      text: "Start from the Arabic alphabet and master makharij with certified tutors.",
      alt: "A student learning Noorani Qaida online with a tutor",
    },
    {
      image:
        "https://images.unsplash.com/photo-1652087714531-5ab08352c96d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8",
      title: "Interactive Quran Classes",
      text: "Live one-on-one sessions, feedback, and personalized lesson plans.",
      alt: "Interactive online Quran class with live teacher",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1723532414101-404f12334ff6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8",
      title: "Learn Anytime, Anywhere",
      text: "Flexible timings for kids and adults—join from any device.",
      alt: "Student reading Quran on a laptop at home",
    },
  ];

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      pagination: { clickable: true },
      loop: true,
      effect: "fade",
      speed: 900,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      injectStyles: [
        `
        .swiper-pagination {
          bottom: 40px !important;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: rgba(255,255,255,0.4);
          margin: 0 8px !important;
          opacity: 1;
          transition: all 0.3s ease;
          border: 1px solid ${PRIMARY}80;
        }
        .swiper-pagination-bullet-active {
          background-color: ${ACCENT};
          width: 15px;
          border-radius: 9999px;
          border-color: ${ACCENT};
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
        }
        `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();

    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="relative h-screen w-full font-sans overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${PRIMARY.substring(1)}' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <swiper-container ref={swiperRef} init="false" class="h-full">
        {slides.map((slide, index) => (
          <swiper-slide key={index} className="relative">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Enhanced gradient overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${SECONDARY}99 0%, ${PRIMARY}66 50%, transparent 100%)`
                }}
              ></div>
              <div 
                className="absolute bottom-0 left-0 right-0 h-2/5"
                style={{
                  background: `linear-gradient(to top, ${SECONDARY}EE 0%, transparent 100%)`
                }}
              ></div>
            </div>

            {/* Enhanced Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
              <div className="max-w-4xl mx-auto">
                {/* Decorative element */}
                <div 
                  className="w-16 h-1 rounded-full mx-auto mb-8 opacity-80"
                  style={{ backgroundColor: ACCENT }}
                  data-aos="fade-down"
                  data-aos-delay="100"
                ></div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
                  style={{
                    color: LIGHT,
                    textShadow: "0 4px 12px rgba(0,0,0,0.8)",
                  }}
                  data-aos="fade-down"
                >
                  {slide.title}
                </h1>

                <div
                  className="flex items-center justify-center mb-8 mt-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div
                    className="w-24 h-px mx-4 opacity-80"
                    style={{ 
                      backgroundColor: ACCENT,
                      boxShadow: `0 0 8px ${ACCENT}80`
                    }}
                  ></div>
                  <p
                    className="text-xl md:text-2xl tracking-wider font-semibold"
                    style={{ 
                      color: ACCENT,
                      textShadow: `0 0 10px ${ACCENT}40`
                    }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <div
                    className="w-24 h-px mx-4 opacity-80"
                    style={{ 
                      backgroundColor: ACCENT,
                      boxShadow: `0 0 8px ${ACCENT}80`
                    }}
                  ></div>
                </div>

                <p
                  className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide"
                  style={{ 
                    color: LIGHT,
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                  }}
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  {slide.text}
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-5 justify-center"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <Link to="/services">
                    <button
                      className="px-7 py-4 rounded-lg cursor-pointer font-semibold shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                      style={{
                        backgroundColor: PRIMARY,
                        color: LIGHT,
                      }}
                      aria-label="Explore Quran Courses"
                      data-aos="flip-left"
                      data-aos-delay="500"
                    >
                      <span className="relative z-10">Explore Our Courses</span>
                      <div 
                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      ></div>
                    </button>
                  </Link>

                  <Link to="/FreeTrialClass">
                    <button
                      className="px-10 sm:px-7 py-3 cursor-pointer rounded-lg font-semibold border-2 shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                      style={{
                        borderColor: ACCENT,
                        color: ACCENT,
                        backgroundColor: "transparent",
                      }}
                      aria-label="Free Trial Class"
                      data-aos="flip-right"
                      data-aos-delay="600"
                    >
                      <span className="relative z-10">Free Trial Class</span>
                      <div 
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      ></div>
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default Header;