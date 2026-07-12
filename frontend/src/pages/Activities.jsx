// import { useEffect, useState } from "react";
// import axios from "axios";

// function Activities() {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true); // Renamed to lowercase 'loading' for convention
//   const [currentImage, setCurrentImage] = useState({});

//   const nextImage = (activityId, totalImages) => {
//     setCurrentImage((prev) => ({
//       ...prev,
//       [activityId]: ((prev[activityId] ?? 0) + 1) % totalImages,
//     }));
//   };

//   const prevImage = (activityId, totalImages) => {
//     setCurrentImage((prev) => ({
//       ...prev,
//       [activityId]:
//         ((prev[activityId] ?? 0) - 1 + totalImages) % totalImages,
//     }));
//   };

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/activities");
//         setActivities(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false); // Ensure loading stops even if fetch fails
//       }
//     };
//     fetchActivities();
//   }, []);

//   // Corrected Logic: If loading, show loading text
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   // Render the activities list only after loading is false
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10">Activities & Events</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {activities.map((activity) => {
//           const index = currentImage[activity._id] ?? 0;
//           return (
//             <div
//               key={activity._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition"
//             >
//               <div className="relative">
//                 <img
//                   src={activity.images[index]}
//                   alt={activity.title}
//                   className="w-full h-56 object-cover"
//                 />
//                 <button
//                   onClick={() => prevImage(activity._id, activity.images.length)}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={() => nextImage(activity._id, activity.images.length)}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
//                 >
//                   ❯
//                 </button>

//                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
//                 {activity.images.map((_, i) => (
//                 <div
//               key={i}
//               className={`w-3 h-3 rounded-full ${
//                i === index ? "bg-white" : "bg-gray-400"
//                }`}
//                 ></div>
//                 ))}
//             </div>
//               </div>

//               <div className="p-5">
//                 <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
//                 <p className="text-sm bg-blue-100 text-blue-700 inline-block px-3 py-1 rounded-full mb-2">
//                  Date: {activity.date}
//                 </p>
//                 <br/>

//                 <p className="text-sm bg-blue-100 text-blue-700 inline-block px-3 py-1 rounded-full mb-2">
//                  Theme: {activity.theme}
//                 </p>
//                 <br/>

//                 <p className="text-sm bg-blue-100 text-blue-700 inline-block px-3 py-1 rounded-full mb-2">
//                  Topic: {activity.topic}
//                 </p>
//                 <br/>
                
//                 <p className="text-gray-700">{activity.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Activities;

import { useEffect, useState } from "react";
import axios from "axios";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/activities");
        setActivities(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const nextImage = (id, total) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % total,
    }));
  };

  const prevImage = (id, total) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + total) % total,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-blue-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Banner */}

      <section className="relative h-[350px]">

        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f0?w=1600"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex justify-center items-center">

          <div className="text-center text-white">

            <h1 className="text-5xl md:text-6xl font-bold">
              Activities & Events
            </h1>

            <p className="mt-4 text-lg">
              Explore our latest school activities and memorable moments.
            </p>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-5 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {activities.map((activity) => {
            const index = currentImage[activity._id] ?? 0;

            return (

              <div
                key={activity._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                {/* Image Slider */}

                <div className="relative">

                  <img
                    src={activity.images[index]}
                    alt={activity.title}
                    className="w-full h-64 object-cover"
                  />

                  <button
                    onClick={() =>
                      prevImage(activity._id, activity.images.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                  >
                    ❮
                  </button>

                  <button
                    onClick={() =>
                      nextImage(activity._id, activity.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                  >
                    ❯
                  </button>

                  {/* Dots */}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

                    {activity.images.map((_, i) => (

                      <span
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i === index
                            ? "bg-white"
                            : "bg-gray-400"
                        }`}
                      ></span>

                    ))}

                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-blue-700 mb-4">
                    {activity.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-5">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      📅 {activity.date}
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      🎯 {activity.theme}
                    </span>

                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      📚 {activity.topic}
                    </span>

                  </div>

                  <p className="text-gray-600 leading-7">
                    {activity.description}
                  </p>

                </div>

              </div>

            );
          })}

        </div>

        {activities.length === 0 && (

          <div className="text-center mt-16 text-gray-500 text-xl">
            No activities available.
          </div>

        )}

      </div>
    </div>
  );
}

export default Activities;