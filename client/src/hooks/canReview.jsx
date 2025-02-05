import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

const CanReview = () => {
  const canReview = async () => {
    try {
      const response = await axios.post(`/api/v1/can_review`);
      return response.data.canReview;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return { canReview };
};

export default CanReview;
