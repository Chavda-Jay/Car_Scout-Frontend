import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    try {
      setLoading(true);
      const res = await API.get("/car/cars");
      setCars(res.data.data);
    } catch (err) {
      toast.error("Failed to load cars ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await API.delete(`/car/${id}`);
        toast.success("Car Deleted 🗑️");
        getCars();
      } catch (err) {
        console.log(err);
        toast.error("Delete failed ❌");
      }
    }
  };

  const handleEdit = (car) => {
    setEditCar(car);
  };

  const handleChange = (e) => {
    setEditCar({ ...editCar, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/car/${editCar._id}`, editCar);
      toast.success("Car Updated ✏️");
      setEditCar(null);
      getCars();
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Manage Cars</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            View, update, and manage all listed cars through a clean and
            professional admin workspace.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <p className="text-slate-400">Loading cars...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#0f172a] text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Brand</th>
                    <th className="px-5 py-4">Model</th>
                    <th className="px-5 py-4">Year</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Mileage</th>
                    <th className="px-5 py-4">Fuel</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {cars.length > 0 ? (
                    cars.map((car) => (
                      <tr
                        key={car._id}
                        className="transition hover:bg-white/5"
                      >
                        <td className="px-5 py-4 font-semibold text-white">
                          {car.brand}
                        </td>
                        <td className="px-5 py-4 text-slate-300">{car.model}</td>
                        <td className="px-5 py-4 text-slate-300">{car.year}</td>
                        <td className="px-5 py-4 font-semibold text-emerald-300">
                          ₹{Number(car.price || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {car.mileage}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {car.fuelType}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {car.location}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(car)}
                              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteCar(car._id)}
                              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-5 py-10 text-center text-slate-400"
                      >
                        No Cars Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Edit Listing
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Update Car Details
                </h3>
              </div>

              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <input
                  name="brand"
                  value={editCar.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="model"
                  value={editCar.model}
                  onChange={handleChange}
                  placeholder="Model"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="year"
                  value={editCar.year}
                  onChange={handleChange}
                  placeholder="Year"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="price"
                  value={editCar.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="mileage"
                  value={editCar.mileage}
                  onChange={handleChange}
                  placeholder="Mileage"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="fuelType"
                  value={editCar.fuelType}
                  onChange={handleChange}
                  placeholder="Fuel Type"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="location"
                  value={editCar.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40 md:col-span-2"
                />

                <textarea
                  name="description"
                  value={editCar.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="5"
                  className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40 md:col-span-2"
                />

                <div className="mt-2 flex gap-3 md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditCar(null)}
                    className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
