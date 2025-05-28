import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appStore from "../utils/appStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get(BASE_URL + "/logout", {
      withCredentials: true,
    });
    dispatch(removeUser());
    return navigate("/login");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      <>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <Link to={"/"} className="btn btn-ghost text-xl">
              👩‍💻 DevTinder
            </Link>
          </div>
          <div className="flex gap-2">
            <label className="toggle text-base-content mt-2">
              <input
                type="checkbox"
                onChange={handleThemeToggle}
                checked={theme === "dark"}
                className="theme-controller"
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
            {user && (
              <div className="dropdown dropdown-end mx-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <p className=" text-left whitespace-nowrap font-bold text-ellipsis overflow-hidden max-w-[180px]">
                      Welcome, {user.firstName}
                    </p>
                  </li>
                  <li>
                    <Link to={"/profile"} >
                      Profile
                      {/* <span className="badge">New</span> */}
                    </Link>
                  </li>
                  <li>
                  <Link to={"/connections"} >
                      Connections
                    </Link>
                  </li>
                  <li>
                  <Link to={"/requests"} >
                      Requests
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Navbar;
