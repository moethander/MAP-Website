import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API,{baseURL} from "../api";
import { FaBookOpen, FaCalendarAlt, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import { baseURL } from "../api";

const Courses = () => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    API
      // .get("http://localhost:4000/api/courses")
      .get("/api/courses")
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "TBA" : date.toLocaleDateString();
  };

  return (
    /* 🎯 ဤနေရာတွင် bg-white dark:bg-gray-900 နှင့် min-h-screen ထည့်ထားပါသည် */
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 🚀 Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider uppercase font-sans">
            OUR COURSES
          </h1>
          <div className="w-20 h-1.5 bg-blue-900 dark:bg-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* 📌 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-900 dark:hover:border-blue-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Upper Content */}
              <div>
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden relative flex items-center justify-center">
                  {course.image ? (
                    <img
                      // src={`http://localhost:4000/uploads/${course.image}`}
                      src={`${baseURL}/uploads/${course.image}`}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                      <FaGraduationCap className="text-5xl mb-2 text-gray-300 dark:text-gray-600" />
                      <span className="text-xs font-semibold">No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                    <FaBookOpen className="text-blue-900 dark:text-blue-400 text-lg flex-shrink-0" />
                    <span className="line-clamp-1">{course.name}</span>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                    {course.description || "No description available for this course."}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-sm mt-auto">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-xs md:text-sm">
                  <FaCalendarAlt className="text-orange-400 dark:text-amber-400 text-base" />
                  <span>Start: {formatDate(course.startDate)}</span>
                </div>

                <span className="text-blue-900 dark:text-blue-400 font-bold text-xs md:text-sm flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                  Details <FaArrowRight className="text-xs" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;