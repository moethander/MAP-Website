import React from "react";
import {Link} from 'react-router-dom';

const Hero = ({ homeData, backendUrl }) => {
  

  return (
    <div className="text-white dark:text-gray-100">
      {homeData.bannerImage && (
        <section className="relative h-screen">
          {/* Background Image */}
          <img
            src={`${backendUrl}${homeData.bannerImage.replace(/\\/g, "/")}`}
            alt="MAP English Center"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

          {/* Hero Content */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
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
                      : `https://m.me/${homeData?.messengerPageId || "Myanmar-Academic-Planet-1914656698655446"}`
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
      )}
    </div>
  );
};

export default Hero;
