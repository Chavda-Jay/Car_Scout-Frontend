import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [editOffer, setEditOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET ALL OFFERS
  const getOffers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/offer");
      setOffers(res.data.data);
    } catch (err) {
      toast.error("Failed to load offers ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE OFFER
  const deleteOffer = async (id) => {
    if (window.confirm("Delete this offer?")) {
      try {
        await API.delete(`/offer/${id}`);
        toast.success("Offer Deleted 🗑️");
        getOffers();
      } catch (err) {
        toast.error("Delete failed ❌");
      }
    }
  };

  // 🔹 EDIT OPEN
  const handleEdit = (offer) => {
    setEditOffer(offer);
  };

  // 🔹 CHANGE INPUT
  const handleChange = (e) => {
    setEditOffer({ ...editOffer, [e.target.name]: e.target.value });
  };

  // 🔹 UPDATE OFFER
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/offer/${editOffer._id}`, editOffer);
      toast.success("Offer Updated 💰");
      setEditOffer(null);
      getOffers();
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">Manage Offers 💰</h2>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading offers...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
          <table className="min-w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3">Buyer</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Car</th>
                <th className="p-3">Offer</th>
                <th className="p-3">Counter</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-700">
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <tr key={offer._id} className="hover:bg-gray-800 transition">

                    <td className="p-3 font-semibold">
                      {offer.buyerId?.firstName}
                    </td>

                    <td className="p-3">
                      {offer.sellerId?.firstName}
                    </td>

                    <td className="p-3">
                      {offer.carId?.brand} {offer.carId?.model}
                    </td>

                    <td className="p-3 text-green-400 font-semibold">
                      ₹{offer.offerPrice}
                    </td>

                    <td className="p-3 text-yellow-400">
                      {offer.counterOffer ? `₹${offer.counterOffer}` : "-"}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          offer.status === "accepted"
                            ? "bg-green-600"
                            : offer.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteOffer(offer._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-5 text-gray-400">
                    No Offers Found 🚫
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">

            <h3 className="text-xl font-bold mb-4">Edit Offer 💰</h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="offerPrice"
                value={editOffer.offerPrice}
                onChange={handleChange}
                placeholder="Offer Price"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="counterOffer"
                value={editOffer.counterOffer || ""}
                onChange={handleChange}
                placeholder="Counter Offer"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <select
                name="status"
                value={editOffer.status}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
                <option value="rejected">Reject</option>
              </select>

              <div className="flex justify-between mt-4">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditOffer(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Offers;