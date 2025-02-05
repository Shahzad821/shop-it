import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const usePayment = () => {
  const [isLoading, setLoading] = useState(false);
  const makePayment = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/v1/payment/checkout_sessions",
        formData
      );

      if (response.status === 200) {
        // Corrected the redirection method.
        window.location.href = response.data.url;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { makePayment, isLoading };
};

export default usePayment;
