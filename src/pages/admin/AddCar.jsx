import React, { useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const AddCar = () => {

  const [car,setCar] = useState({
    brand:"",
    model:"",
    year:"",
    price:"",
    mileage:"",
    fuelType:"",
    description:"",
    location:""
  });

  const handleChange = (e)=>{
    setCar({...car,[e.target.name]:e.target.value});
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 🔥 logged-in user nikalo
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("User not logged in ❌");
      return;
    }

    // 🔥 sellerId add karo
    const formData = {
      ...car,
      sellerId: user._id
    };

    console.log("FORM DATA:", formData);
    
    // 🔥 API call
    await API.post("/car/car", formData);

    toast.success("Car Added Successfully 🚗");

    // reset form
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
    toast.error("Failed to add car ❌");
  }
};

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-full max-w-lg text-white shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">Add New Car 🚗</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="brand" placeholder="Brand" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>
          
          <input name="model" placeholder="Model" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>
          
          <input name="year" placeholder="Year" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>
          
          <input name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>
          
          <input name="mileage" placeholder="Mileage" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>

          <input name="fuelType" placeholder="Fuel Type (Petrol/Diesel)" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>

          <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>

          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 rounded bg-white/20 outline-none"/>

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold">
            Add Car
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCar;