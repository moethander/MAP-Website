import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import AdminNavbar from "../../components/AdminNavbar";

const ManageReviews = () => {
  const [reviews,setReviews] = useState([]);
  const fetchReviews = async()=>{

    try{
      const res = await axios.get(
        "http://localhost:4000/api/reviews/all"
      );

      console.log(res.data);
      setReviews(res.data);

    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchReviews();
  },[]);

  const approveReview = async(id)=>{
    try{
      await axios.put(
        `http://localhost:4000/api/reviews/${id}/approve`
      );
      fetchReviews();
    }catch(error){
      console.log(error);
    }
  };

  const deleteReview = async(id)=>{
    try{
      await axios.delete(
        `http://localhost:4000/api/reviews/${id}`
      );
      fetchReviews();
    }catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar/>
    <div className="p-8">
      <h1 className="
        text-3xl
        font-bold
        text-blue-700
        mb-8
      ">
        Manage Reviews
      </h1>

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

      {
        reviews.map((review)=>(

          <div
            key={review._id}
            className="
              bg-white
              shadow-lg
              rounded-2xl
              p-6
              border
            "
          >

            <h2 className="
              font-bold
              text-xl
            ">
              {review.name}
            </h2>

            <p className="text-blue-600">
              {review.course}
            </p>

            <div className="flex my-3">
              {
                [...Array(review.rating)].map((_,i)=>(
                  <FaStar
                    key={i}
                    className="text-yellow-400"
                  />
                ))
              }
            </div>

            <p className="text-gray-600 mb-5">
              {review.comment}
            </p>

            <div className="flex gap-3">
              {
                !review.approved && (
                  <button
                    onClick={()=>approveReview(review._id)}
                    className="
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Approve
                  </button>
                )
              }

              <button
                onClick={()=>deleteReview(review._id)}
                className="
                  bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Delete
              </button>
            </div>

            <p className="
              mt-4
              text-sm
            ">
              Status:
              {
                review.approved
                ?
                <span className="text-green-600">
                  Approved
                </span>
                :
                <span className="text-orange-500">
                  Pending
                </span>
              }
            </p>
          </div>
        ))
      }
      </div>
    </div>
    </>
  );
};
export default ManageReviews;