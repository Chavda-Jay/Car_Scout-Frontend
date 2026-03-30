import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import OfferCard from "../../components/user/OfferCard";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const buyerId = user._id;

      const res = await API.get(`/offer?buyerId=${buyerId}`);

      setOffers(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  if (loading) return <p>Loading offers...</p>;

  if (offers.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="bg-gray-100 text-gray-600 px-6 py-4 rounded shadow-md">
          No offers available currently.
        </p>
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
    </div>
  );
};

export default MyOffers;