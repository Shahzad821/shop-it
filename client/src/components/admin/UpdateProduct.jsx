import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // to navigate after a successful PUT
import { toast } from "react-hot-toast"; // import React Hot Toast
import AdminLayout from "./AdminLayout";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    seller: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // List of categories
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Sports",
    "Outdoors",
    "Homes",
  ];

  // Fetch product details when the component mounts
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Submit form data to update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.stock
    ) {
      toast.error("All fields are required!", { duration: 3000 });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `/api/v1/update/product/${id}`, // PUT request to update product
        product
      );

      // Check if request was successful
      if (response.status === 200) {
        toast.success("Product updated successfully!", { duration: 3000 });
        navigate("/admin/products"); // redirect to products page
      }
    } catch (error) {
      toast.error("Failed to update product. Please try again.", {
        duration: 3000,
      });
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto max-w-xl shadow-sm    w-full p-5">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product?.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Price */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Product Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-semibold">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product?.stock}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Product Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product?.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Seller Name */}
            <div>
              <label htmlFor="seller" className="block text-sm font-semibold">
                Seller Name
              </label>
              <input
                type="text"
                id="seller"
                name="seller"
                value={product?.seller}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
