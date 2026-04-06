import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const MyTestDrives = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const getMyTestDrives = async () => {
    try {
      if (!user?._id) return;

      const res = await API.get(`/testdrive?buyerId=${user._id}`);
      setTestDrives(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load test drives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTestDrives();
  }, []);

  const handleMarkCompleted = async (id) => {
    try {
      await API.put(`/testdrive/${id}`, {
        status: "completed",
        actionBy: "buyer"
      });

      toast.success("Test drive marked as completed ✅");
      getMyTestDrives();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white">
        <p className="text-slate-400">Loading test drives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
            Buyer Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold">My Test Drives</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Track all your booked test drives and see seller responses.
          </p>
        </div>

        {testDrives.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">No test drives booked</h3>
            <p className="mt-3 text-slate-400">
              Your test drive requests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                  className="rounded-[26px] border border-white/10 bg-[#111827] p-5 shadow-[0_10px_26px_rgba(0,0,0,0.20)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Car
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">
                        {item.carId?.brand} {item.carId?.model}
                      </h3>
                    </div>

                    <div className={`rounded-full border px-3 py-1 text-[11px] font-medium capitalize ${statusClass}`}>
                      {item.status}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Scheduled Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.requestedDate}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Scheduled Time
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.requestedTime}
                      </p>
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
                        <p className="mt-1 text-sm text-slate-300">{item.message}</p>
                      </div>
                    )}
                  </div>

                  {item.status === "accepted" && (
                    <div className="mt-5">
                      <button
                        onClick={() => handleMarkCompleted(item._id)}
                        className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTestDrives;
