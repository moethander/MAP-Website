import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WhyChooseMAP = ({ homeData }) => {
  const navigate = useNavigate();
  const [showStoryModal, setShowStoryModal] = useState(false);

  const features = [
    {
      icon: homeData?.feature1Image 
        ? `http://localhost:4000/${homeData.feature1Image.replace("\\", "/")}` 
        : "",
      title: homeData?.feature1Title || "Quality Education",
      desc: homeData?.feature1Description || "Modern learning methods designed to build strong knowledge and skills.",
    },
    {
      icon: homeData?.feature2Image 
        ? `http://localhost:4000/${homeData.feature2Image.replace("\\", "/")}` 
        : "",
      title: homeData?.feature2Title || "Expert Teachers",
      desc: homeData?.feature2Description || "Learn with experienced instructors who guide students effectively.",
    },
    {
      icon: homeData?.feature3Image 
        ? `http://localhost:4000/${homeData.feature3Image.replace("\\", "/")}` 
        : "",
      title: homeData?.feature3Title || "Professional Growth",
      desc: homeData?.feature3Description || "Develop skills and achieve certificates for future success.",
    },
  ];

  const renderTitle = () => {
    if (!homeData?.whyChooseTitle) {
      return (
        <>
          Building{" "}<span className="text-blue-600 dark:text-blue-400">Future</span> Through{" "}
          <span className="text-blue-600 dark:text-blue-400">Education</span>
        </>
      );
    }

    const words = homeData.whyChooseTitle.split(" ");
    return words.map((word, index) => (
      <span key={index}>
        {index === 1 || index === words.length - 1 ? (
          <span className="text-blue-600 dark:text-blue-400">{word}</span>
        ) : (
          word
        )}
        {" "}
      </span>
    ));
  };

  return (
    <section
      className="
      relative
      py-28 pb-12
      overflow-hidden
      transition-colors duration-300
      bg-gradient-to-br
      from-blue-100 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-slate-950" 
    >
      {/* 🎯 1. Background Shapes - Dark Mode မှာ အရောင်မှိန်ပေးထားပါတယ် */}
      <div
        className="
        absolute
        top-10
        left-10
        w-40
        h-40
        bg-blue-300 dark:bg-blue-600
        rounded-full
        blur-3xl
        opacity-30 dark:opacity-10
        "
      />

      <div
        className="
        absolute
        bottom-10
        right-10
        w-52
        h-52
        bg-purple-300 dark:bg-purple-600
        rounded-full
        blur-3xl
        opacity-30 dark:opacity-10
        "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-8
        grid
        md:grid-cols-2
        gap-16
        items-center
        "
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 🎯 text-blue-600 dark:text-blue-400 ပြောင်းထားသည် */}
          <p className="text-blue-600 dark:text-blue-400 font-bold tracking-[5px] uppercase">
            WHY CHOOSE M-A-P ?
          </p>

          {/* 🎯 text-gray-900 dark:text-white ခံထားသည် */}
          <h2 className="text-5xl font-black mt-5 leading-tight text-gray-900 dark:text-white">
            {renderTitle()}
          </h2>

          {/* 🎯 text-gray-600 dark:text-gray-300 ပြောင်းထားသည် */}
          <p className="mt-6 text-gray-600 dark:text-slate-400 text-lg leading-relaxed">
            {homeData.whyChooseDescription
              ? homeData.whyChooseDescription
              : "Myanmar Academic Planet provides quality education with experienced teachers, practical learning and opportunities for students."}
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={() => navigate("/about")}
            className="mt-8 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-lg focus:outline-none"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="space-y-7">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              
              className="flex gap-6 items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-7 rounded-3xl shadow-xl border border-white dark:border-gray-700 transition-colors duration-300"
            >
              {/* Icon Container: dark:bg-gray-700 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 rounded-3xl bg-blue-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={item.icon}
                  className="w-14 h-14 object-contain"
                  alt={item.title}
                />
              </motion.div>

              <div>
                {/* 🎯 Title & Desc အရောင်များကို dark ညှိထားသည် */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMAP;