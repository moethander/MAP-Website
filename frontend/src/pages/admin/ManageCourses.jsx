import React, { useState , useEffect } from 'react'
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

const ManageCourses = () => {

    const[courses,setCourses] = useState([])
    const[image, setImage] = useState(null);
    const[showCourses,setShowCourses] = useState(false);
    const [editId, setEditId] = useState(null);

    const [ course, setCourse] = useState({
        name: "",
        description: "",
        startDate: "",
        levels: [],
        image: null
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name] : e.target.value
        });
    };

    const handleCancelEdit = ()  => {
      setCourse({
        name: "",
        description: "",
        startDate: "",
        levels: [],
        image: null
      });
      setImage(null);
      setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("description", course.description);
        formData.append("startDate", course.startDate);

        if (image) {
          formData.append("image", image);
        }

          if(editId){
           await axios.put(
             `http://localhost:4000/api/courses/${editId}`,
             formData,
             {
               headers: {
                 "Content-Type": "multipart/form-data",
               },
             },
           );
            alert("Course updated successfully!");
          }else{
            await axios.post("http://localhost:4000/api/courses", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            alert("Course saved successfully!");
          }

            setCourse({
                name: "",
                description: "",
                startDate: "",
                levels: [],
                image: null
            });
            
            setImage(null);
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
      if(!window.confirm("Are u sure?"))return;
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
      <AdminNavbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 style={{ textAlign: "center", fontWeight: "bold" }} className="">
          Manage Courses
        </h1>

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
            required
          />
          <br />
          <br />

          <textarea
            name="description"
            placeholder="Course Description"
            value={course.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
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
          {course.image && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Current Image:</p>

              <img
                src={`http://localhost:4000/uploads/${course.image}`}
                alt="current"
                className="
                   w-32 h-32 object-cover rounded-lg mt-2"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />

          {image && <p className="text-green-600">New Image: {image.name}</p>}
          <br />
          <br />

          <div className="flex gap-4">
            <button
              type="submit"
              className={`${
                editId ? "bg-amber-600" : "bg-blue-700"
              } text-white px-6 py-3 rounded-lg w-full font-semibold`}
            >
              {editId ? "Save course" : "Update course"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <button
          type="button"
          onClick={() => setShowCourses(!showCourses)}
          className="bg-gray-800 text-white px-4 py-2 rounded mt-6 w-full font-medium"
        >
          {showCourses ? "Hide Course Lists" : "Show Course Lists"}
        </button>

        {showCourses && (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">Course Lists</h2>

            {courses.map((course) => (
              <div
                key={course._id}
                className="border p-4 rounded-lg shadow mb-4"
              >
                {course.image && (
                  <img
                    src={`http://localhost:4000/uploads/${course.image}`}
                    alt={course.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="font-bold">{course.name}</h3>
                <p>{course.description}</p>
                <p>{course.startDate}</p>

                <button
                  type="button"
                  onClick={() => {
                    setCourse({
                      name: course.name,
                      description: course.description,
                      startDate: course.startDate,
                      levels: course.levels,
                      image: course.image,
                    });

                    setEditId(course._id);

                    setImage(null);

                    //slidtform
                    window.scrollTo({top:0, behavior: 'smooth'});
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded font-medium mr-2"
                >
                  {" "}
                  Edit{" "}
                </button>

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