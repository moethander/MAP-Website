import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../api";
import AdminNavbar from "../../components/AdminNavbar";

// Safe file path formatter
const formatMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.replace(/\\/g, "/");
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  return `${baseURL}${cleanPath}`;
};

const ManageHome = () => {

  
  const [formData, setFormData] = useState({
    bannerImage: "",
    heroBadge: "",
    heroTitle: "",
    heroDescription: "",
    messengerPageId: "",

    whyChooseTitle: "",
    whyChooseDescription: "",

    //card1
    feature1Image: "",
    feature1Title: "",
    feature1Description: "",

    //card2
    feature2Image: "",
    feature2Title: "",
    feature2Description: "",

    //card3
    feature3Image: "",
    feature3Title: "",
    feature3Description: "",

    
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
    phoneNumber: "",
    email: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // const res = await axios.get("http://localhost:4000/api/home");
        const res = await API.get("/api/home");
        if (res.data.success && res.data.home) {
          setFormData((prev)=>({
            ...prev,
            ...res.data.home,
            
            messengerPageId: res.data.home.messengerPageId || "",
            
          }));
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

  formDataToSend.append("heroBadge", formData.heroBadge || "");
  formDataToSend.append("heroTitle", formData.heroTitle || "");
  formDataToSend.append("heroDescription", formData.heroDescription || "");
  formDataToSend.append("messengerPageId", formData.messengerPageId || ""); 

  formDataToSend.append("whyChooseTitle", formData.whyChooseTitle || "");
  formDataToSend.append("whyChooseDescription", formData.whyChooseDescription || "");

  formDataToSend.append("feature1Title", formData.feature1Title || "");
  formDataToSend.append("feature1Description", formData.feature1Description || "");

  formDataToSend.append("feature2Title", formData.feature2Title || "");
  formDataToSend.append("feature2Description", formData.feature2Description || "");

  formDataToSend.append("feature3Title", formData.feature3Title || "");
  formDataToSend.append("feature3Description", formData.feature3Description || "");

  formDataToSend.append("studentsCount", formData.studentsCount || "");
  formDataToSend.append("teachersCount", formData.teachersCount || "");
  formDataToSend.append("successRate", formData.successRate || "");
  formDataToSend.append("yearsExperience", formData.yearsExperience || "");

  formDataToSend.append("storyTitle", formData.storyTitle || "");
  formDataToSend.append("storyDescription", formData.storyDescription || "");

  formDataToSend.append("visionTitle", formData.visionTitle || "");
  formDataToSend.append("visionDescription", formData.visionDescription || "");

  formDataToSend.append("missionTitle", formData.missionTitle || "");
  formDataToSend.append("missionDescription", formData.missionDescription || "");

  formDataToSend.append("aimTitle", formData.aimTitle || "");
  formDataToSend.append("aimDescription", formData.aimDescription || "");

  formDataToSend.append("facebookLink", formData.facebookLink || "");
  formDataToSend.append("youtubeLink", formData.youtubeLink || "");
  formDataToSend.append("phoneNumber", formData.phoneNumber || "");
  formDataToSend.append("email", formData.email || "");
  formDataToSend.append("address", formData.address || "");
  
  if (formData.bannerImage instanceof File) formDataToSend.append("bannerImage", formData.bannerImage);
  if (formData.feature1Image instanceof File) formDataToSend.append("feature1Image", formData.feature1Image);
  if (formData.feature2Image instanceof File) formDataToSend.append("feature2Image", formData.feature2Image);
  if (formData.feature3Image instanceof File) formDataToSend.append("feature3Image", formData.feature3Image);
  if (formData.visionImage instanceof File) formDataToSend.append("visionImage", formData.visionImage);
  if (formData.missionImage instanceof File) formDataToSend.append("missionImage", formData.missionImage);

  try {
    // const res = await axios.post(
    //   "http://localhost:4000/api/home",
     const res = await API.post(
      "/api/home",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    alert("Home data updated successfully!");
    window.location.reload();
    console.log(res.data);
    
  } catch (error) {
    console.error("FULL ERROR:", error);
    alert(error.response?.data?.message || "Error saving data");
  }
};
  return (
    <>
      <AdminNavbar />

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
                     Saved: {formatMediaUrl(formData.bannerImage).split("/").pop()}
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

          {/* Hero Section */}
          <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-lg font-bold text-gray-700">Hero Section</h2>
            <div>
              <label className="block mb-1 font-semibold">Badge</label>
              <input
                type="text"
                name="heroBadge"
                value={formData.heroBadge || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Main Title</label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Description </label>
              <textarea
                rows="3"
                name="heroDescription"
                value={formData.heroDescription || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
              ></textarea>
            </div>

            {/* hero section input messengarid */}
            <div>
              <label className="block text-sm font-medium mb-1">Messenger Page ID</label>
              <input
               type="text"
               name="messengerPageId"
               value={formData.messengerPageId || ''}
               onChange={handleChange}
               placeholder="Enter Facebook Page Id for Chat with Us"
               className="w-full border rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          {/* Why Choose MAP Section */}
          <div className="border p-4 rounded-lg bg-gray-50 space-y-6">
            <h2 className="text-lg font-bold text-gray-700">
              Why Choose M-A-P Section
            </h2>

            {/* ဘယ်ဘက်ခြမ်း Main Content ပြင်ရန် */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
              <div>
                <label className="block mb-1 font-semibold">
                  Section Title
                </label>
                <input
                  type="text"
                  name="whyChooseTitle"
                  value={formData.whyChooseTitle || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Section Description
                </label>
                <textarea
                  rows="2"
                  name="whyChooseDescription"
                  value={formData.whyChooseDescription || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-white"
                ></textarea>
              </div>
            </div>

            {/* ညာဘက်ခြမ်း ကတ် ၃ ခု ပြင်ရန် */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-600">Features Cards</h3>

              {/* Card 1 */}
              <div className="p-3 border rounded-lg bg-white space-y-2">
                <span className="text-sm font-bold text-blue-600">Card 1 </span>
                <input
                  type="text"
                  name="feature1Title"
                  placeholder="Title"
                  value={formData.feature1Title || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                />
                <textarea
                  rows="2"
                  name="feature1Description"
                  placeholder="Description"
                  value={formData.feature1Description || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                ></textarea>

                <div className="flex items-center gap-4">
                  <input
                    id="feature1-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        feature1Image: e.target.files[0],
                      });
                    }}
                    className="hidden"
                  />

                  {/* Custom Button */}
                  <label
                    htmlFor="feature1-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 font-semibold text-sm transition"
                  >
                    Choose Image
                  </label>

                  {/* ပုံရှိရင် ရှိကြောင်း ပြပေးမယ့် စာသား */}
                  {formData.feature1Image && (
                    <span className="text-xs text-blue-600 font-medium">
                      {formData.feature1Image instanceof File
                        ? "Selected: " + formData.feature1Image.name
                        : "Saved: " + formData.feature1Image}
                    </span>
                  )}
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-3 border rounded-lg bg-white space-y-2">
                <span className="text-sm font-bold text-blue-600">Card 2 </span>
                <input
                  type="text"
                  name="feature2Title"
                  placeholder="Title"
                  value={formData.feature2Title || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                />
                <textarea
                  rows="2"
                  name="feature2Description"
                  placeholder="Description"
                  value={formData.feature2Description || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                ></textarea>

                <div className="flex items-center gap-4">
                  <input
                    id="feature2-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        feature2Image: e.target.files[0],
                      });
                    }}
                    className="hidden"
                  />

                  {/* Custom Button */}
                  <label
                    htmlFor="feature2-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 font-semibold text-sm transition"
                  >
                    Choose Image
                  </label>

                  {/* ပုံရှိရင် ရှိကြောင်း ပြပေးမယ့် စာသား */}
                  {formData.feature2Image && (
                    <span className="text-xs text-blue-600 font-medium">
                      {formData.feature2Image instanceof File
                        ? "Selected: " + formData.feature2Image.name
                        : "Saved: " + formData.feature2Image}
                    </span>
                  )}
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-3 border rounded-lg bg-white space-y-2">
                <span className="text-sm font-bold text-blue-600">Card 3 </span>
                <input
                  type="text"
                  name="feature3Title"
                  placeholder="Title"
                  value={formData.feature3Title || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                />
                <textarea
                  rows="2"
                  name="feature3Description"
                  placeholder="Description"
                  value={formData.feature3Description || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-50 text-sm"
                ></textarea>

                <div className="flex items-center gap-4">
                  <input
                    id="feature3-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        feature3Image: e.target.files[0],
                      });
                    }}
                    className="hidden"
                  />

                  {/* Custom Button */}
                  <label
                    htmlFor="feature3-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 font-semibold text-sm transition"
                  >
                    Choose Image
                  </label>

                  {/* ပုံရှိရင် ရှိကြောင်း ပြပေးမယ့် စာသား */}
                  {formData.feature3Image && (
                    <span className="text-xs text-blue-600 font-medium">
                      {formData.feature3Image instanceof File
                        ? "Selected: " + formData.feature3Image.name
                        : "Saved: " + formData.feature3Image}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* stats section */}
          <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
            <h3 className="text-xl font-bold mb-4">Stats Section</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">
                  Students Count (e.g., 500+)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.studentsCount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, studentsCount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium">
                  Teachers Count (e.g., 15+)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.teachersCount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, teachersCount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium">
                  Success Rate (e.g., 98%)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.successRate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, successRate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium">
                  Years Experience (e.g., 10+)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.yearsExperience || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-gray-200 mt-6">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">
              🌐 Social Media Links & Footer Contact Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook Link */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  Facebook Page Link
                </label>
                <input
                  type="text"
                  name="facebookLink"
                  value={formData.facebookLink || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-white"
                />
              </div>

              {/* YouTube Link */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  YouTube Channel Link
                </label>
                <input
                  type="text"
                  name="youtubeLink"
                  value={formData.youtubeLink || ""}
                  onChange={handleChange}
                  placeholder="https://youtube.com/yourchannel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  placeholder="+95 9 123 456 789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="info@myanmaracademicplanet.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* School Address (ကျောင်းတည်နေရာ) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  School Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  placeholder="Yangon, Myanmar"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
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