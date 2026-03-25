import React, { useEffect, useState } from "react";
import API from "../../api/Api";

const CarList = () => {

  const [cars,setCars] = useState([]);

  useEffect(()=>{
    API.get("/car/cars").then(res=>{
      setCars(res.data.data);
    })
  },[])

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      
      <h2 className="text-2xl font-bold text-white mb-4">Cars</h2>

      {cars.map((car)=>(
        <div 
          key={car._id} 
          className="bg-white/10 p-4 rounded-lg text-white mb-3 hover:bg-white/20 transition"
        >
          <h3 className="text-lg font-semibold">{car.brand}</h3>
          <p className="text-gray-300">₹ {car.price}</p>
        </div>
      ))}

    </div>
  );
};

export default CarList;