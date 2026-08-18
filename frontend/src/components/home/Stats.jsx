import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaAward,
  FaGlobe,
} from "react-icons/fa";

const Stats = ({ homeData }) => {
  
  const statsData = [
    {
      icon: <FaUserGraduate />,
      number: homeData?.studentsCount || "500+",
      title: "Students",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <FaChalkboardTeacher />,
      number: homeData?.teachersCount || "15+",
      title: "Teachers",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: <FaAward />,
      number: homeData?.successRate || "98%",
      title: "Success Rate",
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      icon: <FaGlobe />,
      number: homeData?.yearsExperience || "10+",
      title: "Years Experience",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (

    <section className="mt-0 relative z-20 px-6 pt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {statsData.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-transparent dark:border-gray-700"
            >
              <div
                className={`text-5xl mb-5 flex justify-center ${item.color}`}
              >
                {item.icon}
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-500 dark:text-slate-400 font-medium">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;