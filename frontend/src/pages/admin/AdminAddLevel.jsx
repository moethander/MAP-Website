import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from '../../components/AdminNavbar';

const AdminAddLevel=() =>{
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editingLevelId, setEditingLevelId] = useState(null);

  const [level, setLevel] = useState({
    name: "",
    duration: "",
    time: "",
    fee: "",
    

  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/courses")
      .then(res => setCourses(res.data))
      .catch((err)=>console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editingLevelId){
      await axios.put(
        `http://localhost:4000/api/courses/${selectedCourse}/levels/${editingLevelId}`, level
      );

    alert("Level added!");

    setEditingLevelId(null);
    }else{
      await axios.post(
        `http://localhost:4000/api/courses/${selectedCourse}/levels`, level
      );

      alert("Level Added!");
    }
    setLevel({
      name: "",
      duration: "",
      time: "",
      fee: ""
    });

    setEditingLevelId(null);
};

//editcall
const handleEdit = (lvl) => {
  setEditingLevelId(lvl._id);
  
  setLevel({
    name: lvl.name, 
    duration: lvl.duration,
    fee: lvl.fee,
    time: lvl.time
  });
};

//deletecall
const handleDelete = async (levelId) => {
  try{
    await axios.delete(
     `http://localhost:4000/api/courses/${selectedCourse}/levels/${levelId}`
  );
  alert("Level Delected!");

  //courses list refresh
  const res = await axios.get("http://localhost:4000/api/courses");
  setCourses(res.data);

  }catch(error){
    console.log(error);
    alert("Delete Failed");
  }

};

return (
  <>
  <AdminNavbar/>
  <div className="max-w-4xl mx-auto p-6">
      <h1 style={{textAlign: "center", fontWeight: "bold"}} className="">Add Class</h1>

    {/* Select Course */}
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full border p-3 rounded-lg"
      >
        <option value="" >Select Course</option>

        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Level Name */}
      <input
        type="text"
        placeholder="Level Name"
        value={level.name}
        onChange={(e) => setLevel({ ...level, name: e.target.value })}
        className="w-full border p-3 rounded-lg"
      />

      <br />
      <br />

      {/* Description */}
      <input
        type="text"
        placeholder="Duration"
        value={level.duration}
        onChange={(e) => setLevel({ ...level, duration: e.target.value })}
        className="w-full border p-3 rounded-lg"
      />

      <br />
      <br />
      <input
        type="text"
        placeholder="Fee"
        value={level.fee}
        onChange={(e) => setLevel({ ...level, fee: e.target.value })}
        className="w-full border p-3 rounded-lg"
      />

      <br />
      <br />
      <input
        type="text"
        placeholder="Time"
        value={level.time}
        onChange={(e) => setLevel({ ...level, time: e.target.value })}
        className="w-full border p-3 rounded-lg"
      />

      <br />
      <br />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full border p-3"
      >
        Save Level
      </button>
    </form>

        <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    {
      courses.find(course => course._id === selectedCourse)?.name
    }
  </h2>

  {courses
    .find(course => course._id === selectedCourse)
    ?.levels.map((lvl) => (
      <div
        key={lvl._id}
        className="border rounded-lg shadow p-4 mb-4"
      >
        <h3 className="text-xl font-semibold">{lvl.name}</h3>

        <p>Duration: {lvl.duration}</p>
        <p>Fee: {lvl.fee}</p>
        <p>Time: {lvl.time}</p>

        <div className="mt-3 flex gap-3">
          <button
            onClick={() => handleEdit(lvl)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(lvl._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
</div>
    {/* {courses
      .find((course) => course._id === selectedCourse)
      ?.levels.map((lvl) => (
        <div key={lvl._id}>
          <p>{lvl.name}</p>

          <button onClick={() => handleEdit(lvl)}>Edit</button>
          <button onClick={() => handleDelete(lvl._id)}>Delete</button>
        </div>
      ))} */}

  </div>
  </>
);
}

export default AdminAddLevel;