import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import API , {baseURL} from "../../api";
import AdminNavbar from '../../components/AdminNavbar';

const AddGallery = () => {
  const [images, setImages] = useState([]);
  const [banner, setBanner] = useState(null);
  const [youtube, setYoutube] = useState("");
  const [video, setVideo] = useState(null);
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const imageRef = useRef(null);
  const bannerRef = useRef(null);
  const videoRef = useRef(null);

  const fetchGallery = async () => {
    // const res = await fetch("http://localhost:4000/api/gallery");
     const res = await fetch(`${baseURL}/api/gallery`);
    const data = await res.json();
    setItems(data);
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  const fetchData = async () => {
    // const res = await axios.get("http://localhost:4000/api/gallery");
    const res = await API.get("/api/gallery");
    console.log(res.data);
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //upload banner image
  const uploadBanner = async() => {
    if(!banner){
      alert("Please select a banner image");
      return;
    }
    try{
      const formData = new FormData();
      formData.append("banner",banner);

      // const res = await axios.post(
      //   "http://localhost:4000/api/gallery/banner",

       const res = await API.post(
        "/api/gallery/banner",
        formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setBanner(null);
      if(bannerRef.current){
        bannerRef.current.value="";
      }
      alert("Banner updated successfully!");
      window.location.reload();
    }catch(err){
      console.log(err.response?.data);
      console.log(err);
      alert("Banner Upload Failed");
    }
  };

  //upload image
 const uploadImage = async () => {
  if (images.length === 0) {
    alert("Please select images");
    return;
  }

  try {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    // const res = await axios.post(
    //   "http://localhost:4000/api/gallery/image",
    const res = await API.post(
      "/api/gallery/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    setImages([]);
    imageRef.current.value = "";

    fetchData();

    alert("Images uploaded!");
    window.location.reload();
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
    alert("Upload Failed");
  }
};

  //upload video
  const uploadVideo = async () => {
    const formData = new FormData();
    formData.append("video", video);
    // await axios.post("http://localhost:4000/api/gallery/video", formData);
     await API.post("/api/gallery/video", formData);
    setVideo(null);
    
    if(videoRef.current){
      videoRef.current.value = "";
    }

    await fetchData();
    alert("Video Uploaded!");
    window.location.reload();
  };

  //upload utube
  const saveYoutube = async () => {
    // await axios.post("http://localhost:4000/api/gallery/youtube", {
     await API.post("/api/gallery/youtube", {
      url: youtube,
    });

    alert("Youtube Saved!");
    window.location.reload();
    setYoutube("");
    fetchData();
  };

  //tog
  const toggleItem = async (id) => {
    // await axios.put(`http://localhost:4000/api/gallery/toggle/${id}`);
     await API.put(`/api/gallery/toggle/${id}`);
    fetchData();
  };

  //delete
  const deleteItem = async (id) => {
    try {
      // const res = await fetch(`http://localhost:4000/api/gallery/${id}`, {
      const res = await fetch(`${baseURL}/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ instantly remove from UI
        setItems((prev) => prev.filter((item) => item._id !== id));
        alert("Deleted successfully!");
        window.location.reload();
      }

      console.log("Deleted:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  <AdminNavbar/>
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold text-center mb-8">
        Gallery Management
      </h1>

      {/* Banner Upload Section */}
        <div className="bg-white shadow rounded-xl p-5 border mb-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">🖼️ Update Gallery Banner Image</h2>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              ref={bannerRef}
              accept="image/*"
              onChange={(e) => setBanner(e.target.files[0])}
              className="w-full border rounded p-2"
            />
            <button
              onClick={uploadBanner}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold whitespace-nowrap"
            >
              Upload Banner
            </button>
          </div>
        </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload Image */}
        <div className="bg-white shadow rounded-xl p-5 border">
          <h2 className="text-xl font-semibold mb-4">📷 Upload Image</h2>

          <input
            type="file"
            multiple
            ref={imageRef}
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full border rounded p-2"
          />

          <button
            onClick={uploadImage}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Upload Image
          </button>
        </div>

        {/* Upload Video */}
        <div className="bg-white shadow rounded-xl p-5 border">
          <h2 className="text-xl font-semibold mb-4">🎥 Upload Video</h2>

          <input
            type="file"
            ref={videoRef}
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border rounded p-2"
          />

          <button
            onClick={uploadVideo}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Upload Video
          </button>
        </div>

        {/* YouTube */}
        <div className="bg-white shadow rounded-xl p-5 border">
          <h2 className="text-xl font-semibold mb-4">▶️ YouTube Link</h2>

          <input
            type="text"
            placeholder="https://youtube.com/..."
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="w-full border rounded p-2"
          />

          <button
            onClick={saveYoutube}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Save Link
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowItems(!showItems)}
        className="bg-gray-800 text-white w-full py-3 rounded mt-5"
      >
        {showItems ? "Hide Items" : "Show Items"}
      </button>
      
      {showItems && (
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {items.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 shadow">
              {item.type === "image" && (
                <img
                  // src={`http://localhost:4000/${item.url}`}
                   src={`${baseURL}/${item.url}`}
                  alt="gallery"
                  className="w-full h-52 object-cover rounded"
                />
              )}

              {item.type === "video" && (
                <video controls className="w-full h-52 rounded">
                  {/* <source src={`http://localhost:4000/${item.url}`} /> */}
                  <source src={`${baseURL}/${item.url}`} />
                </video>
              )}

              {item.type === "youtube" && (
                <iframe
                  src={getEmbedUrl(item.url)}
                  className="w-full h-52 rounded"
                  allowFullScreen
                />
              )}

              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white w-full mt-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AddGallery
