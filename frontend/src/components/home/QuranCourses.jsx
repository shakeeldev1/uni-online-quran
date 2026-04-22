import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChalkboardTeacher, FaClock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuranCourses = () => {
  const PRIMARY = "#0E7C5A"; // Deep green
  const ACCENT = "#D4AF37"; // Gold
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const mainCourses = [
    {
      title: "Basic Quran Reading Course",
      image: "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Basic-Quran-Reading-Course-r9vy9l8n89njgl14qs5697bj4tpmyoyk88izg7q2zy.jpg",
      description: "Learn the fundamentals of Quranic Arabic and proper pronunciation",
      detailedDescription: "This course is designed for beginners who want to learn how to read the Quran correctly. You'll start with Arabic letters, their proper pronunciation, and gradually progress to reading complete words and verses. Our certified teachers provide personalized attention to ensure you develop a strong foundation in Quranic reading.",
      features: ["Arabic alphabet and pronunciation", "Basic reading rules", "Practice with short surahs", "One-on-one sessions with teachers"],
      duration: "3-6 months",
      level: "Beginner",
    },
    {
      title: "Quran Reading with Tajweed",
      image: "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Reading-with-Tajweed-r9vy94bjt90dnlpphktw0bl8fw11453e5ws8t8f63y.jpg",
      description: "Master the rules of Tajweed for beautiful and correct recitation",
      detailedDescription: "Tajweed is the science of reciting the Quran according to the rules established by the Prophet Muhammad (PBUH). In this course, you'll learn the proper articulation points of letters, characteristics of letters, and rules of recitation. Our expert teachers will help you beautify your recitation while maintaining correctness.",
      features: ["Rules of Noon Sakinah and Tanween", "Rules of Meem Sakinah", "Makharij (articulation points)", "Sifaat (characteristics of letters)"],
      duration: "6-12 months",
      level: "Intermediate",
    },
    {
      title: "Quran Memorization Course",
      image: "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Memorization-med-r9vy96786x2yatmz6ln55b45mnrrjjauu637rscdri.jpg",
      description: "Systematic approach to memorizing the Holy Quran (Hifz)",
      detailedDescription: "Our Hifz program follows a structured methodology to help students memorize the Quran with proper Tajweed and understanding. We use proven techniques that make memorization easier and retention stronger. Regular revision schedules ensure that memorized portions remain fresh in memory.",
      features: ["Daily memorization targets", "Revision system", "Memorization techniques", "Progress tracking"],
      duration: "2-5 years (depending on pace)",
      level: "Advanced",
    },
    {
      title: "Quran With Tafseer Course",
      image: "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Reading-with-Tafseer-r9vy9752dr48mflm141rpsvm81n4r8el6aqp92azla.jpg",
      description: "Understand the meanings and explanations of Quranic verses",
      detailedDescription: "This course delves into the meanings and explanations of the Quranic verses. You'll learn about the context of revelation, linguistic nuances, and wisdom behind the verses. Our scholars provide insights from classical and contemporary Tafseer works to help you develop a deeper understanding of Allah's message.",
      features: ["Context of revelation (Asbab al-Nuzul)", "Linguistic analysis", "Thematic study", "Practical application"],
      duration: "1-2 years",
      level: "Intermediate to Advanced",
    },
  ];

  const faqCourses = [
    {
      title: "How to learn Norani Qaida?",
      description: "Step-by-step guide to mastering the foundation of Quranic reading",
      detailedDescription: "Norani Qaida is the first step for beginners in Quran learning. It teaches Arabic alphabet, pronunciation, and basic reading rules. Our approach includes: 1) Learning letter shapes and sounds, 2) Combining letters to form words, 3) Practice with vowel signs, 4) Reading simple verses. We use visual aids, repetition, and interactive exercises to make learning engaging and effective.",
    },
    {
      title: "How to learn Quran online?",
      description: "Comprehensive approach to effective online Quran learning",
      detailedDescription: "Online Quran learning has made Islamic education accessible to everyone. Our process includes: 1) Free trial session to assess level, 2) Customized learning plan, 3) One-on-one sessions with qualified teachers, 4) Interactive digital whiteboard, 5) Regular assessments, 6) Flexible scheduling. All you need is a device with internet connection and dedication to learn.",
    },
    {
      title: "Why memorize (Hifz) the Holy Quran?",
      description: "Benefits and spiritual rewards of memorizing the Quran",
      detailedDescription: "Memorizing the Quran brings immense rewards in this life and the hereafter. Benefits include: 1) Great spiritual reward and elevated status in Jannah, 2) The Quran will intercede for the Hafiz on Judgment Day, 3) Develops discipline, focus and memory power, 4) Deepens connection with Allah's words, 5) Becomes a source of guidance throughout life. The Prophet (PBUH) said: 'The best among you are those who learn the Quran and teach it.'",
    },
    {
      title: "How to memorize the Holy Quran?",
      description: "Proven techniques for successful Quran memorization",
      detailedDescription: "Effective Quran memorization requires strategy and consistency. Our proven methods include: 1) Consistent daily practice (even if small amount), 2) Understanding the meaning of verses, 3) Listening to recitations by Qaris, 4) Writing verses down, 5) Regular revision system, 6) Finding a qualified teacher for correction. We recommend starting with short surahs and gradually increasing the difficulty.",
    },
    {
      title: "How Will We Bridge The Difference Between The Traditional and Online Learning?",
      description: "Our approach to combining traditional values with modern technology",
      detailedDescription: "We've successfully blended traditional Quran teaching methodology with modern technology: 1) One-on-one attention like traditional settings, 2) Certified teachers with Ijazah, 3) Digital tools that enhance learning (screen sharing, digital Quran), 4) Regular parent/student feedback sessions, 5) Preservation of Adaab (etiquettes) of learning, 6) Flexible scheduling that accommodates modern lifestyles while maintaining traditional teaching quality.",
    },
    {
      title: "What is Tajweed?",
      description: "Understanding the rules of proper Quranic recitation",
      detailedDescription: "Tajweed linguistically means 'to improve' or 'make better'. Technically, it means giving each letter its right and due in recitation. Key aspects include: 1) Makharij: Correct articulation points of letters, 2) Sifaat: Characteristics of letters, 3) Rules of Noon Sakinah and Tanween, 4) Rules of Meem Sakinah, 5) Rules of Madd (lengthening), 6) Rules of stopping and starting. Learning Tajweed is Fard Kifayah (communal obligation) for proper recitation.",
    },
    {
      title: "How to teach Tajweed to Kids?",
      description: "Child-friendly methods for teaching Tajweed effectively",
      detailedDescription: "Teaching Tajweed to children requires special approach: 1) Make it fun with games and rewards, 2) Use visual aids and colorful charts, 3) Break rules into small, digestible lessons, 4) Lots of repetition and practice, 5) Encourage by highlighting progress, 6) Use stories to explain the importance of proper recitation, 7) Patient correction without criticism, 8) Regular short sessions rather than long infrequent ones. Our teachers are specially trained in child education methods.",
    },
    {
      title: "What is Tafseer?",
      description: "Exploring the science of Quranic interpretation",
      detailedDescription: "Tafseer is the scholarly interpretation and explanation of the Quranic verses. It involves: 1) Explaining meanings of words, 2) Context of revelation (Asbab al-Nuzul), 3) Linguistic analysis, 4) Relating verses to other verses, 5) Referencing authentic Hadith, 6) Considering opinions of Sahaba and early scholars. Proper Tafseer requires deep knowledge of Arabic language, Islamic jurisprudence, and Quranic sciences. We study from classical texts like Tafseer Ibn Kathir, Al-Jalalayn, and contemporary works.",
    },
    {
      title: "When Should I Start Learning Tafseer?",
      description: "Guidance on the right time to begin studying Quranic explanations",
      detailedDescription: "The appropriate time to start learning Tafseer depends on your current knowledge: 1) Basic level: After being able to read Quran comfortably, start with simple explanations, 2) Intermediate level: After having basic Islamic knowledge, study systematic Tafseer of short surahs, 3) Advanced level: After building strong foundation in Arabic and Islamic studies, delve into detailed classical Tafseer works. We recommend starting with Juz Amma (30th part) as it contains shorter surahs with practical teachings relevant to daily life.",
    },
  ];

  const closeModal = () => {
    setSelectedCourse(null);
    setSelectedFaq(null);
  };

  useEffect(() => {
    if (selectedCourse || selectedFaq) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCourse, selectedFaq]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4" data-aos="fade-up">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-2" style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium Quran Courses
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: PRIMARY }} data-aos="fade-up" data-aos-delay="100">
            Learn Quran with <span style={{ color: ACCENT }}>Expert Guidance</span>
          </h1>

          <div className="w-24 h-1.5 mx-auto mb-8 rounded-full" style={{ backgroundColor: ACCENT }} data-aos="fade-up" data-aos-delay="200"></div>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
            Discover our comprehensive Quran learning programs designed for all ages and levels.
            Start your spiritual journey with certified teachers and flexible scheduling.
          </p>
        </div>

        {/* Main Courses Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {mainCourses.map((course, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent z-0"></div>

                <div className="relative z-10 p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${PRIMARY}15` }}>
                        <span className="text-2xl font-bold" style={{ color: PRIMARY }}>{index + 1}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors duration-300">
                          {course.title}
                        </h3>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                          style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>
                          {course.level}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          ⏱️ {course.duration}
                        </span>
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-nowrap"
                          style={{
                            background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                            boxShadow: `0 4px 15px ${PRIMARY}40`
                          }}
                        >
                          Explore Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Courses Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PRIMARY }} data-aos="fade-up">
              Quran Learning Guide
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Answers to common questions about Quran education and learning methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqCourses.map((course, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-emerald-50/50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform"
                data-aos="zoom-in"
                data-aos-delay={index * 80}
                onClick={() => setSelectedFaq(course)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${PRIMARY}15` }}>
                    <svg className="w-5 h-5" style={{ color: PRIMARY }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors duration-300 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <button
              className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:delay-400 hover:shadow-xl transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                boxShadow: `0 6px 20px ${PRIMARY}40`
              }}
              data-aos="fade-up"
            >
              Start Your Learning Journey Today
            </button>
          </div> */}
        </section>

        {/* Features Banner */}
        <div className="mt-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-2xl" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Quran Courses?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
              {[
                { icon: <FaChalkboardTeacher className="text-2xl" />, text: "Certified Teachers" },
                { icon: <FaClock className="text-2xl" />, text: "Flexible Timing" },
                { icon: <FaUser className="text-2xl" />, text: "One-on-One Sessions" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-3" data-aos="zoom-in" data-aos-delay={index * 200}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full   shadow-2xl" data-aos="zoom-in">
            <div className="relative p-8">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-2 sm:top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable content */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2" style={{ color: PRIMARY }}>
                  {selectedCourse.title}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: ACCENT }}></div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">{selectedCourse.detailedDescription}</p>

                <div>
                  <h4 className="font-semibold text-lg mb-3" style={{ color: ACCENT }}>
                    Course Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCourse.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PRIMARY }}></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-6 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: PRIMARY }}>
                      {selectedCourse.duration}
                    </div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: PRIMARY }}>
                      {selectedCourse.level}
                    </div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                </div>

                <Link to='/contact'>
                  <button
                    className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                      boxShadow: `0 4px 15px ${PRIMARY}40`,
                    }}
                  >
                    Enroll Now - Start Your Free Trial
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedFaq && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" data-aos="zoom-in">
            <div className="relative p-8">
              <button onClick={closeModal} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: PRIMARY }}>{selectedFaq.title}</h2>
                <p className="text-gray-600 italic">{selectedFaq.description}</p>
                <div className="w-16 h-1 mx-auto mt-3 rounded-full" style={{ backgroundColor: ACCENT }}></div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {selectedFaq.detailedDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <button className="w-full mt-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  boxShadow: `0 4px 15px ${PRIMARY}40`
                }}>
                Start Learning Today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranCourses;