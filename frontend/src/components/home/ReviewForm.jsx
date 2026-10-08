import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import API from "../../api";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    rating: 5,
    comment: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:4000/api/reviews", formData);
      await API.post("/api/reviews",formData);
      setMessage("Thank you! Your review is waiting for approval.");
      setFormData({
        name: "",
        course: "",
        rating: 5,
        comment: "",
      });
    } catch (error) {
      console.log(error);
      setMessage("Failed to submit review.");
    }
  };

  return (
    
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-700">
          
          <div className="text-center mb-10">
            <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest">
              Student Feedback
            </p>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Share Your Experience
            </h2>

            
            <p className="text-gray-500 dark:text-slate-400 mt-3">
              Your feedback helps us improve our learning environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              
              
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all"
              />

              
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course Name"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              
              <p className="font-semibold mb-3 text-gray-700 dark:text-white">
                Your Rating
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => handleRating(star)}>
                    <FaStar
                      size={32}
                      className={
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write your experience..."
              rows="5"
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-700 dark:bg-blue-600 text-white font-bold text-lg hover:bg-blue-800 dark:hover:bg-blue-700 hover:scale-[1.02] transition duration-300"
            >
              Submit Review
            </button>
          </form>

         
          {message && (
            <div className="mt-6 text-center text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 border dark:border-green-800/50 p-4 rounded-xl">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;