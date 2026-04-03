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







import React, { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("firstName") || "User";
  const initials = useMemo(
    () => userName.slice(0, 2).toUpperCase(),
    [userName],
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/user") {
      return (
        location.pathname === "/user" || location.pathname === "/user/home"
      );
    }
    return location.pathname.startsWith(path);
  };

  const navClass = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive(path)
        ? "bg-cyan-400 text-slate-950"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1120]/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/user" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 shadow-lg shadow-cyan-500/20">
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
                  stroke="#22d3ee"
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

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            <Link to="/user" className={navClass("/user")}>
              Home
            </Link>
            <Link to="/user/cars" className={navClass("/user/cars")}>
              Cars
            </Link>
            <Link to="/user/offers" className={navClass("/user/offers")}>
              My Offers
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {/* <button
              onClick={() => navigate("/user/cars")}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Explore Cars
            </button> */}

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-2 pr-4 transition hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
                  {initials}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{userName}</p>
                  <p className="text-xs text-slate-400">My Account</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
                  <Link
                    to="/user/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/user/offers"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                  >
                    My Offers
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
          >
            <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 bg-[#0f172a] md:hidden">
            <div className="space-y-2 px-4 py-4">
              <Link
                to="/user"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                Home
              </Link>

              <Link
                to="/user/cars"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                Cars
              </Link>

              <Link
                to="/user/offers"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                My Offers
              </Link>

              <Link
                to="/user/profile"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="min-h-[calc(100vh-80px)] bg-[#0b1120]">
        <Outlet />
      </div>
    </>
  );
};
