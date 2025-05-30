import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const review = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log("ERROR :", error.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log("ERROR : ", error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  // if (!requests) return;

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold  mb-2">
            No Requests Found
          </h2>
          <p className="">
            You don't have any connection requests at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold  mb-6 text-center">
          Connection Requests
        </h1>

        <div className="space-y-4 md:space-y-6">
          {requests
            .filter((request) => request.fromUserId)
            .map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;

              return (
                <div
                  key={request._id}
                  className=" rounded-lg shadow-lg bg-base-300  overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Profile Image */}
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <img
                          alt="profile"
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-200"
                          src={photoUrl}
                        />
                      </div>

                      {/* Profile Info */}
                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-semibold  mb-1">
                          {firstName + " " + lastName}
                        </h3>

                        {age && gender && (
                          <p className="text-sm md:text-base  mb-2">
                            {age + ", " + gender}
                          </p>
                        )}

                        {about && (
                          <p className="text-sm md:text-base  leading-relaxed mb-4">
                            {about}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                          <button
                            className="w-full sm:w-auto px-6 py-2.5 bg-red-500 hover:bg-red-600  font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={() =>
                              reviewRequest("rejected", request._id)
                            }
                          >
                            Reject
                          </button>
                          <button
                            className="w-full sm:w-auto px-6 py-2.5 bg-green-500 hover:bg-green-600  font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={() =>
                              reviewRequest("accepted", request._id)
                            }
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
