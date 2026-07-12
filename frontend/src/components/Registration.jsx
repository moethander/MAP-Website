import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ၁။ Import လုပ်ပါ

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '' });
  const navigate = useNavigate(); // ၂။ Hook ကို သုံးပါ

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submit");
    try {
        const res = await axios.post('http://localhost:4000/api/auth/register', formData);
        console.log("Server res",res);
        if (res.data.success) {
    alert("Account created successfully!");
    // ဒီနေရာကို ပြင်ပါ
    navigate('/questions'); 
}else{alert(error);}
    } catch (err) {

        console.error(err)
       if (err.response && err.response.status === 409) {
            alert("Account exits.Login"); // Welcome back! ပေါ်လာလိမ့်မယ်
            navigate('/login');      // ပြီးရင် တန်းပို့လိုက်ပါ
        } else {
            alert( 'Error occurred');
        }
    }
  };


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '80vh', backgroundColor: '#f4f7f6', padding: '20px'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white', padding: '40px', borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', fontSize: '28px', fontWeight: 'bold', textTransform:'uppercase',letterSpacing:'1px', marginBottom: '25px' }}>Student Registration</h2>
        
        {['name', 'email', 'phone', 'age'].map((field) => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#555' }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input 
              type={field === 'password' ? 'password' : 'text'}
              style={{
                width: '100%', padding: '12px', border: '1.5px solid #ddd',
                borderRadius: '8px', boxSizing: 'border-box'
              }}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            />
          </div>
        ))}
        
        <button type="submit" style={{
          width: '100%', padding: '15px', backgroundColor: '#0056b3',
          color: 'white', border: 'none', borderRadius: '8px',
          fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
        }}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Registration;