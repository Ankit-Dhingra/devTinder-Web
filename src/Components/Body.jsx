import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import appStore from "../utils/appStore";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {

      if(userData) return ;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      if (res) {
        dispatch(addUser(res.data.data));
      }
    } catch (error) {
      if (error.response?.status === 401){
        console.log(error.message);
        return navigate("/login");
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
      fetchUser();
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
