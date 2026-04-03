// import React, { useEffect, useState } from "react";
// import API from "../../api/Api";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Dashboard = () => {

//   const [cars, setCars] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [inspections, setInspections] = useState([]);

//   const fetchData = async () => {
//     try {
//       const carRes = await API.get("/car/cars");
//       const userRes = await API.get("/user/users");
//       const offerRes = await API.get("/offer/");
//       const inspectionRes = await API.get("/inspection/inspections");

//       setCars(carRes.data?.data || []);
//       setUsers(userRes.data?.data || []);
//       setOffers(offerRes.data?.data || []);
//       setInspections(inspectionRes.data?.data || []);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // GRAPH DATA
//   const offerStats = [
//     {
//       name: "Pending",
//       value: offers.filter(o => o.status === "pending").length,
//     },
//     {
//       name: "Accepted",
//       value: offers.filter(o => o.status === "accepted").length,
//     },
//     {
//       name: "Rejected",
//       value: offers.filter(o => o.status === "rejected").length,
//     },
//   ];

//   return (
//     <div className="p-6 text-white bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">

//       <h1 className="text-4xl font-bold mb-8">🚀 Admin Dashboard</h1>

//       {/* ================= CARDS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//         <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
//           <h2>Total Cars 🚗</h2>
//           <p className="text-3xl font-bold">{cars.length}</p>
//         </div>

//         <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
//           <h2>Total Users 👤</h2>
//           <p className="text-3xl font-bold">{users.length}</p>
//         </div>

//         <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
//           <h2>Total Offers 💰</h2>
//           <p className="text-3xl font-bold">{offers.length}</p>
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
//           <h2>Total Inspections 🔍</h2>
//           <p className="text-3xl font-bold">{inspections.length}</p>
//         </div>

//       </div>

//       {/* ================= GRAPH ================= */}
//       <div className="bg-gray-800 p-6 rounded-xl mt-10 shadow-lg">
//         <h2 className="text-2xl mb-4">📊 Offer Status</h2>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={offerStats}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ================= RECENT ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

//         <div className="bg-gray-800 p-5 rounded-xl shadow">
//           <h2 className="text-lg mb-3">Recent Cars 🚗</h2>
//           {cars.slice(0,3).map(car => (
//             <p key={car._id}>
//               {car.brand} {car.model} - ₹{car.price}
//             </p>
//           ))}
//         </div>

//         <div className="bg-gray-800 p-5 rounded-xl shadow">
//           <h2 className="text-lg mb-3">Recent Inspections 🔍</h2>
//           {inspections.slice(0,3).map(item => (
//             <p key={item._id}>
//               {item.carId?.brand} - ⭐ {item.rating}
//             </p>
//           ))}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;











import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/Api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { FaCarSide } from "react-icons/fa";
import { FiUsers, FiTag, FiFileText } from "react-icons/fi";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [inspections, setInspections] = useState([]);

  const fetchData = async () => {
    try {
      const [carRes, userRes, offerRes, inspectionRes] = await Promise.all([
        API.get("/car/cars"),
        API.get("/user/users"),
        API.get("/offer/"),
        API.get("/inspection/inspections"),
      ]);

      setCars(carRes.data?.data || []);
      setUsers(userRes.data?.data || []);
      setOffers(offerRes.data?.data || []);
      setInspections(inspectionRes.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingOffers = offers.filter((o) => o.status === "pending").length;
  const acceptedOffers = offers.filter((o) => o.status === "accepted").length;
  const rejectedOffers = offers.filter((o) => o.status === "rejected").length;

  const offerStats = [
    { name: "Pending", value: pendingOffers, color: "#22d3ee" },
    { name: "Accepted", value: acceptedOffers, color: "#10b981" },
    { name: "Rejected", value: rejectedOffers, color: "#f59e0b" },
  ];

  const recentCars = useMemo(() => cars.slice(0, 3), [cars]);
  const recentInspections = useMemo(() => inspections.slice(0, 3), [inspections]);

  const stats = [
    {
      title: "Cars",
      value: cars.length,
      icon: <FaCarSide size={18} />,
      color: "bg-cyan-400 text-slate-950",
    },
    {
      title: "Users",
      value: users.length,
      icon: <FiUsers size={18} />,
      color: "bg-emerald-400 text-slate-950",
    },
    {
      title: "Offers",
      value: offers.length,
      icon: <FiTag size={18} />,
      color: "bg-amber-400 text-slate-950",
    },
    {
      title: "Inspections",
      value: inspections.length,
      icon: <FiFileText size={18} />,
      color: "bg-violet-400 text-slate-950",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold">Marketplace Overview</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Monitor platform activity, track offers, and manage inventory with a
          clean and professional dashboard.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">{item.value}</h2>
              </div>

              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Offer Status
          </p>
          <h2 className="mt-2 text-2xl font-bold">Offers Overview</h2>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={offerStats} barSize={48}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {offerStats.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
            Quick Summary
          </p>
          <h2 className="mt-2 text-2xl font-bold">Current Status</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-[#0f172a] p-4">
              <p className="text-sm text-slate-400">Pending Offers</p>
              <p className="mt-2 text-2xl font-bold text-cyan-300">{pendingOffers}</p>
            </div>

            <div className="rounded-2xl bg-[#0f172a] p-4">
              <p className="text-sm text-slate-400">Accepted Offers</p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">{acceptedOffers}</p>
            </div>

            <div className="rounded-2xl bg-[#0f172a] p-4">
              <p className="text-sm text-slate-400">Rejected Offers</p>
              <p className="mt-2 text-2xl font-bold text-amber-300">{rejectedOffers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Recent Cars
          </p>
          <h2 className="mt-2 text-2xl font-bold">Latest Listings</h2>

          <div className="mt-6 space-y-3">
            {recentCars.length > 0 ? (
              recentCars.map((car) => (
                <div
                  key={car._id}
                  className="flex items-center justify-between rounded-2xl bg-[#0f172a] p-4"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {car.brand} {car.model}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {car.year} • {car.fuelType}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-cyan-300">
                    ₹{Number(car.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No recent cars found.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
            Recent Inspections
          </p>
          <h2 className="mt-2 text-2xl font-bold">Inspection Activity</h2>

          <div className="mt-6 space-y-3">
            {recentInspections.length > 0 ? (
              recentInspections.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl bg-[#0f172a] p-4"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {item.carId?.brand || "Car"} {item.carId?.model || ""}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Inspection completed
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-amber-300">
                    ⭐ {item.rating || 0}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No recent inspections found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
