import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id , firstName, lastName, about, photoUrl, age, gender } = user;
  const dispatch = useDispatch();

  const sendRequest = (status, userId) => {
    try {
      const sendReq = axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId , {} , {withCredentials : true}
      );
      console.log("testttt : ", sendReq);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("ERROR :", error.message);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p> {age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={() => sendRequest("ignored" , _id)}>Ignore</button>
            <button className="btn  btn-success" onClick={() => sendRequest("interested" , _id)}>Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
