import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { Link, useNavigate } from "react-router-dom";
import { set } from "mongoose";
import useGetUser from "../hooks/getUser";
import MetaData from "../components/helmet";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [fetchUser] = useGetUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to log in");
      }
      if (response.ok) {
        toast.success("Signup successfully");
        fetchUser(); // Fetch the user details after successful login

        navigate("/");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      toast.error(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title={"signup"} />
      <div className="flex items-center justify-center min-h-[70vh]">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center font-serif text-gray-900">
            Signup
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center bg-purple-500 ${
              loading ? "cursor-not-allowed" : "hover:bg-purple-600"
            }`}
          >
            {loading ? <Loader w={6} h={6} color="white" /> : "Signup"}
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
