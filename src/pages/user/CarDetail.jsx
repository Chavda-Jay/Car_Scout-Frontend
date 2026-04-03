import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const getCarDetails = async () => {
    try {
      const res = await API.get(`/car/${id}`);
      // 🔹 Make sure sellerId is populated
      setCar(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmitOffer = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const buyerId = user._id;
    const sellerId = car?.sellerId?._id;
    const carId = car._id;

    if (!buyerId) {
      toast.error("Login required ❌");
      return;
    }

    if (!sellerId) {
      toast.error("Seller not found ❌");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.warning("Enter valid price ⚠️");
      return;
    }

    try {
      const res = await API.post("/offer", {
        buyerId,
        sellerId,
        carId,
        offerPrice: Number(price),
        message, //
      });

      toast.success("Offer Sent ✅");

      setPrice("");
      setMessage("");
      setShowModal(false);
    } catch (err) {
      toast.error("Offer Failed ❌");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  if (!car)
    return <p className="text-white text-center mt-10">Car not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mb-4 rounded-xl overflow-hidden"
          >
            {car.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="car" className="w-full h-96 object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
          >
            {car.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-400">
            {car.year} • {car.fuelType} • {car.location}
          </p>
          <p className="text-green-400 text-3xl font-bold mt-4">
            ₹ {car.price}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Brand</p>
              <p className="font-bold">{car.brand}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Model</p>
              <p className="font-bold">{car.model}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Year</p>
              <p className="font-bold">{car.year}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">Fuel</p>
              <p className="font-bold">{car.fuelType}</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Make Offer 💰
            </button>
            <button className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 font-semibold">
              Book Test Drive 🚗
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-300">
          {car.description || "No description available"}
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-[400px] shadow-2xl animate-fadeIn">
            {/* HEADER */}
            <h2 className="text-2xl font-bold mb-1 text-center">
              💰 Make an Offer
            </h2>
            <p className="text-gray-400 text-sm text-center mb-5">
              Negotiate your best price with seller
            </p>

            {/* INPUT PRICE */}
            <div className="mb-4">
              <label className="text-sm text-gray-400">Your Offer Price</label>
              <input
                type="number"
                placeholder="₹ Enter amount"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-5">
              <label className="text-sm text-gray-400">
                Message (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Write something to seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmitOffer}
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold"
              >
                Submit Offer 🚀
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 transition py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
