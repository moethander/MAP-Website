// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar.jsx';
// import axios from "axios";

// const Home = () => {
//   const [homeData, setHomeData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/home");
//         if (res.data.success && res.data.home) {
//           setHomeData(res.data.home);
//         }
//       } catch (error) {
//         console.error("Error fetching home data for user side:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHomeData();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-10 font-semibold">Loading...</div>;
//   }

//   if (!homeData) {
//     return <div className="text-center p-10">Welcome to our Website!</div>;
//   }

//   const backendUrl = "http://localhost:4000/";

//   return (
//     <div className="w-full">
      
//       {/* ၁။ Banner Section */}
//       {homeData.bannerImage && (
//         <div className="w-full h-[400px] overflow-hidden relative">
//           <img
//             src={`${backendUrl}${homeData.bannerImage.replace(/\\/g, "/")}`}
//             alt="Banner"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        
//         {/* ၂။ Our Story Section */}
//         <section className="text-center max-w-3xl mx-auto space-y-4">
//           <h2 className="text-3xl font-bold text-gray-800">
//             {homeData.storyTitle || "Our Story"}
//           </h2>
//           <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//             {homeData.storyDescription}
//           </p>
//         </section>
        
        
//         <section className="grid md:grid-cols-2 gap-10">
          
//           {/* Vision */}
//           <div className="border rounded-xl overflow-hidden shadow-sm bg-white p-6 space-y-4">
//             {homeData.visionImage && (
//               <img
//                 src={`${backendUrl}${homeData.visionImage.replace(/\\/g, "/")}`}
//                 alt="Vision"
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//             )}
//             <h3 className="text-2xl font-bold text-gray-800">{homeData.visionTitle || "Our Vision"}</h3>
//             <p className="text-gray-600 whitespace-pre-line">{homeData.visionDescription}</p>
//           </div>

//           {/* Mission */}
//           <div className="border rounded-xl overflow-hidden shadow-sm bg-white p-6 space-y-4">
//             {homeData.missionImage && (
//               <img
//                 src={`${backendUrl}${homeData.missionImage.replace(/\\/g, "/")}`}
//                 alt="Mission"
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//             )}
//             <h3 className="text-2xl font-bold text-gray-800">{homeData.missionTitle || "Our Mission"}</h3>
//             <p className="text-gray-600 whitespace-pre-line">{homeData.missionDescription}</p>
//           </div>

//         </section>

//         {/* ၄။ Our Aims Section */}
//         <section className="bg-gray-50 p-8 rounded-2xl text-center space-y-4">
//           <h2 className="text-3xl font-bold text-gray-800">
//             {homeData.aimTitle || "Our Aims"}
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
//             {homeData.aimDescription}
//           </p>
//         </section>

//         {/* ၅။ Footer / Social Links */}
//         <section className="text-center pt-6 border-t space-y-3">
//           <h4 className="font-semibold text-gray-700">Connect With Us</h4>
//           <div className="flex justify-center gap-6">
//             {homeData.facebookLink && (
//               <a
//                 href={homeData.facebookLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline font-medium"
//               />
//             )}
//             {homeData.youtubeLink && (
//               <a
//                 href={homeData.youtubeLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-red-600 hover:underline font-medium"
//               />
//             )}
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://localhost:4000/";

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/home");

        if (res.data.success) {
          setHomeData(res.data.home);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-blue-700">
        Loading...
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        No Data Found
      </div>
    );
  }

  return (
    <div className="bg-slate-100">

      {/* Hero Banner */}

      {homeData.bannerImage && (
        <section className="relative h-[550px]">

          <img
            src={`${backendUrl}${homeData.bannerImage.replace(/\\/g, "/")}`}
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">

            <div className="text-center text-white px-5">

              <h1 className="text-5xl md:text-6xl font-bold mb-5">
                Welcome To Our School
              </h1>

              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Education is the key to success. Learn today and lead tomorrow.
              </p>

            </div>

          </div>

        </section>
      )}

      <div className="max-w-7xl mx-auto px-5 py-20 space-y-24">

        {/* Our Story */}

        <section className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
            {homeData.storyTitle}
          </h2>

          <p className="text-gray-600 text-lg leading-9 whitespace-pre-line text-center">
            {homeData.storyDescription}
          </p>

        </section>

        {/* Vision Mission */}

        <section className="grid md:grid-cols-2 gap-10">

          {/* Vision */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            {homeData.visionImage && (
              <img
                src={`${backendUrl}${homeData.visionImage.replace(/\\/g, "/")}`}
                alt=""
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-8">

              <h2 className="text-3xl font-bold text-blue-700 mb-5">
                {homeData.visionTitle}
              </h2>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {homeData.visionDescription}
              </p>

            </div>

          </div>

          {/* Mission */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            {homeData.missionImage && (
              <img
                src={`${backendUrl}${homeData.missionImage.replace(/\\/g, "/")}`}
                alt=""
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-8">

              <h2 className="text-3xl font-bold text-blue-700 mb-5">
                {homeData.missionTitle}
              </h2>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {homeData.missionDescription}
              </p>

            </div>

          </div>

        </section>

        {/* Aim */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 shadow-xl p-14">

          <h2 className="text-4xl font-bold text-center text-white mb-8">
            {homeData.aimTitle}
          </h2>

          <p className="text-white text-lg leading-9 text-center whitespace-pre-line max-w-5xl mx-auto">
            {homeData.aimDescription}
          </p>

        </section>

        {/* Social */}

        <section className="bg-white rounded-3xl shadow-xl p-12 text-center">

          <h2 className="text-4xl font-bold text-blue-700 mb-8">
            Connect With Us
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">

            {homeData.facebookLink && (
              <a
                href={homeData.facebookLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg transition"
              >
                <FaFacebookF />
                Facebook
              </a>
            )}

            {homeData.youtubeLink && (
              <a
                href={homeData.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg transition"
              >
                <FaYoutube />
                YouTube
              </a>
            )}

          </div>

        </section>

      </div>
    </div>
  );
};

export default Home;

