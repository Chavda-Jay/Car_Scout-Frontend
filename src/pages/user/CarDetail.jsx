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

  // 🔹 GET CAR DETAILS
  const getCarDetails = async () => {
    try {
      const res = await API.get(`/car/${id}`);
      setCar(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarDetails();
    window.scrollTo(0, 0);
  }, [id]);

  // 🔹 SUBMIT OFFER
  const handleSubmitOffer = async () => {
   // const buyerId = localStorage.getItem("userId"); // logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const buyerId = user?._id;

    const sellerId = car.sellerId; // seller from car data
    const carId = car._id;

    console.log("DATA :",{
      buyerId,
      sellerId,
      carId,
      offerPrice
    })

    if (!buyerId) {
      alert("You must be logged in to make an offer");
      return;
    }

    if (!sellerId) {
      alert("Seller not found ❌");
      return;
    }

    if (!offerPrice || Number(offerPrice) <= 0) {
      alert("Enter a valid offer price");
      return;
    }

    try {
      const res = await API.post("/offer", {
        buyerId,
        sellerId,
        carId,
        offerPrice: Number(offerPrice),
      });

      // 🔹 Success message
      setSuccessMsg(res.data.message || "Offer Sent ✅");
      setOfferPrice("");

      // 🔹 Auto close modal after 2 sec
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      console.log("Offer Error:", err.response || err);
      alert(err.response?.data?.message || "Error sending offer ❌");
    }
  };

  if (loading)
    return (
      <p className="text-white text-center mt-10 text-lg">
        Loading car details...
      </p>
    );

  if (!car)
    return (
      <p className="text-white text-center mt-10 text-lg">
        Car not found!
      </p>
    );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div>
          <img
            src={car.images || "https://dummyimage.com/600x400/000/fff&text=Car"}
            alt={car.brand}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-400 mt-2">
            {car.year} • {car.fuelType}
          </p>
          <p className="text-green-400 text-2xl font-bold mt-4">₹ {car.price}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-gray-300">
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm">Brand</p>
              <p className="font-bold">{car.brand}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm">Model</p>
              <p className="font-bold">{car.model}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm">Year</p>
              <p className="font-bold">{car.year}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm">Fuel</p>
              <p className="font-bold">{car.fuelType}</p>
            </div>
          </div>

          {/* MAKE OFFER BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-8 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
          >
            Make Offer
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Make Offer</h2>

            {successMsg ? (
              <p className="text-green-400 font-semibold mb-4">{successMsg}</p>
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Enter your offer price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitOffer}
                    className="bg-blue-600 px-4 py-2 rounded w-full hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 px-4 py-2 rounded w-full hover:bg-red-600"
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