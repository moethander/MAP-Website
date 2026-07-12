import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const navigate = useNavigate();
    const handleLogin = () =>{
        navigate("/admin/dashboard");
    };

  return (
    <div className='max-w-4xl mx-auto p-6'>
       <form className='bg-white shadow-lg rounded-xl p-6 space-y-4' >
         <h1 style={{textAlign: "center", fontWeight: "bold"}}>Admin Login</h1>
        <input type="email" className='w-full border p-3 rounded-lg' placeholder='Enter email...'/>
        <br/><br/>
        <input type="password" className='w-full border p-3 rounded-lg' placeholder='Enter password...'/>
        <br/><br/>
        <button onClick={handleLogin} className='bg-blue-700 text-white w-full border p-3 rounded-lg'>Login</button>
       </form>
    </div>
  )
}

export default AdminLogin