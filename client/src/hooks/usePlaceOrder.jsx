import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const placeOrder = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/orders/new", formData);

      if (response.status === 201) {
        navigate(`/me/orders?order_success=true`);
        toast.success("Order placed successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading };
};

export default usePlaceOrder;
