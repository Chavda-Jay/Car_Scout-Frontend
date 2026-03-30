import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import CarCard from "../../components/user/CarCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 FETCH CARS FROM BACKEND
  const getCars = async () => {
    try {
      const res = await API.get("/car/cars");
      console.log("Cars Data:", res.data);
      setCars(res.data.data);
    } catch (err) {
      console.log("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* 🔥 HERO SECTION (UPDATED) */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')] bg-cover bg-center h-[400px] rounded-xl mb-10 flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-xl"></div>

        {/* Content */}
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Car
          </h1>

          <p className="text-gray-300 mb-6">
            Buy or Sell Cars Easily with CarScout
          </p>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search Car"
              className="w-64 md:w-96 px-4 py-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 text-white">
              Search
            </button>
          </div>

          {/* 🔥 Buy / Sell Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600 text-black">
              Buy Car
            </button>

            {/* <button className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600">
              Sell Car
            </button> */}
            <button
              onClick={() => {
                const role = localStorage.getItem("role");

                if (role !== "seller") {
                  toast.error("Only sellers can access this!");
                  return;
                }

                navigate("/seller");
              }}
              className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Sell Car
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 WHY CHOOSE US (NEW SECTION) */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Verified Cars</h3>
          <p className="text-gray-400">All cars are inspected and verified</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
          <p className="text-gray-400">Get best deals from sellers</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Easy Process</h3>
          <p className="text-gray-400">Book test drive & buy easily</p>
        </div>
      </div>

      {/* 🔥 CAR LIST HEADER (STEP 3 FIXED) */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Cars</h2>

        <button className="text-blue-400 hover:underline">View All →</button>
      </div>

      {/* 🔥 CAR LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading cars...</p>
        ) : cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="text-red-400">No cars found</p>
        )}
      </div>

      {/* 🔥 FOOTER */}
      <footer className="bg-black text-gray-400 mt-10 p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-2">CarScout 🚗</h3>
            <p>
              Buy and sell cars easily with best deals. Trusted platform for car
              lovers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-2">Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>Cars</li>
              <li>My Offers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-2">Contact</h3>
            <p>Email: support@carscout.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>

        <p className="text-center mt-6 text-sm">
          © 2026 CarScout. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
