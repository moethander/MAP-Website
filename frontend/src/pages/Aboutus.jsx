import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookOpen, FaBullseye, FaEye, FaFlag } from "react-icons/fa";
import API,{baseURL} from "../api";

const AboutUs = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/api/about")
    API
      .get("/api/about")
      .then((res) => {
        setAbout(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("About Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            Who We Are
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
            About Myanmar Academic Planet
          </h1>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 📖 Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-4">
              <FaBookOpen className="text-2xl" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Our Story
              </h2>
            </div>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4 text-sm md:text-base">
              {about?.storyDescription1}
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
            <img
              src={
                about?.imageUrl
                  // ? `http://localhost:4000/${about.imageUrl}`
                  ? `${baseURL}/${about.imageUrl}`
                  : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470"
              }
              alt="Our Story"
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* 🎯 Aim, Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Aim */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
              <FaFlag />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Aim
            </h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              {about?.aim}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
              <FaBullseye />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              {about?.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
              <FaEye />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              {about?.vision}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutUs;