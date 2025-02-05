import { useState } from "react";
import UserLayout from "./UserLayout";
import Loader from "./loader";
import useUpdatePassword from "../hooks/useUpdatePassword";

const UpdatePassword = () => {
  const { updatePassword, loading, success } = useUpdatePassword();

  const [formData, setData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePassword(formData);

    setData({ currentPassword: "", newPassword: "" });
  };

  return (
    <UserLayout>
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-md p-6  rounded-lg ">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-center font-mono text-gray-800">
              Update Password
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                name="currentPassword"
                type="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                className="mt-1 p-2 w-full border border-grey-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full text-white p-2 rounded-md bg-yellow-600 transition flex justify-center disabled:opacity-50"
            >
              {loading ? (
                <Loader w={6} h={6} color="white" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
