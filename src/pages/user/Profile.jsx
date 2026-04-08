import React, { useMemo, useState } from "react";
import API from "../../api/Api";
import { toast } from "react-toastify";

const Profile = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const [user, setUser] = useState(savedUser || {});
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const initials = useMemo(() => {
    const first = user?.firstName?.[0] || "";
    const last = user?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  }, [user]);

  const syncUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("firstName", updatedUser.firstName);
    localStorage.setItem("role", updatedUser.role || role);
    window.dispatchEvent(new Event("profile-updated"));
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        toast.error("Please choose an image");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await API.put(`/user/profile-pic/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.data;
      syncUser(updatedUser);

      toast.success("Profile picture updated successfully");
      setFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile picture");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setRemoving(true);

      const res = await API.put(`/user/remove-profile-pic/${user._id}`);
      const updatedUser = res.data.data;

      syncUser(updatedUser);

      toast.success("Profile picture removed successfully");
      setFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove profile picture");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            My Profile
          </p>
          <h1 className="mt-2 text-3xl font-bold">Profile Settings</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Update or remove your profile picture and keep your account looking professional.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6 text-center">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="mx-auto h-32 w-32 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-cyan-400 text-3xl font-bold text-slate-950">
                  {initials}
                </div>
              )}

              <h2 className="mt-4 text-xl font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{user?.email}</p>
              <p className="mt-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-300">
                {user?.role}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">
              <label className="block text-sm text-slate-300">
                Upload Profile Picture
              </label>

              <label className="mt-3 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#111827] p-5 text-slate-300 transition hover:border-cyan-400/30 hover:bg-[#132033]">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>

              {file && (
                <div className="mt-4">
                  <p className="mb-3 text-sm text-slate-400">Preview</p>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="h-36 w-36 rounded-2xl border border-white/10 object-cover"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {uploading ? "Uploading..." : "Update Profile Picture"}
                </button>

                {user?.profilePic && (
                  <button
                    onClick={handleRemove}
                    disabled={removing}
                    className="rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {removing ? "Removing..." : "Remove Picture"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
