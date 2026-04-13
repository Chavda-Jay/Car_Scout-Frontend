import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { toast } from "react-toastify";

const fallbackImage =
  "https://via.placeholder.com/1200x700/0f172a/94a3b8?text=Car+Image";

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const [requestedDate, setRequestedDate] = useState("");
  const [requestedTime, setRequestedTime] = useState("");
  const [testDriveLocation, setTestDriveLocation] = useState("");
  const [testDriveMessage, setTestDriveMessage] = useState("");

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const openNativePicker = (ref) => {
    if (!ref?.current) return;

    if (typeof ref.current.showPicker === "function") {
      ref.current.showPicker();
    } else {
      ref.current.focus();
      ref.current.click();
    }
  };

  const getInspectionDetails = async (carId) => {
    try {
      const res = await API.get(`/inspection/car/${carId}`);
      setInspection(res.data.data || null);
    } catch (err) {
      setInspection(null);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await API.get(`/car/${id}`);
        const carData = res.data.data || res.data;
        setCar(carData);

        if (carData?._id) {
          await getInspectionDetails(carData._id);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmitOffer = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const buyerId = user._id;
    const sellerId = car?.sellerId?._id;
    const carId = car?._id;

    if (!buyerId) {
      toast.error("Login required");
      return;
    }

    if (!sellerId) {
      toast.error("Seller not found");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.warning("Enter valid price");
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

      toast.success("Offer sent successfully");
      setSuccessMsg("Your offer has been sent successfully.");
      setPrice("");
      setMessage("");
      setShowOfferModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Offer failed");
    }
  };

  const handleBookTestDrive = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const buyerId = user._id;
    const sellerId = car?.sellerId?._id;
    const carId = car?._id;

    if (!buyerId) {
      toast.error("Login required");
      return;
    }

    if (!sellerId) {
      toast.error("Seller not found");
      return;
    }

    if (!requestedDate || !requestedTime || !testDriveLocation) {
      toast.warning("Please fill date, time and location");
      return;
    }

    try {
      await API.post("/testdrive", {
        buyerId,
        sellerId,
        carId,
        requestedDate,
        requestedTime,
        location: testDriveLocation,
        message: testDriveMessage,
      });

      toast.success("Test drive booked successfully");
      setSuccessMsg("Your test drive request has been sent successfully.");
      setRequestedDate("");
      setRequestedTime("");
      setTestDriveLocation("");
      setTestDriveMessage("");
      setShowTestDriveModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Test drive booking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] px-4 py-10 text-white">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0b1120] px-4 py-10 text-white">
        <p className="text-center">Car not found</p>
      </div>
    );
  }

  const carImages =
    Array.isArray(car.images) && car.images.length > 0
      ? car.images
      : [fallbackImage];

  return (
    <div className="min-h-screen w-full bg-[#0b1120] px-4 py-4 text-white sm:px-6 sm:py-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <Swiper
              spaceBetween={10}
              navigation
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Thumbs]}
              className="car-details-swiper mb-3 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]"
            >
              {carImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img || fallbackImage}
                    alt={`car-${index}`}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="block h-56 w-full bg-[#0f172a] object-cover sm:h-72 md:h-80 lg:h-[420px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              breakpoints={{
                480: { slidesPerView: 4 },
                768: { slidesPerView: 4 },
              }}
              watchSlidesProgress
              modules={[Thumbs]}
              className="min-w-0"
            >
              {carImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img || fallbackImage}
                    alt={`thumb-${index}`}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="h-16 w-full cursor-pointer rounded-xl border border-white/10 bg-[#0f172a] object-cover sm:h-20"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-lg sm:p-6">
            <h1 className="mb-2 break-words text-2xl font-bold sm:text-3xl">
              {car.brand} {car.model}
            </h1>

            <p className="text-sm leading-6 text-slate-400 sm:text-base">
              {car.year} • {car.fuelType} • {car.location}
            </p>

            <p className="mt-4 break-words text-2xl font-bold text-emerald-400 sm:text-3xl">
              ₹ {Number(car.price || 0).toLocaleString("en-IN")}
            </p>

            {successMsg && (
              <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                {successMsg}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                <p className="text-sm text-slate-500">Brand</p>
                <p className="mt-1 break-words font-semibold">{car.brand}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                <p className="text-sm text-slate-500">Model</p>
                <p className="mt-1 break-words font-semibold">{car.model}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                <p className="text-sm text-slate-500">Year</p>
                <p className="mt-1 font-semibold">{car.year}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                <p className="text-sm text-slate-500">Fuel</p>
                <p className="mt-1 break-words font-semibold">{car.fuelType}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => setShowTestDriveModal(true)}
                className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold transition hover:bg-emerald-400"
              >
                Book Test Drive
              </button>

              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Make Offer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:p-6">
            <h2 className="mb-2 text-xl font-bold">Description</h2>
            <p className="break-words text-sm leading-7 text-slate-300 sm:text-base">
              {car.description || "No description available"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold">Inspection Report</h2>
              {inspection?.rating && (
                <div className="w-fit rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                  ⭐ {inspection.rating}/5
                </div>
              )}
            </div>

            {inspection ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                  <p className="text-sm text-slate-500">Full Report</p>
                  <p className="mt-2 break-words text-sm leading-7 text-slate-300 sm:text-base">
                    {inspection.report}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                  <p className="text-sm text-slate-500">Accident History</p>
                  <p className="mt-2 break-words text-sm text-slate-300 sm:text-base">
                    {inspection.accidentHistory}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                  <p className="text-sm text-slate-500">Service History</p>
                  <p className="mt-2 break-words text-sm text-slate-300 sm:text-base">
                    {inspection.serviceHistory}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-[#0f172a] p-4">
                <p className="text-slate-400">
                  Inspection report not available yet for this car.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-2xl sm:p-6">
            <h2 className="mb-1 text-center text-xl font-bold sm:text-2xl">
              Make an Offer
            </h2>
            <p className="mb-5 text-center text-sm text-slate-400">
              Negotiate your best price with seller
            </p>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Your Offer Price</label>
              <input
                type="number"
                placeholder="₹ Enter amount"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
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
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSubmitOffer}
                className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Submit Offer
              </button>

              <button
                onClick={() => setShowOfferModal(false)}
                className="w-full rounded-xl bg-white/10 py-3 font-semibold transition hover:bg-white/15"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-2xl sm:p-6">
            <h2 className="mb-1 text-center text-xl font-bold sm:text-2xl">
              Book Test Drive
            </h2>
            <p className="mb-5 text-center text-sm text-slate-400">
              Schedule your preferred date and time with seller
            </p>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Preferred Date</label>
              <div
                onClick={() => openNativePicker(dateInputRef)}
                className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-[#0f172a] px-3 py-3 transition hover:border-emerald-400/40"
              >
                <input
                  ref={dateInputRef}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => openNativePicker(dateInputRef)}
                  className="ml-3 text-lg"
                >
                  📅
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Preferred Time</label>
              <div
                onClick={() => openNativePicker(timeInputRef)}
                className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-[#0f172a] px-3 py-3 transition hover:border-emerald-400/40"
              >
                <input
                  ref={timeInputRef}
                  type="time"
                  value={requestedTime}
                  onChange={(e) => setRequestedTime(e.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => openNativePicker(timeInputRef)}
                  className="ml-3 text-lg"
                >
                  ⏰
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Location</label>
              <input
                type="text"
                placeholder="Enter meeting location"
                value={testDriveLocation}
                onChange={(e) => setTestDriveLocation(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm text-slate-400">Message</label>
              <textarea
                rows="3"
                placeholder="Write a note for seller..."
                value={testDriveMessage}
                onChange={(e) => setTestDriveMessage(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleBookTestDrive}
                className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-400"
              >
                Confirm Booking
              </button>

              <button
                onClick={() => setShowTestDriveModal(false)}
                className="w-full rounded-xl bg-white/10 py-3 font-semibold transition hover:bg-white/15"
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

        @media (max-width: 640px) {
          .car-details-swiper .swiper-button-prev,
          .car-details-swiper .swiper-button-next {
            width: 34px;
            height: 34px;
          }

          .car-details-swiper .swiper-button-prev:after,
          .car-details-swiper .swiper-button-next:after {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default CarDetails;
