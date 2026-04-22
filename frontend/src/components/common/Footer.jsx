import React from 'react';
import { Link } from "react-router-dom";
import hafix1 from '../../Images/Al-hafix-logo.jpeg';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r font-serif from-[#ebc693] via-[#B49762] to-[#A97635] text-white rounded-t-2xl shadow-lg">
      <div className="container mx-auto px-4 py-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:scale-105 transition-transform duration-300">
              <img 
                className="w-16 rounded-sm shadow-md hover:shadow-xl transition-all" 
                src={hafix1} 
                alt="Quran Academy" 
              />
              <span className="text-xl font-bold hover:text-[#f7e6c4] transition-all duration-300">Al Hafiz-Online<br />Quran Academy</span>
            </Link>

            <p className="text-sm mb-4 text-white/90 leading-relaxed hover:text-[#fdf6e4] transition-all duration-300">
              Learn Quran online with qualified teachers. Study Tajweed, Memorization, and Islamic studies from the comfort of your home.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaYoutube />, link: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="group relative border border-[#b89144e7] p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#b89144e7]"
                >
                  <span className="absolute inset-0 rounded-full bg-[#b89144e7] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative text-base text-white group-hover:text-[#b89144e7] transition-colors duration-300">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Services", link: "/services" },
                { name: "Contact Us", link: "/contact" },
                { name: "Privacy Policy", link: "/privacypolicy" },
                { name: "Terms of Service", link: "/terms" },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    to={item.link} 
                    className="block hover:text-[#f7e6c4] transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Our Courses</h3>
            <ul className="space-y-2">
              {[
                // { name: "Quran Reading", link: "/quran-reading" },
                { name: "Quran Memorization (Hifz)", link: "/courses/quran-memorization" },
                { name: "Tajweed", link: "/tajweed" },
                // { name: "Arabic Language", link: "/arabic" },
                // { name: "Islamic Studies", link: "/islamic-studies" },
                { name: "Quran Tafsir", link: "/courses/quran-translation" },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    to={item.link} 
                    className="block hover:text-[#f7e6c4] transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Contact Us</h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-start hover:text-[#f7e6c4] transition-all duration-300">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>Hassan Manzil,Street No-01,Bahawalpur</span>
              </div>
              <div className="flex items-center hover:text-[#f7e6c4] transition-all duration-300">
                <FaPhone className="mr-3" />
                <span>+92 300 6868033</span>
              </div>
              <div className="flex items-center hover:text-[#f7e6c4] transition-all duration-300">
                <FaEnvelope className="mr-3" />
                <span>info@a-hafiz.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 pr-4 text-white bg-transparent rounded-l-lg focus:outline-none w-full border border-[#B49762] placeholder-white/60"
                />
                <button className="bg-[#A97635] hover:bg-[#b78c49] border-[#B49762] px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-30 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Online Quran Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
