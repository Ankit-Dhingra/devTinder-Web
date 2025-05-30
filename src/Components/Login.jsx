import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mrankitdhingra@gmail.com");
  const [password, setPassword] = useState("Ankit@2002");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));

      setEmailId("");
      setPassword("");
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 relative overflow-hidden px-4 py-8">
    {/* LEFT TEXT SECTION */}
    <div className="hidden lg:flex flex-col justify-center w-1/2 z-10 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to DevTinder 👨‍💻❤️</h1>
      <p className="text-lg opacity-70 max-w-md animate-fade-in-delay">
        Connect. Collaborate. Code. Match with like-minded developers and build something amazing together.
      </p>
    </div>

    {/* RIGHT FORM SECTION */}
    <div className="w-full lg:w-1/2 z-10">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 mx-auto max-w-md border border-white/20 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>

        {!isLoginForm && (
          <>
            <fieldset className="mb-4">
              <legend className="text-sm  mb-1">First Name</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="mb-4">
              <legend className="text-sm  mb-1">Last Name</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </>
        )}

        <fieldset className="mb-4">
          <legend className="text-sm  mb-1">Email ID</legend>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-sm  mb-1">Password</legend>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button
          className="btn btn-primary w-full"
          onClick={() => (isLoginForm ? handleLogin() : handleSignUp())}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4 ">
          {isLoginForm ? (
            <span>
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setIsLoginForm(false)}
              >
                Sign up here
              </span>
            </span>
          ) : (
            <span>
              Already registered?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setIsLoginForm(true)}
              >
                Login here
              </span>
            </span>
          )}
        </p>
      </div>
    </div>

    {/* BG Blobs */}
    <div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-30 rounded-full blur-3xl top-[150px] right-[-150px] z-0"></div>
    <div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-30 rounded-full blur-3xl top-[100px] left-[-150px] z-0"></div>
    <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full blur-2xl bottom-[-100px] left-[-100px] z-0"></div>
  </div>
);
};

export default Login;