import React, { useEffect, useState } from "react";
import axios from "axios";
import API,{baseURL} from "../api";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"
  );

  // Toggle Dark Mode Handler
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Safe file path formatter
  const formatMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const normalizedPath = path.replace(/\\/g, "/");
    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
    // return `http://localhost:4000${cleanPath}`;
    return `${baseURL}${cleanPath}`;
  };

  // Safe YouTube Embed Parser
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      if (url.includes("watch?v=")) {
        const id = new URL(url).searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]?.split("?")[0];
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
      if (url.includes("/shorts/")) {
        const id = url.split("/shorts/")[1]?.split("?")[0];
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
    }
    return url;
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/api/gallery/banner")
    API
      .get("/api/gallery/banner")
      .then((res) => {
        if (res.data && res.data.url) {
          setBannerUrl(formatMediaUrl(res.data.url));
        }
      })
      .catch((err) => console.error("Banner fetch error:", err));

    // axios
    //   .get("http://localhost:4000/api/gallery")
     API
      .get("/api/gallery")
      .then((res) => setItems(res.data || []))
      .catch((err) => console.error("Gallery items fetch error:", err));
  }, []);

  const galleryOnlyItems = items.filter((item) => item.type !== "banner");

  const filteredItems =
    filter === "all"
      ? galleryOnlyItems
      : galleryOnlyItems.filter((item) => item.type === filter);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300">
        
        {/* Banner Section */}
        <section className="relative h-[320px]">
          <img
            src={bannerUrl}
            className="w-full h-full object-cover"
            alt="Gallery Banner"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
           
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold">Gallery</h1>
              <p className="mt-4 text-lg">Explore our photos and videos.</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-5 py-16">
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "image", "video", "youtube"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  filter === type
                    ? "bg-blue-600 text-white shadow-lg dark:bg-blue-500"
                    : "bg-white text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "image"
                  ? "Photos"
                  : type === "video"
                  ? "Videos"
                  : "YouTube"}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                {item.type === "image" && (
                  <img
                    src={formatMediaUrl(item.url)}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                )}

                {item.type === "video" && (
                  <video controls className="w-full h-64 object-cover">
                    <source src={formatMediaUrl(item.url)} />
                    Your browser does not support the video tag.
                  </video>
                )}

                {item.type === "youtube" && (
                  <iframe
                    className="w-full h-64"
                    src={getEmbedUrl(item.url)}
                    title={item.title || "YouTube Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 capitalize">
                    {item.title || item.type}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {item.description || `Our latest ${item.type}.`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-400 text-xl">
              No gallery items found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;