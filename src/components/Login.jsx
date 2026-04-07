import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3800/user/login", data);

      console.log("Full Response:", res);

      if (!res || !res.data || !res.data.user) {
        toast.error("User data missing ❌");
        return;
      }

      const userData = res.data.user;

      const finalUser = {
        ...userData,
        _id: userData._id || userData.id,
      };

      console.log("Final User:", finalUser);

      localStorage.setItem("user", JSON.stringify(finalUser));
      localStorage.setItem("role", finalUser.role);
      localStorage.setItem("firstName", finalUser.firstName);
      localStorage.setItem("token", res.data.token);

      toast.success("Login Success ✅");

      if (finalUser.role === "user" || finalUser.role === "USER") {
        navigate("/user");
      } else if (finalUser.role === "admin" || finalUser.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (finalUser.role === "seller" || finalUser.role === "SELLER") {
        navigate("/seller");
      } else {
        toast.error("Invalid Role ❌");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      const message = err.response?.data?.message || err.message || "Login Failed ❌";

      toast.error(message);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
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
              Welcome Back
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
              Login to your
              <span className="block text-cyan-300">CarScout account</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
              Access your account to explore verified cars, manage offers, and
              continue your premium CarScout experience.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Trusted access</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Securely log in and continue your buyer or seller journey with confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Smart dashboard</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Manage listings, offers, and account details through a clean premium interface.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Modern experience</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Built for a simple, smooth, and professional used-car marketplace flow.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                Login
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Welcome Back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Log in to access your dashboard and continue browsing or managing
                your cars on CarScout.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={`w-full rounded-2xl border bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40 ${
                    errors.email ? "border-red-500" : "border-white/10"
                  }`}
                  {...register("email", {
                    required: "Email required",
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
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
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-cyan-500 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Login
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-400">
              Forgot Password?{" "}
              <Link
                to="/forgotpassword"
                className="font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Click Here
              </Link>
            </p>

            <p className="mt-4 text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
