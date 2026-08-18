import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";

const HomeContactCTA = ({ homeData }) => {
  return (
    /* 🎯 ၁။ Section Background: dark:bg-gray-900 ပြောင်းထားပါသည် */
    <section className="pb-16 pt-4 bg-white dark:bg-gray-900 w-full transition-colors duration-300">
      <div className="max-w-md mx-auto px-6">
        
        {/* 🌟 အပြာရောင် Card (Dark Mode မှာ ပိုပြီး လှပသည့် Dark Gradient သုံးထားပါသည်) */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 text-white rounded-[24px] p-8 text-center shadow-lg border border-transparent dark:border-blue-900/40 relative overflow-hidden">
          
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-400/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>

          <h3 className="text-xl md:text-2xl font-extrabold mt-4 mb-2 text-white">
            Connect With Us
          </h3>
          
          {/* 🎯 2. Description Text: dark:text-slate-300 ကို သုံးထားပါသည် */}
          <p className="text-gray-300 dark:text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
            Have questions? Contact us directly or follow our official social media channels.
          </p>

          {/* 🎯 Main Contact Button */}
          <div className="mb-6">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex w-full justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 text-sm"
            >
              <FaEnvelope /> Write a Message
            </Link>
          </div>

          {/* 🌐 Social Links */}
          {(homeData?.facebookLink || homeData?.youtubeLink) && (
            <div className="flex items-center justify-center gap-5 border-t border-white/10 dark:border-white/15 pt-5">
              
              {/* Facebook Link */}
              {homeData.facebookLink && (
                <a
                  href={homeData.facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/15 hover:bg-blue-600 dark:hover:bg-blue-600 text-white flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>
              )}

              {/* YouTube Link */}
              {homeData.youtubeLink && (
                <a
                  href={homeData.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/15 hover:bg-red-600 dark:hover:bg-red-600 text-white flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  title="YouTube"
                >
                  <FaYoutube />
                </a>
              )}
              
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HomeContactCTA;