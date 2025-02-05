import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ admin }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // State to handle loading before determining authentication status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/login");
    }
    // If user is not admin and admin prop is passed, redirect to home
    if (admin && user && user.role !== "admin") {
      navigate("/");
    }

    // Set loading to false after the initial check
    setLoading(false);
  }, [isAuthenticated, navigate, admin, user]);

  // While loading, return null or a loader to prevent rendering the Outlet prematurely
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div
          className={`animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500 transition-all ease-in`}
        ></div>
      </div>
    );
  }

  // If authenticated, render the nested route
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
