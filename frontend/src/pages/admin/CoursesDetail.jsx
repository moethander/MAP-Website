import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // 👈 Link ကို Import လုပ်ပေးထားပါသည်
import axios from "axios";

// 👈 FaArrowLeft နဲ့ FaBookOpen တို့ကို Import ထဲ ထည့်ပေးထားပါသည်
import { 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaClock, 
  FaCheckCircle, 
  FaArrowLeft, 
  FaBookOpen 
} from "react-icons/fa";

function CoursesDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/courses/${id}`)
      .then((res) => {
        console.log("data", res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        // 🎯 API ခေါ်ပြီးပါက (Error တက်သည်ဖြစ်စေ၊ အဆင်ပြေသည်ဖြစ်စေ) Loading ကို ရပ်ပေးပါမည်
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 flex items-center justify-center font-semibold text-lg">
        Loading Course Details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center space-y-4">
        <p className="font-semibold text-lg">Course details not found.</p>
        <Link to="/courses" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          &larr; Back to All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ⬅️ Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-base md:text-lg font-bold text-blue-900 dark:text-blue-400 hover:underline"
        >
          <FaArrowLeft /> Back to Courses
        </Link>

        {/* 🚀 Header & Course Overview Banner */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider uppercase font-sans text-gray-900 dark:text-white">
              {course.name}
            </h1>
            <div className="w-16 h-1 bg-blue-900 dark:bg-blue-500 rounded-full"></div>
            
            {/* Course Description */}
            {course.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed pt-2">
                {course.description}
              </p>
            )}
          </div>

          {/* Image */}
          {course.image && (
            <img
              src={`http://localhost:4000/uploads/${course.image}`}
              alt={course.name}
              className="w-full md:w-64 h-40 object-cover rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            />
          )}
        </div>

        {/* 📌 Available Classes Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <FaBookOpen className="text-blue-900 dark:text-blue-400" />
            Available Classes
          </h2>

          {course.levels?.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm bg-white dark:bg-gray-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-900 dark:bg-blue-950 text-white uppercase text-xs md:text-sm tracking-wider font-sans">
                    <th className="p-4 rounded-l-2xl">Class / Level</th>
                    <th className="p-4">Course Fees</th>
                    <th className="p-4">Time-Table</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center rounded-r-2xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs md:text-sm font-medium">
                  {course.levels.map((lvl, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      
                      {/* Level Name */}
                      <td className="p-4 font-bold capitalize text-gray-800 dark:text-gray-200">
                        <div className="flex items-center gap-3">
                          <FaGraduationCap className="text-blue-900 dark:text-blue-400 text-lg flex-shrink-0" />
                          <span>{lvl.name}</span>
                        </div>
                      </td>

                      {/* Course Fee */}
                      <td className="p-4 text-emerald-600 dark:text-emerald-400 font-extrabold">
                        <div className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-emerald-500 text-base flex-shrink-0" />
                          <span>
                            {Number(lvl.fee) ? Number(lvl.fee).toLocaleString() : lvl.fee} MMK
                          </span>
                        </div>
                      </td>

                      {/* Time Table */}
                      <td className="p-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-amber-500 text-base flex-shrink-0" />
                          <span>{lvl.time}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                          <FaCheckCircle className="text-green-500" /> Open
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="p-4 text-center">
                        <Link
                          to="/contact"
                          className="inline-block px-4 py-2 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                        >
                          Enroll Now
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium">
              No Classes found for this course.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CoursesDetail;