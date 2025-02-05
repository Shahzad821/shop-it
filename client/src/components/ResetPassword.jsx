import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./loader";
import useResetPassword from "../hooks/userResetPassword";
import MetaData from "./helmet";

const ResetPassword = () => {
  const { resetPassword, loading } = useResetPassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const formData = {
      password: password,
      confirmPassword: confirmPassword,
    };
    resetPassword(formData, token);
  };

  return (
    <>
      <MetaData title={"reset-password"} />
      <div className="flex justify-center items-center min-h-[70vh] ">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">New Password</h2>
          <form onSubmit={handleSubmit}>
            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className=" flex justify-center w-full  bg-yellow-600 py-3 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={loading}
            >
              {loading ? <Loader w={6} h={6} color="white" /> : "Set Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
