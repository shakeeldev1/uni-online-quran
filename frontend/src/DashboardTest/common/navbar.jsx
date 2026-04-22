import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProfileCircle from "../../components/common/ProfileCircle";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/tutors": "Tutors",
  "/dashboard/courses": "Courses",
  "/dashboard/reviews": "Reviews",
  "/dashboard/settings": "Settings",
};

const NavbarTest = () => {
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
      className={`sticky overflow-hidden top-0 z-30 flex flex-wrap items-center justify-between 
                  h-16 sm:h-17 px-3 sm:px-6 transition-transform duration-300 
                  ${hide ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        background:
          "linear-gradient(145deg, #0D6E57 0%, #0E7C5A 40%, #0F5E4B 80%)",
        backgroundSize: "200% 200%",
        backdropFilter: "blur(14px)",
        boxShadow: "4px 0 30px rgba(0,0,0,.35)",
        animation: "qa-gradient-shift 10s ease-in-out infinite alternate",
      }}
    >
      {/* Page title */}
      <h1 className="text-sm sm:text-base md:text-xl font-semibold text-white tracking-wide drop-shadow-md truncate max-w-[60%] sm:max-w-none">
        {pageTitle}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
        {/* Add Admin button */}
        <Link
          to="/dashboard/adminSignup"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg 
               bg-white/20 hover:bg-white/30 text-white transition 
               shadow-md hover:shadow-lg"
          title="Add another Admin"
        >
          <FaPlus className="text-xs sm:text-sm md:text-base" />
        </Link>

        {/* Home button */}
        <Link
          to="/"
          className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg 
               bg-gradient-to-r from-[#0E7C5A]/90 to-[#2d9a77]/90 
               text-white text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg 
               hover:from-[#0E7C5A] hover:to-[#34c28a] transition duration-300 whitespace-nowrap"
        >
          Home
        </Link>

        {/* Profile Menu */}
        <ProfileCircle />
      </div>
    </header>
  );
};

export default NavbarTest;
