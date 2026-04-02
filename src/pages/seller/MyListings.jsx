import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const MyListings = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 GET MY CARS
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

  // 🔴 DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?",
    );

    if (!confirmDelete) return; // ❌ cancel

    try {
      await API.delete(`/car/${id}`);
      toast.success("Car Deleted Successfully ");
      getMyCars();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed ");
    }
  };

  // 🟡 UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // 🔹 append all fields
      for (let key in editCar) {
        if (key !== "newImages") {
          formData.append(key, editCar[key]);
        }
      }

      // 🔹 append images
      if (editCar.newImages) {
        for (let i = 0; i < editCar.newImages.length; i++) {
          formData.append("images", editCar.newImages[i]);
        }
      }

      await API.put(`/car/${editCar._id}`, formData);

      toast.success("Car Updated with Images ");

      setEditCar(null);
      getMyCars();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed ");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>

      {cars.length === 0 ? (
        <p>No Cars Found </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cars.map((car) => (
            <div key={car._id} className="bg-gray-800 p-4 rounded">
              <img
                src={car.images[0]}
                alt=""
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="text-lg font-bold mt-2">
                {car.brand} {car.model}
              </h3>

              <p>₹ {car.price}</p>
              <p>{car.location}</p>

              {/* ✏️ EDIT */}
              <button
                onClick={() => setEditCar(car)}
                className="bg-blue-500 px-3 py-1 mt-2 mr-2 text-white rounded"
              >
                Edit
              </button>

              {/* ❌ DELETE */}
              <button
                onClick={() => setDeleteId(car._id)}
                className="bg-red-500 px-3 py-1 mt-2 mr-2 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 FULL EDIT FORM */}
      {editCar && (
        <div className="bg-gray-900/80 backdrop-blur-md p-6 mt-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">
             Edit Car Details
          </h2>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* BRAND */}
            <input
              type="text"
              value={editCar.brand}
              onChange={(e) =>
                setEditCar({ ...editCar, brand: e.target.value })
              }
              placeholder="Brand"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* MODEL */}
            <input
              type="text"
              value={editCar.model}
              onChange={(e) =>
                setEditCar({ ...editCar, model: e.target.value })
              }
              placeholder="Model"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* YEAR */}
            <input
              type="number"
              value={editCar.year}
              onChange={(e) => setEditCar({ ...editCar, year: e.target.value })}
              placeholder="Year"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* PRICE */}
            <input
              type="number"
              value={editCar.price}
              onChange={(e) =>
                setEditCar({ ...editCar, price: e.target.value })
              }
              placeholder="Price"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* MILEAGE */}
            <input
              type="number"
              value={editCar.mileage}
              onChange={(e) =>
                setEditCar({ ...editCar, mileage: e.target.value })
              }
              placeholder="Mileage"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* FUEL */}
            <input
              type="text"
              value={editCar.fuelType}
              onChange={(e) =>
                setEditCar({ ...editCar, fuelType: e.target.value })
              }
              placeholder="Fuel Type"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* LOCATION */}
            <input
              type="text"
              value={editCar.location}
              onChange={(e) =>
                setEditCar({ ...editCar, location: e.target.value })
              }
              placeholder="Location"
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* CONDITION */}
            <select
              value={editCar.condition}
              onChange={(e) =>
                setEditCar({ ...editCar, condition: e.target.value })
              }
              className="bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>

            {/* DESCRIPTION (full width) */}
            <textarea
              value={editCar.description}
              onChange={(e) =>
                setEditCar({ ...editCar, description: e.target.value })
              }
              placeholder="Description"
              className="md:col-span-2 bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* IMAGE INPUT */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-1">Upload Images</label>
              <label className="flex items-left justify-left bg-gray-800 border border-gray-600 p-3 rounded cursor-pointer hover:bg-gray-700 transition">
                <span className="text-white"> Choose Images</span>

                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    console.log("FILES:", e.target.files); // debug
                    setEditCar({ ...editCar, newImages: e.target.files });
                  }}
                  className="hidden"
                />
              </label>
              {editCar?.newImages && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {Array.from(editCar.newImages).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="h-20 w-20 object-cover rounded border border-gray-600"
                    />
                  ))}
                </div>
              )}
            </div>
            {/* BUTTONS */}
            <div className="md:col-span-2 flex gap-3 mt-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white font-medium"
              >
                Update Car
              </button>

              <button
                type="button"
                onClick={() => setEditCar(null)}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
     
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg text-white w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

            <p className="text-gray-400 mb-4">These images is Deleted ?</p>

            <div className="flex justify-center gap-4">
              {/* YES */}
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
                className="bg-red-600 px-4 py-2 rounded"
              >
                Yes, Delete
              </button>

              {/* CANCEL */}
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
