import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-3 sticky top-0 z-50 border-b border-gray-800 shadow-lg">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <Link to="/user/home" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">🚗</div>
            <span className="text-xl font-bold">
              Car<span className="text-blue-500">Scout</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-1 items-center font-medium">
              {/* 🔥 FIXED: Dashboard → Home */}
              <li>
                <Link
                  to="/user"
                  className="px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
                >
                  Home
                </Link>
              </li>

              {/* 🔥 FIXED: My Cars */}
              <li>
                <Link
                  to="/user/cars"
                  className="px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
                >
                  Cars
                </Link>
              </li>

              {/* 🔥 FIXED: Offers */}
              <li>
                <Link
                  to="/user/offers"
                  className="px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                >
                  My Offers
                </Link>
              </li>
            </ul>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 bg-gray-800 rounded-lg"
              >
                JD ⬇
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <Link to="/user/home" className="block py-2">
              Home
            </Link>
            <Link to="/user/cars" className="block py-2">
              Cars
            </Link>
            <Link to="/user/offers" className="block py-2">
              My Offers
            </Link>
          </div>
        )}
      </nav>

      {/* 🔥 VERY IMPORTANT (DON'T REMOVE) */}
      <div className="bg-gray-900 min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </>
  );
};
