import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import CreateReview from "../hooks/createReview";
import Loader from "./loader";
import axios from "axios"; // Make sure axios is imported

const NewReview = ({ productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createReview, loading } = CreateReview();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [canSubmitReview, setCanSubmitReview] = useState(false); // Renamed the state to avoid conflict

  // Function to check if the user can review the product
  const checkCanReview = async () => {
    try {
      const response = await axios.post(
        `/api/v1/can_review/?productId=${productId}`
      );

      setCanSubmitReview(response.data.canReview); // Set review eligibility
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
    }
  };

  // Run the review check when the component mounts
  useEffect(() => {
    checkCanReview(); // Check review eligibility when the component is loaded
  }, [productId]);

  const handleReviewSubmit = () => {
    const formData = {
      rating,
      comment,
      productId,
    };
    createReview(formData);
    setIsModalOpen(false); // Close modal after review is submitted
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Show the button only if the user can submit a review */}
      {canSubmitReview && (
        <button
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4"
          onClick={openModal} // Open the modal on button click
        >
          Submit Your Review
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="modal-header flex justify-between items-center">
              <h5 className="text-xl font-bold">Submit Review</h5>
              <button
                className="text-gray-600"
                onClick={closeModal} // Close the modal
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="flex items-center">
                <StarRatings
                  rating={rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1/2px"
                  changeRating={(newRating) => setRating(newRating)}
                />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your comment"
                rows="4"
              ></textarea>

              <button
                onClick={handleReviewSubmit}
                className="w-full mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !comment} // Disable the button when loading or no comment
              >
                {loading ? <Loader w={4} h={4} color="white" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReview;
