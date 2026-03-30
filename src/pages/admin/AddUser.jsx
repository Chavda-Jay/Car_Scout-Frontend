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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-950 to-gray-900 text-white">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          👤 Add New User
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>

          {/* FIRST NAME */}
          <div>
            <label className="text-sm text-gray-400">First Name</label>
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm text-gray-400">Last Name</label>
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* EMAIL */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Password</label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-400">Status</label>
            <select
              name="status"
              value={user.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all shadow-lg font-semibold text-lg"
            >
              ➕ Add User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddUser;