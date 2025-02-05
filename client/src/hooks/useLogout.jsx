import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isAuthenticated, setUser } from "../store/userSlice";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setLoading(true);
    try {
      // Call your logout API endpoint
      const response = await fetch("/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle API response
      if (!response.ok) {
        toast.error("Failed to logout");
        setLoading(false);
        return;
      }

      dispatch(setUser(null));
      dispatch(isAuthenticated(false));

      toast.success("Logged out successfully");

      setLoading(false);
    } catch (err) {
      // Handle error if fetch fails
      setLoading(false);
      toast.error(err.message || "Failed to logout");
    }
  };

  return { logout, loading };
};

export default useLogout;
