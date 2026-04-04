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

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/offer/${id}`, { status });

      toast.success(`Offer ${status} ✅`);

      setOffers((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch {
      toast.error("Update failed ❌");
    }
  };

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
    return (
      <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
        <p className="text-slate-400">Loading offers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Seller Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold">Buyer Offers</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Review incoming offers, send counter prices, and manage buyer
            decisions through a clean professional workspace.
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No offers yet</h3>
            <p className="mt-3 text-slate-400">
              Buyer offers will appear here once someone places an offer on your
              car.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer) => {
              const statusClass =
                offer.status === "pending"
                  ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
                  : offer.status === "accepted"
                  ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
                  : "bg-red-400/10 text-red-300 border-red-400/20";

              return (
                <div
                  key={offer._id}
                  className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                        Car
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        {offer.carId?.brand} {offer.carId?.model}
                      </h3>
                    </div>

                    <div
                      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
                    >
                      {offer.status}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Buyer
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {offer.buyerId?.firstName || "Unknown Buyer"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Offer Price
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-300">
                          ₹ {Number(offer.offerPrice || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Counter
                        </p>
                        <p className="mt-1 text-sm font-semibold text-amber-300">
                          {offer.counterOffer
                            ? `₹ ${Number(offer.counterOffer).toLocaleString("en-IN")}`
                            : "Not Sent"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {offer.status === "pending" && (
                    <div className="mt-5">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleStatusChange(offer._id, "accepted")}
                          className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleStatusChange(offer._id, "rejected")}
                          className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            setSelectedOfferId(
                              selectedOfferId === offer._id ? null : offer._id
                            )
                          }
                          className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                          Counter Offer
                        </button>
                      </div>

                      {selectedOfferId === offer._id && (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                          <label className="text-sm text-slate-400">
                            Enter counter price
                          </label>

                          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                            <input
                              type="number"
                              placeholder="Enter counter price"
                              value={counter}
                              onChange={(e) => setCounter(e.target.value)}
                              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                            />

                            <button
                              onClick={() => handleCounter(offer._id)}
                              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOffers;
