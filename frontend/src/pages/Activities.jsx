import { useEffect, useState } from "react";
import axios from "axios";
import API,{baseURL} from "../api";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState({});

  // Safe file path formatter
const formatMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.replace(/\\/g, "/");
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  return `${baseURL}${cleanPath}`;
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Activities List
        // const resActivities = await axios.get("http://localhost:4000/api/activities");
        const resActivities = await API.get("/api/activities");
        setActivities(resActivities.data);

        // 2. Fetch Hero Banner Image
        // const resBanner = await axios.get("http://localhost:4000/api/activities/banner");
        const resBanner= await API.get("/api/activities/banner");
        if (resBanner.data?.bannerImage) {
          setBanner(resBanner.data.bannerImage);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextImage = (id, total) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % total,
    }));
  };

  const prevImage = (id, total) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + total) % total,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-blue-700 bg-gray-50 dark:bg-gray-900">
        Loading Activities...
      </div>
    );
  }

  // 🎯 Banner Image URL Format စစ်ဆေးခြင်း
  const bannerSrc = banner 
  ? formatMediaUrl(banner) 
  : "https://images.unsplash.com/photo-1523050854058-8df90110c9f0?w=1600";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300">

      {/* 🚀 Dynamic Hero Banner */}
      <section className="relative h-[250px] md:h-[350px] w-full bg-slate-900 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Dynamic Background Image */}
        <img
          src={bannerSrc}
          alt="Activities Hero Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-50 transition-opacity duration-300"
        />

        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

        {/* Overlay Container */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Activities & Events
          </h1>
          <p className="mt-3 text-sm md:text-lg text-gray-100 font-light drop-shadow">
            Explore our latest school activities and memorable moments.
          </p>
        </div>
      </section>

      {/* 📦 Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => {
            const index = currentImage[activity._id] ?? 0;
            const images = activity.images || [];

            return (
              <div
                key={activity._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >

                {/* 🖼️ Activity Image Slider */}
                <div className="relative h-60 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden group">
                  {images.length > 0 ? (
                    <img
                      src={formatMediaUrl(images[index])}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image Available
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(activity._id, images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                      >
                        ❮
                      </button>

                      <button
                        onClick={() => nextImage(activity._id, images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                      >
                        ❯
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* 📝 Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {activity.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.date && (
                        <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                          📅 {activity.date}
                        </span>
                      )}

                      {activity.theme && (
                        <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                          🎯 {activity.theme}
                        </span>
                      )}

                      {activity.topic && (
                        <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                          📚 {activity.topic}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {activity.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {activities.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium">
            No activities available at the moment.
          </div>
        )}

      </main>
    </div>
  );
}

export default Activities;