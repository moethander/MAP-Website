import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from '../../components/AdminNavbar';

const AdminTest = () => {
  const [terms, setTerms] = useState("");
  const [testLink, setTestLink] = useState("");
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/placement-test"
      );

      setData(res.data);

      //  (hide old value)
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setTerms(data?.terms || "");
    setTestLink(data?.testLink || "");
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/api/placement-test",
        {
          terms,
          testLink,
        }
      );

      alert("Updated successfully");
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Error updating data");
    }
  };

  return (
    <>
  <AdminNavbar/>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Manage Placement Test
      </h1>

      {/* VIEW MODE */}
      {!editMode && (
        <div className="bg-white shadow p-6 rounded">
          <p className="mb-2">
            <b>Terms:</b> Hidden
          </p>

          <p className="mb-4">
            <b>Test Link:</b> Hidden
          </p>

          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Edit
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow p-6 rounded"
        >
          <div>
            <label className="block font-semibold mb-2">
              Terms and Conditions
            </label>

            <textarea
              rows="8"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Test Link
            </label>

            <input
              type="text"
              value={testLink}
              onChange={(e) => setTestLink(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </>
  );
};

export default AdminTest;