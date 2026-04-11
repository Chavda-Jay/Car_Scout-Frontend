import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";
import loadRazorpay from "../../utils/loadRazorpay";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingOfferId, setPayingOfferId] = useState(null);

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
      await API.put(`/offer/${id}`, { status, actionBy: "buyer" });
      toast.success(`You ${status} the offer`);
      getOffers();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Action failed");
    }
  };

  const handlePayToken = async (offer) => {
    try {
      setPayingOfferId(offer._id);

      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderRes = await API.post("/payment/create-order", {
        offerId: offer._id
      });

      const { orderId, amount, currency, key, tokenAmount, agreedPrice } =
        orderRes.data.data;

      const user = JSON.parse(localStorage.getItem("user"));

      const options = {
        key,
        amount,
        currency,
        name: "CarScout",
        description: "Car Booking Token Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            await API.post("/payment/verify", {
              offerId: offer._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            toast.success("Token payment successful");
            getOffers();
          } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user?.firstName || "Buyer",
          email: user?.email || "",
          contact: user?.phone || ""
        },
        notes: {
          offerId: offer._id,
          agreedPrice: agreedPrice,
          tokenAmount: tokenAmount
        },
        theme: {
          color: "#06b6d4"
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment popup closed");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Payment start failed");
    } finally {
      setPayingOfferId(null);
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
            Track your offers, review seller counter prices, and pay token amount after final agreement.
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
                  : offer.status === "countered"
                  ? "bg-cyan-400/10 text-cyan-300 border-cyan-400/20"
                  : "bg-red-400/10 text-red-300 border-red-400/20";

              const finalPrice =
                offer.agreedPrice || offer.counterOffer || offer.offerPrice || 0;
              const remainingAmount =
                Number(finalPrice || 0) - Number(offer.tokenAmount || 0);

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

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Token Amount
                        </p>
                        <p className="mt-1 text-sm font-semibold text-emerald-300">
                          {offer.tokenAmount
                            ? `₹ ${Number(offer.tokenAmount).toLocaleString("en-IN")}`
                            : "Not set"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Payment Status
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white capitalize">
                          {offer.paymentStatus || "not_required"}
                        </p>
                      </div>
                    </div>

                    {offer.status === "accepted" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                            Final Price
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            ₹ {Number(finalPrice).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#0f172a] px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                            Remaining
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            ₹ {Number(remainingAmount).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {offer.status === "countered" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleBuyerDecision(offer._id, "accepted")}
                        className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                      >
                        Accept Counter
                      </button>

                      <button
                        onClick={() => handleBuyerDecision(offer._id, "rejected")}
                        className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Reject Counter
                      </button>
                    </div>
                  )}

                  {offer.status === "accepted" && offer.paymentStatus !== "paid" && (
                    <div className="mt-5">
                      <button
                        onClick={() => handlePayToken(offer)}
                        disabled={payingOfferId === offer._id}
                        className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {payingOfferId === offer._id
                          ? "Processing..."
                          : `Pay Token ₹ ${Number(offer.tokenAmount || 0).toLocaleString("en-IN")}`}
                      </button>
                    </div>
                  )}

                  {offer.paymentStatus === "paid" && (
                    <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                      Token paid successfully. Car is now reserved.
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

export default MyOffers;
