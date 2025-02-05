import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // to navigate after a successful POST
import { toast } from "react-hot-toast"; // import React Hot Toast
import AdminLayout from "./AdminLayout";

const ProductForm = () => {
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Submit form data
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
      const response = await axios.post("/api/v1/admin/product", product);

      // Check if request was successful
      if (response.status === 201) {
        toast.success("Product created successfully!", { duration: 3000 });
        navigate("/admin/products"); // redirect to products page
      }
    } catch (error) {
      toast.error("Failed to create product. Please try again.", {
        duration: 3000,
      });
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
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
              value={product.name}
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
              value={product.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
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
              value={product.stock}
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
              value={product.category}
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
              value={product.seller}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
