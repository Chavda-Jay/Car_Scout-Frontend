import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

      {/* 🔥 IMAGE */}
      <div className="relative">
        <img
          src={car.images || "https://via.placeholder.com/300"}
          alt="car"
          className="h-48 w-full object-cover"
        />

        {/* 🔥 PRICE TAG OVER IMAGE */}
        <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded-lg text-sm font-semibold">
          ₹ {car.price}
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-4">

        {/* Car Name */}
        <h2 className="text-lg font-bold mb-1">
          {car.brand} {car.model}
        </h2>

        {/* Car Info */}
        <p className="text-gray-400 text-sm">
          {car.year} • {car.fuelType}
        </p>

        {/* 🔥 Extra Info (Optional but looks premium) */}
        <p className="text-gray-500 text-xs mt-1">
          {car.location || "Location not available"}
        </p>

        {/* 🔥 BUTTON */}
        <Link
          to={`/user/car/${car._id}`}
          className="block mt-4 text-center bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default CarCard;