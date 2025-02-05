import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminLayout from "./AdminLayout"; // Adjust the path as necessary
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user", // Default role
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`/api/v1/admin/users/${id}`);
        const { user } = response.data;
        setFormData({
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching user data"
        );
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true); // Start submitting
    try {
      const response = await axios.put(
        `/api/v1/admin/user/update/${id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("User updated!");
        setFormData({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>

            {/* Loading Indicator for Fetching */}
            {loading && (
              <div className="text-center mb-4">
                <span>Loading user data...</span>
              </div>
            )}

            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name_field"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter name"
                disabled={loading} // Disable input while loading
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email_field"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
                disabled={loading} // Disable input while loading
              />
            </div>

            {/* Role Field */}
            <div className="mb-6">
              <label
                htmlFor="role_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role_field"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading} // Disable select while loading
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
              disabled={isSubmitting || loading} // Disable button during submit and loading
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
