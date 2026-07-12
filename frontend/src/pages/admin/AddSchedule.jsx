import React from 'react'
import AdminNavbar from '../../components/AdminNavbar';

const AddSchedule = () => {
  return (
    <>
  <AdminNavbar/>
    <div>
      <h1>Add Schedule</h1>

      <input type="text" placeholder="Course Name" />
      <br /><br />

      <input type="text" placeholder="Days (Mon, Wed, Fri)" />
      <br /><br />

      <input type="text" placeholder="Time (4:00 PM - 5:30 PM)" />
      <br /><br />

      <input type="text" placeholder="Teacher Name" />
      <br /><br />

      <button>Save Schedule</button>
    </div>
    </>
  )
}

export default AddSchedule