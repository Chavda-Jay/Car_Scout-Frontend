import React from "react";

const OfferCard = ({ offer }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold">{offer.title}</h2>
      <p className="text-gray-600">{offer.description}</p>
      <p className="text-green-600 font-semibold mt-2">
        Discount: {offer.discount}%
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Valid Till: {new Date(offer.validTill).toLocaleDateString()}
      </p>
    </div>
  );
};

export default OfferCard;