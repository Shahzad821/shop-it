import React, { useEffect } from "react";
import MetaData from "./helmet";
import { Link, useParams } from "react-router-dom";
import useGetOrdersDetails from "../hooks/getOrderDetails";
import { convertToTargetDateFormat } from "../helper/FormateDate";
import { useSelector } from "react-redux";
import { FaPrint } from "react-icons/fa6";
const OrderDetails = () => {
  const { getOrderDetail, loading, orderDetail } = useGetOrdersDetails();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getOrderDetail(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div
          className={`animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500 transition-all ease-in`}
        ></div>
      </div>
    );
  }

  return (
    <>
      <MetaData title="Order Details" />
      <div className="flex justify-center container px-1 ">
        <div className="w-full max-w-4xl mt-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Order Details</h3>
            <Link
              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              to={`/invoice/order/${orderDetail?._id}`}
            >
              <FaPrint /> Invoice
            </Link>
          </div>

          {/* Order Details */}
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <tbody>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">ID</th>
                <td className="border px-4 py-2">
                  {orderDetail?._id || "Order ID"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Status
                </th>
                <td
                  className={`border px-4 py-2 ${
                    orderDetail?.orderStatus != "Delivered"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-bold`}
                >
                  {orderDetail?.orderStatus || "Delivered"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">Date</th>
                <td className="border px-4 py-2">
                  {convertToTargetDateFormat(orderDetail?.createdAt) ||
                    "October 1, 2023, 10:30 AM"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Shipping Info */}
          <h3 className="text-xl font-bold mt-10 mb-4">Shipping Info</h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <tbody>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">Name</th>
                <td className="border px-4 py-2">{user?.name || "John Doe"}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Phone No
                </th>
                <td className="border px-4 py-2">
                  {orderDetail?.shippingInfo?.phoneNo || "+1 123-456-7890"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Address
                </th>
                <td className="border px-4 py-2">
                  {`${orderDetail?.shippingInfo?.address || "123 Main Street"}, 
   ${orderDetail?.shippingInfo?.city || "City"}, 
   ${orderDetail?.shippingInfo?.postalCode || "Postal Code"}, 
   ${orderDetail?.shippingInfo?.country || "Country"}`}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment Info */}
          <h3 className="text-xl font-bold mt-10 mb-4">Payment Info</h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <tbody>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Status
                </th>
                <td
                  className={`border px-4 py-2 ${
                    orderDetail.paymentInfo?.status !== "paid"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-bold`}
                >
                  {orderDetail?.paymentInfo?.status || "PAID"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Method
                </th>
                <td className="border px-4 py-2">
                  {orderDetail?.paymentMethod || "Credit Card"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Stripe ID
                </th>
                <td className="border px-4 py-2">
                  {orderDetail?.paymentInfo?.id || "Nill"}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">
                  Amount Paid
                </th>
                <td className="border px-4 py-2">
                  {`$${orderDetail?.totalAmount?.toFixed(2) || "250.00"}`}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Order Items */}
          <h3 className="text-xl font-bold mt-10 mb-4">Order Items:</h3>
          <hr />
          <div className="my-6">
            {orderDetail?.orderItems?.map((item, index) => (
              <div className="flex items-center space-x-4 my-4" key={index}>
                <div className="w-1/5">
                  <img
                    src={item.image}
                    alt="Product Name"
                    className="w-16 h-16 rounded-md"
                  />
                </div>
                <div className="w-2/5">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-600 hover:underline text-sm  line-clamp-2 md:line-clamp-none"
                  >
                    {item.name || "  Product Name"}
                  </Link>
                </div>
                <div className="w-1/5">
                  <p className="text-sm">${item.price}</p>
                </div>
                <div className="w-1/5 ">
                  <p className="text-sm truncate">{`${item.quantity} Piece(s)`}</p>
                </div>
              </div>
            ))}
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
