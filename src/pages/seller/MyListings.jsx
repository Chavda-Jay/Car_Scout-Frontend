import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const MyListings = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const getMyCars = async () => {
    try {
      const res = await API.get(`/car/user/${user._id}`);
      setCars(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getMyCars();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/car/${id}`);
      toast.success("Car Deleted Successfully ");
      getMyCars();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed ");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in editCar) {
        if (
          key !== "newImages" &&
          key !== "images" &&
          key !== "_id" &&
          key !== "sellerId"
        ) {
          formData.append(key, editCar[key]);
        }
      }

      if (editCar.newImages) {
        for (let i = 0; i < editCar.newImages.length; i++) {
          formData.append("images", editCar.newImages[i]);
        }
      }

      await API.put(`/car/${editCar._id}`, formData);

      toast.success("Car Updated with images");
      setEditCar(null);
      getMyCars();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed ");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Seller Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">My Listings</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Manage your listed cars, update details, and keep your inventory
            looking professional on CarScout.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No Cars Found</h3>
            <p className="mt-3 text-slate-400">
              You have not added any listings yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car._id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
              >
                <div className="relative">
                  <img
                    src={car.images?.[0]}
                    alt={car.model}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    Active Listing
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-xl bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 shadow-lg">
                    ₹ {Number(car.price || 0).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {car.brand} {car.model}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {car.year} • {car.fuelType || "Not available"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#0f172a] px-3 py-1.5 text-xs text-slate-300">
                      {car.condition || "Good"}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {car.location || "Not available"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Mileage
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {car.mileage || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setEditCar(car)}
                      className="flex-1 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(car._id)}
                      className="flex-1 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editCar && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Edit Listing
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                Update Car Details
              </h2>
            </div>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <input
                type="text"
                value={editCar.brand}
                onChange={(e) =>
                  setEditCar({ ...editCar, brand: e.target.value })
                }
                placeholder="Brand"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="text"
                value={editCar.model}
                onChange={(e) =>
                  setEditCar({ ...editCar, model: e.target.value })
                }
                placeholder="Model"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="number"
                value={editCar.year}
                onChange={(e) =>
                  setEditCar({ ...editCar, year: e.target.value })
                }
                placeholder="Year"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="number"
                value={editCar.price}
                onChange={(e) =>
                  setEditCar({ ...editCar, price: e.target.value })
                }
                placeholder="Price"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="number"
                value={editCar.mileage}
                onChange={(e) =>
                  setEditCar({ ...editCar, mileage: e.target.value })
                }
                placeholder="Mileage"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="text"
                value={editCar.fuelType}
                onChange={(e) =>
                  setEditCar({ ...editCar, fuelType: e.target.value })
                }
                placeholder="Fuel Type"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <input
                type="text"
                value={editCar.location}
                onChange={(e) =>
                  setEditCar({ ...editCar, location: e.target.value })
                }
                placeholder="Location"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />

              <select
                value={editCar.condition}
                onChange={(e) =>
                  setEditCar({ ...editCar, condition: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>

              <textarea
                value={editCar.description}
                onChange={(e) =>
                  setEditCar({ ...editCar, description: e.target.value })
                }
                placeholder="Description"
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 md:col-span-2"
                rows="5"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">
                  Upload Images
                </label>

                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0f172a] p-4 text-slate-300 transition hover:border-cyan-400/30 hover:bg-[#132033]">
                  Choose Images
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      setEditCar({ ...editCar, newImages: e.target.files });
                    }}
                    className="hidden"
                  />
                </label>

                {editCar?.newImages && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {Array.from(editCar.newImages).map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="h-20 w-20 rounded-xl border border-white/10 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-2 flex gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Update Car
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
        )}

        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111827] p-6 text-center text-white shadow-2xl">
              <h2 className="text-xl font-semibold">Delete Listing?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Are you sure you want to delete this car listing? This action
                cannot be undone.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={async () => {
                    try {
                      await API.delete(`/car/${deleteId}`);
                      toast.success("Car Deleted Successfully ");
                      setDeleteId(null);
                      getMyCars();
                    } catch (err) {
                      toast.error("Delete Failed ");
                    }
                  }}
                  className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
                >
                  Yes, Delete
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="rounded-xl bg-white/10 px-5 py-2.5 font-semibold text-white transition hover:bg-white/15"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
