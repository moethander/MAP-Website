import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const AddActivity = () => {
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    date: "",
    topic: "",
    theme: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [activities, setActivities] = useState([]);
  const [editId, setEditId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  //banner image
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [currentBanner, setCurrentBanner] = useState("");
  const [bannerLoading, setBannerLoading] = useState(false);

  // 📁 HTML File Input  (Old Value) ကို Reset ချရန် Ref တစ်ခုဆောက်ခြင်း
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Input Change
  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
  };

  // File Change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("You can only upload a maximum of 10 images!");
      e.target.value = "";
      return;
    }

    setImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  //banner file change
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  }

  // ❌ ရွေးချယ်ထားသော ပုံများကို တစ်ပုံချင်းစီ ပြန်လည်ဖြုတ်ချရန် (Cancel Button)
  const handleRemoveImage = (indexToRemove) => {
    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    // အကယ်၍ ပုံတွေအားလုံး ဖျက်လိုက်ရင် Input စာသားကြီးကိုပါ Clear လုပ်ပစ်မယ်
    if (images.length <= 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Fetch Activities
  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/activities");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBanner = async () => {
    try{
      const res = await axios.get("http://localhost:4000/api/activities/banner");
      if(res.data?.bannerImage){
        setCurrentBanner(res.data.bannerImage);
      }
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchBanner();
  }, []);

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    if(!bannerFile) return alert("Please select a banner image first!");
    try{
      setBannerLoading(true);
      const formData = new FormData();
      formData.append("bannerImage", bannerFile);

      await axios.post("http://localhost:4000/api/activities/banner", formData,{
        headers: {"Content-Type": "multipart/form-data"},
      });

      alert("Hero Banner updated successfully!");
      setBannerFile(null);
      setBannerPreview("");
      if(bannerInputRef.current) bannerInputRef.current.value= "";
      fetchBanner();
    }catch(error){
      console.log(error);
      alert("Failed to update banner!");
    }finally{
      setBannerLoading(false);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrls = [];

      // Upload Images
      if (images.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }

        const uploadRes = await axios.post(
          "http://localhost:4000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrls = uploadRes.data.imageUrls;
      }

      // တကယ်လို့ Edit လုပ်နေပြီး ပုံအသစ်မရွေးထားရင် မူရင်းပုံဟောင်းကိုပဲ ဆက်သုံးမယ်
      const finalImages = images.length > 0 ? imageUrls : previewImages;

      const data = {
        ...activity,
        images: finalImages,
      };

      if (editId) {
        await axios.put(
          `http://localhost:4000/api/activities/${editId}`,
          data
        );
        alert("Activity Updated Successfully!");
      } else {
        await axios.post("http://localhost:4000/api/activities", data);
        alert("Activity Added Successfully!");
      }

      // Form နှင့် UI အားလုံးကို မူလအတိုင်း Reset ပြန်ချခြင်း
      setActivity({
        title: "",
        description: "",
        date: "",
        topic: "",
        theme: "",
      });

      setImages([]);
      setPreviewImages([]);
      setEditId(null);

      // 🧹 "Choose Files ... files" ဆိုတဲ့ စာသားဟောင်းကြီးကို လုံးဝရှင်းထုတ်ပစ်ခြင်း
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchActivities();
    } catch (error) {
      console.log(error);
      alert("Failed!");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditId(item._id);

    setActivity({
      title: item.title,
      description: item.description,
      date: item.date?.substring(0, 10),
      topic: item.topic,
      theme: item.theme,
    });

    setPreviewImages(item.images || []);
    setImages([]);

    // Edit နှိပ်လိုက်ရင်လည်း ရွေးထားမိတဲ့ Input စာသားရှိရင် ရှင်းထုတ်မယ်
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/activities/${id}`);
      fetchActivities();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Activities & Events
        </h1>

      {/* 🎯 SECTION 1: HERO BANNER MANAGEMENT */}
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
            🖼️ Change Hero Banner Image
          </h2>

          <div className="mb-4 h-40 w-full rounded-lg overflow-hidden bg-gray-200 border">
            {bannerPreview?(
              <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover"/>
            ) : currentBanner ? (
              <img src={`http://localhost:4000/uploads/${currentBanner}`} 
              alt="Banner" 
              className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No custom banner set
              </div>
            )}
          </div>
            
        <form onSubmit={handleBannerSubmit} className="space-y-3">
          <input 
            type="file" 
            ref={bannerInputRef}
            accept="image/*"
            onChange={handleBannerChange}
            className="w-full text-sm"/>

            <button 
              type="submit"
               disabled={bannerLoading}
               className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2.5 rounded font-semibold text-sm transition-all"
               >
                {bannerLoading ? "Uploading..." : "Save Banner Image"}
            </button>
        </form>
        
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={activity.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={activity.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={activity.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="theme"
            placeholder="Theme"
            value={activity.theme}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={activity.topic}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* 🔗 ref ကို သွားချိတ်ဆက်ထားပါတယ် */}
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          {/* 📸 Modern Image Preview System with 'X' Cancel Button */}
          {previewImages.length > 0 && (
            <div className="flex gap-4 flex-wrap mt-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative w-28 h-28 group">
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border shadow-sm"
                  />
                  {/* ❌ နှိပ်လိုက်ရင် ပုံပြန်ဖြုတ်ပေးမည့် X Button လေး */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow transition-all duration-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white w-full py-3 rounded"
          >
            {loading
              ? "Uploading..."
              : editId
                ? "Update Activity"
                : "Save Activity"}
          </button>
        </form>

        <button
          onClick={() => setShowList(!showList)}
          className="bg-gray-800 text-white w-full py-3 rounded mt-5"
        >
          {showList ? "Hide Activities" : "Show Activities"}
        </button>

        {showList && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {activities.map((a) => (
              <div key={a._id} className="border rounded-lg p-4 shadow">
                {a.images?.length > 0 && (
                  <img
                    src={a.images[0]}
                    alt={a.title}
                    className="w-full h-52 object-cover rounded"
                  />
                )}

                <h2 className="text-xl font-bold mt-3">{a.title}</h2>
                <p>{a.description}</p>
                <p className="mt-2">
                  <b>Date:</b> {new Date(a.date).toLocaleDateString()}
                </p>
                <p>
                  <b>Theme:</b> {a.theme}
                </p>
                <p>
                  <b>Topic:</b> {a.topic}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AddActivity;