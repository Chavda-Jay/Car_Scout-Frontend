import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const image = car.images?.[0] || "https://via.placeholder.com/400x260";

  const formattedPrice = car.price
    ? `₹ ${Number(car.price).toLocaleString("en-IN")}`
    : "Price on request";

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] text-white shadow-[0_14px_36px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/25 hover:shadow-[0_20px_44px_rgba(0,0,0,0.32)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={car.model}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Verified
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
          {car.fuelType || "Petrol"}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
            {car.brand || "Premium Car"}
          </p>

          <div className="mt-2 flex items-end justify-between gap-3">
            <h2 className="text-xl font-bold leading-tight text-white">
              {car.model || "Car Model"}
            </h2>

            <div className="rounded-xl bg-cyan-400 px-3.5 py-2 text-sm font-bold text-slate-950 shadow-lg">
              {formattedPrice}
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-3 text-center transition duration-300 group-hover:border-cyan-400/10">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Year
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {car.year || "2023"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-3 text-center transition duration-300 group-hover:border-cyan-400/10">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Fuel
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-semibold text-white">
              {car.fuelType || "Petrol"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-3 text-center transition duration-300 group-hover:border-cyan-400/10">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Location
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-semibold text-white">
              {car.location || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Description
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
            {car.description || "Clean listing with verified details and a smoother buyer experience."}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Ready to explore
          </p>

          <Link
            to={`/user/car/${car._id}`}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition duration-300 hover:bg-cyan-400 hover:text-slate-950"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
