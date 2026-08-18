import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [terms, setTerms] = useState("");
  const [testLink, setTestLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    fetchPlacementTest();
  }, []);

  const fetchPlacementTest = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/placement-test");

      if (res.data) {
        setTerms(res.data.terms || "");
        setTestLink(res.data.testLink || "");
        setBannerImage(res.data.bannerImage || "");
      }
    } catch (error) {
      console.log("Error fetching placement test data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (!testLink) {
      alert("Placement Test Link Not Found!");
      return;
    }

    window.open(testLink, "_blank");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 🚀 Hero Banner (Banner ကို သီးသန့် အပေါ်မှာပဲ ထားထားပါသည်) */}
      <section className="relative h-[220px] md:h-[280px] w-full overflow-hidden">
        <img
          src={
            bannerImage
              ? `http://localhost:4000/uploads/${bannerImage}`
              : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600"
          }
          alt="Placement Test Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Clean Text */}
        <div className="absolute inset-0 bg-slate-900/75 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
            Placement Test
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-300 max-w-lg font-light">
            Test your knowledge and begin your learning journey.
          </p>
        </div>
      </section>

      {/* 📦 Main Content Area (Banner အောက်မှ သန့်သန့်ရှင်းရှင်း စတင်ပါမည်) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* 📋 Terms Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-400">
              Terms & Conditions
            </h2>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-400 font-medium">
              Loading terms and conditions...
            </div>
          ) : (
            <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base font-sans">
              {terms || "No terms available at the moment."}
            </div>
          )}
        </div>

        {/* 🎯 Ready Section (Call to Action Card) */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-800 rounded-2xl shadow-md p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Ready to Take the Test?
          </h2>

          <p className="text-blue-100 mt-2 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Please read all the terms carefully before starting the placement
            test. Once you're ready, click the button below.
          </p>

          <button
            onClick={handleStartTest}
            className="mt-6 bg-white hover:bg-blue-50 text-blue-900 active:scale-95 px-8 py-3 rounded-full text-sm md:text-base font-bold shadow-md transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>🚀</span> Start Placement Test
          </button>
        </div>
      </main>
    </div>
  );
};

export default Test;