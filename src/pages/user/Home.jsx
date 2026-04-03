// import React, { useEffect, useState } from "react";
// import API from "../../api/Api";
// import CarCard from "../../components/user/CarCard";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Home = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // 🔹 FETCH CARS FROM BACKEND
//   const getCars = async () => {
//     try {
//       const res = await API.get("/car/cars");
//       console.log("Cars Data:", res.data);
//       setCars(res.data.data);
//     } catch (err) {
//       console.log("Error fetching cars:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCars();
//   }, []);

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-6">
//       {/* 🔥 HERO SECTION (UPDATED) */}
//       <div className="relative bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')] bg-cover bg-center h-[400px] rounded-xl mb-10 flex items-center justify-center">
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/60 rounded-xl"></div>

//         {/* Content */}
//         <div className="relative text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Find Your Perfect Car
//           </h1>

//           <p className="text-gray-300 mb-6">
//             Buy or Sell Cars Easily with CarScout
//           </p>

//           <div className="flex justify-center">
//             <input
//               type="text"
//               placeholder="Search Car"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} 
//               className="w-64 md:w-96 px-4 py-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-blue-500"
//             />
//             <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 text-white">
//               Search
//             </button>
//           </div>

//           {/* 🔥 Buy / Sell Buttons */}
//           <div className="mt-6 flex justify-center gap-4">
//             <button className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600 text-black">
//               Buy Car
//             </button>

//             {/* <button className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600">
//               Sell Car
//             </button> */}
//             <button
//               onClick={() => {
//                 const role = localStorage.getItem("role");

//                 if (role !== "seller") {
//                   toast.error("Only sellers can access this!");
//                   return;
//                 }

//                 navigate("/seller");
//               }}
//               className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600"
//             >
//               Sell Car
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔥 WHY CHOOSE US (NEW SECTION) */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
//         <div className="bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-2">Verified Cars</h3>
//           <p className="text-gray-400">All cars are inspected and verified</p>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
//           <p className="text-gray-400">Get best deals from sellers</p>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-2">Easy Process</h3>
//           <p className="text-gray-400">Book test drive & buy easily</p>
//         </div>
//       </div>

//       {/* 🔥 CAR LIST HEADER (STEP 3 FIXED) */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Latest Cars</h2>

//         <button className="text-blue-400 hover:underline">View All →</button>
//       </div>

//       {/* 🔥 CAR LIST */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {loading ? (
//           <p className="text-gray-400">Loading cars...</p>
//         ) : cars.length > 0 ? (
//           cars.map((car) => <CarCard key={car._id} car={car} />)
//         ) : (
//           <p className="text-red-400">No cars found</p>
//         )}
//       </div>

//       {/* 🔥 FOOTER */}
//       <footer className="bg-black text-gray-400 mt-10 p-6">
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* About */}
//           <div>
//             <h3 className="text-white font-bold mb-2">CarScout 🚗</h3>
//             <p>
//               Buy and sell cars easily with best deals. Trusted platform for car
//               lovers.
//             </p>
//           </div>

//           {/* Links */}
//           <div>
//             <h3 className="text-white font-bold mb-2">Quick Links</h3>
//             <ul>
//               <li>Home</li>
//               <li>Cars</li>
//               <li>My Offers</li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-white font-bold mb-2">Contact</h3>
//             <p>Email: support@carscout.com</p>
//             <p>Phone: +91 9876543210</p>
//           </div>
//         </div>

//         <p className="text-center mt-6 text-sm">
//           © 2026 CarScout. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/Api";
import CarCard from "../../components/user/CarCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const quickFilters = [
    "BMW",
    "Venue",
    "Safari",
    "Automatic",
    "Petrol",
    "Under 5 Lakh",
  ];

  const brands = ["Maruti", "Hyundai", "Honda", "Tata", "Mahindra", "BMW"];

  const getCars = async () => {
    try {
      const res = await API.get("/car/cars");
      setCars(res.data.data || []);
    } catch (err) {
      console.log("Error fetching cars:", err);
      toast.error("Unable to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const filteredCars = useMemo(() => {
    if (!search.trim()) return cars;

    const query = search.toLowerCase();
    return cars.filter((car) => {
      return (
        car?.brand?.toLowerCase().includes(query) ||
        car?.model?.toLowerCase().includes(query) ||
        car?.fuelType?.toLowerCase().includes(query) ||
        car?.transmission?.toLowerCase().includes(query)
      );
    });
  }, [cars, search]);

  const featuredCars = useMemo(() => cars.slice(0, 6), [cars]);

  const handleSellCar = () => {
    const role = localStorage.getItem("role");

    if (role !== "seller") {
      toast.error("Only sellers can access this!");
      return;
    }

    navigate("/seller");
  };

  const handleSearch = () => {
    const section = document.getElementById("featured-cars");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#0b1120]">
        <section className="px-4 pt-6 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
              alt="Hero car"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120]/95 via-[#0b1120]/80 to-transparent" />

            <div className="relative max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                  Trusted used car marketplace
                </span>

                <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                  Buy your next car
                  <span className="block text-cyan-300">with confidence</span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Explore verified cars, compare trusted listings, and enjoy a
                  smoother buying and selling experience with CarScout.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f172a]/90 p-3 shadow-xl">
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      type="text"
                      placeholder="Search by brand, model, fuel type..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl bg-[#111827] px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                    />
                    <button
                      onClick={handleSearch}
                      className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Search
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {quickFilters.map((item) => (
                      <button
                        key={item}
                        onClick={() => setSearch(item)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/carlist")}
                    className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
                  >
                    Buy Car
                  </button>

                  <button
                    onClick={handleSellCar}
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Sell Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h3 className="text-lg font-semibold">Verified Cars</h3>
              <p className="mt-2 text-sm text-slate-400">
                Carefully listed cars with trusted details.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h3 className="text-lg font-semibold">Transparent Pricing</h3>
              <p className="mt-2 text-sm text-slate-400">
                Better clarity on value and offers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h3 className="text-lg font-semibold">Inspection Support</h3>
              <p className="mt-2 text-sm text-slate-400">
                Know the condition before you decide.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h3 className="text-lg font-semibold">Easy Process</h3>
              <p className="mt-2 text-sm text-slate-400">
                From search to deal, everything feels simpler.
              </p>
            </div>
          </div>
        </section>

        <section id="featured-cars" className="px-4 py-6 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Featured Cars
              </p>
              <h2 className="mt-2 text-3xl font-bold">Popular listings</h2>
            </div>

            <button
              onClick={() => navigate("/carlist")}
              className="text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <p className="text-slate-400">Loading cars...</p>
            ) : featuredCars.length > 0 ? (
              featuredCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="text-red-400">No cars found</p>
            )}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 lg:p-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                Browse by Brand
              </p>
              <h2 className="mt-2 text-3xl font-bold">Choose your preferred brand</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSearch(brand)}
                  className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-5 text-center font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-6 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Why CarScout
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                A cleaner way to discover used cars
              </h2>
              <p className="mt-4 text-slate-400 leading-7">
                CarScout is built to make car buying and selling feel more
                reliable, modern, and easy to navigate for both buyers and sellers.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                  <h3 className="font-semibold">Professional presentation</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Clear listings and better visual trust for every car.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                  <h3 className="font-semibold">Better discovery flow</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Search, compare, and explore with less clutter.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                  <h3 className="font-semibold">Built for trust</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    The experience is focused on confidence and clarity.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                Sell with CarScout
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Reach buyers with a premium listing experience
              </h2>
              <p className="mt-4 text-slate-300 leading-7">
                Showcase your car in a more professional way and connect with
                serious buyers through a cleaner marketplace experience.
              </p>

              <button
                onClick={handleSellCar}
                className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
              >
                Start Selling
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Latest Cars
            </p>
            <h2 className="mt-2 text-3xl font-bold">Recently added cars</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <p className="text-slate-400">Loading cars...</p>
            ) : filteredCars.length > 0 ? (
              filteredCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="text-red-400">No cars found</p>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 bg-[#0a0f1d] px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold text-white">CarScout</h3>
              <p className="mt-3 text-slate-400 leading-7">
                Buy and sell used cars with a clean, trusted, and modern
                experience.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li className="cursor-pointer hover:text-cyan-300">Home</li>
                <li
                  className="cursor-pointer hover:text-cyan-300"
                  onClick={() => navigate("/carlist")}
                >
                  Cars
                </li>
                <li className="cursor-pointer hover:text-cyan-300">My Offers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <p className="mt-3 text-slate-400">support@carscout.com</p>
              <p className="mt-2 text-slate-400">+91 9876543210</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            © 2026 CarScout. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;


