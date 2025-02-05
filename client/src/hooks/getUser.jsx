import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isAuthenticated, setUser } from "../store/userSlice";

const useGetUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/me");
      if (!response.ok) {
        toast.error("Failed to fetch user data");
      }
      const data = await response.json();
      dispatch(setUser(data.user));
      dispatch(isAuthenticated(true));
    } catch (err) {
      toast.error(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return [fetchUser, isLoading];
};

export default useGetUser;
