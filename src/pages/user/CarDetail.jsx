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
      await API.post("/offer", {
        buyerId,
        sellerId,
        carId,
        offerPrice: Number(price),
        message,
      });

      toast.success("Offer Sent ✅");
      setSuccessMsg("Your offer has been sent successfully.");
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
    <div className="bg-[#0b1120] min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="mb-4 rounded-2xl overflow-hidden border border-white/10 bg-[#111827]"
            >
              {car.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt="car"
                    className="w-full h-96 object-cover"
                  />
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
                    className="w-full h-24 object-cover rounded-xl cursor-pointer border border-white/10"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl shadow-lg border border-white/10">
            <h1 className="text-3xl font-bold mb-2">
              {car.brand} {car.model}
            </h1>

            <p className="text-slate-400">
              {car.year} • {car.fuelType} • {car.location}
            </p>

            <p className="text-emerald-400 text-3xl font-bold mt-4">
              ₹ {Number(car.price || 0).toLocaleString("en-IN")}
            </p>

            {successMsg && (
              <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                {successMsg}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-500">Brand</p>
                <p className="font-semibold mt-1">{car.brand}</p>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-500">Model</p>
                <p className="font-semibold mt-1">{car.model}</p>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-500">Year</p>
                <p className="font-semibold mt-1">{car.year}</p>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-500">Fuel</p>
                <p className="font-semibold mt-1">{car.fuelType}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-cyan-500 py-3 rounded-xl hover:bg-cyan-400 font-semibold text-slate-950 transition"
              >
                Make Offer
              </button>

              <button className="w-full bg-emerald-500 py-3 rounded-xl hover:bg-emerald-400 font-semibold transition">
                Book Test Drive
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-[#111827] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-slate-300 leading-7">
            {car.description || "No description available"}
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-1 text-center">
              Make an Offer
            </h2>

            <p className="text-slate-400 text-sm text-center mb-5">
              Negotiate your best price with seller
            </p>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Your Offer Price</label>
              <input
                type="number"
                placeholder="₹ Enter amount"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-[#0f172a] border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 text-white"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm text-slate-400">
                Message (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Write something to seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-[#0f172a] border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 text-white"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmitOffer}
                className="w-full bg-cyan-500 hover:bg-cyan-400 transition py-3 rounded-xl font-semibold text-slate-950"
              >
                Submit Offer
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-white/10 hover:bg-white/15 transition py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .car-details-swiper .swiper-button-prev,
        .car-details-swiper .swiper-button-next {
          color: #ffffff;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 9999px;
        }

        .car-details-swiper .swiper-button-prev:after,
        .car-details-swiper .swiper-button-next:after {
          font-size: 14px;
          font-weight: 700;
        }

        .swiper-slide-thumb-active img {
          border-color: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CarDetails;
