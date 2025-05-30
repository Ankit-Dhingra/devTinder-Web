import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res.data.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-xl font-semibold text-base-content">
          No new users found!
        </h1>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="space-y-4">
        {feed.map((eachUser) => (
          <UserCard key={eachUser._id} user={eachUser} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
