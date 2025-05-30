import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, photoUrl, age, gender, showButton } =
    user;
  const dispatch = useDispatch();

  const sendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card  w-96 shadow-lg  hover:shadow-xl transition-shadow duration-300">
        <figure className="px-4 pt-4">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="rounded-xl w-full h-74 object-top object-cover"
          />
        </figure>
        <div className="card-body px-6 py-4">
          <h2 className="card-title text-xl font-semibold  mb-2">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm  mb-2">
              {age}, {gender}
            </p>
          )}
          {about && (
            <p className=" text-sm leading-relaxed mb-4 line-clamp-3">
              {about}
            </p>
          )}
          <div className="card-actions justify-end gap-3 mt-auto">
            <button
              className="btn btn-outline btn-sm px-6 hover:bg-red-400 border-gray-300"
              onClick={() => sendRequest("ignored", _id)}
              disabled={showButton}
            >
              Pass
            </button>
            <button
              className="btn btn-primary btn-sm px-6 bg-blue-600 hover:bg-blue-700 border-blue-600"
              onClick={() => sendRequest("interested", _id)}
              disabled={showButton}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
