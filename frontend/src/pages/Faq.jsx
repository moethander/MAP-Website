import axios from "axios";
import API from "../api";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/api/faqs")
    API
      .get("/api/faqs")
      .then((res) => {
        setFaqs(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-5 transition-colors duration-300 overflow-hidden">
      
      {/* 🌟 Background Decorative Glows (ရိုးမနေစေရန် အလင်းဝိုင်းလေးများ ထည့်ခြင်း) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-400/15 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-medium text-sm mb-4 border border-blue-200 dark:border-blue-800/50">
            <FiHelpCircle className="text-base" />
            <span>Help Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
         Frequently Asked Questions
           </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Find answers to the questions that are most commonly asked.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12 font-medium">
            Loading FAQs...
          </div>
        )}

        {/* FAQ List */}
        {!loading && (
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq._id || index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-gray-800/90 shadow-xl border-blue-500/40 dark:border-blue-500/40 ring-1 ring-blue-500/20"
                      : "bg-white/80 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md border-gray-200/80 dark:border-gray-700/60"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                  >
                    <h2
                      className={`text-lg font-semibold transition-colors duration-200 leading-relaxed pr-4 ${
                        isOpen
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {faq.question}
                    </h2>

                    <div
                      className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${
                        isOpen
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 rotate-180"
                          : "bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-gray-700 group-hover:text-blue-600"
                      }`}
                    >
                      <FiChevronDown className="text-xl" />
                    </div>
                  </button>

                  {/* Answer Accordion */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700/40">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base pt-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && faqs.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
            No FAQs available right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;