import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReviewFormModal from "./model/ReviewFormModal";
import { Link } from "react-router-dom";

const ReviewPage = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      name: "Ahmed Khan",
      role: "Parent of Student",
      review:
        "Quran Learn Academy has been a blessing for our family. My son loves his teacher and has shown remarkable progress in Tajweed within just a few months. The personalized approach and regular progress reports keep us informed and engaged.",
      image:
        "https://plus.unsplash.com/premium_photo-1677621879477-946a3187e2f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      rating: 5,
      course: "Tajweed for Kids",
    },
    {
      name: "Fatima Batool",
      role: "Student",
      review:
        "Learning the Quran online is so convenient! The teachers are patient and supportive, especially with Tajweed rules. The flexible scheduling allows me to balance my studies and work. Highly recommended for busy learners.",
      image:
        "https://plus.unsplash.com/premium_photo-1679064458881-76904cf6d1aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUzfHx8ZW58MHx8fHx8",
      rating: 5,
      course: "Advanced Tajweed",
    },
    {
      name: "Mohammed Iqbal",
      role: "Hifz Student",
      review:
        "Alhamdulillah, I've started my Hifz journey here. The structured plan, daily support, and regular assessments keep me motivated and consistent. The teachers are knowledgeable and make memorization enjoyable.",
      image:
        "https://plus.unsplash.com/premium_photo-1678559460710-44e70ee6eb29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      rating: 4,
      course: "Hifz Program",
    },
    {
      name: "Ayesha Noor",
      role: "Student",
      review:
        "I always wanted to understand the Quran deeply. The Tafseer classes are enlightening and help me connect with the verses on a personal level. The teachers provide historical context that brings the verses to life.",
      image:
        "https://plus.unsplash.com/premium_photo-1677966328130-d4d38d26d9a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
      rating: 5,
      course: "Quranic Tafseer",
    },
    {
      name: "Sarah Jamshed",
      role: "Revert Student",
      review:
        "As a recent revert to Islam, I was nervous about learning Quran. The teachers here have been incredibly supportive and patient. They explain things clearly and make me feel comfortable asking questions.",
      image:
        "https://plus.unsplash.com/premium_photo-1661326306249-cd71bf52b965?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU5fHx8ZW58MHx8fHx8",
      rating: 5,
      course: "Basic Quran Reading",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${i < rating ? "text-[#AC7D40]" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        data-aos="zoom-in"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#e7d7bd] to-bg-[#CDAD79] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2
            className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 font-serif"
            data-aos="fade-right"
          >
            What Our{" "}
            <span className="text-[#D4AF37]" data-aos="zoom-in">
              Students Say
            </span>
          </h2>
          <div
            className="w-24 h-1.5 bg-[#D4AF37] mx-auto mb-6 rounded-full"
            data-aos="flip-left"
          ></div>
          <p
            className="text-gray-700 text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            Hear real stories from our students and families about their Quran
            learning journey with us.
          </p>
        </div>

        {/* Main Featured Review */}
        <div
          className="hidden md:block mb-12 max-w-4xl mx-auto"
          data-aos="zoom-in"
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 relative"
            data-aos="fade-up"
          >
            <div
              className="absolute -top-4 -left-4 text-6xl text-emerald-100 opacity-80"
              data-aos="zoom-out"
            >
              "
            </div>
            <div className="flex items-start mb-6" data-aos="fade-right">
              <img
                src={reviews[activeReview].image}
                alt={reviews[activeReview].name}
                className="w-16 h-16 rounded-full object-cover mr-6 border-4 border-[#AC7D40] shadow-md"
                data-aos="zoom-in"
              />
              <div>
                <h3
                  className="font-bold text-xl text-emerald-800"
                  data-aos="fade-left"
                >
                  {reviews[activeReview].name}
                </h3>
                <p className="text-gray-500 mb-1" data-aos="fade-up">
                  {reviews[activeReview].role}
                </p>
                <span
                  className="inline-block bg-[#CDAD79] text-white text-xs font-medium px-3 py-1 rounded-full"
                  data-aos="flip-up"
                >
                  {reviews[activeReview].course}
                </span>
              </div>
            </div>
            <p
              className="text-gray-700 text-lg leading-relaxed mb-6 italic"
              data-aos="fade-up"
            >
              "{reviews[activeReview].review}"
            </p>
            <div
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-green-50 p-3 sm:p-4 rounded-lg shadow-sm"
              data-aos="fade-down"
            >
              {/* Stars */}
              <div className="flex">
                {renderStars(reviews[activeReview].rating)}
              </div>

              {/* Rating */}
              <span
                className="text-sm text-green-700 font-medium"
                data-aos="fade-left"
              >
                Rated {reviews[activeReview].rating}/5
              </span>

              {/* Text + Button */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm sm:text-base">
                  Leave us a quick
                </span>
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-[#AC7D40] hover:bg-[#0E7C5A] text-white text-sm sm:text-base rounded-lg transition"
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div
            className="flex justify-center mt-6 space-x-2"
            data-aos="zoom-in-up"
          >
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeReview ? "bg-[#CDAD79] w-3" : "bg-[#d3c6b2]"
                  }`}
                aria-label={`Go to review ${index + 1}`}
                data-aos=""
              />
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div
          className="text-center bg-white py-7 px-6 rounded-2xl shadow-lg border border-emerald-100"
          data-aos="zoom-in-up"
        >
          <h3
            className="text-2xl font-bold text-emerald-800 mb-4"
            data-aos="fade-right"
          >
            Start Your Quranic Journey Today
          </h3>
          <p
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            Join our community of learners who are connecting with the Quran
            from the comfort of their homes.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            data-aos="flip-up"
          >
            <Link to="/FreeTrialClass">
              <button
                className="border hover:border-[#0E7C5A] hover:bg-transparent bg-[#0E7C5A] cursor-pointer text-white font-semibold py-3 sm:px-8 px-10 hover:text-black rounded-xl transition-colors duration-300 ease-in-out shadow-md"
                data-aos="fade-up"
              >
                Book Free Trial
              </button>
            </Link>

            <Link to="/services">
              <button
                className="border border-[#f0d7af] text-[#CDAD79] hover:text-white hover:bg-[#CDAD79] cursor-pointer font-semibold py-3 px-8 rounded-xl transition-colors duration-500 ease-in-out"
                data-aos="fade-left"
              >
                View All Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Show Modal */}
      {openModal && <ReviewFormModal onClose={() => setOpenModal(false)} />}
    </section>
  );
};

export default ReviewPage;
