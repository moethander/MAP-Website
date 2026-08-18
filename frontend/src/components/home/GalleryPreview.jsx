import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GalleryPreview = () => {
  const [previewItems, setPreviewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/gallery")
      .then((res) => {
        
        const imagesOnly = res.data.filter((item) => item.type === "image");
        setPreviewItems(imagesOnly.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gallery Preview Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    
    <section className="py-7 bg-gray-50 dark:bg-gray-900 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm">
              Visual Tour
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2 leading-none">
              Our Campus Gallery
            </h2>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>

        {/* 📸 Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-square animate-pulse border border-gray-300 dark:border-gray-700"
              ></div>
            ))
          ) : previewItems.length > 0 ? (
            previewItems.map((item) => (
              
              <div
                key={item._id}
                className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800 aspect-square shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <img
                  src={`http://localhost:4000/${item.url}`}
                  alt="Campus preview"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    Campus View
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* 🎯 ၅။ No image state: dark:bg-gray-800, dark:border-gray-700 & dark:text-slate-400 */
            <div className="text-center text-gray-500 dark:text-slate-400 col-span-4 py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              No gallery preview available.
            </div>
          )}
        </div>

        {/* 🎯 ၆။ View Full Gallery Button */}
        <div className="flex justify-center mt-14">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore All Gallery
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;