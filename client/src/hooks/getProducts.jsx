import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const AdminProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async () => {
    setLoading(true);

    try {
      // Use the environment variable for API base URL or a config value
      const response = await axios.get("/api/v1/admin/get_Products");

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      // Customize error messages based on different error types
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching the products.";

      toast.error(errorMessage);

      // Optionally dispatch an action to handle global state (e.g., for user errors or other scenarios)
      if (err.response?.status === 401) {
        // Handle unauthorized access (e.g., redirect to login page)
        dispatch(setUser(null)); // Clear user state if unauthorized
      }
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, getProducts, setProducts };
};

export default AdminProducts;
