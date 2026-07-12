import React, { useState , useEffect } from 'react'
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

const ManageCourses = () => {

  
    const[courses,setCourses] = useState([]);

    const[showCourses,setShowCourses] = useState(false);

    const [editId, setEditId] = useState(null);

    const [ course, setCourse] = useState({
        name: "",
        description: "",
        startDate: "",
        levels: []
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            
          if(editId){
            await axios.put(
              `http://localhost:4000/api/courses/${editId}`, course
            );
            alert("Course updated successfully!");
          }else{
            await axios.post(
              "http://localhost:4000/api/courses", course
            );
            alert("Course saved successfully!");
          }

            setCourse({
                name: "",
                description: "",
                startDate: "",
                levels: []
            });

            setEditId(null);
            fetchCourses();

        }catch(error){
            console.log(error);
            alert("Failed to save course");
        }
    };

    useEffect(() => {
    fetchCourses();
    }, []);

  const fetchCourses = async () => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/courses"
    );

    setCourses(res.data);
  } catch (error) {
    console.log(error);
  }
  };

    const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/courses/${id}`
    );

    setCourses(
      courses.filter((course) => course._id !== id)
    );

    alert("Course deleted!");
  } catch (error) {
    console.log(error);
  }
};

  return (
    
     <>
  <AdminNavbar/>


    <div className="max-w-4xl mx-auto p-6">
      <h1 style={{textAlign: "center", fontWeight: "bold"}} className="">Manage Courses</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={course.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
        <br />
        <br />

        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
        <br />
        <br />

        <input
          type="text"
          name="startDate"
          placeholder="StartDate"
          value={course.startDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
        <br />
        <br />

        {/* <input
          type="text"
          name="fee"
          placeholder="Fee"
          value={course.fee}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
        <br />
        <br /> */}

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg w-full "
        >
          Save Course
        </button>
      </form>

      <button
        type="button"
        onClick={() => setShowCourses(!showCourses)}
        className="bg-gray-800 text-white px-4 py-2 rounded mt-6 w-full"
      >
        {showCourses ? "Hide Course Lists" : "Show Course Lists"}
      </button>

{showCourses && (
  <>
    <h2 className="text-2xl font-bold mt-6 mb-4">
      Course Lists
    </h2>

    {courses.map((course) => (
      <div
        key={course._id}
        className="border p-4 rounded-lg shadow mb-4"
      >
        <h3 className="font-bold">{course.name}</h3>
        <p>{course.description}</p>
        <p>{course.startDate}</p>

        <button type="button" onClick={ ()=> {
          setCourse(course);
          setEditId(course._id);
        }} className='bg-yellow-500 text-white px-4 py-2 rounded mr-2'> Edit </button>

        <button
          type="button"
          onClick={() => handleDelete(course._id)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-3"
        >
          Delete
        </button>
        
      </div>
    ))}
  </>
)}
    </div>
    </>
  );
}

export default ManageCourses