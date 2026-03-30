import React from "react";

const SellerHome = () => {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard 🚗</h1>

      <button className="bg-green-500 px-6 py-2 rounded-lg mb-6">
        + Add New Car
      </button>

      <h2 className="text-xl mb-4">My Listed Cars</h2>

      {/* Yaha apni cars show karni hai (future me) */}
      <p className="text-gray-400">No cars added yet</p>
    </div>
  );
};

export default SellerHome;