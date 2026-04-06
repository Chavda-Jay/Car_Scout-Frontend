import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Inspection = () => {
  const [inspections, setInspections] = useState([]);
  const [editInspection, setEditInspection] = useState(null);
  const [loading, setLoading] = useState(false);

  const getInspections = async () => {
    try {
      setLoading(true);
      const res = await API.get("/inspection/inspections");
      setInspections(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load inspections ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteInspection = async (id) => {
    if (window.confirm("Delete this inspection report?")) {
      try {
        await API.delete(`/inspection/${id}`);
        toast.success("Inspection deleted successfully 🗑️");
        getInspections();
      } catch (err) {
        console.log(err);
        toast.error("Delete failed ❌");
      }
    }
  };

  const handleEdit = (data) => {
    setEditInspection(data);
  };

  const handleChange = (e) => {
    setEditInspection({
      ...editInspection,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/inspection/${editInspection._id}`, {
        report: editInspection.report,
        rating: Number(editInspection.rating),
        accidentHistory: editInspection.accidentHistory,
        serviceHistory: editInspection.serviceHistory,
      });

      toast.success("Inspection updated successfully 🔍");
      setEditInspection(null);
      getInspections();
    } catch (err) {
      console.log(err);
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    getInspections();
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Inspection Reports</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Review, update, and manage all car inspection reports from one place.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <p className="text-slate-400">Loading inspections...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#0f172a] text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Car</th>
                    <th className="px-5 py-4">Report</th>
                    <th className="px-5 py-4">Rating</th>
                    <th className="px-5 py-4">Accident</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {inspections.length > 0 ? (
                    inspections.map((item) => (
                      <tr key={item._id} className="transition hover:bg-white/5">
                        <td className="px-5 py-4 font-semibold text-white">
                          {item.carId?.brand} {item.carId?.model}
                        </td>

                        <td className="px-5 py-4 text-slate-300">{item.report}</td>

                        <td className="px-5 py-4 font-semibold text-amber-300">
                          ⭐ {item.rating}/5
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {item.accidentHistory}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {item.serviceHistory}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteInspection(item._id)}
                              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-400"
                      >
                        No Inspection Reports Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editInspection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Edit Inspection
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Update Report
                </h3>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <textarea
                  name="report"
                  value={editInspection.report}
                  onChange={handleChange}
                  placeholder="Full inspection report"
                  rows="4"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  type="number"
                  min="1"
                  max="5"
                  name="rating"
                  value={editInspection.rating}
                  onChange={handleChange}
                  placeholder="Rating (1-5)"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="accidentHistory"
                  value={editInspection.accidentHistory}
                  onChange={handleChange}
                  placeholder="Accident History"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="serviceHistory"
                  value={editInspection.serviceHistory}
                  onChange={handleChange}
                  placeholder="Service History"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditInspection(null)}
                    className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspection;
