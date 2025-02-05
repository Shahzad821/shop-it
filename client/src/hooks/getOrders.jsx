import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const useGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setOrders] = useState([]);
  const getOrders = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/me/orders`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { getOrders, loading, allOrders };
};

export default useGetOrders;
