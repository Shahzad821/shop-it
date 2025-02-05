import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
const UploadImages = () => {
  const [newImages, setNewImages] = useState([]); // For new images before upload
  const [uploadedImages, setUploadedImages] = useState([]); // For already uploaded images
  const [loading, setLoading] = useState(false); // For the submit button's loading state
  const [isDeleting, setIsDeleting] = useState(false); // For delete loading state
  const { id } = useParams();
  const fileInputRef = useRef(); // To control the file input reset

  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetch product details including images
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      setUploadedImages(response.data.images || []);
    } catch (error) {
      toast.error("Error fetching product images. Please try again later.");
    }
  };

  // Handle file input change and show previews
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = [];

    // Read each selected file and create image previews
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    // Once all files are read, update the newImages state
    Promise.all(fileReaders).then(() => {
      setNewImages((prevImages) => [...prevImages, ...imagePreviews]);
    });
  };

  // Remove new image preview
  const handleRemoveNewImage = (index) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
  };

  // Reset the file input field after selection
  const handleResetInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle image upload on form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Upload the new images
      const response = await axios.put(
        `/api/v1/admin/product/${id}/upload_images`,
        { images: newImages }
      );

      if (response.status === 200) {
        // Refresh the uploaded images after upload
        fetchProduct();
        setNewImages([]); // Clear the new images after successful upload
        toast.success("Images uploaded successfully!");
      }
    } catch (error) {
      toast.error("Error uploading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image deletion
  const deleteImage = async (imgId) => {
    setIsDeleting(true);

    try {
      const response = await axios.put(
        `/api/v1/admin/product/${id}/delete_images`,
        { imgId }
      );

      if (response.status === 200) {
        // Remove the image from the UI after successful deletion
        setUploadedImages((prevImages) =>
          prevImages.filter((image) => image.public_id !== imgId)
        );
        toast.success("Image deleted successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-lg">
          <form
            className="shadow-lg rounded-lg bg-white p-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4 font-semibold">
              Upload Product Images
            </h2>

            <div className="mb-4">
              <label
                htmlFor="product_images"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Images
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="product_images"
                name="product_images"
                className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-yellow-500 file:text-white file:rounded-md"
                multiple
                onChange={handleFileChange}
                onClick={handleResetInputChange}
              />
            </div>

            {/* Display New Image Previews */}
            {newImages.length > 0 && (
              <div className="my-4">
                <p className="text-sm text-yellow-600">New Images:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {newImages.map((image, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="border rounded-lg shadow-lg flex flex-col justify-between h-full">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)}
                            className="bg-red-500 w-full flex justify-center text-white rounded-sm p-1"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="my-4">
                <p className="text-sm text-green-600">
                  Product Uploaded Images:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="border rounded-lg shadow-lg flex flex-col justify-between h-full">
                        <img
                          src={image.url || image}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => deleteImage(image.public_id)}
                            disabled={isDeleting}
                            className={`${
                              isDeleting ? "bg-red-300" : "bg-red-500"
                            } w-full flex justify-center items-center text-white rounded-sm p-1`}
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
