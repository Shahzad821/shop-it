import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const useUpdateAvatar = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateAvatar = async (avatar) => {
    setLoading(true);
    const formData = {
      avatar,
    };

    try {
      const response = await axios.put(
        "server/api/v1/me/upload-avatar",
        formData
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        toast.success("Avatar updated!");
      } else {
        toast.error("Failed to update avatar.");
      }
    } catch (err) {
      // Handle network or server errors
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating the avatar.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateAvatar, loading };
};

export default useUpdateAvatar;
