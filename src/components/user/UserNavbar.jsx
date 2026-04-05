// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";

// export const UserNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const navigate = useNavigate();


//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="bg-gray-900 text-white px-6 py-3 sticky top-0 z-50 border-b border-gray-800 shadow-lg">
//         <div className="flex justify-between items-center">
//           {/* LOGO */}
//           <Link to="/user/home" className="flex items-center gap-2">
//             <div className="bg-blue-600 p-1.5 rounded-lg">🚗</div>
//             <span className="text-xl font-bold">
//               Car<span className="text-blue-500">Scout</span>
//             </span>
//           </Link>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center gap-4">
//             <ul className="flex gap-1 items-center font-medium">
//               {/* 🔥 FIXED: Dashboard → Home */}
//               <li>
//                 <Link
//                   to="/user"
//                   className="px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
//                 >
//                   Home
//                 </Link>
//               </li>

//               {/* 🔥 FIXED: My Cars */}
//               <li>
//                 <Link
//                   to="/user/cars"
//                   className="px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
//                 >
//                   Cars
//                 </Link>
//               </li>

//               {/* 🔥 FIXED: Offers */}
//               <li>
//                 <Link
//                   to="/user/offers"
//                   className="px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
//                 >
//                   My Offers
//                 </Link>
//               </li>
//             </ul>

//             {/* PROFILE */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="p-2 bg-gray-800 rounded-lg"
//               >
//                 JD ⬇
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow">
//                   <Link
//                     to="/user/profile"
//                     className="block px-4 py-2 hover:bg-gray-700"
//                   >
//                     Profile
//                   </Link>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* MOBILE BUTTON */}
//           <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//             ☰
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {isOpen && (
//           <div className="md:hidden mt-4">
//             <Link to="/user/home" className="block py-2">
//               Home
//             </Link>
//             <Link to="/user/cars" className="block py-2">
//               Cars
//             </Link>
//             <Link to="/user/offers" className="block py-2">
//               My Offers
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* 🔥 VERY IMPORTANT (DON'T REMOVE) */}
//       <div className="bg-gray-900 min-h-[calc(100vh-64px)]">
//         <Outlet />
//       </div>
//     </>
//   );
// };






import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "../../api/Api";

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const userName = localStorage.getItem("firstName") || "User";
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  const initials = useMemo(
    () => userName.slice(0, 2).toUpperCase(),
    [userName]
  );

  const basePath = role === "seller" ? "/seller" : "/user";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Poll unread notification count for navbar badge
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        if (!user?._id) return;
        const res = await API.get(`/notification/unread-count?userId=${user._id}`);
        setUnreadCount(res.data.count || 0);
      } catch (err) {
        console.log("Notification count error:", err);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);

    return () => clearInterval(interval);
  }, [user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => {
    if (path === basePath) {
      return location.pathname === basePath;
    }
    return location.pathname.startsWith(path);
  };

  const navClass = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1120]/85 text-white backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

          <Link to={basePath} className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-[0_10px_30px_rgba(34,211,238,0.25)] transition duration-300 hover:scale-105">
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
                Car<span className="text-cyan-300">Scout</span>
              </h1>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                Verified Cars
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)] md:flex">
            <Link to={basePath} className={navClass(basePath)}>
              Home
            </Link>

            {role !== "seller" && (
              <Link to="/user/cars" className={navClass("/user/cars")}>
                Cars
              </Link>
            )}

            <Link to={`${basePath}/offers`} className={navClass(`${basePath}/offers`)}>
              {role === "seller" ? "View Offers" : "My Offers"}
            </Link>

            {role === "seller" && (
              <Link
                to="/seller/my-listings"
                className={navClass("/seller/my-listings")}
              >
                My Listings
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
              Trusted Marketplace
            </div>

            <Link
              to={`${basePath}/notifications`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17H20l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5.143m5.714 0a3 3 0 11-5.714 0m5.714 0H9.143"
                />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-2 pr-4 transition duration-300 hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
                  {initials}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{userName}</p>
                  <p className="text-xs text-slate-400">My Account</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-xl">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{userName}</p>
                    <p className="text-xs text-slate-400">carscout user panel</p>
                  </div>

                  <Link
                    to={`${basePath}/offers`}
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                  >
                    {role === "seller" ? "View Offers" : "My Offers"}
                  </Link>

                  <Link
                    to={`${basePath}/notifications`}
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                  >
                    Notifications
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
          >
            <span className="text-lg">{isOpen ? "X" : "☰"}</span>
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-white/10 bg-[#0f172a]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 px-4 py-4">
            <Link
              to={basePath}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
            >
              Home
            </Link>

            {role !== "seller" && (
              <Link
                to="/user/cars"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                Cars
              </Link>
            )}

            <Link
              to={`${basePath}/offers`}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
            >
              {role === "seller" ? "View Offers" : "My Offers"}
            </Link>

            {role === "seller" && (
              <Link
                to="/seller/my-listings"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                My Listings
              </Link>
            )}

            <Link
              to={`${basePath}/notifications`}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
            >
              Notifications {unreadCount > 0 ? `(${unreadCount})` : ""}
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-80px)] bg-[#0b1120]">
        <Outlet />
      </div>
    </>
  );
};
