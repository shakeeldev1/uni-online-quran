import React from "react";
import Hero from "../components/ServicesComp/Hero";
import AdminCourses from "../components/ServicesComp/AdminCourses";
import Lenis from "lenis";

const Services = () => {
  const lenis = new Lenis({
    autoRaf: true,
  });
  // Use lenis for smooth scrolling
  lenis.on("scroll", () => {
    // Smooth scroll functionality
  });

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Courses Section */}
      <section id="Courses">
        <AdminCourses />
      </section>
    </div>
  );
};

export default Services;
