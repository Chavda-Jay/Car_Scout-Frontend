import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiGrid,
  FiFileText,
  FiTag,
} from "react-icons/fi";
import { FaCar, FaUserPlus } from "react-icons/fa";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({
    cars: true,
    users: false,
  });

  const navigate = useNavigate();

  const adminName = localStorage.getItem("firstName") || "Admin";
  const initials = useMemo(
    () => adminName.slice(0, 2).toUpperCase(),
    [adminName]
  );

  const toggleMenu = (menu) => {
    if (!isOpen) return;
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const subLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-300 ${
      isActive
        ? "bg-white/10 text-cyan-300"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
    }`;

  const menuItemStyle =
    "group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white";

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-white">
      <aside
        className={`relative border-r border-white/10 bg-[#0f172a]/95 backdrop-blur-xl transition-all duration-300 ${
          isOpen ? "w-72" : "w-24"
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:bg-cyan-300"
        >
          <FiMenu size={18} />
        </button>

        <div className="relative border-b border-white/10 px-5 py-5">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-[0_10px_30px_rgba(34,211,238,0.25)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="h-7 w-7 text-slate-950"
                >
                  <path
                    d="M14 38L18 28C19.2 25 22 23 25.2 23H38.8C42 23 44.8 25 46 28L50 38"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 38H52C54.2 38 56 39.8 56 42V45C56 46.1 55.1 47 54 47H50C50 43.7 47.3 41 44 41C40.7 41 38 43.7 38 47H26C26 43.7 23.3 41 20 41C16.7 41 14 43.7 14 47H10C8.9 47 8 46.1 8 45V42C8 39.8 9.8 38 12 38Z"
                    fill="currentColor"
                  />
                  <circle cx="20" cy="47" r="4" fill="currentColor" />
                  <circle cx="44" cy="47" r="4" fill="currentColor" />
                  <path
                    d="M22 30H42"
                    stroke="#ecfeff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-lg font-bold leading-none">
                  Admin<span className="text-cyan-300">Panel</span>
                </h1>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  CarScout Control
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-[0_10px_30px_rgba(34,211,238,0.25)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="h-7 w-7 text-slate-950"
                >
                  <path
                    d="M14 38L18 28C19.2 25 22 23 25.2 23H38.8C42 23 44.8 25 46 28L50 38"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 38H52C54.2 38 56 39.8 56 42V45C56 46.1 55.1 47 54 47H50C50 43.7 47.3 41 44 41C40.7 41 38 43.7 38 47H26C26 43.7 23.3 41 20 41C16.7 41 14 43.7 14 47H10C8.9 47 8 46.1 8 45V42C8 39.8 9.8 38 12 38Z"
                    fill="currentColor"
                  />
                  <circle cx="20" cy="47" r="4" fill="currentColor" />
                  <circle cx="44" cy="47" r="4" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <nav className="relative space-y-2 px-4 py-5">
          <NavLink to="/admin/dashboard" className={linkStyle}>
            <FiHome size={20} />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <div>
            <div onClick={() => toggleMenu("cars")} className={menuItemStyle}>
              <FaCar size={18} />
              {isOpen && (
                <>
                  <span className="flex-1">Cars</span>
                  {openMenus.cars ? (
                    <FiChevronDown size={18} />
                  ) : (
                    <FiChevronRight size={18} />
                  )}
                </>
              )}
            </div>

            {openMenus.cars && isOpen && (
              <div className="ml-4 mt-2 space-y-1 border-l border-white/10 pl-4">
                <NavLink to="/admin/addcar" className={subLinkStyle}>
                  <FaCar size={15} />
                  <span>Add Car</span>
                </NavLink>

                <NavLink to="/admin/managecars" className={subLinkStyle}>
                  <FiGrid size={15} />
                  <span>Manage Cars</span>
                </NavLink>
              </div>
            )}
          </div>

          <div>
            <div onClick={() => toggleMenu("users")} className={menuItemStyle}>
              <FiUsers size={20} />
              {isOpen && (
                <>
                  <span className="flex-1">Users</span>
                  {openMenus.users ? (
                    <FiChevronDown size={18} />
                  ) : (
                    <FiChevronRight size={18} />
                  )}
                </>
              )}
            </div>

            {openMenus.users && isOpen && (
              <div className="ml-4 mt-2 space-y-1 border-l border-white/10 pl-4">
                <NavLink to="/admin/adduser" className={subLinkStyle}>
                  <FaUserPlus size={15} />
                  <span>Add User</span>
                </NavLink>

                <NavLink to="/admin/users" className={subLinkStyle}>
                  <FiUsers size={15} />
                  <span>Manage Users</span>
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/admin/offers" className={linkStyle}>
            <FiTag size={20} />
            {isOpen && <span>Offers</span>}
          </NavLink>

          <NavLink to="/admin/inspection" className={linkStyle}>
            <FiFileText size={20} />
            {isOpen && <span>Inspection</span>}
          </NavLink>

          <NavLink to="/admin/settings" className={linkStyle}>
            <FiSettings size={20} />
            {isOpen && <span>Settings</span>}
          </NavLink>

          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-400 transition duration-300 hover:bg-red-500/10 hover:text-red-300"
            >
              <FiLogOut size={20} />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0b1120]/70 p-4 backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {adminName}
                </p>
                <p className="truncate text-xs text-slate-400">
                  admin@carscout.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-auto bg-[#0b1120]">
        <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#111827] to-[#0b1120] p-5 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
