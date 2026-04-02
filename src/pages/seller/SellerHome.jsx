import React from "react";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard 🚗</h1>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/seller/addcar")}
          className="bg-green-500 px-6 py-2 rounded-lg"
        >
          + Add New Car
        </button>

        <button
          onClick={() => navigate("/seller/my-listings")}
          className="bg-blue-500 px-6 py-2 rounded-lg"
        >
          My Listings
        </button>

        <button
          onClick={() => navigate("/seller/offers")}
          className="bg-orange-500 px-6 py-2 rounded-lg"
        >
          View Offers
        </button>
      </div>

      <h2 className="text-xl mb-4">Welcome Seller 👋</h2>
      <p className="text-gray-400">
        Manage your cars, offers and listings easily.
      </p>
    </div>
  );
};

export default SellerHome;