import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Call backend resetpassword route
      const res = await axios.put(
        `http://localhost:3800/user/resetpassword/${token}`,
        { newPassword }
      );
      console.log(res.data);
      toast.success("Password reset successfully! Login now.");
      setTimeout(() => navigate("/"), 2000); // redirect to login
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Reset Password 🔑
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};