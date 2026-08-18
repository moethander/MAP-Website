import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeCourses = () => {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (

    <section className="pt-8 py-22 pb-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase">
            Our Courses
          </p>

          <h2 className="text-5xl font-black mt-4 text-gray-900 dark:text-white">
            Popular Courses
          </h2>

          <p className="text-gray-600 dark:text-slate-400 mt-4">
            Explore our professional courses and start your learning journey.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course._id}
           
              className="
              bg-white dark:bg-gray-800/90
              rounded-3xl
              shadow-lg
              overflow-hidden
              hover:-translate-y-3
              transition-all
              duration-500
              border border-transparent dark:border-gray-700
              "
            >
              {course.image && (
                <img
                  src={`http://localhost:4000/uploads/${course.image}`}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-6">
               
                <h3 className="text-2xl font-bold text-center mt-5 text-gray-900 dark:text-white group-hover:text-blue-900 transition">
                  {course.name}
                </h3>

                
                <Link
                  to={`/courses/${course._id}`}
                  className="mt-6 flex items-center justify-center gap-2 text-blue-900 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all"
                >
                  View Details
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Link to="/courses">
          <div className="text-center mt-12">
           
            <button className="px-10 py-4 rounded-full border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition duration-300">
              View All Courses
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HomeCourses;