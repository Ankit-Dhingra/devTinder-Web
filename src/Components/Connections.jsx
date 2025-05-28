import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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

  if (loading) return <h1 className="text-center text-xl">Loading...</h1>;

  if (!connections || connections.length === 0) {
    return <h1 className="text-center text-xl">No Connections Found</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-base-200 p-4 rounded-xl shadow-md flex flex-col items-center text-center"
          >
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            {user.age && user.gender && <p className="text-sm text-gray-600">
              {user.age} years • {user.gender}
            </p>}
            <p className="mt-2 text-sm">{user.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
