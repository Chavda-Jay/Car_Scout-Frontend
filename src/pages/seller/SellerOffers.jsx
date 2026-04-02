import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const SellerOffers = () => {
  const [offers, setOffers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ fetch offers
  const getOffers = async () => {
    try {
      const res = await API.get(`/offer?sellerId=${user._id}`);
      setOffers(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load offers ❌");
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  // ✅ UPDATE STATUS FUNCTION (IMPORTANT)
  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/offer/${id}`, { status });

      toast.success(`Offer ${status} ✅`);

      getOffers(); // refresh

    } catch (err) {
      console.log(err);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">📩 Offers Received</h1>

      {offers.length === 0 ? (
        <p>No offers yet</p>
      ) : (
        offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-gray-800 p-4 mb-4 rounded-lg"
          >
            <p><b>Car:</b> {offer.carId?.brand} {offer.carId?.model}</p>
            <p><b>Buyer:</b> {offer.buyerId?.firstName}</p>
            <p><b>Offer Price:</b> ₹ {offer.offerPrice}</p>

            {/* ✅ STATUS */}
            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  offer.status === "pending"
                    ? "text-yellow-400"
                    : offer.status === "accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {offer.status}
              </span>
            </p>

            {/* ✅ BUTTONS ONLY IF PENDING */}
            {offer.status === "pending" && (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() =>
                    handleStatusChange(offer._id, "accepted")
                  }
                  className="bg-green-500 px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(offer._id, "rejected")
                  }
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOffers;