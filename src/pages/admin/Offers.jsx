import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [editOffer, setEditOffer] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = (offer) => {
    setEditOffer(offer);
  };

  const handleChange = (e) => {
    setEditOffer({ ...editOffer, [e.target.name]: e.target.value });
  };

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
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Manage Offers</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Review buyer and seller offers, update pricing decisions, and manage
            offer flow through a clean professional admin workspace.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <p className="text-slate-400">Loading offers...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#0f172a] text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Buyer</th>
                    <th className="px-5 py-4">Seller</th>
                    <th className="px-5 py-4">Car</th>
                    <th className="px-5 py-4">Offer</th>
                    <th className="px-5 py-4">Counter</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <tr key={offer._id} className="transition hover:bg-white/5">
                        <td className="px-5 py-4 font-semibold text-white">
                          {offer.buyerId?.firstName}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {offer.sellerId?.firstName}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {offer.carId?.brand} {offer.carId?.model}
                        </td>

                        <td className="px-5 py-4 font-semibold text-emerald-300">
                          ₹{Number(offer.offerPrice || 0).toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-4 font-medium text-amber-300">
                          {offer.counterOffer
                            ? `₹${Number(offer.counterOffer).toLocaleString("en-IN")}`
                            : "-"}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              offer.status === "accepted"
                                ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                                : offer.status === "rejected"
                                ? "bg-red-400/10 text-red-300 border border-red-400/20"
                                : "bg-amber-400/10 text-amber-300 border border-amber-400/20"
                            }`}
                          >
                            {offer.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(offer)}
                              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteOffer(offer._id)}
                              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-5 py-10 text-center text-slate-400"
                      >
                        No Offers Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Edit Offer
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Update Offer Details
                </h3>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="offerPrice"
                  value={editOffer.offerPrice}
                  onChange={handleChange}
                  placeholder="Offer Price"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="counterOffer"
                  value={editOffer.counterOffer || ""}
                  onChange={handleChange}
                  placeholder="Counter Offer"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <select
                  name="status"
                  value={editOffer.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accept</option>
                  <option value="rejected">Reject</option>
                </select>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditOffer(null)}
                    className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
