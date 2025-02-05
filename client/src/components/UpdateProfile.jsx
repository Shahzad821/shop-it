import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import { useSelector } from "react-redux";
import useUpdateProfile from "../hooks/useUpdateProfile";
import Loader from "./loader";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading, updateProfile } = useUpdateProfile();

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(data);
  };

  useEffect(() => {
    if (user) {
      setData({ name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <UserLayout>
      <div className="w-full max-w-sm p-5 rounded-lg">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 font-mono">
            Update Profile
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              name="name"
              value={data.name}
              onChange={handleChange} // Update name state
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w- w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={` w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md disabled:opacity-50 hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-700 flex justify-center`}
          >
            {loading ? <Loader w="6" h="6" color="white" /> : "Update"}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
