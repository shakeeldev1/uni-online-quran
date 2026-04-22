import React, { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ExampleVideos = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen py-16 px-6 md:px-12 flex flex-col items-center">
      {/* ===== Header ===== */}
      <div className="text-center mb-20" data-aos="fade-down">
        <h3 className="text-[#AF864C] text-4xl font-bold uppercase tracking-wide">
          Our Requirements
        </h3>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed text-lg">
          Watch how our professional teachers create engaging introduction
          videos for Qur’an and Islamic Studies. Follow these refined guidelines
          to record your own perfect introduction.
        </p>
      </div>

      {/* ===== Example Videos Section ===== */}
      <div className="w-full max-w-6xl space-y-16 mb-24">
        <h2
          className="text-3xl font-semibold text-[#0E7C5A] border-b-4 border-[#AF864C] inline-block mb-8"
          data-aos="fade-right"
        >
          Example Videos
        </h2>

        {/* Card 1 */}
        <div
          className="bg-white flex flex-col md:flex-row items-center justify-between rounded-2xl border-t-6 border-[#0E7C5A]
          shadow-lg overflow-hidden transition-all duration-[1500ms] ease-in-out group"
          style={{
            clipPath:
              "polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)",
          }}
          data-aos="fade-up"
        >
          {/* Left Text Section */}
          <div className="p-8 md:w-1/2" data-aos="fade-right">
            <h3 className="text-2xl font-semibold text-[#0E7C5A] mb-4">
              Islamic Studies Instructor
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our teachers demonstrate a calm, confident, and respectful
              approach. Speak slowly and clearly while maintaining eye contact
              with the camera. Begin with a short introduction and highlight
              your experience in teaching Islamic Studies.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 relative overflow-hidden group" data-aos="fade-left">
            <img
              src="https://www.shutterstock.com/image-photo/student-watching-online-video-conference-260nw-2085430405.jpg"
              alt="Islamic Studies Instructor"
              className="w-full h-72 object-cover brightness-95 transition-all duration-[1500ms] ease-in-out group-hover:brightness-80 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-in-out"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="bg-white flex flex-col md:flex-row-reverse items-center justify-between rounded-3xl border-t-4 border-[#AF864C]
          shadow-lg overflow-hidden group"
          
          data-aos="fade-up"
        >
          {/* Left Text Section */}
          <div className="p-8 md:w-1/2" data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-[#AF864C] mb-4">
              Qur’an Teacher
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Present yourself with warmth and professionalism. Begin with the
              greeting “Assalamu Alaikum,” mention your qualifications, and
              showcase your fluency in Qur’an recitation. Keep the tone humble,
              and use a simple, distraction-free background.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 relative overflow-hidden group-hover:scale-100" data-aos="fade-right">
            <img
              src="https://www.fajralquran.com/blog/wp-content/uploads/2025/08/13-1.-Quran-Teacher-Online.jpg"
              alt="Qur’an Teacher"
              className="w-full h-72 object-cover brightness-95 transition-all duration-[1500ms] ease-in-out group-hover:brightness-80 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-in-out"></div>
          </div>
        </div>
      </div>

      {/* ===== Guidelines Section ===== */}
      <div className="w-full max-w-6xl">
        <h2
          className="text-3xl font-semibold text-[#0E7C5A] text-center border-b-4 border-[#AF864C] inline-block mb-10"
          data-aos="fade-up"
        >
          Guidelines
        </h2>

        <div
          className="flex flex-col md:flex-row justify-center gap-8"
          data-aos="fade-up"
        >
          {/* DO Section */}
          <div
            className="bg-white w-full md:w-1/2 rounded-3xl shadow-lg p-8 border-t-4 border-[#0E7C5A]
            hover:shadow-2xl hover:-translate-y-3 transition-all duration-[1500ms] ease-in-out hover:delay-[200ms]"
            style={{
              clipPath:
                "polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)",
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle2 className="text-[#0E7C5A] w-8 h-8" />
              <h3 className="text-2xl font-semibold text-[#0E7C5A]">DO</h3>
            </div>
            <ul className="space-y-3 text-gray-700 text-base md:text-lg text-center">
              <li>
                <span className="text-green-600 font-semibold">✓</span> Appear
                clearly in your video (face visible).
              </li>
              <li>
                <span className="text-green-600 font-semibold">✓</span> Duration
                should be between 1–3 minutes.
              </li>
              <li>
                <span className="text-green-600 font-semibold">✓</span> Speak
                all the languages you plan to teach.
              </li>
              <li>
                <span className="text-green-600 font-semibold">✓</span> Ensure
                good lighting and clarity.
              </li>
            </ul>
          </div>

          {/* DON’T Section */}
          <div
            className="bg-white w-full md:w-1/2 rounded-3xl shadow-lg p-8 border-t-4 border-red-500
            hover:shadow-2xl hover:-translate-y-3 transition-all duration-[1500ms] ease-in-out hover:delay-[200ms]"
            style={{
              clipPath:
                "polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)",
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <XCircle className="text-red-500 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-red-500">DO NOT</h3>
            </div>
            <ul className="space-y-3 text-gray-700 text-base md:text-lg text-center">
              <li>
                <span className="text-red-500 font-semibold">✗</span> Share
                personal contact details.
              </li>
              <li>
                <span className="text-red-500 font-semibold">✗</span> Advertise
                or promote other services.
              </li>
              <li>
                <span className="text-red-500 font-semibold">✗</span> Use
                copyrighted background music.
              </li>
              <li>
                <span className="text-red-500 font-semibold">✗</span> Record
                vertical or square videos.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleVideos;
