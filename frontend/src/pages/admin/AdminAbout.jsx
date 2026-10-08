import React, { useState, useEffect } from "react";
import axios from "axios";
import API, { baseURL } from "../../api";
import AdminNavbar from "../../components/AdminNavbar";

const AdminAbout = () => {
  const [formData, setFormData] = useState({
    storyDescription: "",
    aim: "",
    mission: "",
    vision: "",
  });
  
  const [image, setImage] = useState(null); // Backend ပို့မည့် File Object
  const [previewImage, setPreviewImage] = useState(""); // UI တွင်ပြမည့် ပုံ URL (Old/New Preview)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // ယူထားပြီးသား Data များကို Form ထဲ Fetch လုပ်မည်
    // axios
    //   .get("http://localhost:4000/api/about")
    API
      .get("/api/about")
      .then((res) => {
        if (res.data) {
          setFormData({
            storyDescription: res.data.storyDescription || res.data.storyDescription1 || "",
            aim: res.data.aim || "",
            mission: res.data.mission || "",
            vision: res.data.vision || "",
          });

          // DB ထဲတွင် ပုံဟောင်းရှိပါက Preview ပြရန် backend URL ချိတ်ဆက်ခြင်း
          // if (res.data.imageUrl) {
          //   setPreviewImage(`http://localhost:4000/${res.data.imageUrl}`);
          // }
          if (res.data.imageUrl) {
            setPreviewImage(`${baseURL}/${res.data.imageUrl}`);
          }
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File ရွေးလိုက်သည့်အခါ Preview ပြောင်းပေးရန်
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // ရွေးလိုက်သော ပုံအသစ်အတွက် Temporary Preview URL ဖန်တီးပေးခြင်း
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("storyDescription", formData.storyDescription);
    data.append("aim", formData.aim);
    data.append("mission", formData.mission);
    data.append("vision", formData.vision);
    
    // Image File ရှိမှ append လုပ်မည်
    if (image) {
      data.append("image", image);
    }

    try {
      // const res = await axios.put("http://localhost:4000/api/about", data, {
       const res = await API.put("/api/about", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Updated Successfully!");
      console.log("Success Response:", res.data);

      // Update အဆင်ပြေသွားပါက Response မှ ပုံ URL ကို Preview အဖြစ် အသစ်ပြန်သတ်မှတ်မည်
      if (res.data.about?.imageUrl) {
        // setPreviewImage(`http://localhost:4000/${res.data.about.imageUrl}`);
        setPreviewImage(`${baseURL}/${res.data.about.imageUrl}`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Update Error Details:", err.response || err);
      alert(`❌ Update Failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AdminNavbar />
  
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 my-10">
        
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Manage About Us Content
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Story Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Our Story (Paragraph)
          </label>
          <textarea
            name="storyDescription"
            rows="3"
            value={formData.storyDescription}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        {/* Story Image Preview + File Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Story Image
          </label>

          {/* လက်ရှိ ပုံဟောင်း သို့မဟုတ် ရွေးလိုက်သည့် ပုံအသစ် Preview ပြသသည့်နေရာ */}
          {previewImage && (
            <div className="mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                Current / Selected Image Preview:
              </span>
              <img
                src={previewImage}
                alt="Story Preview"
                className="w-48 h-32 object-cover rounded-xl border dark:border-gray-700 shadow-sm"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Aim, Mission, Vision */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Our Aim
          </label>
          <textarea
            name="aim"
            rows="3"
            value={formData.aim}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Our Mission
          </label>
          <textarea
            name="mission"
            rows="3"
            value={formData.mission}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Our Vision
          </label>
          <textarea
            name="vision"
            rows="3"
            value={formData.vision}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
      </>
  );
};

export default AdminAbout;