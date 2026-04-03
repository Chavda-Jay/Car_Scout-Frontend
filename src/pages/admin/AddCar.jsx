import React, { useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const AddCar = () => {
  const [images, setImages] = useState([]);
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

  // 🔥 IMAGE VALIDATION (FINAL PRO)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // ❌ No image
    if (files.length === 0) {
      toast.error("Please select at least 1 image ❌");
      return;
    }

    // ❌ Max limit
    if (files.length > 5) {
      toast.error("Max 5 images allowed ❌");
      return;
    }

    // ✅ OK
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("USER:", user); // 👈 ADD THIS

      if (!user) {
        toast.error("User not logged in ❌");
        return;
      }

      // ❌ Image not selected
      if (images.length === 0) {
        toast.error("Please upload at least 1 image ❌");
        return;
      }

      const formData = new FormData();

      formData.append("brand", car.brand);
      formData.append("model", car.model);
      formData.append("year", car.year);
      formData.append("price", car.price);
      formData.append("mileage", car.mileage);
      formData.append("fuelType", car.fuelType);
      formData.append("description", car.description);
      formData.append("location", car.location);
      formData.append("sellerId", user._id);

      // 🔥 Multiple Images Upload
      images.forEach((img) => {
        formData.append("images", img);
      });

      await API.post("/car/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Car Added Successfully");

      // 🔄 Reset
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

      setImages([]); // ✅ important
    } catch (err) {
      console.log(err);
      toast.error("Failed to add car ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl text-white">
        
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
           Add New Car
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <div>
            <label className="text-sm text-gray-400">Brand</label>
            <input
              name="brand"
              value={car.brand}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Model</label>
            <input
              name="model"
              value={car.model}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Year</label>
            <input
              name="year"
              value={car.year}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Price</label>
            <input
              name="price"
              value={car.price}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Mileage</label>
            <input
              name="mileage"
              value={car.mileage}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Fuel Type</label>
            <input
              name="fuelType"
              value={car.fuelType}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Location</label>
            <input
              name="location"
              value={car.location}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🔥 IMAGE INPUT */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Car Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={car.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

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