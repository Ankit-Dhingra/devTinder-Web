import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;




// import React, { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/Constants";
// import { useDispatch } from "react-redux";
// import {addUser} from "../utils/userSlice"

// const EditProfile = ({ userInfo }) => {
//     console.log("ususus"  , userInfo);
    
//   const { firstName, lastName, emailId, photoUrl, gender, age, about, skills } = userInfo;
//   const dispatch = useDispatch();
  

//   const [formData, setFormData] = useState({
//     firstName,
//     lastName,
//     emailId,
//     photoUrl,
//     gender,
//     age,
//     about,
//     skills,
//   });
//   console.log("tetetetdtdt" , formData);
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Updated Profile:", formData);
//       const response = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
//         withCredentials: true,
//       });
//       console.log("Profile saved successfully:", response.data.data);
//       dispatch(addUser(response.data.data))
//     } catch (error) {
//       console.error("Error saving profile:", error);
//     }
//   };

//   if (!userInfo) return null; // guard clause if userInfo is missing

//   return (
//     <div className="flex flex-col lg:flex-row justify-center gap-10 my-10 px-4">
//       {/* Edit Form */}
//       <div className="card bg-base-300 w-full max-w-3xl shadow-xl p-6">
//         <div className="flex flex-col items-center">
//           <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           <fieldset className="col-span-1">
//             <legend className="font-semibold mb-1">First Name</legend>
//             <input
//               type="text"
//               name="firstName"
//               className="input w-full"
//               value={formData.firstName}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <fieldset className="col-span-1">
//             <legend className="font-semibold mb-1">Last Name</legend>
//             <input
//               type="text"
//               name="lastName"
//               className="input w-full"
//               value={formData.lastName}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <fieldset className="col-span-1">
//             <legend className="font-semibold mb-1">Age</legend>
//             <input
//               type="number"
//               name="age"
//               className="input w-full"
//               value={formData.age}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <fieldset className="col-span-1">
//             <legend className="font-semibold mb-1">Gender</legend>
//             <select
//               name="gender"
//               className="select w-full"
//               value={formData.gender}
//               onChange={handleChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">male</option>
//               <option value="female">female</option>
//               <option value="others">others</option>
//             </select>
//           </fieldset>

//           <fieldset className="col-span-1 md:col-span-2">
//             <legend className="font-semibold mb-1">About</legend>
//             <textarea
//               name="about"
//               className="textarea w-full"
//               rows={3}
//               value={formData.about}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <fieldset className="col-span-1 md:col-span-2">
//             <legend className="font-semibold mb-1">Profile Picture URL</legend>
//             <input
//               type="text"
//               name="photoUrl"
//               className="input w-full"
//               value={formData.photoUrl}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <fieldset className="col-span-1 md:col-span-2">
//             <legend className="font-semibold mb-1">
//               Skills (comma separated)
//             </legend>
//             <input
//               type="text"
//               name="skills"
//               className="input w-full"
//               value={formData.skills}
//               onChange={handleChange}
//             />
//           </fieldset>

//           <div className="col-span-1 md:col-span-2">
//             <button type="submit" className="btn btn-primary w-full">
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Preview Card */}
//       <div className="w-full lg:max-w-sm">
//         <h2 className="text-xl font-semibold mb-4 text-center">Preview</h2>
//         <UserCard user={formData} />
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
