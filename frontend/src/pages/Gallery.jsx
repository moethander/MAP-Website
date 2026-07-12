// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Gallery = () => {
//   const [items, setItems] = useState([]);
//   const [filter,setFilter] = useState("all");

//   const filteredItems =
//   filter === "all"
//     ? items
//     : items.filter((item) => item.type === filter);


//   const getEmbedUrl = (url) => {
//   if (!url) return "";

//   if (url.includes("watch?v=")) {
//     const videoId = new URL(url).searchParams.get("v");
//     return `https://www.youtube.com/embed/${videoId}`;
//   }

//   if (url.includes("youtu.be/")) {
//     const videoId = url.split("youtu.be/")[1].split("?")[0];
//     return `https://www.youtube.com/embed/${videoId}`;
//   }

//   return url;
// };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/gallery")
//       .then((res) => {
//         console.log(res.data);
//         setItems(res.data);
//       })
//       .catch(console.error);
//   }, []);


//   return (
//     <div style={{ padding: "20px" }}>
      

//       <div className="flex justify-center gap-4 mb-8">
//   <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded ${
//     filter === "all"
//     ? "bg-blue-600 text-white"
//     : "bg-gray-200"
//   }`}>All</button>

//   <button onClick={() => setFilter("image")} className={`px-4 py-2 rounded ${
//     filter === "image"
//     ? "bg-blue-600 text-white"
//     : "bg-gray-200"
//   }`}>
//     Photos
//   </button>

//   <button onClick={() => setFilter("video")} className={`px-4 py-2 rounded ${
//     filter === "video"
//     ? "bg-blue-600 text-white"
//     : "bg-gray-200"
//   }`}>
//     Videos
//   </button>

//   <button onClick={() => setFilter("youtube")} className={`px-4 py-2 rounded ${
//     filter === "youtube"
//     ? "bg-blue-600 text-white"
//     : "bg-gray-200"
//   }`}>
//     YouTube
//   </button>
// </div>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "10px",
//         }}
//       >

//         {/* items
//           .filter((item) => item.isVisible) */}

//         {filteredItems.map((item) => (
//             <div key={item._id} style={{ background: "#eee", padding: "10px" }}>

//               {item.type === "image" && (
//                 <img
//                   src={`http://localhost:4000/${item.url}`}
//                   style={{ width: "100%", height: "150px", objectFit: "cover" }}
//                 />
//               )}

//               {item.type === "video" && (
//                 <video controls style={{ width: "100%" }}>
//                   <source src={`http://localhost:4000/${item.url}`} />
//                 </video>
//               )}

//               {item.type === "youtube" && (
//                 <iframe
//                   width="100%"
//                   height="200"
//                   src={getEmbedUrl(item.url)}
//                   title="YouTube Video"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               )}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/gallery")
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.type === filter);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Banner */}

      <section className="relative h-[320px]">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"
          className="w-full h-full object-cover"
          alt="Gallery Banner"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">
              Gallery
            </h1>

            <p className="mt-4 text-lg">
              Explore our photos and videos.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-16">

        {/* Filter */}

        <div className="flex flex-wrap justify-center gap-4 mb-12">

          {["all", "image", "video", "youtube"].map((type) => (

            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                filter === type
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "image"
                ? "Photos"
                : type === "video"
                ? "Videos"
                : "YouTube"}
            </button>

          ))}

        </div>

        {/* Gallery */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredItems.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {item.type === "image" && (

                <img
                  src={`http://localhost:4000/${item.url}`}
                  alt=""
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />

              )}

              {item.type === "video" && (

                <video
                  controls
                  className="w-full h-64 object-cover"
                >
                  <source src={`http://localhost:4000/${item.url}`} />
                </video>

              )}

              {item.type === "youtube" && (

                <iframe
                  className="w-full h-64"
                  src={getEmbedUrl(item.url)}
                  title="YouTube"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              )}

              <div className="p-5">

                <h3 className="text-xl font-bold text-blue-700 capitalize">
                  {item.type}
                </h3>

                <p className="text-gray-500 mt-2">
                  Our latest {item.type}.
                </p>

              </div>

            </div>

          ))}

        </div>

        {filteredItems.length === 0 && (

          <div className="text-center mt-20 text-gray-500 text-xl">
            No gallery items found.
          </div>

        )}

      </div>
    </div>
  );
};

export default Gallery;