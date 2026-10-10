import { useEffect, useState } from "react";
import axios from "axios";
import API, { baseURL } from "../../api";
import AdminNavbar from '../../components/AdminNavbar';

// Safe file path formatter
const formatMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.replace(/\\/g, "/");
  const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  return `${baseURL}${cleanPath}`;
};

const AdminTest = () => {
  const [terms, setTerms] = useState("");
  const [testLink, setTestLink] = useState("");
  const [bannerImage, setBannerImage] = useState(null); // File အသစ်အတွက်
  const [previewImage, setPreviewImage] = useState(""); // Preview ပြရန်
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const res = await axios.get("http://localhost:4000/api/placement-test");
      const res = await API.get("/api/placement-test");
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTerms(data?.terms || "");
    setTestLink(data?.testLink || "");
    // setPreviewImage(data?.bannerImage ? `http://localhost:4000/uploads/${data.bannerImage}` : "");
    setPreviewImage(data?.bannerImage ? formatMediaUrl(data.bannerImage) : "");
    setBannerImage(null);
    setEditMode(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Image Preview ပြရန်
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image Upload ပါဝင်သည့်အတွက် FormData သုံးရပါမည်
    const formData = new FormData();
    formData.append("terms", terms);
    formData.append("testLink", testLink);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    try {
      // await axios.post("http://localhost:4000/api/placement-test", formData, {
       await API.post("/api/placement-test", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Placement test updated successfully!");
       window.location.reload();
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.log("Error updating data:", error);
      alert("Error updating data");
       window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AdminNavbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Manage Placement Test
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update terms, test link, and hero banner image.
            </p>
          </div>

          {!editMode && !loading && (
            <button
              onClick={handleEdit}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
            >
              ✏️ Edit Content
            </button>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center text-gray-500">
            Loading Placement Test Data...
          </div>
        )}

        {/* VIEW MODE */}
        {!editMode && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 md:p-8 space-y-6">
            
            {/* Banner Image Preview */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Current Banner Image
              </h3>
              <div className="h-44 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                {data?.bannerImage ? (
                  <img
                    src={formatMediaUrl(data.bannerImage)}
                    alt="Banner Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Custom Banner Image Uploaded (Using Default Image)
                  </div>
                )}
              </div>
            </div>

            {/* Terms Preview */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Current Terms & Conditions
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {data?.terms || "No terms set yet."}
              </div>
            </div>

            {/* Link Preview */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Placement Test Link
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                {data?.testLink ? (
                  <a
                    href={data.testLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm md:text-base font-medium break-all"
                  >
                    🔗 {data.testLink}
                  </a>
                ) : (
                  <span className="text-gray-400 italic text-sm">No test link available</span>
                )}
              </div>
            </div>

          </div>
        )}

        {/* EDIT MODE FORM */}
        {editMode && (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 md:p-8 space-y-6"
          >
            {/* Banner Upload Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                Hero Banner Image
              </label>
              {previewImage && (
                <div className="mb-3 h-40 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                Terms and Conditions
              </label>
              <textarea
                rows="6"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                Test Form Link (URL)
              </label>
              <input
                type="url"
                value={testLink}
                onChange={(e) => setTestLink(e.target.value)}
                className="w-full p-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-sm rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

      </main>
    </div>
  );
};

export default AdminTest;