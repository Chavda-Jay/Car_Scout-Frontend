import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const getNotifications = async () => {
    try {
      if (!user?._id) return;

      const res = await API.get(`/notification?userId=${user._id}`);
      setNotifications(res.data.data || []);
    } catch (err) {
      console.log("Notification fetch error:", err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await API.put(`/notification/read/${id}`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (err) {
      console.log("Mark as read error:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await API.put("/notification/read-all", { userId: user._id });

      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true }))
      );

      toast.success("All notifications marked as read");
    } catch (err) {
      console.log("Mark all as read error:", err);
      toast.error("Failed to mark all as read");
    }
  };

  const getRedirectPath = () => {
    return role === "seller" ? "/seller/offers" : "/user/offers";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
        <p className="text-slate-400">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Alerts Center
            </p>
            <h1 className="mt-2 text-3xl font-bold">Notifications</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Stay updated with offer activity, counter offers, and buyer-seller decisions.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Mark All Read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No notifications yet</h3>
            <p className="mt-3 text-slate-400">
              New offer and response updates will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notifications.map((item) => (
              <div
                key={item._id}
                className={`rounded-3xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.20)] transition ${
                  item.isRead
                    ? "border-white/10 bg-[#111827]"
                    : "border-cyan-400/20 bg-cyan-400/5"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      {!item.isRead && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.message}
                    </p>

                    {(item.carId?.brand || item.carId?.model) && (
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                        Car: {item.carId?.brand} {item.carId?.model}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {!item.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(item._id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        Mark Read
                      </button>
                    )}

                    <a
                      href={getRedirectPath()}
                      className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Open
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
