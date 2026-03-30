import React, { useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const AddCar = () => {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ ADD THIS CHECK
    if (!user) {
      toast.error("User not logged in ❌");
      return;
    }

    const formData = {
      ...car,
      sellerId: user._id,
    };

    await API.post("/car/car", formData);

    toast.success("Car Added Successfully 🚗");

    setCar({
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuelType: "",
      description: "",
      location: "",
    });

  } catch (err) {
    console.log(err); // 👈 ADD THIS (DEBUG)
    toast.error("Failed to add car ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl text-white">

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          🚗 Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* BRAND */}
          <div>
            <label className="text-sm text-gray-400">Brand</label>
            <input
              name="brand"
              value={car.brand}
              onChange={handleChange}
              placeholder="Enter brand"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* MODEL */}
          <div>
            <label className="text-sm text-gray-400">Model</label>
            <input
              name="model"
              value={car.model}
              onChange={handleChange}
              placeholder="Enter model"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* YEAR */}
          <div>
            <label className="text-sm text-gray-400">Year</label>
            <input
              name="year"
              value={car.year}
              onChange={handleChange}
              placeholder="e.g. 2022"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-400">Price</label>
            <input
              name="price"
              value={car.price}
              onChange={handleChange}
              placeholder="₹ Price"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* MILEAGE */}
          <div>
            <label className="text-sm text-gray-400">Mileage</label>
            <input
              name="mileage"
              value={car.mileage}
              onChange={handleChange}
              placeholder="e.g. 20 km/l"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FUEL */}
          <div>
            <label className="text-sm text-gray-400">Fuel Type</label>
            <input
              name="fuelType"
              value={car.fuelType}
              onChange={handleChange}
              placeholder="Petrol / Diesel"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* LOCATION */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Location</label>
            <input
              name="location"
              value={car.location}
              onChange={handleChange}
              placeholder="City / Area"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={car.description}
              onChange={handleChange}
              placeholder="Enter details..."
              rows="4"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 mt-4">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition font-semibold shadow-lg">
              Add Car
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCar;