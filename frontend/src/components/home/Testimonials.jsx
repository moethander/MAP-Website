import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import API from "../../api";

const Testimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  const fetchReviews = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/api/reviews");
      const res = await API.get("/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3">
            What Our Students Say
          </h2>

          <p className="text-gray-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Hear from our students about their learning journey with Myanmar
            Academic Planet.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-8 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Write a Review
          </button>
        </div>

        {/* Cards */}
        {reviews.length === 0 ? (
          
          <div
            className="
              max-w-3xl
              mx-auto
              bg-gradient-to-br
              from-blue-50 to-white
              dark:from-gray-800 dark:to-gray-850
              rounded-[32px]
              p-10
              shadow-lg
              border
              border-blue-100 dark:border-gray-700
              text-center
            "
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-700 dark:bg-blue-600 flex items-center justify-center mb-6">
              <FaQuoteLeft className="text-white text-2xl" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Be The First To Share Your Experience
            </h3>

            
            <p className="text-gray-500 dark:text-slate-400 leading-7 max-w-xl mx-auto">
              Your feedback helps future students understand the learning
              experience at Myanmar Academic Planet.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-7 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Write Your First Review
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {reviews.map((review) => (
              <div
                key={review._id}
                
                className="
                  group
                  relative
                  bg-white dark:bg-gray-800
                  rounded-[32px]
                  p-6 md:p-8
                  shadow-xl
                  border
                  border-gray-100/80 dark:border-gray-700
                  hover:-translate-y-3
                  transition-all
                  duration-300
                  overflow-hidden
                  flex flex-col justify-between
                "
              >
                
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-50 dark:bg-gray-700 rounded-full opacity-70 dark:opacity-20 group-hover:scale-125 transition duration-500 pointer-events-none" />

                <div>
                  
                  <div className="relative w-12 h-12 rounded-2xl bg-blue-700 dark:bg-blue-600 flex items-center justify-center mb-6">
                    <FaQuoteLeft className="text-white text-lg" />
                  </div>

                  
                  <div className="flex gap-1 mb-5">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 text-lg" />
                    ))}
                  </div>

                 
                  <p className="relative text-gray-600 dark:text-slate-300 leading-8 text-lg italic mb-8 text-left">
                    "{review.comment}"
                  </p>
                </div>

                {/* Student Profile Info */}
                <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-5">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center text-lg font-extrabold shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-lg leading-tight">
                      {review.name}
                    </h3>

                    <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mt-1">
                      {review.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Modal Pop-up */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 z-10 bg-white dark:bg-gray-800 rounded-full w-10 h-10 text-gray-700 dark:text-white font-bold shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              ✕
            </button>
            <ReviewForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;