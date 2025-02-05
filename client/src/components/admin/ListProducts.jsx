import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaImage, FaTrash } from "react-icons/fa";
import MetaData from "../helmet";
import { useNavigate } from "react-router-dom";
import AdminProducts from "../../hooks/getProducts";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";

const ListProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const { products, loading, getProducts, setProducts } = AdminProducts();

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/delete/product/${id}`);
      if (res.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        toast.success("products deleted!");
      }
    } catch (error) {
      toast.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500 transition-all ease-in"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <MetaData title="List Products" />
      <div className="container mx-auto px-4 my-8 min-h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Products
        </h2>

        {/* Search and Show Entries */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-gray-600">
              Show
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
        </div>

        {/* Table with Horizontal Scrolling */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Stock
                </th>
                <th className="px-4 py-2 text-center text-gray-600 border border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200`}
                  >
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {product?._id}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      <p className="line-clamp-2">{product?.name}</p>
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {product?.stock}
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center space-x-2 border border-gray-200">
                      <button
                        className="border-blue-500 border content-center p-2 rounded-sm"
                        onClick={() =>
                          navigate(`/admin/product/${product?._id}`)
                        }
                      >
                        <FaEdit size={15} className="text-blue-500" />
                      </button>
                      <button
                        className="border-green-500 border text-green-500 p-2 rounded-sm"
                        onClick={() =>
                          navigate(
                            `/admin/product/${product?._id}/upload_images`
                          )
                        }
                      >
                        <FaImage size={15} />
                      </button>
                      <button
                        className="border-red-400 border text-red-500 p-2 rounded-sm"
                        onClick={() => handleDelete(product?._id)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-row justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 text-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
