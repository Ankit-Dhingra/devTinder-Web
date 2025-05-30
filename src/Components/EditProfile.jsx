import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || ""
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [showButton , setShowButton] = useState(true);
  const navigate = useNavigate();

  const saveProfile = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      // Convert skills string to array
      const skillsArray = skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age: age ? parseInt(age) : null,
          gender,
          skills: skillsArray,
          about,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  const skillsArray = skills
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  return (
    <>
      <div className="min-h-screen   ">
        {/* Mobile Preview Toggle Button */}
        <div className="lg:hidden  shadow-sm border-b backdrop-blur-lg sticky top-0 z-40">
          <div className="px-4 py-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-80 bg-blue-600 jsu py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors m-auto duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{showPreview ? "Edit Profile" : "Preview Profile"}</span>
            </button>
          </div>
        </div>

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header - Hidden on mobile when preview is shown */}
            <div className={`text-center mb-8 ${showPreview ? 'hidden lg:block' : ''}`}>
              <h1 className="text-3xl font-bold ">Edit Profile</h1>
              <p className="mt-2">Update your information and see the preview</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center ">
              {/* Edit Form */}
              <div className={` rounded-lg bg-base-200 shadow-lg p-6 w-full max-w-2xl ${showPreview ? 'hidden lg:block' : ''}`}>
                <h2 className="text-xl font-semibold  mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium  mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      value={photoUrl}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Age 
                      </label>
                      <input
                        type="number"
                        value={age}
                        className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
                        min="18"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={gender}
                        className="w-full px-3 py-2 border bg-base-100  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={skills}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="JavaScript, React, Node.js, Python..."
                    />
                    <p className="text-xs  mt-1">
                      Separate skills with commas
                    </p>
                    {skillsArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skillsArray.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      About
                    </label>
                    <textarea
                      value={about}
                      className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows="4"
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {about.length}/500 characters
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <div className="flex">
                        <svg className="w-5 h-5 text-red-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={saveProfile}
                      disabled={isLoading || !firstName || !lastName}
                      className="w-full bg-blue-600  py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving Profile...
                        </span>
                      ) : (
                        "Save Profile"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Card */}
              <div className={`w-full max-w-md bg-base-200 rounded-lg ${!showPreview ? 'hidden lg:block' : ''}`}>
                <div className="lg:hidden mb-4">
                  <h2 className="text-xl font-semibold  text-center">Profile Preview</h2>
                </div>
                <div className="hidden lg:block mb-4">
                  <h2 className="text-xl font-semibold mt-2 text-center">Preview</h2>
                </div>
                <div className="lg:sticky bg-base-200 mx-6 shadow-cyan-100-2xl rounded-lg lg:top-8">
                  <UserCard
                    user={{ 
                      firstName, 
                      lastName, 
                      photoUrl, 
                      age, 
                      gender, 
                      about,
                      skills: skillsArray,
                      showButton
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;