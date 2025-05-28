import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import appStore from "../utils/appStore";

const Profile = () => {
  const userInfo = useSelector((store) => store.user);
  
  return (
    userInfo && (
      <div className="flex justify-center">
        <EditProfile user={userInfo} />
      </div>
    )
  );
};

export default Profile;
