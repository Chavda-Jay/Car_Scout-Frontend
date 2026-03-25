import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import CarCard from "../../components/user/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH CARS FROM BACKEND
  const getCars = async () => {
    try {
      const res = await API.get("/car/cars");
      console.log("Cars Data:", res.data); // ✅ DEBUG
      setCars(res.data.data);
    } catch (err) {
      console.log("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gray-800 p-8 rounded-xl mb-6 text-center">
        <h1 className="text-3xl font-bold">
          Find Your Dream Car 🚗
        </h1>

        <p className="text-gray-400 mt-2">
          Search, Compare & Buy Cars Easily
        </p>

         <input
            type="text"
            placeholder="Search cars "
            className="w-full md:w-1/2 px-4 py-3 rounded-l-lg bg-white text-black focus:outline-none"
         />
            <button className="bg-blue-600 px-5 py-3 rounded-r-lg hover:bg-blue-700">
                 Search
            </button>
      </div>

      {/* 🔥 CAR LIST */}
      <h2 className="text-2xl font-bold mb-4">
        Latest Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {loading ? (
          <p className="text-gray-400">Loading cars...</p>

        ) : cars.length > 0 ? (

          cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))

        ) : (
          <p className="text-red-400">No cars found</p>
        )}

      </div>

    </div>
  );
};

export default Home;