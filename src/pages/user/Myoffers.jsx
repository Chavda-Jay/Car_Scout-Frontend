import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) return;

      const res = await API.get(`/offer?buyerId=${user._id}`);

      setOffers(res.data.data || []);
    } catch (err) {
      console.log("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();

    const interval = setInterval(getOffers, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ BUYER ACCEPT / REJECT COUNTER
  const handleBuyerDecision = async (id, status) => {
    try {
      await API.put(`/offer/${id}`, { status });

      toast.success(`You ${status} the offer ✅`);

      // instant UI update
      setOffers((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Action failed ❌");
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading offers...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">My Offers</h1>

      {offers.length === 0 ? (
        <p className="text-gray-400">No offers yet 😢</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg"
            >
              <p>
                <b>Car:</b> {offer.carId?.brand} {offer.carId?.model}
              </p>

              <p>
                <b>Your Offer:</b> ₹ {offer.offerPrice}
              </p>

              {/* ✅ SELLER COUNTER OFFER */}
              {offer.counterOffer ? (
                <p className="text-yellow-400">
                  <b>Seller Counter:</b> ₹ {offer.counterOffer}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  Waiting for seller response...
                </p>
              )}

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

              {/* ✅ BUYER ACTION BUTTONS */}
              {offer.counterOffer && offer.status === "pending" && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() =>
                      handleBuyerDecision(offer._id, "accepted")
                    }
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleBuyerDecision(offer._id, "rejected")
                    }
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* ✅ FINAL RESULT MESSAGE */}
              {offer.status === "accepted" && (
                <p className="text-green-400 mt-2">
                  🎉 Deal Accepted!
                </p>
              )}

              {offer.status === "rejected" && (
                <p className="text-red-400 mt-2">
                  ❌ Deal Rejected
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOffers;