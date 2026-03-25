import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET USERS
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/user/users");
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch users ");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE USER
  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await API.delete(`/user/${id}`);
        toast.success("User Deleted ");
        getUsers();
      } catch (err) {
        toast.error("Delete failed ");
      }
    }
  };

  // 🔹 EDIT OPEN
  const handleEdit = (user) => {
    setEditUser(user);
  };

  // 🔹 CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // 🔹 UPDATE USER
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/user/${editUser._id}`, editUser);
      toast.success("User Updated 👤");
      setEditUser(null);
      getUsers();
    } catch (err) {
      toast.error("Update failed ");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">Manage Users 👤</h2>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
          <table className="min-w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-700">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-800 transition">

                    <td className="p-3 font-semibold">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === "admin"
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === "active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-gray-400">
                    No Users Found 🚫
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">

            <h3 className="text-xl font-bold mb-4">Edit User 👤</h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="firstName"
                value={editUser.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="lastName"
                value={editUser.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <input
                name="email"
                value={editUser.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-800 outline-none"
              />

              <select
                name="role"
                value={editUser.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* STATUS */}
              <select
                name="status"
                value={editUser.status}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
                <option value="deleted">Deleted</option>
              </select>

              <div className="flex justify-between mt-4">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;