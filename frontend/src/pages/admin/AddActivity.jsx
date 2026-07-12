import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [selectedFile, setSelectedFile] = useState(null);

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

  setImages(files);

  const urls = files.map((file) => URL.createObjectURL(file));
  setPreviewImages(urls);
};
  // const handleFileChange = (e) => {
  //   setImages(e.target.files);
  // };

  // Fetch Activities
  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/activities");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

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

      const data = {
        ...activity,
        images: imageUrls,
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

      setActivity({
        title: "",
        description: "",
        date: "",
        topic: "",
        theme: "",
      });

      setImages([]);
      setEditId(null);

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
  <AdminNavbar/>
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Add Activities & Events
      </h1>

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

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {/* image preview */}

        {previewImages.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-32 h-32 object-cover rounded"
              />
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
              {/* <p className="text-red-500 break-all">{a.images?.[0]}</p> */}

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