import React, { useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify"; // ✅ IMPORTANT

const AddUser = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      await API.post("/user/register", user);

      toast.success("User Added Successfully 👤");

      // ✅ RESET FORM
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
      toast.error(
        err?.response?.data?.message || "Error adding user ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New User 👤
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />

          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />

          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />

          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="status"
            value={user.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="deleted">Deleted</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            Add User
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddUser;