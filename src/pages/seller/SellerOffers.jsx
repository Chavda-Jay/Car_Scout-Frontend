import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const SellerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState("");
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const getOffers = async () => {
    try {
      const res = await API.get(`/offer?sellerId=${user._id}`);
      setOffers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load offers ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  // ✅ ACCEPT / REJECT
  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/offer/${id}`, { status });

      toast.success(`Offer ${status} ✅`);

      setOffers((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ COUNTER OFFER
  const handleCounter = async (id) => {
    if (!counter || Number(counter) <= 0) {
      return toast.warning("Enter valid price ⚠️");
    }

    try {
      await API.put(`/offer/${id}`, {
        counterOffer: Number(counter),
      });

      toast.success("Counter sent 💰");

      setCounter("");
      setSelectedOfferId(null);
      getOffers();
    } catch {
      toast.error("Counter failed ❌");
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading offers...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-xl font-semibold mb-5">📩 Offers</h1>

      {offers.length === 0 ? (
        <p className="text-gray-400">No offers yet 😢</p>
      ) : (
        offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-gray-800 p-4 mb-3 rounded-xl border border-gray-700"
          >
            <p className="text-sm">
              <b>
                {offer.carId?.brand} {offer.carId?.model}
              </b>
            </p>

            <p className="text-xs text-gray-400">
              Buyer: {offer.buyerId?.firstName}
            </p>

            <p className="mt-1 text-sm">₹ {offer.offerPrice}</p>

            {offer.counterOffer && (
              <p className="text-yellow-400 text-xs mt-1">
                Counter: ₹ {offer.counterOffer}
              </p>
            )}

            <p className="text-xs mt-1">
              Status:{" "}
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

            {/* ✅ SMALL BUTTONS */}
            {offer.status === "pending" && (
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => handleStatusChange(offer._id, "accepted")}
                  className="bg-green-600 px-3 py-1 text-xs rounded hover:bg-green-700"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatusChange(offer._id, "rejected")}
                  className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-700"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    setSelectedOfferId(
                      selectedOfferId === offer._id ? null : offer._id,
                    )
                  }
                  className="bg-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-700"
                >
                  Counter
                </button>
              </div>
            )}

            {/* 🔥 SMALL COUNTER INPUT */}
            {selectedOfferId === offer._id && (
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  placeholder="Enter counter price"
                  value={counter}
                  onChange={(e) => setCounter(e.target.value)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-700 border border-gray-600 w-40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  onClick={() => handleCounter(offer._id)}
                  className="bg-yellow-500 px-3 py-1 text-xs rounded hover:bg-yellow-600"
                >
                  Send
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
