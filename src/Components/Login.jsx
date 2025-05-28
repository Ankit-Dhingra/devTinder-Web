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
      console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                placeholder="Enter your Email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-600 ">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => isLoginForm ? handleLogin() : handleSignUp()}>
             {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p>
            {isLoginForm ? (
              <div onClick={() => setIsLoginForm((value) => !value)}>
                Create your account,{" "}
                <span className="text-blue-400 cursor-pointer">click here</span>
              </div>
            ) : (
              <div onClick={() => setIsLoginForm((value) => !value)}>
                Already a user?{" "}
                <span className="text-blue-400 cursor-pointer">
                  click here to login
                </span>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
