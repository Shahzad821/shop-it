import React, { useState } from "react";
import Loader from "./loader";
import useForgetPassword from "../hooks/useForgetPassowrd";
import MetaData from "./helmet";

const ForgotPassword = () => {
  const { forgotPassword, loading } = useForgetPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <>
      <MetaData title={"forget-password"} />
      <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-medium mb-6 text-center">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email_field"
                className="block text-gray-700 text-sm font-medium"
              >
                Enter Email
              </label>
              <input
                type="email"
                id
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className=" flex justify-center w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-900"
            >
              {loading ? <Loader w={6} h={6} color="white" /> : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
