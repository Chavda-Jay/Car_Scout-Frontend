import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/Api";
import CarCard from "../../components/user/CarCard";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  useEffect(() => {
    API.get("/car/cars").then((res) => {
      setCars(res.data.data || []);
    });
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(cars.map((car) => car.brand).filter(Boolean))];
    return ["All", ...uniqueBrands];
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        !search ||
        car?.brand?.toLowerCase().includes(search.toLowerCase()) ||
        car?.model?.toLowerCase().includes(search.toLowerCase()) ||
        car?.fuelType?.toLowerCase().includes(search.toLowerCase());

      const matchesBrand =
        brandFilter === "All" || car?.brand === brandFilter;

      return matchesSearch && matchesBrand;
    });
  }, [cars, search, brandFilter]);

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Explore Cars
          </p>
          <h2 className="mt-2 text-3xl font-bold">Browse All Cars</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Discover verified listings, compare options, and find the right car
            with a clean and professional browsing experience.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
            <input
              type="text"
              placeholder="Search by brand, model, fuel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <h3 className="text-2xl font-semibold text-white">No Cars Found</h3>
            <p className="mt-3 text-slate-400">
              Try changing your search or filter to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
