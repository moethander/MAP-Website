import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FaGraduationCap, FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";

function CoursesDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/courses/${id}`)
      .then((res) => {
        console.log("data", res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [id]);

  if (!course) {
    return <div className="text-center p-10 font-semibold text-gray-500">Loading Course Details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      <h1 className="text-4xl font-black tracking-wider text-gray-900 uppercase font-sans mb-2">
        {course.name}
      </h1>
      
      <hr className="border-t-[3px] border-blue-900 w-full mb-8" />

     
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Available Classes
      </h2>

     
      {course.levels?.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white uppercase text-sm tracking-wider font-sans">
                <th className="p-4 rounded-l-xl">Class / Level</th>
                <th className="p-4">Course Fees</th>
                <th className="p-4">Time-Table</th>
                <th className="p-4 rounded-r-xl text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {course.levels.map((lvl, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Level Name နှင့် Icon */}
                  <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                    <FaGraduationCap className="text-blue-900 text-xl flex-shrink-0" />
                    <span>{lvl.name}</span>
                  </td>

                  
                  <td className="p-4 text-green-700 font-extrabold text-base">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-600 text-lg flex-shrink-0" />
                      <span>
                        {Number(lvl.fee) ? Number(lvl.fee).toLocaleString() : lvl.fee} MMK
                      </span>
                    </div>
                  </td>

                  
                  <td className="p-4 text-gray-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-orange-500 text-lg flex-shrink-0" />
                      <span>{lvl.time}</span>
                    </div>
                  </td>

                  
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                      <FaCheckCircle className="text-green-500" /> Open
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
         
        <div className="text-center p-8 bg-gray-50 rounded-xl border text-gray-500 font-medium">
          No Classes found for this course.
        </div>
      )}
    </div>
  );
}

export default CoursesDetail;