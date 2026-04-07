import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  // const submitHandler = async (data) => {
  //   try {
  //     const res = await axios.post("http://localhost:3800/user/register", data);
  //     if (res.status === 201) {
  //       toast.success("User Registered Successfully");
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     toast.error(err.response.data.message);
  //   }
  // };

const submitHandler = async (data) => {
  try {
    const res = await axios.post("http://localhost:3800/user/register", data);

    if (res.status === 200 || res.status === 201) {
      toast.success("User Registered Successfully");
      navigate("/");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-10 sm:px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#020617]/85" />

      <div className="absolute left-[-80px] top-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute bottom-10 right-[-60px] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1120]/88 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden border-r border-white/10 bg-gradient-to-br from-cyan-500/8 via-transparent to-emerald-500/8 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Welcome to CarScout
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
              Create your account
              <span className="block text-cyan-300">and get started</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
              Join a modern used-car marketplace built for cleaner browsing,
              trusted listings, and a smoother buyer and seller experience.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Verified marketplace</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore reliable listings with a cleaner and more professional experience.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Buyer and seller access</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sign up once and start managing your car journey with confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Professional experience</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Premium dark UI designed to feel modern, simple, and trustworthy.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                Sign Up
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Create Account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Register to access CarScout and start exploring trusted cars or
                listing your own vehicles.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                      errors.firstName ? "border-red-500" : "border-white/10"
                    }`}
                    {...register("firstName", {
                      required: "First name required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
                    })}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                      errors.lastName ? "border-red-500" : "border-white/10"
                    }`}
                    {...register("lastName", {
                      required: "Last name required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
                    })}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                    errors.email ? "border-red-500" : "border-white/10"
                  }`}
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Capital letters not allowed in email",
                    },
                    setValueAs: (v) => v.toLowerCase(),
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Role</label>
                <select
                  className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                    errors.role ? "border-red-500" : "border-white/10"
                  }`}
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="" className="bg-[#0f172a] text-white">
                    Select Role
                  </option>
                  <option value="user" className="bg-[#0f172a] text-white">
                    Buyer
                  </option>
                  <option value="seller" className="bg-[#0f172a] text-white">
                    Seller
                  </option>
                </select>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-400">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                    errors.password ? "border-red-500" : "border-white/10"
                  }`}
                  {...register("password", {
                    required: "Password required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special char & min 8 chars",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                    errors.confirmPassword ? "border-red-500" : "border-white/10"
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-cyan-500 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
