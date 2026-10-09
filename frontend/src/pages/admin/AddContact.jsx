import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import API, { baseURL } from "../../api";

import AdminNavbar from '../../components/AdminNavbar';


const AddContact = () => {
  const bannerRef = useRef(null);

  const [banner, setBanner] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [map, setMap] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(false);
  const [oldData, setOldData] = useState(null); 

  //Safe file path formatter
  const formatMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const normalizedPath = path.replace(/\\/g, "/");
    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
    return `${baseURL}${cleanPath}`;
  };

  // ---------------- FETCH DATA ----------------
  const fetchContact = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/api/contact");
       const res = await API.get("/api/contact");
      if (res.data) {
        setOldData(res.data); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);


  const handleEditClick = () => {
    setIsEditing(true);
    setPreview(false); 
    
    if (oldData) {
      setPhone(oldData.phone || "");
      setAddress(oldData.address || "");
      setMap(oldData.map || "");
    }
  };

  // ---------------- SAVE / UPDATE ----------------
  const saveContact = async () => {
    try {
      const formData = new FormData();

      if (banner) {
        formData.append("banner", banner);
      }
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("map", map);

      // await axios.post("http://localhost:4000/api/contact", formData);
      await API.post("/api/contact", formData);

      alert("Contact Saved");
      window.location.reload();

      setPhone("");
      setAddress("");
      setMap("");
      setIsEditing(false);
      setPreview(false);
      setBanner(null);
      if (bannerRef.current) bannerRef.current.value = "";
      
      await fetchContact(); 
    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
        <h1 className="text-3xl font-bold mb-6">Contact Management</h1>

        {/* ================= FORM ================= */}
        {!preview && (
          <div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Banner Image</label>

              <div className="relative">
                <input
                  type="text"
                  readOnly
                  disabled={!isEditing}
                  placeholder={isEditing ? "Choose photo" : "No file chosen"}
                  value={
                    isEditing
                      ? banner
                        ? banner.name
                        : oldData?.banner
                          ? oldData.banner.split("/").pop()
                          : ""
                      : ""
                  }
                  onClick={() => isEditing && bannerRef.current.click()}
                  className="border p-2 w-full rounded bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                />

                <input
                  type="file"
                  ref={bannerRef}
                  onChange={(e) => setBanner(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Phone Number</label>
              <input
                type="text"
                value={phone}
                disabled={!isEditing}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="+95xxxxxxxxx"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Address</label>
              <textarea
                value={address}
                disabled={!isEditing}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 w-full rounded"
                rows={4}
              />
            </div>

            {/* Map */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Google Map Embed Link
              </label>
              <textarea
                value={map}
                disabled={!isEditing}
                onChange={(e) => setMap(e.target.value)}
                className="border p-2 w-full rounded"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* ================= PREVIEW ================= */}
        {preview && (
          <div className="mt-6 p-4 border rounded bg-gray-100 space-y-4">
            {/* Banner Preview */}
            <div>
              <h3 className="font-bold mb-2">Banner</h3>
              {banner ? (
                <img
                  src={URL.createObjectURL(banner)}
                  alt="new banner"
                  className="w-full h-48 object-cover rounded"
                />
              ) : oldData?.banner ? (
                <img
                  src={formatMediaUrl(oldData.banner)}
                  alt="old banner"
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <p>No banner selected</p>
              )}
            </div>

            <div>
              <h3 className="font-bold">Phone</h3>
              <p>{phone || oldData?.phone || ""}</p>
            </div>

            {/* Address Preview */}
            <div>
              <h3 className="font-bold">Address</h3>
              <p>{address || oldData?.address || ""}</p>
            </div>

            {/* Map Preview */}
            <div>
              <h3 className="font-bold mb-2">Map</h3>
              {(map || oldData?.map) && (
                <iframe
                  src={map || oldData?.map}
                  className="w-full h-64 rounded"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}

        {/* ================= BUTTONS ================= */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setPreview(!preview)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {preview ? "Hide Preview" : "Preview"}
          </button>

          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-5 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={saveContact}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Update
            </button>
          )}

          <button
            onClick={saveContact}
            className="bg-purple-600 text-white px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddContact;