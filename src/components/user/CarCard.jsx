import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 text-white rounded-xl shadow hover:scale-105 transition">

      <img
        src={car.images || "https://via.placeholder.com/300"}
        alt=""
        className="h-40 w-full object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">
          {car.brand} {car.model}
        </h2>

        <p className="text-gray-400 text-sm">
          {car.year} • {car.fuelType}
        </p>

        <p className="text-green-400 text-lg font-semibold mt-2">
          ₹ {car.price}
        </p>

        <Link
          to={`/user/car/${car._id}`} //{`/car/${car._id}`}
          className="block mt-3 text-center bg-blue-500 py-2 rounded-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;