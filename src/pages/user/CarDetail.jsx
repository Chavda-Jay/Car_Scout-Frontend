import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/Api";

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const getCarDetails = async () => {
    try {
      const res = await API.get(`/car/${id}`);
      setCar(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarDetails();
    window.scrollTo(0, 0);
  }, [id]);

  // const handleSubmitOffer = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const buyerId = user?._id;

  //   const sellerId = car.sellerId;
  //   const carId = car._id;

  //   if (!buyerId) return alert("Login required");
  //   if (!offerPrice || Number(offerPrice) <= 0)
  //     return alert("Enter valid price");

  //   try {
  //     const res = await API.post("/offer", {
  //       buyerId,
  //       sellerId,
  //       carId,
  //       offerPrice: Number(offerPrice),
  //     });

  //     setSuccessMsg(res.data.message || "Offer Sent ✅");
  //     setOfferPrice("");

  //     setTimeout(() => {
  //       setShowModal(false);
  //       setSuccessMsg("");
  //     }, 2000);
  //   } catch (err) {
  //     alert("Offer Failed ❌");
  //   }
  // };
  const handleSubmitOffer = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("USER:", user);

  const buyerId = user._id;
  const sellerId = car.sellerId;
  const carId = car._id;

  if (!buyerId) {
    alert("Login required");
    return;
  }

  if (!offerPrice || Number(offerPrice) <= 0) {
    alert("Enter valid price");
    return;
  }

  console.log("SENDING DATA:", {
    buyerId,
    sellerId,
    carId,
    offerPrice,
  });

  try {
    const res = await API.post("/offer", {
      buyerId,
      sellerId,
      carId,
      offerPrice: Number(offerPrice),
    });

    setSuccessMsg(res.data.message || "Offer Sent ✅");
    setOfferPrice("");

    setTimeout(() => {
      setShowModal(false);
      setSuccessMsg("");
    }, 2000);

  } catch (err) {
    console.log("ERROR:", err);
    alert("Offer Failed ❌");
  }
};

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  if (!car)
    return <p className="text-white text-center mt-10">Car not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">

      {/* 🔥 MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* 🔥 IMAGE SECTION */}
        <div>
          <img
            src={car.images || "https://dummyimage.com/600x400"}
            alt={car.brand}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* 🔥 DETAILS */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">

          <h1 className="text-3xl font-bold mb-2">
            {car.brand} {car.model}
          </h1>

          <p className="text-gray-400">
            {car.year} • {car.fuelType} • {car.location}
          </p>

          {/* 🔥 PRICE */}
          <p className="text-green-400 text-3xl font-bold mt-4">
            ₹ {car.price}
          </p>

          {/* 🔥 INFO GRID */}
          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Brand</p>
              <p className="font-bold">{car.brand}</p>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Model</p>
              <p className="font-bold">{car.model}</p>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Year</p>
              <p className="font-bold">{car.year}</p>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Fuel</p>
              <p className="font-bold">{car.fuelType}</p>
            </div>

          </div>

          {/* 🔥 ACTION BUTTONS */}
          <div className="mt-8 space-y-3">

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Make Offer 💰
            </button>

            <button className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 font-semibold">
              Book Test Drive 🚗
            </button>

          </div>

        </div>
      </div>

      {/* 🔥 DESCRIPTION */}
      <div className="mt-10 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-300">
          {car.description || "No description available"}
        </p>
      </div>

      {/* 🔥 OFFER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">Make Offer</h2>

            {successMsg ? (
              <p className="text-green-400">{successMsg}</p>
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Enter offer price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitOffer}
                    className="bg-blue-600 w-full py-2 rounded"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 w-full py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetails;