import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const SellerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counterValues, setCounterValues] = useState({});
  const [tokenValues, setTokenValues] = useState({});
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const getOffers = async () => {
    try {
      const res = await API.get(`/offer?sellerId=${user._id}`);
      setOffers(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const handleAccept = async (offer) => {
    const tokenAmount = Number(tokenValues[offer._id]);

    if (!tokenAmount || tokenAmount < 10000) {
      return toast.warning("Token amount minimum Rs. 10000");
    }

    if (tokenAmount > Number(offer.offerPrice) * 0.1) {
      return toast.warning("Token amount cannot exceed 10% of offer price");
    }

    try {
      await API.put(`/offer/${offer._id}`, {
        status: "accepted",
        tokenAmount,
        actionBy: "seller"
      });

      toast.success("Offer accepted with token amount");
      getOffers();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Accept failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/offer/${id}`, {
        status: "rejected",
        actionBy: "seller"
      });

      toast.success("Offer rejected");
      getOffers();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Reject failed");
    }
  };

  const handleCounter = async (offer) => {
    const counterOffer = Number(counterValues[offer._id]);
    const tokenAmount = Number(tokenValues[offer._id]);

    if (!counterOffer || counterOffer <= 0) {
      return toast.warning("Enter valid counter price");
    }

    if (!tokenAmount || tokenAmount < 10000) {
      return toast.warning("Token amount minimum Rs. 10000");
    }

    if (tokenAmount > counterOffer * 0.1) {
      return toast.warning("Token amount cannot exceed 10% of counter price");
    }

    try {
      await API.put(`/offer/${offer._id}`, {
        counterOffer,
        tokenAmount,
        actionBy: "seller"
      });

      toast.success("Counter offer sent with token amount");
      setSelectedOfferId(null);
      getOffers();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Counter failed");
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
            Review offers, set token amount, accept directly, or send counter offer.
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No offers yet</h3>
            <p className="mt-3 text-slate-400">
              Buyer offers will appear here once someone places an offer on your car.
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
                  : offer.status === "countered"
                  ? "bg-cyan-400/10 text-cyan-300 border-cyan-400/20"
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
                          Counter Price
                        </p>
                        <p className="mt-1 text-sm font-semibold text-amber-300">
                          {offer.counterOffer
                            ? `₹ ${Number(offer.counterOffer).toLocaleString("en-IN")}`
                            : "Not Sent"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Token Amount
                        </p>
                        <p className="mt-1 text-sm font-semibold text-emerald-300">
                          {offer.tokenAmount
                            ? `₹ ${Number(offer.tokenAmount).toLocaleString("en-IN")}`
                            : "Not Set"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Payment
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white capitalize">
                          {offer.paymentStatus || "not_required"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {offer.status === "pending" && (
                    <div className="mt-5 space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                        <label className="text-sm text-slate-400">
                          Token amount for direct accept
                        </label>
                        <input
                          type="number"
                          placeholder="Enter token amount"
                          value={tokenValues[offer._id] || ""}
                          onChange={(e) =>
                            setTokenValues((prev) => ({
                              ...prev,
                              [offer._id]: e.target.value
                            }))
                          }
                          className="mt-3 w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleAccept(offer)}
                          className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                        >
                          Accept With Token
                        </button>

                        <button
                          onClick={() => handleReject(offer._id)}
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
                        <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                          <label className="text-sm text-slate-400">
                            Enter counter price
                          </label>
                          <input
                            type="number"
                            placeholder="Enter counter price"
                            value={counterValues[offer._id] || ""}
                            onChange={(e) =>
                              setCounterValues((prev) => ({
                                ...prev,
                                [offer._id]: e.target.value
                              }))
                            }
                            className="mt-3 w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                          />

                          <label className="mt-4 block text-sm text-slate-400">
                            Enter token amount for this counter
                          </label>
                          <input
                            type="number"
                            placeholder="Enter token amount"
                            value={tokenValues[offer._id] || ""}
                            onChange={(e) =>
                              setTokenValues((prev) => ({
                                ...prev,
                                [offer._id]: e.target.value
                              }))
                            }
                            className="mt-3 w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                          />

                          <button
                            onClick={() => handleCounter(offer)}
                            className="mt-4 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                          >
                            Send Counter Offer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {offer.status === "accepted" && (
                    <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                      Offer accepted. Buyer can now pay token.
                    </div>
                  )}

                  {offer.status === "countered" && (
                    <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300">
                      Counter offer sent with token amount.
                    </div>
                  )}

                  {offer.status === "rejected" && (
                    <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
                      Deal rejected.
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
