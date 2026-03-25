import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET ALL CARS
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

  // 🔹 DELETE CAR
  const deleteCar = async (id) => {
  if (window.confirm("Are you sure you want to delete this car?")) {
    try {
      await API.delete(`/car/car/${id}`);
      toast.success("Car Deleted 🗑️");
      getCars();
    } catch (err) {
      console.log(err); // 👈 MUST
      toast.error("Delete failed ❌");
    }
  }
};

  // 🔹 OPEN EDIT
  const handleEdit = (car) => {
    setEditCar(car);
  };

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    setEditCar({ ...editCar, [e.target.name]: e.target.value });
  };

  // 🔹 UPDATE CAR
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
    <div className="p-6 text-white">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">Manage Cars 🚗</h2>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading cars...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
          <table className="min-w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3">Brand</th>
                <th className="p-3">Model</th>
                <th className="p-3">Year</th>
                <th className="p-3">Price</th>
                <th className="p-3">Mileage</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">Location</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-700">
              {cars.length > 0 ? (
                cars.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-800 transition">

                    <td className="p-3 font-semibold">{car.brand}</td>
                    <td className="p-3">{car.model}</td>
                    <td className="p-3">{car.year}</td>
                    <td className="p-3 text-green-400 font-semibold">₹{car.price}</td>
                    <td className="p-3">{car.mileage}</td>
                    <td className="p-3">{car.fuelType}</td>
                    <td className="p-3">{car.location}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(car)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCar(car._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-5 text-gray-400">
                    No Cars Found 🚫
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editCar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">

            <h3 className="text-xl font-bold mb-4">Edit Car ✏️</h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="brand"
                value={editCar.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="model"
                value={editCar.model}
                onChange={handleChange}
                placeholder="Model"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="year"
                value={editCar.year}
                onChange={handleChange}
                placeholder="Year"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="price"
                value={editCar.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="mileage"
                value={editCar.mileage}
                onChange={handleChange}
                placeholder="Mileage"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="fuelType"
                value={editCar.fuelType}
                onChange={handleChange}
                placeholder="Fuel Type"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="location"
                value={editCar.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <textarea
                name="description"
                value={editCar.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <div className="flex justify-between mt-4">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditCar(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCars;