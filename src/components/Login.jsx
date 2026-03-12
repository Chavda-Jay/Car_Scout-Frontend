import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate() //all hooks will be declare at component level...
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async(data)=>{
    try{
      const res = await axios.post("/user/login",data)
      console.log("response..",res)
      if(res.status==200){
        toast.success("Login Success")
        //navigation- role based
        if(res.data.role=="user"||res.data.role=="USER"){
          navigate("/user")
        }
        else if(res.data.role=="admin" || res.data.role=="ADMIN"){
          navigate("/admin")
        }
        else{
          toast.error("Invalid Role")
          navigate("/") // redirect again login
        }
      }
    }catch(err){
      toast.error(err.response.data.message)
    }
  }


  const onSubmit = (data) => {
    console.log(data);
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

      {/* Moving Light Effect */}
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full animate-float top-20 left-10"></div>
      <div className="absolute w-72 h-72 bg-red-500 opacity-20 blur-3xl rounded-full animate-float2 bottom-20 right-10"></div>

      {/* Glass Card (Same as Signup) */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 🚗
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border ${
                errors.email ? "border-red-500" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              {...register("email", {
                required: "Email required",
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-300 mt-4 text-sm">
          Don’t have an account?{" "}
          <span className="text-white font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>

      {/* Same Animations as Signup */}
      <style>{`
        .animate-zoom {
          animation: zoom 25s ease-in-out infinite alternate;
        }

        @keyframes zoom {
          0% { background-size: 100%; }
          100% { background-size: 115%; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite alternate;
        }

        .animate-float2 {
          animation: float2 10s ease-in-out infinite alternate;
        }

        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-40px); }
        }

        @keyframes float2 {
          from { transform: translateY(0px); }
          to { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
};

export default Login;