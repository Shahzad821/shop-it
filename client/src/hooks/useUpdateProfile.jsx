import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios
import useGetUser from "./getUser";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const updateProfile = async (profileData) => {
    setLoading(true);

    try {
      const response = await axios.put(
        "/api/v1/update/me/profile",
        profileData
      );

      dispatch(setUser(response.data.user));
      toast.success("Profile updated!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useUpdateProfile;
