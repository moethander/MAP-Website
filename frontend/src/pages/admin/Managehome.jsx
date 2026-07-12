import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const ManageHome = () => {

  
  const [formData, setFormData] = useState({
    bannerImage: "",
    storyTitle: "",
    storyDescription: "",
    visionImage: "",
    visionTitle: "",
    visionDescription: "",
    missionImage: "",
    missionTitle: "",
    missionDescription: "",
    aimTitle: "",
    aimDescription: "",
    facebookLink: "",
    youtubeLink: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/home");
        if (res.data.success && res.data.home) {
          setFormData({
            ...res.data.home,
            // bannerImage: "",
            // visionImage: "",
            // missionImage: "",
          });
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("storyTitle", formData.storyTitle);
    formDataToSend.append("storyDescription", formData.storyDescription);
    formDataToSend.append("visionTitle", formData.visionTitle);
    formDataToSend.append("visionDescription", formData.visionDescription);
    formDataToSend.append("missionTitle", formData.missionTitle);
    formDataToSend.append("missionDescription", formData.missionDescription);
    formDataToSend.append("aimTitle", formData.aimTitle);
    formDataToSend.append("aimDescription", formData.aimDescription);
    formDataToSend.append("facebookLink", formData.facebookLink);
    formDataToSend.append("youtubeLink", formData.youtubeLink);

    if (formData.bannerImage)
      formDataToSend.append("bannerImage", formData.bannerImage);
    if (formData.visionImage)
      formDataToSend.append("visionImage", formData.visionImage);
    if (formData.missionImage)
      formDataToSend.append("missionImage", formData.missionImage);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/home",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Home data updated successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.response?.data?.message || "Error ");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center font-semibold text-lg">
        Loading Home Data...
      </div>
    );
  }

  return (
    <>
  <AdminNavbar/>
  
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Home Content</h1>
      <p className="text-sm text-gray-500 mb-4">
        * ရှိပြီးသား အချက်အလက်များကို အလိုအလျောက် ဖြည့်သွင်းပေးထားပါသည်။
        ပြင်ဆင်လိုသည်များကို တိုက်ရိုက်ပြင်ဆင်ပြီး Save နှိပ်နိုင်ပါသည်။
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
          <label className="block font-semibold text-gray-700">
            Banner Image
          </label>

          <div className="flex items-center gap-4">
            
            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, bannerImage: e.target.files[0] })
              }
              className="hidden"
            />

            {/* Custom Button */}
            <label
              htmlFor="banner-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm text-sm"
            >
              Choose Image
            </label>

            <span className="text-sm text-gray-600 font-medium truncate max-w-[300px]">
              {formData.bannerImage ? (
                
                typeof formData.bannerImage === "string" ? (
                  <span className="text-blue-600 font-semibold">
                    Saved: {formData.bannerImage.split("/").pop()}{" "}
                  </span>
                ) : (
                  
                  <span className="text-green-600 font-bold">
                    Selected: {formData.bannerImage.name}
                  </span>
                )
              ) : (
                <span className="text-gray-400">No file chosen</span>
              )}
            </span>
          </div>
        </div>

        {/* Story Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Our Story</h2>
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="storyTitle"
              value={formData.storyTitle || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              rows="4"
              name="storyDescription"
              value={formData.storyDescription || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            ></textarea>
          </div>
        </div>

        {/* Vision Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Vision</h2>

          {/* Vision Image Upload Part */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">
              Vision Image
            </label>
            <div className="flex items-center gap-4">
              
              <input
                id="vision-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, visionImage: e.target.files[0] })
                }
                className="hidden"
              />

              {/* Custom Button */}
              <label
                htmlFor="vision-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm text-sm"
              >
                Choose Image
              </label>

              <span className="text-sm text-gray-600 font-medium truncate max-w-[300px]">
                {formData.visionImage ? (
                  typeof formData.visionImage === "string" ? (
                    <span className="text-blue-600 font-semibold">
                      Saved: {formData.visionImage.split("/").pop()}
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold">
                      Selected: {formData.visionImage.name}
                    </span>
                  )
                ) : (
                  <span className="text-gray-400">No file chosen</span>
                )}
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="visionTitle"
              value={formData.visionTitle || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              rows="4"
              name="visionDescription"
              value={formData.visionDescription || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            ></textarea>
          </div>
        </div>
        {/* Mission Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Mission</h2>

          {/* Mission Image Upload Part */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">
              Mission Image
            </label>
            <div className="flex items-center gap-4">
              <input
                id="mission-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, missionImage: e.target.files[0] })
                }
                className="hidden"
              />

              {/* Custom Button */}
              <label
                htmlFor="mission-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm text-sm"
              >
                Choose Image
              </label>

             
              <span className="text-sm text-gray-600 font-medium truncate max-w-[300px]">
                {formData.missionImage ? (
                  typeof formData.missionImage === "string" ? (
                    <span className="text-blue-600 font-semibold">
                      Saved: {formData.missionImage.split("/").pop()}
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold">
                      Selected: {formData.missionImage.name}
                    </span>
                  )
                ) : (
                  <span className="text-gray-400">No file chosen</span>
                )}
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="missionTitle"
              value={formData.missionTitle || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              rows="4"
              name="missionDescription"
              value={formData.missionDescription || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            ></textarea>
          </div>
        </div>

        {/* Aim Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Our Aims</h2>
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="aimTitle"
              value={formData.aimTitle || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              rows="4"
              name="aimDescription"
              value={formData.aimDescription || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            ></textarea>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Social Links</h2>
          <div>
            <label className="block mb-1 font-semibold">Facebook Link</label>
            <input
              type="text"
              name="facebookLink"
              value={formData.facebookLink || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">YouTube Link</label>
            <input
              type="text"
              name="youtubeLink"
              value={formData.youtubeLink || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow"
        >
          Save & Update Content
        </button>
      </form>
    </div>
    </>
  );
};

export default ManageHome;