import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log("ERROR:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading)
    return <h1 className="text-center text-xl mt-10 font-medium">Loading...</h1>;

  if (!connections || connections.length === 0) {
    return (
      <h1 className="text-center text-xl mt-10 font-medium">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-base-200 p-6 rounded-2xl shadow-md flex flex-col items-center text-center h-full"
          >
            <div className="flex flex-col items-center flex-grow">
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              {user.age && user.gender && (
                <p className="text-sm text-gray-600">
                  {user.age} years • {user.gender}
                </p>
              )}
              {user.about && (
                <p className="mt-3 text-sm line-clamp-3">
                  {user.about}
                </p>
              )}
            </div>
            <Link to={`/chat/${user._id}`} className="w-full">
              <button className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition duration-200">
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
