import { Link, useLocation } from "react-router-dom";
import { FaBars, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProfileCircle from "../../components/common/ProfileCircle";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/tutors": "Tutors",
  "/dashboard/students": "Students",
  "/dashboard/courses": "Courses",
  "/dashboard/reviews": "Reviews",
  "/dashboard/settings": "Settings",
};

const DashNavbar = ({ setOpen }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false);

  // Scroll hide effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHide(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between
                  h-14 sm:h-14 md:h-15 px-3 sm:px-5 md:px-8 
                  bg-gradient-to-tr from-[#032219] via-[#04895f] to-[#33c09f]
                  bg-[length:200%_200%] animate-[gradient-shift_10s_ease-in-out_infinite_alternate]
                  backdrop-blur-lg shadow-xl
                  transition-transform duration-300
                  ${hide ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30"
        >
          <FaBars />
        </button>

        {/* Page Title */}
        <h1 className="text-base sm:text-lg md:text-xl text-white font-semibold">
          {pageTitle}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
        {/* Add Admin button */}
        <Link
          to="/dashboard/adminSignup"
          className="flex items-center justify-center 
                     w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                     rounded-lg bg-white/20 hover:bg-white/30 
                     text-white transition shadow-md hover:shadow-lg"
          title="Add another Admin"
        >
          <FaPlus className="text-sm sm:text-base md:text-lg" />
        </Link>

        {/* Home button */}
        <Link
          to="/"
          className="flex items-center justify-center 
                     px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 
                     rounded-lg bg-gradient-to-r from-[#0E7C5A]/90 to-[#2d9a77]/90 
                     text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium 
                     shadow-md hover:shadow-lg 
                     hover:from-[#0E7C5A] hover:to-[#34c28a] 
                     transition duration-300 whitespace-nowrap"
        >
          Home
        </Link>

        {/* Profile Menu */}
        <ProfileCircle />
      </div>
    </header>
  );
};

export default DashNavbar;
