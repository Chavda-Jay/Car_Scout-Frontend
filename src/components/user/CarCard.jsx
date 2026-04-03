import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const image = car.images?.[0] || "https://via.placeholder.com/300";

  const formattedPrice = car.price
    ? `₹ ${Number(car.price).toLocaleString("en-IN")}`
    : "Price on request";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={car.model}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          Verified
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-cyan-400 px-3 py-1.5 text-sm font-bold text-slate-950 shadow-lg">
          {formattedPrice}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold leading-tight text-white">
              {car.brand} {car.model}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {car.year} • {car.fuelType}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {car.transmission || "Manual"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0f172a] px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Location
            </p>
            <p className="mt-1 text-sm text-slate-200">
              {car.location || "Not available"}
            </p>
          </div>

          <div className="rounded-xl bg-[#0f172a] px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Fuel
            </p>
            <p className="mt-1 text-sm text-slate-200">
              {car.fuelType || "Not available"}
            </p>
          </div>
        </div>

        <Link
          to={`/user/car/${car._id}`}
          className="mt-5 block rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-slate-900 transition hover:bg-cyan-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
