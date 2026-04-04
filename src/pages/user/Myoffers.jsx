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

  const handleBuyerDecision = async (id, status) => {
    try {
      await API.put(`/offer/${id}`, { status });

      toast.success(`You ${status} the offer ✅`);

      setOffers((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.log(err);
      toast.error("Action failed ❌");
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
            Buyer Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold">My Offers</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Track your offers, review seller counter prices, and make your final
            decision through a clean and professional interface.
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No offers yet</h3>
            <p className="mt-3 text-slate-400">
              Once you place an offer on a car, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
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
                  className="rounded-[26px] border border-white/10 bg-[#111827] p-5 shadow-[0_10px_26px_rgba(0,0,0,0.20)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Car
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">
                        {offer.carId?.brand} {offer.carId?.model}
                      </h3>
                    </div>

                    <div
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium capitalize ${statusClass}`}
                    >
                      {offer.status}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Your Offer
                      </p>
                      <p className="mt-1 text-sm font-semibold text-cyan-300">
                        ₹ {Number(offer.offerPrice || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Seller Counter
                      </p>
                      <p className="mt-1 text-sm font-semibold text-amber-300">
                        {offer.counterOffer
                          ? `₹ ${Number(offer.counterOffer).toLocaleString("en-IN")}`
                          : "Waiting for seller response"}
                      </p>
                    </div>
                  </div>

                  {offer.counterOffer && offer.status === "pending" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          handleBuyerDecision(offer._id, "accepted")
                        }
                        className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleBuyerDecision(offer._id, "rejected")
                        }
                        className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {offer.status === "accepted" && (
                    <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                      Deal Accepted
                    </div>
                  )}

                  {offer.status === "rejected" && (
                    <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
                      Deal Rejected
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

export default MyOffers;
