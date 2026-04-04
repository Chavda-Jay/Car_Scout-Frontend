import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

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
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-3xl font-bold">Manage Users</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Review all registered users, update their account details, and manage
            roles and status through a clean admin workspace.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <p className="text-slate-400">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#0f172a] text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="transition hover:bg-white/5">
                        <td className="px-5 py-4 font-semibold text-white">
                          {user.firstName} {user.lastName}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {user.email}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-violet-400/10 text-violet-300 border border-violet-400/20"
                                : "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              user.status === "active"
                                ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                                : "bg-red-400/10 text-red-300 border border-red-400/20"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteUser(user._id)}
                              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-10 text-center text-slate-400"
                      >
                        No Users Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Edit User
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Update User Details
                </h3>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="firstName"
                  value={editUser.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="lastName"
                  value={editUser.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <input
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
                />

                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="blocked">Blocked</option>
                  <option value="deleted">Deleted</option>
                </select>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
