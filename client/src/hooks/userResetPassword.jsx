import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async (formData, token) => {
    setLoading(true);

    try {
      const response = await axios.put(
        `/api/v1/password/reset/${token}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Password reset successful!");
        // Redirect to login page or any other page
        navigate("/login");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export default useResetPassword;
