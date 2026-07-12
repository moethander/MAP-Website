// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="w-full bg-white py-8 border-t border-gray-200 mt-10">
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
//         {/* Useful Link */}
//         <div className="text-red-500 font-bold text-lg">
//           Useful Link
//         </div>

//         {/* Icons Area */}
//         <div className="flex items-center gap-6">
//           <span className="text-2xl font-bold">»»»</span>
//           <a href="https://facebook.com" target="_blank" rel="noreferrer">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" className="h-8" />
//           </a>
//           <a href="https://youtube.com" target="_blank" rel="noreferrer">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="h-8" />
//           </a>
//         </div>
//       </div>
      
//       {/* အောက်ဆုံး အပြာရောင်တန်းလေး */}
//       <div className="w-full bg-blue-700 h-10 mt-6"></div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* School Info */}

          <div>

            <h2 className="text-3xl font-bold mb-4">
              Your School
            </h2>

            <p className="text-blue-100 leading-7">
              We are committed to providing quality education and helping
              students build a brighter future.
            </p>

          </div>

          {/* Useful Links */}

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Useful Links
            </h2>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-300 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-yellow-300 transition"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  to="/activities"
                  className="hover:text-yellow-300 transition"
                >
                  Activities
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-yellow-300 transition"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-300 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Contact Us
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Your School Address</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+95 9 123456789</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>info@yourschool.com</span>
              </div>

            </div>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white text-blue-700 flex items-center justify-center hover:bg-blue-200 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-200 transition"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-blue-500">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">

          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} Your School. All Rights Reserved.
          </p>

          <p className="text-blue-100 text-sm mt-3 md:mt-0">
            Designed with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;