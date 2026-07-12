import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookOpen, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'; // Icon များ Import လုပ်ခြင်း

const Courses = () => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/courses")
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
    
      <h1 className="text-4xl font-black tracking-wider text-gray-900 uppercase font-sans mb-2">
        COURSES
      </h1>
      <hr className="border-t-[3px] border-blue-900 w-full mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-950 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
             
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 group-hover:text-blue-900 transition-colors">
                <FaBookOpen className="text-blue-900 text-xl flex-shrink-0" />
                <span>{course.name}</span>
              </h2>
              
              {/* Course Description */}
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
              {/* Start Date */}
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <FaCalendarAlt className="text-orange-400" />
                <span>Start: {course.startDate ? new Date(course.startDate).toLocaleDateString() : "TBA"}</span>
              </div>

              {/* View Detail*/}
              <span className="text-blue-900 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <FaArrowRight className="text-xs" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;