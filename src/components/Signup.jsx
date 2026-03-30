import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3800/user/register", data);
      if (res.status === 201) {
        toast.success("User Registered Successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden animate-zoom"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Moving Light Effects */}
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full animate-float top-20 left-10"></div>
      <div className="absolute w-72 h-72 bg-red-500 opacity-20 blur-3xl rounded-full animate-float2 bottom-20 right-10"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account 🚗
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.firstName ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              {...register("firstName", {
                required: "First name required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
              })}
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.lastName ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              {...register("lastName", {
                required: "Last name required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
              })}
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.email ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Capital letters not allowed in email",
                },
                setValueAs: (v) => v.toLowerCase(), // ✅ Force lowercase
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white border ${
                errors.role ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white appearance-none`}
              {...register("role", { required: "Role is required" })}
            >
              <option value="" className="bg-gray-900 text-white">
                Select Role
              </option>
              <option value="user" className="bg-gray-900 text-white">
                Buyer
              </option>
              <option value="seller" className="bg-gray-900 text-white">
                Seller
              </option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.password ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
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
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.confirmPassword ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4 text-sm">
          Already have an account?{" "}
          <span className="text-white font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        .animate-zoom 
        { animation: zoom 25s ease-in-out infinite alternate; }

        @keyframes zoom
         { 0% { background-size: 100%; } 100% { background-size: 115%; } }

        .animate-float
         { animation: float 8s ease-in-out infinite alternate; }

        .animate-float2
         { animation: float2 10s ease-in-out infinite alternate; }

        @keyframes float
         { from { transform: translateY(0px); } to { transform: translateY(-40px); } }

        @keyframes float2
        { from { transform: translateY(0px); } to { transform: translateY(40px); } }
      `
      }</style>
    </div>
  );
};
export default Signup;