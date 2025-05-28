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
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div>
        {feed.map((eachUser) => {
          return <UserCard key={eachUser._id} user={eachUser} />;
        })}
      </div>
    )
  );
};

export default Feed;
