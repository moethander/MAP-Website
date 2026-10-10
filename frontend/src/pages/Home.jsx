import React, { useEffect, useState } from "react";
import axios from "axios";
import API,{baseURL} from "../api.js";
import {Link} from "react-router-dom";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import Hero from "../components/home/Hero.jsx";
import Stats from "../components/home/Stats.jsx";
import WhyChooseMAP from "../components/home/WhyChooseMap.jsx";
import HomeCourses from "../components/home/HomeCourses.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import ReviewForm from "../components/home/ReviewForm.jsx";
import ActivitiesPreview from "../components/home/ActivitiesPreview.jsx";
import GalleryPreview from "../components/home/GalleryPreview.jsx";
import HomeFAQs from "../components/home/HomeFAQs.jsx";
import HomeContact from "../components/home/HomeContact.jsx";
import Footer from "../components/Footer.jsx";

// Safe file path formatter
const formatMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.replace(/\\/g, "/");
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  return `${baseURL}${cleanPath}`;
};

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // const backendUrl = "http://localhost:4000/";
  const backendUrl = baseURL;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // const res = await axios.get("http://localhost:4000/api/home");
        const res = await API.get("/api/home");

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
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">

      <Hero homeData={homeData} backendUrl={backendUrl} />

      <WhyChooseMAP homeData={homeData} />

      <HomeCourses/>

      <Stats homeData={homeData}/>

      <Testimonials/>

      <ActivitiesPreview/>

      <GalleryPreview/>

      <HomeFAQs/>

      <HomeContact homeData={homeData}/>

      <Footer homeData={homeData}/>

      
      </div>
  
  );
};

export default Home;

