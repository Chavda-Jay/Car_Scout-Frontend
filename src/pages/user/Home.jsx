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
    "Hyundai",
  ];

  const brands = ["Maruti", "Hyundai", "Honda", "Tata", "Mahindra", "BMW"];

  const highlights = [
    {
      title: "Verified Cars",
      desc: "Trusted listings with cleaner presentation and better clarity.",
    },
    {
      title: "Transparent Offers",
      desc: "Track real offers and seller responses without confusion.",
    },
    {
      title: "Inspection Support",
      desc: "Know the condition before moving ahead.",
    },
    {
      title: "Test Drive Ready",
      desc: "Book visits and move forward with more confidence.",
    },
  ];

  const sellSteps = [
    {
      step: "01",
      title: "Create Listing",
      desc: "Use the guided seller flow to add your car with the right details and images.",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    },
    {
      step: "02",
      title: "Receive Buyer Interest",
      desc: "Track offers, responses, and test drive requests through a cleaner seller experience.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    },
    {
      step: "03",
      title: "Close With Confidence",
      desc: "Move from listing to final deal with better clarity and a more professional flow.",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80",
    },
  ];

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

  const marketStats = [
    {
      value: `${cars.length}+`,
      label: "Live Listings",
      desc: "Fresh verified cars ready to explore",
    },
    {
      value: "98%",
      label: "Trusted Flow",
      desc: "Confidence-first marketplace experience",
    },
    {
      value: "24/7",
      label: "Smart Discovery",
      desc: "Browse, compare, and act anytime",
    },
    {
      value: "Easy",
      label: "Buyer Journey",
      desc: "From shortlist to decision in one place",
    },
  ];

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

  const sortedByRecent = useMemo(() => {
    return [...cars].sort((a, b) => {
      const aDate = new Date(a?.createdAt || 0).getTime();
      const bDate = new Date(b?.createdAt || 0).getTime();
      return bDate - aDate;
    });
  }, [cars]);

  const featuredCars = useMemo(() => {
    return cars.slice(0, 3);
  }, [cars]);

  const latestCars = useMemo(() => {
    if (search.trim()) return filteredCars;

    const featuredIds = new Set(featuredCars.map((car) => car._id));
    const recent = sortedByRecent.filter((car) => !featuredIds.has(car._id));

    return recent.length > 0 ? recent.slice(0, 6) : sortedByRecent.slice(0, 6);
  }, [search, filteredCars, sortedByRecent, featuredCars]);

  const handleSellerAccess = (path = "/seller") => {
    const role = localStorage.getItem("role");

    if (role !== "seller") {
      toast.error("Only sellers can access this!");
      return;
    }

    navigate(path);
  };

  const handleSearch = () => {
    const section = document.getElementById("latest-cars");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b1120] text-white">
      <div className="relative bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#0b1120]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        </div>

        <section className="relative px-4 pt-6 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
              alt="Hero car"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120]/95 via-[#0b1120]/82 to-[#0b1120]/35" />

            <div className="relative max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
              <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="max-w-3xl animate-[fadeIn_0.8s_ease-in-out]">
                  <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur">
                    Trusted used car marketplace
                  </span>

                  <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                    Explore premium cars
                    <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                      with more confidence
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    Search verified listings, compare better options, and move from
                    discovery to decision through a cleaner marketplace experience.
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f172a]/90 p-3 shadow-2xl backdrop-blur">
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
                        className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:bg-cyan-400"
                      >
                        Search
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {quickFilters.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSearch(item)}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("/user/cars")}
                      className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:bg-amber-300"
                    >
                      Browse Cars
                    </button>

                    <button
                      onClick={() => handleSellerAccess("/seller")}
                      className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-emerald-400"
                    >
                      Sell Your Car
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:bg-white/10">
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                      CarScout Promise
                    </p>
                    <h3 className="mt-3 text-2xl font-bold">
                      Simple, trusted and premium
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Better design, smoother discovery, and a more confident way
                      to browse and shortlist used cars online.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                      <p className="text-2xl font-bold text-cyan-300">{cars.length}+</p>
                      <p className="mt-2 text-sm text-slate-400">Cars Live</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                      <p className="text-2xl font-bold text-emerald-300">24/7</p>
                      <p className="mt-2 text-sm text-slate-400">Search Ready</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                      Marketplace Focus
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Verified cars, transparent offers, inspections, and test drives
                      built into one modern experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-8 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {marketStats.map((item, index) => (
              <div
                key={item.label}
                className="group rounded-[26px] border border-white/10 bg-[#111827]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                style={{ animation: `fadeUp 0.45s ease ${index * 0.08}s both` }}
              >
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-cyan-300">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-4 py-8 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-[#111827] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                style={{ animation: `fadeUp 0.5s ease ${index * 0.08}s both` }}
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-20" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-4 py-6 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Popular Listings
              </p>
              <h2 className="mt-2 text-3xl font-bold">Buyer favourites</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                A refined shortlist of standout cars designed to feel premium
                without overwhelming the page.
              </p>
            </div>

            <button
              onClick={() => navigate("/user/cars")}
              className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] animate-pulse"
                >
                  <div className="h-48 bg-slate-800" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-2/3 rounded bg-slate-800" />
                    <div className="h-4 w-1/2 rounded bg-slate-800" />
                    <div className="h-10 rounded bg-slate-800" />
                  </div>
                </div>
              ))
            ) : featuredCars.length > 0 ? (
              featuredCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="text-red-400">No cars found</p>
            )}
          </div>
        </section>

        <section className="relative px-4 py-14 sm:px-6 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 lg:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                  Browse by Brand
                </p>
                <h2 className="mt-2 text-3xl font-bold">Choose your preferred brand</h2>
              </div>
              <p className="hidden text-sm text-slate-400 md:block">
                Trusted brands, smarter search
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {brands.map((brand, index) => (
                <button
                  key={brand}
                  onClick={() => setSearch(brand)}
                  className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-5 text-center font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  style={{ animation: `fadeUp 0.45s ease ${index * 0.08}s both` }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-6 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Why CarScout
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                A cleaner way to discover used cars
              </h2>
              <p className="mt-4 leading-7 text-slate-400">
                CarScout is built to make car buying and selling feel more
                reliable, modern, and easy to navigate for both buyers and sellers.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 transition duration-300 hover:border-cyan-400/20">
                  <h3 className="font-semibold">Professional presentation</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Clear listings and better visual trust for every car.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 transition duration-300 hover:border-cyan-400/20">
                  <h3 className="font-semibold">Better discovery flow</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Search, compare, and explore with less clutter.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 transition duration-300 hover:border-cyan-400/20">
                  <h3 className="font-semibold">Built for trust</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    The experience is focused on confidence and clarity.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
              <p className="relative text-sm uppercase tracking-[0.2em] text-emerald-300">
                Sell with CarScout
              </p>
              <h2 className="relative mt-3 text-3xl font-bold">
                Reach buyers with a premium listing experience
              </h2>
              <p className="relative mt-4 leading-7 text-slate-300">
                Showcase your car in a more professional way and connect with
                serious buyers through a cleaner marketplace experience.
              </p>

              <button
                onClick={() => handleSellerAccess("/seller")}
                className="relative mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-emerald-400"
              >
                Start Selling
              </button>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-10 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                Seller Journey
              </p>
              <h2 className="mt-2 text-3xl font-bold">Sell your car in 3 smooth steps</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                A guided and visual seller experience that makes listing feel more
                premium and straightforward.
              </p>
            </div>
            <button
              onClick={() => handleSellerAccess("/seller/addcar")}
              className="text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
            >
              Start Now →
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {sellSteps.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    Step {item.step}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="latest-cars" className="relative px-4 py-10 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                Latest Collection
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {search.trim() ? "Search results" : "Recently added cars"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                {search.trim()
                  ? "Showing cars that match your current search."
                  : "Only the latest added listings appear here so buyers can quickly spot new arrivals."}
              </p>
            </div>
            <p className="hidden text-sm text-slate-400 md:block">
              Fresh arrivals for smart buyers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] animate-pulse"
                >
                  <div className="h-48 bg-slate-800" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-2/3 rounded bg-slate-800" />
                    <div className="h-4 w-1/2 rounded bg-slate-800" />
                    <div className="h-10 rounded bg-slate-800" />
                  </div>
                </div>
              ))
            ) : latestCars.length > 0 ? (
              latestCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="text-red-400">No recent cars found</p>
            )}
          </div>
        </section>

        <section className="relative px-4 pb-6 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)] lg:p-10">
            <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Ready To Move Forward
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Find the right car or list yours with more confidence
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  CarScout brings verified listings, smoother offers, test drives,
                  and cleaner presentation into one modern used-car marketplace.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
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
                  List Your Car
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/10 bg-[#09111f] px-4 py-12 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-2xl font-bold text-white">CarScout</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  A cleaner, trusted, and modern used-car marketplace for buyers
                  and sellers who want more confidence at every step.
                </p>
                <div className="mt-5 flex gap-3 text-sm text-slate-400">
                  <span className="rounded-full border border-white/10 px-3 py-1.5">
                    Verified Listings
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">
                    Easy Offers
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Marketplace</h3>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => navigate("/user")}
                  >
                    Home
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => navigate("/user/cars")}
                  >
                    Browse Cars
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => navigate("/user/offers")}
                  >
                    My Offers
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => navigate("/user/testdrives")}
                  >
                    Test Drives
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">For Sellers</h3>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => handleSellerAccess("/seller")}
                  >
                    Start Selling
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => handleSellerAccess("/seller/my-listings")}
                  >
                    My Listings
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => handleSellerAccess("/seller/offers")}
                  >
                    Seller Offers
                  </li>
                  <li
                    className="cursor-pointer transition hover:text-cyan-300"
                    onClick={() => handleSellerAccess("/seller/addcar")}
                  >
                    Add Listing
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Support</h3>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li>support@carscout.com</li>
                  <li>+91 9876543210</li>
                  <li>Mon - Sat, 10:00 AM to 7:00 PM</li>
                  <li>Ahmedabad, Gujarat, India</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>© 2026 CarScout. All rights reserved.</p>
              <div className="flex flex-wrap gap-4">
                <span className="transition hover:text-cyan-300">Privacy Policy</span>
                <span className="transition hover:text-cyan-300">Terms of Service</span>
                <span className="transition hover:text-cyan-300">Contact Us</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
