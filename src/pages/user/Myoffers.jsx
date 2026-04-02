import React, { useEffect, useState } from "react";
import API from "../../api/Api";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // ✅ FIX: check user properly
      if (!user || !user._id) {
        console.log("User not found");
        return;
      }

      console.log("USER ID:", user._id);

      const res = await API.get(`/offer?buyerId=${user._id}`);

      console.log("OFFERS DATA:", res.data);

      setOffers(res.data.data || []);
    } catch (err) {
      console.log("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?._id) {
      getOffers();
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">My Offers</h1>

      {offers.length === 0 ? (
        <p>No offers yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div key={offer._id} className="bg-gray-800 p-4 rounded-xl">
              <p>
                <b>Car:</b> {offer.carId?.brand} {offer.carId?.model}
              </p>

              <p>
                <b>Offer Price:</b> ₹ {offer.offerPrice}
              </p>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOffers;
