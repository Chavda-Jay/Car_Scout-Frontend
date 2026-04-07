import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const TestDrives = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTestDrives = async () => {
    try {
      const res = await API.get("/testdrive");
      setTestDrives(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load test drives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTestDrives();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/testdrive/${id}`, {
        status,
        actionBy: "admin",
      });

      toast.success(`Test drive ${status} successfully ✅`);
      getAllTestDrives();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update test drive ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test drive request?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/testdrive/${id}`);
      toast.success("Test drive deleted successfully 🗑️");
      getAllTestDrives();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete test drive ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white">
        <p className="text-slate-400">Loading test drives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold">All Test Drives</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Monitor, update, and manage all buyer test drive requests across the CarScout platform.
          </p>
        </div>

        {testDrives.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No test drives found</h3>
            <p className="mt-3 text-slate-400">
              Test drive bookings will appear here once users start booking.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testDrives.map((item) => {
              const statusClass =
                item.status === "pending"
                  ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
                  : item.status === "accepted"
                  ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
                  : item.status === "completed"
                  ? "bg-cyan-400/10 text-cyan-300 border-cyan-400/20"
                  : "bg-red-400/10 text-red-300 border-red-400/20";

              return (
                <div
                  key={item._id}
                  className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                        Car
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        {item.carId?.brand} {item.carId?.model}
                      </h3>
                    </div>

                    <div
                      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Buyer
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {item.buyerId?.firstName} {item.buyerId?.lastName}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Seller
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {item.sellerId?.firstName} {item.sellerId?.lastName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {item.requestedDate}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {item.requestedTime}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.location}
                      </p>
                    </div>

                    {item.message && (
                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Message
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {item.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 space-y-3">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete Test Drive
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDrives;
