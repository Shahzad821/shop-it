import React, { useEffect, useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import MetaData from "./helmet";
import useGetOrders from "../hooks/getOrders";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

const MyOrders = () => {
  const { allOrders, loading, getOrders } = useGetOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Check for order_success in query params, clear cart, and redirect if needed.
  useEffect(() => {
    const order_success = searchParams.get("order_success");
    console.log(order_success);
    if (order_success) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [searchParams, dispatch, navigate]);

  useEffect(() => {
    getOrders();
  }, []);

  // Filter orders based on search term.
  const filteredOrders =
    allOrders?.filter(
      (order) =>
        order?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.paymentInfo?.status
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order?.orderStatus?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Pagination logic.
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes ensuring boundaries.
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Update search term and reset page to 1 on change.
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Update items per page and reset page to 1 on change.
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500 transition-all ease-in"></div>
      </div>
    );
  }

  return (
    <>
      <MetaData title="My Orders" />
      <div className="container mx-auto px-4 my-8 min-h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Orders
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
              aria-label="Select number of entries per page"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search by ID, Status"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
            aria-label="Search orders"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Order Status
                </th>
                <th className="px-4 py-2 text-center text-gray-600 border border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <tr
                    key={order._id || index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200`}
                  >
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {order._id}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-2 border border-gray-200 text-sm ${
                        order.paymentInfo.status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentInfo.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {order.orderStatus}
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center space-x-2 border border-gray-200">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-sm"
                        onClick={() => navigate(`/me/orders/${order._id}`)}
                        aria-label="View Order"
                        title="View Order"
                      >
                        <FaEye size={15} />
                      </button>
                      <button
                        className="text-white bg-green-600 p-2 rounded-sm"
                        onClick={() => navigate(`/invoice/order/${order._id}`)}
                        aria-label="Download Invoice"
                        title="Download Invoice"
                      >
                        <FaDownload size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
            aria-label="Previous Page"
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
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
