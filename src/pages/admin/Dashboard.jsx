import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [inspections, setInspections] = useState([]);

  const fetchData = async () => {
    try {
      const carRes = await API.get("/car/cars");
      const userRes = await API.get("/user/users");
      const offerRes = await API.get("/offer/");
      const inspectionRes = await API.get("/inspection/inspections");

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

  // GRAPH DATA
  const offerStats = [
    {
      name: "Pending",
      value: offers.filter(o => o.status === "pending").length,
    },
    {
      name: "Accepted",
      value: offers.filter(o => o.status === "accepted").length,
    },
    {
      name: "Rejected",
      value: offers.filter(o => o.status === "rejected").length,
    },
  ];

  return (
    <div className="p-6 text-white bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">🚀 Admin Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
          <h2>Total Cars 🚗</h2>
          <p className="text-3xl font-bold">{cars.length}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
          <h2>Total Users 👤</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
          <h2>Total Offers 💰</h2>
          <p className="text-3xl font-bold">{offers.length}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl shadow-xl hover:scale-105 transition">
          <h2>Total Inspections 🔍</h2>
          <p className="text-3xl font-bold">{inspections.length}</p>
        </div>

      </div>

      {/* ================= GRAPH ================= */}
      <div className="bg-gray-800 p-6 rounded-xl mt-10 shadow-lg">
        <h2 className="text-2xl mb-4">📊 Offer Status</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={offerStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= RECENT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        <div className="bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="text-lg mb-3">Recent Cars 🚗</h2>
          {cars.slice(0,3).map(car => (
            <p key={car._id}>
              {car.brand} {car.model} - ₹{car.price}
            </p>
          ))}
        </div>

        <div className="bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="text-lg mb-3">Recent Inspections 🔍</h2>
          {inspections.slice(0,3).map(item => (
            <p key={item._id}>
              {item.carId?.brand} - ⭐ {item.rating}
            </p>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;