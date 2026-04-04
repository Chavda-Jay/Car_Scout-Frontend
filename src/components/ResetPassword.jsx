import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3800/user/resetpassword/${token}`,
        { newPassword }
      );
      console.log(res.data);
      toast.success("Password reset successfully! Login now.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
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
              Reset Access
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
              Create a new
              <span className="block text-cyan-300">secure password</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
              Choose a strong new password to regain access to your CarScout
              account and continue your trusted marketplace experience.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Secure reset</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Update your password safely through a simple and clean recovery flow.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Fast access</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Set your new password and return to your dashboard quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Consistent experience</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Designed to feel simple, premium, and professional across every auth page.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                Reset Password
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Set New Password
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter a new password for your account and continue securely with
                CarScout.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-500/40"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-cyan-500 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Reset Password
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Back to{" "}
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
