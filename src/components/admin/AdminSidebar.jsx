import React, { useState } from "react";
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
  FiTag
} from "react-icons/fi";
import { FaCar, FaUserPlus } from "react-icons/fa";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});

  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
        : "text-gray-300 hover:bg-gray-800/80 hover:text-white hover:translate-x-1"
    }`;

  const menuItemStyle = "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/80 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer";

  const subLinkStyle = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
        : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 hover:border-l-4 hover:border-gray-600"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* SIDEBAR */}
      <aside
        className={`bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen transition-all duration-300 relative ${
          isOpen ? "w-72" : "w-20"
        }`}
        style={{ boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)" }}
      >
        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-8 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30"
        >
          <FiMenu size={18} className={!isOpen ? "rotate-180" : ""} />
        </button>

        {/* LOGO SECTION */}
        <div className="p-5 border-b border-gray-800/50">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-lg">
                <FiGrid className="text-white text-xl" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-lg">
                <FiGrid className="text-white text-xl" />
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-2">
          {/* DASHBOARD */}
          <NavLink to="/admin/dashboard" className={linkStyle}>
            <FiHome size={20} />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          {/* CARS MENU */}
          <div>
            <div
              onClick={() => toggleMenu("cars")}
              className={menuItemStyle}
            >
              <FaCar size={20} />
              {isOpen && (
                <>
                  <span className="flex-1">Cars</span>
                  {openMenus.cars ? (
                    <FiChevronDown className="transition-transform duration-200" />
                  ) : (
                    <FiChevronRight className="transition-transform duration-200" />
                  )}
                </>
              )}
            </div>

            {openMenus.cars && isOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-800 pl-3">
                <NavLink to="/admin/addcar" className={subLinkStyle}>
                  <FaCar size={16} className="mr-2" />
                  Add Car
                </NavLink>
                <NavLink to="/admin/managecars" className={subLinkStyle}>
                  <FiGrid size={16} className="mr-2" />
                  Manage Cars
                </NavLink>
              </div>
            )}
          </div>

          {/* USERS MENU */}
          <div>
            <div
              onClick={() => toggleMenu("users")}
              className={menuItemStyle}
            >
              <FiUsers size={20} />
              {isOpen && (
                <>
                  <span className="flex-1">Users</span>
                  {openMenus.users ? (
                    <FiChevronDown className="transition-transform duration-200" />
                  ) : (
                    <FiChevronRight className="transition-transform duration-200" />
                  )}
                </>
              )}
            </div>

            {openMenus.users && isOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-800 pl-3">
                <NavLink to="/admin/adduser" className={subLinkStyle}>
                  <FaUserPlus size={16} className="mr-2" />
                  Add User
                </NavLink>
                <NavLink to="/admin/users" className={subLinkStyle}>
                  <FiUsers size={16} className="mr-2" />
                  Manage Users
                </NavLink>
              </div>
            )}
          </div>

          {/* OFFERS */}
          <NavLink to="/admin/offers" className={linkStyle}>
            <FiTag size={20} />
            {isOpen && <span>Offers</span>}
          </NavLink>

          {/* INSPECTION */}
          <NavLink to="/admin/inspection" className={linkStyle}>
            <FiFileText size={20} />
            {isOpen && <span>Inspection</span>}
          </NavLink>

          {/* SETTINGS */}
          <NavLink to="/admin/settings" className={linkStyle}>
            <FiSettings size={20} />
            {isOpen && <span>Settings</span>}
          </NavLink>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-300 hover:bg-red-600/20 hover:text-red-400 hover:translate-x-1 transition-all duration-200 mt-6 border-t border-gray-800/50 pt-6"
          >
            <FiLogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </nav>

        {/* USER PROFILE (optional) */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 bg-gradient-to-t from-gray-950 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};