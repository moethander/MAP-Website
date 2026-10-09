import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Footer = ({ homeData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 pt-24 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* 🏢 1. About & School Logo Column */}
        <div className="space-y-4">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-3"
          >
            <img
              src={logo} 
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-600 bg-white"
            />
            <h4 className="text-xl font-black text-white tracking-wide">
              Myanmar Academic Planet
            </h4>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering students with quality education, practical learning
            skills, and global opportunities. Learn, Grow, and Achieve with MAP.
          </p>

          {/* Social Icons inside Footer */}
          <div className="flex items-center gap-3 pt-2">
            {homeData?.facebookLink && (
              <a
                href={homeData.facebookLink}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center text-sm transition-all duration-300"
              >
                <FaFacebookF />
              </a>
            )}
            {homeData?.youtubeLink && (
              <a
                href={homeData.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center text-sm transition-all duration-300"
              >
                <FaYoutube />
              </a>
            )}
          </div>
        </div>

        {/* 🔗 2. Quick Links Column */}
        <div className="md:pl-12">
          <h4 className="text-white font-bold text-base mb-6 border-l-4 border-blue-600 pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/placement-test"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Placement Test
              </Link>
            </li>

             <li>
              <Link
                to="/activities"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Activities
              </Link>
            </li>

             <li>
              <Link
                to="/gallery"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
               Gallery
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
 
        {/* 📞 3. Contact Info Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 border-l-4 border-blue-600 pl-3">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
              <span>{homeData?.address || "Yangon, Myanmar"}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500 flex-shrink-0" />
              <span>{homeData?.phoneNumber || "+95 9 123 456 789"}</span>{" "}
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 flex-shrink-0" />
              <span>{homeData?.email || "info@myanmaracademicplanet.com"}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 📝 Copyright Area */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-gray-500">
        <p>© {currentYear} Myanmar Academic Planet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;