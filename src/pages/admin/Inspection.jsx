import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Inspection = () => {
  const [inspections, setInspections] = useState([]);
  const [editInspection, setEditInspection] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET ALL INSPECTIONS
  const getInspections = async () => {
    try {
      setLoading(true);
      const res = await API.get("/inspection/inspections");
      setInspections(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load inspections ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE INSPECTION
  const deleteInspection = async (id) => {
    if (window.confirm("Delete this report?")) {
      try {
        await API.delete(`/inspection/${id}`); // ✅ FIXED
        toast.success("Inspection Deleted 🗑️");
        getInspections();
      } catch (err) {
        console.log(err);
        toast.error("Delete Failed ❌");
      }
    }
  };

  // 🔹 OPEN EDIT
  const handleEdit = (data) => {
    setEditInspection(data);
  };

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    setEditInspection({
      ...editInspection,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 UPDATE INSPECTION
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/inspection/inspection/${editInspection._id}`, editInspection); // ✅ FIXED
      toast.success("Inspection Updated 🔍");
      setEditInspection(null);
      getInspections();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed ❌");
    }
  };

  useEffect(() => {
    getInspections();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* 🔥 TITLE */}
      <h2 className="text-3xl font-bold mb-6">
        Inspection Reports 🔍
      </h2>

      {/* 🔹 LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading inspections...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">

          <table className="min-w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-3">Car</th>
                <th className="p-3">Report</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Accident</th>
                <th className="p-3">Service</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-700">
              {inspections.length > 0 ? (
                inspections.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-800 transition">

                    <td className="p-3 font-semibold">
                      {item.carId?.brand} {item.carId?.model}
                    </td>

                    <td className="p-3">{item.report}</td>

                    <td className="p-3 text-yellow-400 font-semibold">
                      ⭐ {item.rating}/5
                    </td>

                    <td className="p-3">{item.accidentHistory}</td>

                    <td className="p-3">{item.serviceHistory}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteInspection(item._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-gray-400">
                    No Inspection Reports Found 🚫
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">

          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl">

            <h3 className="text-xl font-bold mb-4">
              Edit Inspection ✏️
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="report"
                value={editInspection.report}
                onChange={handleChange}
                placeholder="Report"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="rating"
                value={editInspection.rating}
                onChange={handleChange}
                placeholder="Rating (1-5)"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="accidentHistory"
                value={editInspection.accidentHistory}
                onChange={handleChange}
                placeholder="Accident History"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="serviceHistory"
                value={editInspection.serviceHistory}
                onChange={handleChange}
                placeholder="Service History"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <div className="flex justify-between mt-4">

                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditInspection(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inspection;