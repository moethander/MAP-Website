import React, { useEffect, useState } from 'react'
import axios from 'axios';
import API from '../../api';
import AdminNavbar from '../../components/AdminNavbar';

const AdminFAQ = () => {

    const [faqs, setFaqs] = useState([]);
    const [formData,setFormData] = useState({
        question: "",
        answer: ""
    });

    const [alert , setAlert] = useState({
      show:false,
      message: "",
      type: ""
    });

    const showAlert = (message,type= "success") => {
      setAlert({
        show: true,
        message,
        type
      });
      setTimeout ( ()=>{
        setAlert({show: false, message: "",type: ""});
      },2000);
    };

  const fetchFAQs = async () => {
  // const res = await axios.get("http://localhost:4000/api/faqs");
   const res = await API.get("/api/faqs");
  setFaqs(res.data);
};

    useEffect ( ()=>{
        fetchFAQs();
    },[]);

    const [editId, setEditId] = useState(null);
    const [preview, setPreview] = useState(true);
    const [showPreview , setShowPreview] = useState(true); 
    
   const handleSubmit = async () => {
  if (editId) {
    // await axios.put(
    //   `http://localhost:4000/api/faqs/${editId}`,
    await API.put(
      `/api/faqs/${editId}`,
      formData
    );
    showAlert("FAQ updated successfully!", "success");
  } else {
    // await axios.post(
    //   "http://localhost:4000/api/faqs",
     await API.post(
      "/api/faqs",
      formData
    );
    showAlert("FAQ added successfully!", "success");
  }
  fetchFAQs();
  setFormData({
    question: "",
    answer: ""
  });
  setEditId(null);
};

  const handleEdit = (faq) => {
  setFormData({
    question: faq.question,
    answer: faq.answer,
  });

  setEditId(faq._id);
};

  const handleDelete = async (id) => {
  // await axios.delete(
  //   `http://localhost:4000/api/faqs/${id}`
  // );
  await API.delete(
    `/api/faqs/${id}`
  );
  showAlert("FAQ Delected successfully!", "error");

  fetchFAQs();
};



    return (
      <>
  <AdminNavbar/>
  <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>

    {alert.show && (
  <div
    style={{
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      textAlign: "center",
      color: "#fff",
      background:
        alert.type === "success" ? "#28a745" : "#dc3545",
    }}
  >
    {alert.message}
  </div>
)}
    
    <h2 style={{ textAlign: "center" }}>
      FAQ Admin Panel
    </h2>

    {/* ===== FORM SECTION ===== */}
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      {/* <h3>{editId ? "Edit FAQ" : "Add FAQ"}</h3> */}

      <input
        type="text"
        placeholder="Question"
        value={formData.question}
        onChange={(e) =>
          setFormData({ ...formData, question: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Answer"
        value={formData.answer}
        onChange={(e) =>
          setFormData({ ...formData, answer: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          height: "100px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {editId ? "Update FAQ" : "Save FAQ"}
      </button>
    </div>

    {/* ===== CARD PREVIEW SECTION ===== */}
    <div>
      {faqs.map((faq) => (
        <div
          key={faq._id}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h4>{faq.question}</h4>
          <p style={{ color: "#555" }}>{faq.answer}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleEdit(faq)}
              style={{
                padding: "6px 10px",
                background: "#ffc107",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(faq._id)}
              style={{
                padding: "6px 10px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  </>
);
  
}

export default AdminFAQ