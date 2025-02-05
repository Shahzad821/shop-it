import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email) => {
    setLoading(true);
    const formData = {
      email,
    };
    try {
      const response = await axios.post("/api/v1/password/forgot", formData);

      toast.success("Email sent!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};

export default useForgetPassword;
