import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    const res = await axios.post(
      "http://localhost:3800/user/forgotpassword",
      data,
    );
    console.log(res.data);
    if (res.status == 200) {
      navigate("/");
    }
  };
  return (
    // <div>
    //     <h1>FORGOT PASSWORD</h1>
    //     <form onSubmit={handleSubmit(submitHandler)}>
    //         <input type="email" placeholder="Email" {...register("email",{
    //             required:"Email is required"
    //         })}/>
    //         {errors.email && <p>{errors.email.message}</p>}
    //         <button type="submit">Submit</button>
    //     </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Forgot Password 🔑
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
              errors.email ? "border-red-500" : "border-white/30"
            } focus:outline-none focus:ring-2 focus:ring-white`}
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};
