import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const updatePassword = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.put(
        "server/api/v1/me/update-password",
        formData
      );

      if (response.status === 200) {
        toast.success("Password updated!");
      } else {
        toast.error("Failed to update password.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating the Password.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
};

export default useUpdatePassword;
