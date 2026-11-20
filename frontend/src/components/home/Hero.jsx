import React from "react";
import { Link } from "react-router-dom";

// Safe file path formatter
const formatMediaUrl = (path, backendUrl = "") => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.replace(/\\/g, "/");
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  const base = typeof backendUrl === "string" && backendUrl ? backendUrl : typeof baseURL !== "undefined" ? baseURL : "";
  return `${base}${cleanPath}`;
};

const Hero = ({ homeData, backendUrl }) => {
  if (!homeData?.bannerImage) return null;

  return (
    <div className="w-full overflow-x-clip text-white dark:text-gray-100">
      <section className="relative min-h-[75svh] sm:min-h-[85svh] lg:h-screen w-full py-10 sm:py-14 lg:py-0 flex items-center">
        {/* Background Image */}
        <img
          src={formatMediaUrl(homeData.bannerImage, backendUrl)}
          alt="MAP English Center"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-3xl text-white">
            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              {homeData.heroBadge || " Myanmar Academic Planet"}
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              {homeData.heroTitle || "Learn English With Confidence"}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-8">
              {homeData.heroDescription ||
                "Improve your English skills with experienced teacher, interactive lessons, and a supportive learning environment."}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={
                  homeData?.messengerPageId?.startsWith("http")
                    ? homeData.messengerPageId
                    : `https://m.me/${
                        homeData?.messengerPageId ||
                        "Myanmar-Academic-Planet-1914656698655446"
                      }`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white font-medium flex items-center gap-2 transition inline-flex"
              >
                💬 Chat With Us
              </a>

              <Link
                to="/placement-test"
                className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                📝 Placement Test
              </Link>
            </div>

            {/* Features */}
            <div className="mt-10 flex flex-wrap gap-6 text-gray-200">
              <span>✔ Qualified Teachers</span>

              <span>✔ Placement Test</span>

              <span>✔ Messenger AI Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;