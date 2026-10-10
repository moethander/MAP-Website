import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    
    if(savedTheme==="dark"){
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }else{
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  },[]);

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode);

    if(!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme','dark');
    }else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme','light');
    }
  };

  const location = useLocation();

  const menus = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Placement Test", path: "/placement-test" },
    { name: "Activities", path: "/activities" },
    { name: "Gallery", path: "/gallery" },
    { name: "FAQs", path: "/faq" },
    { name: "About Us", path: "/about"},
  
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-md">
  {/* Main Container */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative">
    
    {/*  LEFT: Logo & Title  */}
    <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 max-w-[60%] sm:max-w-none">
      <img
        src={logo}
        alt="Logo"
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-600 flex-shrink-0"
      />
      <div className="flex flex-col justify-center leading-tight min-w-0">
        <h1 className="text-sm sm:text-xl font-bold text-blue-800 dark:text-blue-300 tracking-wide truncate">
          Myanmar Academic Planet
        </h1>
        <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          Learn • Grow • Achieve
        </p>
      </div>
    </Link>

   
    <div className="hidden lg:flex items-center gap-6">
      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          className={`text-sm font-medium transition-colors ${
            location.pathname === menu.path
              ? "text-blue-700 dark:text-blue-400 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-700"
          }`}
        >
          {menu.name}
        </Link>
      ))}
      <Link
        to="/contact"
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full text-sm transition-all"
      >
        Contact Us
      </Link>
    </div>

    {/* RIGHT: Mobile Control Icons */}
    <div className="flex items-center gap-2 sm:gap-3">
      
      {/* Dark Mode Button */}
      <button
        onClick={toggleDarkMode}
        className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800/60 active:scale-95 transition-all"
      >
        {darkMode ? <FaSun className="text-amber-500" /> : <FaMoon />}
      </button>

      {/* Search Button */}
      {/* <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={`text-lg sm:text-xl w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full active:scale-95 transition-all ${
          isSearchOpen 
            ? "bg-blue-50 text-blue-700 dark:bg-gray-800 dark:text-blue-400" 
            : "text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/60"
        }`}
      >
        {isSearchOpen ? <FaTimes /> : <FaSearch />}
      </button> */}

      {/* Hamburger Menu Button hidden  */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-xl sm:text-2xl w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-gray-200 active:scale-95 transition-all"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

    </div>

    {/* 🔍 Mobile Search Field Input Overlay */}
    {/* {isSearchOpen && (
      <div className="absolute top-20 left-0 right-0 px-4 sm:px-6 lg:left-auto lg:right-6 lg:w-64 z-50 animate-fadeIn">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2.5 rounded-full border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white outline-none shadow-xl focus:border-blue-500"
        />
      </div>
    )} */}

  </div>

  
  {/* 📱 Mobile Menu Dropdown  */}
  <div
    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          onClick={() => setIsMenuOpen(false)}
          className={`block px-6 py-3 border-b border-gray-50 dark:border-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-gray-800 ${
            location.pathname === menu.path
              ? "text-blue-700 dark:text-blue-400 font-semibold"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {menu.name}
        </Link>
      ))}
      <div className="p-4">
        <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-6 py-3 border-b border-gray-50 dark:border-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-gray-800 ${
              location.pathname === "/contact"
                ? "text-blue-700 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Contact Us
          </Link>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;