import React from "react";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
  const navigate = useNavigate();

  const actionCards = [
    {
      title: "Add New Car",
      desc: "Create a fresh listing and showcase your car with premium presentation.",
      button: "Add Car",
      onClick: () => navigate("/seller/addcar"),
      accent: "from-emerald-500/20 to-emerald-400/5",
      btn: "bg-emerald-500 hover:bg-emerald-400 text-white",
    },
    {
      title: "My Listings",
      desc: "Manage all your active car listings and keep them updated easily.",
      button: "View Listings",
      onClick: () => navigate("/seller/my-listings"),
      accent: "from-cyan-500/20 to-cyan-400/5",
      btn: "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
    },
    {
      title: "View Offers",
      desc: "Track buyer offers and respond quickly to serious customers.",
      button: "Check Offers",
      onClick: () => navigate("/seller/offers"),
      accent: "from-amber-500/20 to-amber-400/5",
      btn: "bg-amber-400 hover:bg-amber-300 text-slate-950",
    },
  ];

  const stats = [
    { label: "Active Listings", value: "12+" },
    { label: "Buyer Interest", value: "24/7" },
    { label: "Quick Management", value: "Easy" },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#0b1120]">
        <section className="px-4 pt-6 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.10),transparent_24%)]" />

            <div className="relative grid gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-14">
              <div>
                <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                  Seller Dashboard
                </div>

                <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                  Manage your car listings
                  <span className="block text-cyan-300">like a pro</span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Add cars, track offers, and manage your listings through a
                  clean and professional seller workspace built for CarScout.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/seller/addcar")}
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Add New Car
                  </button>

                  <button
                    onClick={() => navigate("/seller/my-listings")}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    Manage Listings
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <p className="text-3xl font-bold text-cyan-300">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Quick Actions
            </p>
            <h2 className="mt-2 text-3xl font-bold">Everything you need in one place</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {actionCards.map((item) => (
              <div
                key={item.title}
                className={`rounded-[28px] border border-white/10 bg-gradient-to-br ${item.accent} p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)]`}
              >
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>

                <button
                  onClick={item.onClick}
                  className={`mt-6 rounded-xl px-5 py-3 font-semibold transition ${item.btn}`}
                >
                  {item.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-[#111827] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                Welcome Seller
              </p>
              <h2 className="mt-2 text-3xl font-bold">Grow your visibility on CarScout</h2>
              <p className="mt-4 leading-7 text-slate-400">
                Keep your inventory updated, reply to buyers faster, and present
                your cars in a professional way that builds trust.
              </p>
            </div>

            <div className="rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                Seller Tip
              </p>
              <h2 className="mt-2 text-3xl font-bold">Better listings attract better buyers</h2>
              <p className="mt-4 leading-7 text-slate-300">
                Use clear photos, complete details, and competitive pricing to
                improve buyer response and deal confidence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerHome;
