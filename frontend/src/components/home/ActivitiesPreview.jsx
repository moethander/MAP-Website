import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const ActivitiesPreview = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState({});

  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/activities");
      const latestData = Array.isArray(res.data) ? res.data : [];
      setActivities(latestData.slice(0, 3));
    } catch (error) {
      console.log("Error fetching activities preview:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const nextImage = (e, id, total) => {
    e.preventDefault();
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % total,
    }));
  };

  const prevImage = (e, id, total) => {
    e.preventDefault();
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + total) % total,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500 dark:text-gray-400 font-semibold">
        Loading latest activities...
      </div>
    );
  }

  if (activities.length === 0) return null;

  return (
    
    <section className="pb-16 md:pt-6 md:pb-24 bg-slate-50 dark:bg-gray-900 w-full overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">
            Campus Life
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2 leading-tight">
            Our Latest Activities
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
          
          <p className="text-gray-500 dark:text-slate-400 mt-5 text-sm md:text-base leading-relaxed">
            Explore the vibrant campus life, workshops, seminars, and fun events happening at Myanmar Academic Planet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {activities.map((activity) => {
            const imgIndex = currentImage[activity._id] ?? 0;
            const hasMultipleImages = activity.images && activity.images.length > 1;

            return (
              <div
                key={activity._id}
                className="group bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100/50 dark:border-gray-700/60 flex flex-col justify-between h-full"
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                  <img
                    src={
                      activity.images && activity.images[imgIndex]
                        ? activity.images[imgIndex]
                        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470"
                    }
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Slider Buttons */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={(e) => prevImage(e, activity._id, activity.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs transition z-10"
                      >
                        ❮
                      </button>
                      <button
                        onClick={(e) => nextImage(e, activity._id, activity.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs transition z-10"
                      >
                        ❯
                      </button>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {activity.images.map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === imgIndex ? "bg-white scale-110" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Topic Label */}
                  {activity.topic && (
                    <span className="absolute top-4 left-4 bg-blue-700 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10">
                      {activity.topic}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {activity.date && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-400">
                          <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                          <span>{activity.date}</span>
                        </div>
                      )}
                      
                      {activity.theme && (
                        <span className="bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-400 font-semibold px-2 py-0.5 rounded text-[11px] border border-transparent dark:border-green-800/40">
                          🎯 {activity.theme}
                        </span>
                      )}
                    </div>

                    
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition duration-300 line-clamp-2">
                      {activity.title}
                    </h3>

                    
                    <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm line-clamp-3 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <Link
                    to="/activities"
                    className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mt-6 text-sm group/btn"
                  >
                    Read More 
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/activities"
            className="inline-flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-600/20 dark:shadow-blue-500/10 hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group text-sm md:text-base"
          >
            View All Activities
            <FaArrowRight className="group-hover:translate-x-1.5 transition duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ActivitiesPreview;