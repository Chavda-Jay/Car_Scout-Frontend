import React, { useMemo, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { carCatalog } from "../../data/carCatalog";

import hyundaiLogo from "../../assets/brands/hyundai.png";
import tataLogo from "../../assets/brands/tata.png";
import marutiLogo from "../../assets/brands/maruti.png";
import mahindraLogo from "../../assets/brands/mahindra.png";
import hondaLogo from "../../assets/brands/honda.png";
import toyotaLogo from "../../assets/brands/toyota.png";
import kiaLogo from "../../assets/brands/kia.png";
import bmwLogo from "../../assets/brands/bmw.png";
import audiLogo from "../../assets/brands/audi.png";
import mercedesLogo from "../../assets/brands/mercedes.png";

const brandLogos = {
  Hyundai: hyundaiLogo,
  Tata: tataLogo,
  Maruti: marutiLogo,
  Mahindra: mahindraLogo,
  Honda: hondaLogo,
  Toyota: toyotaLogo,
  Kia: kiaLogo,
  BMW: bmwLogo,
  Audi: audiLogo,
  Mercedes: mercedesLogo,
};

const yearOptions = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
];

const fuelOptions = ["Petrol", "Diesel"];

const cityOptions = [
  "Ahmedabad",
  "Surat",
  "Rajkot",
  "Vadodara",
  "Jamnagar",
  "Navsari",
  "Bhavnagar",
  "Gandhinagar",
  "Mumbai",
  "Delhi",
];

const StepPill = ({ active, done, children }) => {
  const classes = active
    ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
    : done
    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    : "border-white/10 bg-white/5 text-slate-400";

  return (
    <div className={`rounded-full border px-4 py-2 text-sm ${classes}`}>
      {children}
    </div>
  );
};

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
      active
        ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
        : "border-white/10 bg-[#0f172a] text-slate-300 hover:border-cyan-400/30 hover:bg-[#132033]"
    }`}
  >
    {children}
  </button>
);

const AddCarWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    description: "",
    location: "",
  });

  const brands = Object.keys(carCatalog);

  const selectedModels = useMemo(() => {
    return car.brand ? carCatalog[car.brand] || [] : [];
  }, [car.brand]);

  const setField = (name, value) => {
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      toast.error("Please select at least 1 image");
      return;
    }

    if (files.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    setImages(files);
  };

  const validateStep = (currentStep) => {
    if (currentStep === 3) {
      if (!car.year || !car.fuelType) {
        toast.error("Please select year and fuel type");
        return false;
      }
    }

    if (currentStep === 4) {
      if (!car.price || !car.mileage) {
        toast.error("Please enter price and mileage");
        return false;
      }
    }

    if (currentStep === 5) {
      if (!car.location) {
        toast.error("Please enter location");
        return false;
      }
    }

    if (currentStep === 6) {
      if (!car.description) {
        toast.error("Please enter description");
        return false;
      }

      if (images.length === 0) {
        toast.error("Please upload at least 1 image");
        return false;
      }
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        toast.error("User not logged in");
        return;
      }

      setSubmitting(true);

      const formData = new FormData();
      formData.append("brand", car.brand);
      formData.append("model", car.model);
      formData.append("year", car.year);
      formData.append("price", car.price);
      formData.append("mileage", car.mileage);
      formData.append("fuelType", car.fuelType);
      formData.append("description", car.description);
      formData.append("location", car.location);
      formData.append("sellerId", user._id);

      images.forEach((img) => {
        formData.append("images", img);
      });

      await API.post("/car/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Car Added Successfully");
      navigate("/seller/my-listings");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add car");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
            Seller Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold">List Your Car</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            A guided premium flow to create a cleaner and more professional listing.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <StepPill active={step === 1} done={step > 1}>1. Brand</StepPill>
            <StepPill active={step === 2} done={step > 2}>2. Model</StepPill>
            <StepPill active={step === 3} done={step > 3}>3. Year & Fuel</StepPill>
            <StepPill active={step === 4} done={step > 4}>4. Price & Mileage</StepPill>
            <StepPill active={step === 5} done={step > 5}>5. Location</StepPill>
            <StepPill active={step === 6} done={step > 6}>6. Description & Images</StepPill>
            <StepPill active={step === 7} done={false}>7. Review</StepPill>
          </div>
        </div>

        {step === 1 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 1</p>
            <h2 className="mt-2 text-3xl font-bold">Choose Brand</h2>
            <p className="mt-2 text-sm text-slate-400">Select the brand of the car you want to list.</p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    setCar((prev) => ({ ...prev, brand, model: "" }));
                    setStep(2);
                  }}
                  className="group rounded-[28px] border border-white/10 bg-[#0f172a] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#132033]"
                >
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {brandLogos[brand] ? (
                      <img src={brandLogos[brand]} alt={brand} className="h-10 w-10 object-contain" />
                    ) : (
                      <span className="text-xl font-bold text-cyan-300">
                        {brand.charAt(0)}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white">{brand}</h3>
                  <p className="mt-1 text-sm text-slate-400">Select brand</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 2</p>
                <h2 className="mt-2 text-3xl font-bold">Choose Model</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Selected brand: <span className="font-medium text-white">{car.brand}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Change Brand
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {selectedModels.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => {
                    setCar((prev) => ({ ...prev, model }));
                    setStep(3);
                  }}
                  className="rounded-[28px] border border-white/10 bg-[#0f172a] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-[#132033]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg font-bold text-emerald-300">
                    {model.charAt(0)}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{model}</h3>
                  <p className="mt-1 text-sm text-slate-400">Select model</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 3</p>
            <h2 className="mt-2 text-3xl font-bold">Year & Fuel Type</h2>
            <p className="mt-2 text-sm text-slate-400">
              {car.brand} • {car.model}
            </p>

            <div className="mt-8 grid gap-8">
              <div>
                <label className="text-sm text-slate-400">Year</label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {yearOptions.map((year) => (
                    <Chip
                      key={year}
                      active={car.year === year}
                      onClick={() => setField("year", year)}
                    >
                      {year}
                    </Chip>
                  ))}
                </div>

                <input
                  type="number"
                  name="year"
                  value={car.year}
                  onChange={(e) => setField("year", e.target.value)}
                  placeholder="Or enter custom year"
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Fuel Type</label>
                <div className="mt-3 grid grid-cols-2 gap-3 md:max-w-md">
                  {fuelOptions.map((fuel) => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setField("fuelType", fuel)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        car.fuelType === fuel
                          ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                          : "border-white/10 bg-[#0f172a] text-slate-300 hover:border-cyan-400/30 hover:bg-[#132033]"
                      }`}
                    >
                      <p className="font-semibold">{fuel}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 4</p>
            <h2 className="mt-2 text-3xl font-bold">Price & Mileage</h2>
            <p className="mt-2 text-sm text-slate-400">
              Add the exact values for your listing.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-400">Price</label>
                <input
                  type="number"
                  name="price"
                  value={car.price}
                  onChange={(e) => setField("price", e.target.value)}
                  placeholder="Enter exact price"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Under 5 Lakh", "5 - 10 Lakh", "10 - 20 Lakh", "20+ Lakh"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-[#0b1324] px-3 py-1.5 text-xs text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={car.mileage}
                  onChange={(e) => setField("mileage", e.target.value)}
                  placeholder="Enter exact mileage"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Under 20,000", "20,000 - 50,000", "50,000 - 80,000", "80,000+"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-[#0b1324] px-3 py-1.5 text-xs text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 5</p>
            <h2 className="mt-2 text-3xl font-bold">Where is your car located?</h2>

            <div className="mt-8">
              <label className="text-sm text-slate-400">Location</label>
              <div className="mt-3 flex flex-wrap gap-3">
                {cityOptions.map((city) => (
                  <Chip
                    key={city}
                    active={car.location === city}
                    onClick={() => setField("location", city)}
                  >
                    {city}
                  </Chip>
                ))}
              </div>

              <input
                type="text"
                name="location"
                value={car.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="Or enter custom location"
                className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 6</p>
            <h2 className="mt-2 text-3xl font-bold">Description & Images</h2>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="text-sm text-slate-400">Description</label>
                <textarea
                  name="description"
                  value={car.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows="5"
                  placeholder="Write car details..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Car Images</label>
                <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0f172a] p-5 text-slate-300 transition hover:border-cyan-400/30 hover:bg-[#132033]">
                  Choose up to 5 images
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="h-24 w-24 rounded-2xl border border-white/10 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Step 7</p>
              <h2 className="mt-2 text-3xl font-bold">Review Listing</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  ["Brand", car.brand],
                  ["Model", car.model],
                  ["Year", car.year],
                  ["Price", `₹ ${Number(car.price || 0).toLocaleString("en-IN")}`],
                  ["Mileage", car.mileage],
                  ["Fuel Type", car.fuelType],
                  ["Location", car.location],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#0f172a] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}

                <div className="rounded-2xl bg-[#0f172a] p-4 md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Description
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {car.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Publishing..." : "Publish Listing"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                Preview
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {car.brand} {car.model}
              </h3>

              {images.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="h-32 w-full rounded-2xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[#0f172a] p-8 text-center text-slate-400">
                  No images selected
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCarWizard;
