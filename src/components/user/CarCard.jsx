import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const image = car.images?.[0] || "https://via.placeholder.com/300";

  const formattedPrice = car.price
    ? `₹ ${Number(car.price).toLocaleString("en-IN")}`
    : "Price on request";

  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#111827] text-white shadow-[0_12px_35px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={car.model}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Verified
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
          {car.transmission || "Manual"}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
              {car.brand || "Premium Car"}
            </p>
            <h2 className="mt-1 text-xl font-bold leading-tight text-white">
              {car.model || "Car Model"}
            </h2>
          </div>

          <div className="rounded-xl bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 shadow-lg">
            {formattedPrice}
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{car.year || "2023"}</span>
          <span className="text-slate-600">•</span>
          <span>{car.fuelType || "Petrol"}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 transition duration-300 group-hover:border-cyan-400/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Location
            </p>
            <p className="mt-1 text-sm font-medium text-slate-200">
              {car.location || "Not available"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 transition duration-300 group-hover:border-cyan-400/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Fuel
            </p>
            <p className="mt-1 text-sm font-medium text-slate-200">
              {car.fuelType || "Not available"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
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
