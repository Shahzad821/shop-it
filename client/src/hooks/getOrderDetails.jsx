import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const useGetOrdersDetails = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const getOrderDetail = async (id) => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/me/orders/${id}`);
      if (response.status === 200) {
        setOrderDetail(response.data);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { getOrderDetail, loading, orderDetail };
};

export default useGetOrdersDetails;
