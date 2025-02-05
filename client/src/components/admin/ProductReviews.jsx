import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminLayout from "./AdminLayout";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
      setReviews(data.reviews);
      toast.success("Reviews fetched successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch reviews. Try again."
      );
    }
    setLoading(false);
  };

  const handleDelete = async (reviewId) => {
    try {
      const res = await axios.delete(
        `/api/v1/admin/reviews?reviewId=${reviewId}&productId=${productId}`
      );

      if (res.status == 200) {
        toast.success("Review Deleted!");
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete review. Try again."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center my-5">
        <div className="w-full max-w-md">
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label
                htmlFor="productId_field"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "SEARCH"}
            </button>
          </form>
        </div>

        <table className="table-auto w-full mt-5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">
                User
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Rating
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Comment
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="px-4 py-2 border border-gray-300">
                  {review.user?.name || "Unknown User"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {review.rating}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {review.comment}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
