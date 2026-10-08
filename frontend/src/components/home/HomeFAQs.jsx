import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../api";

const HomeFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    // axios
    //   .get("http://localhost:4000/api/faqs")
    API
      .get("/api/faqs")
      .then((res) => {
       
        setFaqs(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("FAQ Preview Error:", err);
        setLoading(false);
      });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <section className="py-12 bg-white dark:bg-gray-900 w-full transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        
        <div className="text-center mb-10">
          <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            Have Questions?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
            Frequent Questions
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        
        <div className="space-y-4">
          {loading ? (
            
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse border border-gray-200 dark:border-gray-700"
              ></div>
            ))
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                
                <div
                  key={faq._id || index}
                  className="bg-gray-50/60 dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/70 transition-all duration-300"
                >
                  
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left p-6 font-bold text-gray-800 dark:text-white text-base md:text-lg focus:outline-none"
                  >
                    <span>{faq.question || faq.title}</span>
                    <span
                      className={`text-xl font-light text-blue-600 dark:text-blue-400 transform transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      ＋
                    </span>
                  </button>

                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "max-h-48 border-t border-gray-200/80 dark:border-gray-700/70 p-6 text-gray-600 dark:text-slate-400 leading-relaxed text-sm md:text-base"
                        : "max-h-0"
                    }`}
                  >
                    {faq.answer || faq.description}
                  </div>
                </div>
              );
            })
          ) : (
           
            <div className="text-center text-gray-500 dark:text-slate-400 py-6">
              No FAQs available.
            </div>
          )}
        </div>

        
        <div className="flex justify-center mt-12">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl text-sm shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            See All FAQs
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

export default HomeFAQs;