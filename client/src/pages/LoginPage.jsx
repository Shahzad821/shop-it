import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetUser from "../hooks/getUser";
import MetaData from "../components/helmet";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fetchUser] = useGetUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to log in");
      }

      if (response.ok) {
        toast.success("Logged in successfully");
        fetchUser(); // Fetch the user details after successful login

        // Reset form and navigate
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title={"login"} />
      <div className="flex items-center justify-center min-h-[70vh]">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 font-serif">
            Login
          </h2>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none shadow-sm focus:ring-1 focus:ring-purple-500"
              disabled={loading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none shadow-sm focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <p
            className="cursor-pointer text-gray-800 text-base hover:underline text-end"
            onClick={() => navigate("/password/forgot")}
          >
            Forget Password
          </p>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center bg-purple-500 ${
              loading ? "cursor-not-allowed" : "hover:bg-purple-600"
            }`}
          >
            {loading ? <Loader w={6} h={6} color="white" /> : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-600 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
