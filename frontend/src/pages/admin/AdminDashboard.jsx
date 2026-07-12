import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className='max-w-4xl mx-auto p-6'>

      <form className='bg-white shadow-lg rounded-xl p-6 space-y-4' >
        <h1 style={{textAlign: "center", fontWeight: "bold"}}>Admin Dashboard</h1>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/home")}>Manage Home</button>
        <br/><br/>


        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-activity")}>Add Activities & Events</button>
        <br/><br/>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-schedule")}>Add Time-Table</button>
        <br /><br />

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/manage-courses")}>Add Courses</button>
        <br/><br/>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-level")}>Add Class </button>

         <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-gallery")}>Add Gallery</button>
        <br/><br/>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-faq")}>Add FAQs</button>
        <br/><br/>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-contact")}>Add Contact</button>
        <br/><br/>

        <button className='bg-blue-600 text-white w-full border p-3 rounded-lg' onClick={()=> navigate("/admin/add-test")}>ManagePlacementTest</button>
        <br/><br/>

        </form>
    </div>
  )
}

export default AdminDashboard