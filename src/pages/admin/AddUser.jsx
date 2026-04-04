import React, { useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const AddUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      await API.post("/user/register", user);

      toast.success("User Added Successfully 👤");

      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        status: "active",
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Error adding user ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Add New User</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Create a new buyer or seller account with clean user management and
            professional admin control.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:p-8">
          <form
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-sm text-slate-400">First Name</label>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Last Name</label>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">Password</label>
              <input
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Role</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option className="bg-[#0f172a] text-white" value="buyer">
                  Buyer
                </option>
                <option className="bg-[#0f172a] text-white" value="seller">
                  Seller
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400">Status</label>
              <select
                name="status"
                value={user.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option className="bg-[#0f172a] text-white" value="active">
                  Active
                </option>
                <option className="bg-[#0f172a] text-white" value="inactive">
                  Inactive
                </option>
                <option className="bg-[#0f172a] text-white" value="blocked">
                  Blocked
                </option>
                <option className="bg-[#0f172a] text-white" value="deleted">
                  Deleted
                </option>
              </select>
            </div>

            <div className="mt-2 md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-500 py-3.5 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
