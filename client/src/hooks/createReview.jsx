import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const CreateReview = () => {
  const [loading, setLoading] = useState(false);

  const createReview = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/v1/reviews`, formData);
      if (response.status === 201) {
        toast.success("Review submitted successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createReview };
};

export default CreateReview;
