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
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-white">
            <span className="inline-block bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
              {homeData.heroBadge || "Myanmar Academic Planet"}
            </span>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-extrabold mt-4 sm:mt-6 leading-snug sm:leading-tight break-words">
              {homeData.heroTitle || "Learn English With Confidence"}
            </h1>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed sm:leading-8">
              {homeData.heroDescription ||
                "Improve your English skills with experienced teacher, interactive lessons, and a supportive learning environment."}
            </p>

            {/* Buttons */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <a
                href={
                  homeData?.messengerPageId?.startsWith("http")
                    ? homeData.messengerPageId
                    : `https://m.me/${homeData?.messengerPageId || "Myanmar-Academic-Planet-1914656698655446"}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-white text-sm sm:text-base font-medium flex items-center gap-2 transition"
              >
                💬 Chat With Us
              </a>

              <Link
                to="/placement-test"
                className="w-full sm:w-auto justify-center flex items-center gap-2 border border-white text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-sm sm:text-base hover:bg-white hover:text-black transition"
              >
                📝 Placement Test
              </Link>
            </div>

            {/* Features */}
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-x-5 gap-y-2 sm:gap-6 text-xs sm:text-base text-gray-200">
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