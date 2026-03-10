import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectIsAuthenticated, logout } from "../../store/slices/authSlice";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const isAuth = useAppSelector(selectIsAuthenticated);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   console.log({ isAuth });

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const links = [
//     ["/", "Home"],
//     ["/store", "Store"],
//   ];

//   return (
//     <>
//       <nav className="navbar">
//         {/* Logo */}
//         <Link to="/" className="nav-logo">
//           <div className="nav-logo-mark">
//             <svg
//               viewBox="0 0 38 38"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 x="1"
//                 y="1"
//                 width="36"
//                 height="36"
//                 stroke="#C9A84C"
//                 strokeWidth="1"
//               ></rect>
//               <rect
//                 x="5"
//                 y="5"
//                 width="28"
//                 height="28"
//                 stroke="#C9A84C"
//                 strokeWidth="0.5"
//                 strokeDasharray="3 3"
//               ></rect>
//               <circle
//                 cx="19"
//                 cy="19"
//                 r="8"
//                 stroke="#C9A84C"
//                 strokeWidth="1"
//               ></circle>
//               <circle cx="19" cy="19" r="3" fill="#C9A84C"></circle>
//               <rect
//                 x="14"
//                 y="8"
//                 width="10"
//                 height="4"
//                 rx="1"
//                 fill="#C9A84C"
//                 opacity="0.4"
//               ></rect>
//             </svg>
//           </div>
//           <div>
//             <div className="logo-en">Photo House El Eraki</div>
//             <div className="logo-ar">Photo House El Eraki</div>
//           </div>
//         </Link>

//         {/* English Links */}
//         <div className="nav-en-links">
//           {links.map(([to, label]) => (
//             <NavLink
//               key={to}
//               to={to as string}
//               className={({ isActive }) => `navl ${isActive ? "active" : ""}`}
//             >
//               {label}
//             </NavLink>
//           ))}
//         </div>

//         <div className="nav-right">
//           {isAuth && (
//             <>
//               <button></button>
//               <Link
//                 to="/admin"
//                 className="nav-admin cursor-pointer"
//                 onClick={() => setOpen(false)}
//               >
//                 Admin Panel
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="cursor-pointer font-bold text-xs text-red-600 hover:text-red-400
//                   transition-colors border border-dark3 px-3 py-1.5 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           )}

//           {/* Mobile menu button */}
//           <button
//             className="hbg md:hidden cursor-pointer"
//             onClick={() => setOpen(!open)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>
//       </nav>
//       {/* Mobile menu */}
//       <div className={`mob ${open ? "open" : ""}`}>
//         <button className="mob-x cursor-pointer" onClick={() => setOpen(false)}>
//           ✕
//         </button>
//         <Link to="/" className="mob-link" onClick={() => setOpen(false)}>
//           Home
//         </Link>
//         <Link to="/store" className="mob-link" onClick={() => setOpen(false)}>
//           Store
//         </Link>
//         {isAuth && (
//           <>
//             <Link
//               to="/admin"
//               className="mob-link"
//               onClick={() => setOpen(false)}
//             >
//               Admin
//             </Link>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setOpen(false);
//               }}
//               className="mob-link"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

export default function Navbar2() {
  const [open, setOpen] = useState(false);
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const links = [
    ["/", "Home"],
    ["/store", "Store"],
    ...(isAuth ? [["/admin", "Admin"]] : []),
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-dark/95 backdrop-blur
      border-b border-dark3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2 leading-none"
          >
            <img
              src="icon.svg"
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-lg sm:text-xl md:text-2xl text-yellow-400
              tracking-widest"
              >
                PHOTO HOUSE
              </span>
              <span
                className="font-ui text-xs sm:text-sm text-text3
              tracking-wider"
              >
                Photo House El Eraki
              </span>
            </div>
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to as string}
                className={({ isActive }) =>
                  `font-ui text-sm tracking-wider transition-colors ${isActive ? "text-yellow-400" : "text-text2 hover:text-yellow-400"}`
                }
              >
                {label}
              </NavLink>
            ))}
            {isAuth && (
              <button
                onClick={handleLogout}
                className="font-ui text-xs text-text3 hover:text-red
                  transition-colors border border-dark3 px-3 py-1.5 rounded"
              >
                Logout
              </button>
            )}
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-text2 hover:text-yellow-400 p-2"
            onClick={() => setOpen(!open)}
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-4 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark2 border-t border-dark3 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            className="font-ui text-sm text-text2
            hover:text-yellow-400"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/store"
            className="font-ui text-sm text-text2
            hover:text-yellow-400"
            onClick={() => setOpen(false)}
          >
            Store
          </Link>
        </div>
      )}
    </nav>
  );
}
