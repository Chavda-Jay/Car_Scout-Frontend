import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AboutUs = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleSellerAccess = (path = "/seller") => {
    if (role !== "seller") {
      toast.error("Only sellers can access this!");
      return;
    }

    navigate(path);
  };

  const coreValues = [
    {
      title: "Trust First",
      desc: "CarScout is built to reduce confusion in the used car journey through clearer listings, structured details, and confidence-focused design.",
      accent: "text-cyan-300",
    },
    {
      title: "Buyer Friendly",
      desc: "Buyers can explore cars, review inspection details, send offers, and book test drives from one connected experience.",
      accent: "text-emerald-300",
    },
    {
      title: "Seller Ready",
      desc: "Sellers get a guided listing flow, cleaner presentation, easier buyer interaction, and a more professional marketplace feel.",
      accent: "text-amber-300",
    },
  ];

  const workingSteps = [
    {
      step: "01",
      title: "Explore & Shortlist",
      desc: "Buyers browse premium used car listings, compare options, and shortlist the right car with better clarity.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      badge: "bg-cyan-400 text-slate-950",
      glow: "from-cyan-400/20 to-cyan-500/5",
    },
    {
      step: "02",
      title: "Check With Confidence",
      desc: "Inspection support and transparent details help buyers understand the car condition before moving ahead.",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
      badge: "bg-emerald-400 text-slate-950",
      glow: "from-emerald-400/20 to-emerald-500/5",
    },
    {
      step: "03",
      title: "Book Test Drive",
      desc: "Interested buyers can schedule a test drive, connect with the seller, and move closer to a confident decision.",
      image:
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80",
      badge: "bg-amber-400 text-slate-950",
      glow: "from-amber-400/20 to-amber-500/5",
    },
    {
      step: "04",
      title: "Make the Deal",
      desc: "Offers, responses, and better visibility help both sides close the deal with a smoother marketplace flow.",
      image:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
      badge: "bg-rose-400 text-slate-950",
      glow: "from-rose-400/20 to-rose-500/5",
    },
  ];

  const featureList = [
    "Verified car listings with cleaner presentation",
    "Offer system for direct buyer-seller interaction",
    "Inspection visibility for stronger trust",
    "Test drive scheduling with better clarity",
    "Seller-focused listing flow and management",
    "Role-based access for buyer, seller, and admin",
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#0b1120] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)] lg:p-10">
          <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                About CarScout
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                A smarter and more trusted way to buy or sell used cars
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                CarScout is a modern used car marketplace designed to make every
                step feel cleaner, more transparent, and more professional. From
                discovery and inspection to offers and test drives, the platform
                helps buyers and sellers move forward with more confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/user/cars")}
                  className="rounded-2xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition duration-300 hover:bg-cyan-400"
                >
                  Explore Cars
                </button>

                <button
                  onClick={() => handleSellerAccess("/seller/addcar")}
                  className="rounded-2xl bg-emerald-500 px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-emerald-400"
                >
                  Start Selling
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                  Platform Vision
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Confidence at every stage
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  CarScout is not just about listing cars. It is about creating a
                  smoother marketplace where buyers discover better and sellers
                  present better.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-2xl font-bold text-cyan-300">3 Roles</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Buyer, Seller and Admin
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-2xl font-bold text-emerald-300">All-in-One</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Search, offers, inspection and test drives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {coreValues.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            >
              <p className={`text-sm uppercase tracking-[0.18em] ${item.accent}`}>
                Core Focus
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#111827] p-7 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Why CarScout
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Built like a real marketplace
            </h2>

            <div className="mt-6 grid gap-3">
              {featureList.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-[#111827] to-cyan-500/10 p-7 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
              Marketplace Value
            </p>
            <h2 className="mt-3 text-3xl font-bold">Designed for trust and flow</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Buyers get cleaner decisions. Sellers get better presentation.
              Admin gets more control. That makes the full platform feel closer
              to a real production-ready marketplace.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
                <h3 className="font-semibold text-white">For Buyers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Search, compare, inspect, offer, and book test drives from one
                  connected journey.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
                <h3 className="font-semibold text-white">For Sellers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  List cars professionally, track interest, and manage buyer
                  interactions more smoothly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#111827] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.24)] lg:p-8">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative text-center">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              How CarScout Works
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              A clear journey from discovery to decision
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              CarScout connects search, trust, test drives, and negotiation into
              one cleaner used-car marketplace flow.
            </p>
          </div>

          <div className="relative mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {workingSteps.map((item, index) => (
              <div key={item.title} className="relative">
                <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/20">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/25 to-transparent" />
                    <div
                      className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${item.glow}`}
                    />
                    <div
                      className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shadow-lg ${item.badge}`}
                    >
                      {item.step}
                    </div>
                  </div>

                  <div className="px-5 pb-6 pt-5 text-center">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {index < workingSteps.length - 1 && (
                  <div className="absolute -right-4 top-[42%] hidden xl:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#111827] text-slate-500 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="relative mt-10 grid gap-4 rounded-[28px] border border-emerald-400/10 bg-gradient-to-r from-emerald-400/10 via-white/5 to-cyan-400/10 p-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#0f172a]/80 p-4">
              <p className="text-sm font-semibold text-white">Cleaner Discovery</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Buyers can focus on better choices instead of cluttered browsing.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0f172a]/80 p-4">
              <p className="text-sm font-semibold text-white">Stronger Trust</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Inspection support and structured details improve confidence.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0f172a]/80 p-4">
              <p className="text-sm font-semibold text-white">Better Closing Flow</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Offers and test drives help both sides move faster toward a deal.
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)] lg:p-10">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                Ready To Move Forward
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Discover better cars or sell yours professionally
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                CarScout combines verified listings, offers, inspection support,
                test drives, and role-based management into one complete modern
                used-car marketplace.
              </p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => navigate("/user/cars")}
                className="rounded-2xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition duration-300 hover:bg-cyan-400"
              >
                Browse Cars
              </button>

              <button
                onClick={() => handleSellerAccess("/seller/addcar")}
                className="rounded-2xl bg-emerald-500 px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-emerald-400"
              >
                Start Selling
              </button>
            </div>
          </div>

          <div className="relative mt-10 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-white">CarScout</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                A cleaner and more trusted used car marketplace for smarter
                buying and selling.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Quick Support</h3>
              <p className="mt-3 text-sm text-slate-400">support@carscout.com</p>
              <p className="mt-2 text-sm text-slate-400">+91 9876543210</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Location</h3>
              <p className="mt-3 text-sm text-slate-400">Ahmedabad, Gujarat, India</p>
              <p className="mt-2 text-sm text-slate-400">
                Mon - Sat, 10:00 AM to 7:00 PM
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
