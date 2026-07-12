// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from "react-icons/fa";
// import logo from '../assets/logo.jpg';

// const Navbar = () => {
//   const [isCoursesOpen, setIsCoursesOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="flex justify-between items-center p-6">
//         <Link to="/" className="flex items-center gap-x-4">
//           <img src={logo} alt="MAP Logo" className="h-12 w-auto" />
//           <span className="text-xl font-bold">Myanmar Academic Planet</span>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden text-2xl"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex items-center space-x-8 font-medium text-gray-700">
//           <li>
//             <Link to="/" className="hover:text-blue-600 ">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/courses" className="hover:text-blue-600 ">
//               Courses
//             </Link>
//           </li>
//           <li>
//             <Link to="/timetable" className="hover:text-blue-600 ">
//               Time-Table
//             </Link>
//           </li>
//           <li>
//             <Link to="/placement-test" className="hover:text-blue-600 ">
//               Placement Test
//             </Link>
//           </li>
//           <li>
//             <Link to="/activities" className="hover:text-blue-600 ">
//               Activities and Events
//             </Link>
//           </li>
//           <li>
//             <Link to="/gallery" className="hover:text-blue-600 ">
//               Gallery
//             </Link>
//           </li>
//           <li>
//             <Link to="/faq" className="hover:text-blue-600 ">
//               FAQs
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="bg-blue-800 text-white px-5 py-2 rounded-full"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {isMenuOpen && (
//         <ul className="lg:hidden flex flex-col items-center gap-4 pb-6 font-medium text-gray-700">
//           <li>
//             <Link
//               to="/"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/courses"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Courses
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/timetable"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Time-Table
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/placement-test"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Placement Test
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/activities"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Activities
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/gallery"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Gallery
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/faq"
//               className="hover:text-blue-600 "
//               onClick={() => setIsMenuOpen(false)}
//             >
//               FAQs
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/contact"
//               className="bg-blue-800 text-white px-5 py-2 rounded-full"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// {/* className="hover:text-black-600 */}

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menus = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Time Table", path: "/timetable" },
    { name: "Placement Test", path: "/placement-test" },
    { name: "Activities", path: "/activities" },
    { name: "Gallery", path: "/gallery" },
    { name: "FAQs", path: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 shadow-md">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
          />

          <div>

            <h1 className="text-xl font-bold text-blue-800">
              Myanmar Academic Planet
            </h1>

            <p className="text-xs text-gray-500">
              Learn • Grow • Achieve
            </p>

          </div>

        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-7">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`transition font-medium hover:text-blue-700 ${
                location.pathname === menu.path
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "text-gray-700"
              }`}
            >
              {menu.name}
            </Link>

          ))}

          <Link
            to="/contact"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition shadow-lg"
          >
            Contact Us
          </Link>

        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-2xl text-blue-700"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >

        <div className="bg-white border-t">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-6 py-4 border-b hover:bg-blue-50 ${
                location.pathname === menu.path
                  ? "text-blue-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {menu.name}
            </Link>

          ))}

          <div className="p-5">

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-full"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;