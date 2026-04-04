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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      toast.error("Please select at least 1 image ❌");
      return;
    }

    if (files.length > 5) {
      toast.error("Max 5 images allowed ❌");
      return;
    }

    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("USER:", user);

      if (!user) {
        toast.error("User not logged in ❌");
        return;
      }

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

      images.forEach((img) => {
        formData.append("images", img);
      });

      await API.post("/car/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Car Added Successfully");

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

      setImages([]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add car ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
            Seller Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Add New Car</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Create a professional listing with complete details and quality
            images to attract better buyers on CarScout.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div>
              <label className="text-sm text-slate-400">Brand</label>
              <input
                name="brand"
                value={car.brand}
                onChange={handleChange}
                placeholder="Enter brand"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Model</label>
              <input
                name="model"
                value={car.model}
                onChange={handleChange}
                placeholder="Enter model"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Year</label>
              <input
                name="year"
                value={car.year}
                onChange={handleChange}
                placeholder="Enter year"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Price</label>
              <input
                name="price"
                value={car.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Mileage</label>
              <input
                name="mileage"
                value={car.mileage}
                onChange={handleChange}
                placeholder="Enter mileage"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Fuel Type</label>
              <input
                name="fuelType"
                value={car.fuelType}
                onChange={handleChange}
                placeholder="Enter fuel type"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">Location</label>
              <input
                name="location"
                value={car.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">Car Images</label>
              <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0f172a] p-4 text-slate-300 transition hover:border-cyan-400/30 hover:bg-[#132033]">
                Choose up to 5 images
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="h-20 w-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">Description</label>
              <textarea
                name="description"
                value={car.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write car details..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button className="w-full rounded-2xl bg-emerald-500 py-3.5 font-semibold text-white transition hover:bg-emerald-400">
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
