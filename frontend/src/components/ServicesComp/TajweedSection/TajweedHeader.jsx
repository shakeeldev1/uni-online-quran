import React from "react";

export default function TajweedHeader() {
  return (
    <div
      className="relative flex items-center justify-center md:h-[80vh] h-[50vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://www.abouttajweed.com/images/slider/slide-1.jpg?1760967330018)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0E7C5A]/40"></div>

      {/* Text Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          <span className="text-[#AC7D40]">Recite</span> and Rise
        </h1>
        <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto drop-shadow-md">
          Tajweed is the art of proper recitation,preserving the beauty and
          precision of the Qur’an.
        </p>

        {/* Optional subtle accent line */}
        <div className="w-24 h-1 bg-[#AC7D40] mx-auto mt-6 rounded-full shadow-md shadow-[#0E7C5A]/50"></div>
      </div>
    </div>
  );
}
