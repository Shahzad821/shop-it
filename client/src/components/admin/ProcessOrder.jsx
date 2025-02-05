import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { useSelector } from "react-redux";

const ProcessOrder = () => {
  const { id } = useParams(); // Get the order ID from the route
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Processing");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/me/orders/${id}`);
      setOrder(response.data);
      setStatus(response.data?.orderStatus || "Processing");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch order details.");
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`/api/v1/admin/order/${id}`, { status });
      toast.success("Order updated!");
      fetchOrderDetails(); // Refresh the order details after status update
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update order status.";
      toast.error(errorMessage);
    }
  };

  const handleGenerateInvoice = (id) => {
    navigate(`/invoice/order/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Order not found. Please check the ID.
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row justify-around space-y-6 lg:space-y-0">
        {/* Order Details Section */}
        <div className="w-full lg:w-2/3 bg-white rounded p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded mb-6 text-sm">
              <tbody>
                <tr className="border-b border-gray-200 bg-gray-300">
                  <th className="px-4 py-2 text-left">ID</th>
                  <td className="px-4 py-2 text-xs">{order?._id}</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left">Order Status</th>
                  <td
                    className={`px-4 py-2 ${
                      order?.orderStatus === "Processing" ||
                      order?.orderStatus === "Shipped"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {order?.orderStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Shipping Info */}
          <h3 className="text-xl font-semibold mb-4">Shipping Info</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded mb-6 text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Name</th>

                  <td className="px-4 py-2">{order?.user?.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Phone No</th>
                  <td className="px-4 py-2">{order?.shippingInfo.phoneNo}</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left">Address</th>
                  <td className="px-4 py-2">
                    {order?.shippingInfo.address}, {order?.shippingInfo.city},{" "}
                    {order?.shippingInfo.postalCode},{" "}
                    {order?.shippingInfo.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Info */}
          <h3 className="text-xl font-semibold mb-4">Payment Info</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded mb-6 text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Status</th>
                  <td
                    className={`px-4 py-2 ${
                      order?.paymentInfo.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order?.paymentInfo.status}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Method</th>
                  <td className="px-4 py-2">{order?.paymentMethod}</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <td className="px-4 py-2">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Items */}
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          {order?.orderItems.map((item) => (
            <div
              key={item.productId}
              className="border-b border-gray-200 pb-4 mb-4 flex items-center"
            >
              <img
                src={item?.image || "../images/default_product.png"}
                alt="Product"
                className="w-12 h-12 object-cover mr-4"
              />
              <div className="flex-1">
                <p className="text-sm line-clamp-2">{item?.name}</p>
              </div>
              <p className="text-sm">${item?.price}</p>
              <p className="text-sm ml-4">{item?.quantity} Piece(s)</p>
            </div>
          ))}
        </div>

        {/* Status and Invoice Section */}
        <div className="w-full lg:w-1/3 bg-white rounded p-4 shadow-md">
          <h4 className="text-lg font-semibold mb-4">Status</h4>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdateStatus}
          >
            Update Status
          </button>

          <h4 className="text-lg font-semibold mt-6 mb-4">Order Invoice</h4>
          <button
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => handleGenerateInvoice(order._id)}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
