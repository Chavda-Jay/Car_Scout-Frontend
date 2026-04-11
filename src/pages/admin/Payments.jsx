import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/payments");
      setPayments(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Manage Payments</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Track token transactions, payment status, agreed deal value, and buyer-seller activity from one place.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <p className="text-slate-400">Loading payments...</p>
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
                    <th className="px-5 py-4">Agreed Price</th>
                    <th className="px-5 py-4">Token</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Payment ID</th>
                    <th className="px-5 py-4">Paid At</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment._id} className="transition hover:bg-white/5">
                        <td className="px-5 py-4 font-semibold text-white">
                          {payment.buyerId?.firstName} {payment.buyerId?.lastName}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {payment.sellerId?.firstName} {payment.sellerId?.lastName}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {payment.carId?.brand} {payment.carId?.model}
                        </td>

                        <td className="px-5 py-4 font-semibold text-cyan-300">
                          ₹ {Number(payment.agreedPrice || 0).toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-4 font-semibold text-emerald-300">
                          ₹ {Number(payment.tokenAmount || 0).toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                              payment.status === "paid"
                                ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                : payment.status === "failed"
                                ? "border border-red-400/20 bg-red-400/10 text-red-300"
                                : "border border-amber-400/20 bg-amber-400/10 text-amber-300"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-400">
                          {payment.razorpayOrderId || "-"}
                        </td>

                        <td className="px-5 py-4 text-slate-400">
                          {payment.razorpayPaymentId || "-"}
                        </td>

                        <td className="px-5 py-4 text-slate-400">
                          {payment.paidAt
                            ? new Date(payment.paidAt).toLocaleString("en-IN")
                            : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-5 py-10 text-center text-slate-400">
                        No payment records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
