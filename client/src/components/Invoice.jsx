import React, { useEffect } from "react";
import { FaPrint } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import useGetOrdersDetails from "../hooks/getOrderDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { convertToTargetDateFormat } from "../helper/FormateDate";

const Invoice = () => {
  const { getOrderDetail, loading, orderDetail } = useGetOrdersDetails();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getOrderDetail?.(id);
  }, [id]);

  const downloadInvoice = async () => {
    const element = document.getElementById("order-invoice");
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${orderDetail?._id || "invoice"}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="my-5">
      {/* Download Invoice Button */}
      <div className="flex justify-center mb-5">
        <button
          onClick={downloadInvoice}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 inline-flex gap-2 items-center"
        >
          <FaPrint /> Download Invoice
        </button>
      </div>

      {/* Invoice Section */}
      <div
        id="order-invoice"
        className="p-5 border border-gray-400 max-w-4xl mx-auto w-full bg-white shadow-lg rounded-md"
      >
        {/* Header */}
        <header className="mb-8">
          <div id="logo" className="text-center mb-5">
            <img
              src="/assets/invoice-logo.png"
              alt="Company Logo"
              className="w-36 mx-auto"
            />
          </div>
          <h1
            className="text-2xl text-center font-bold text-gray-600 border-t border-b border-gray-400 py-2"
            style={{
              backgroundImage: "url('/assets/dimension.png')",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              backgroundSize: "contain",
            }}
          >
            INVOICE #{" "}
            <span className="text-base md:text-2xl">{orderDetail?._id}</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {/* User Info */}
            <div id="project">
              <div>
                <span className="text-gray-500 font-medium mr-2">Name:</span>{" "}
                {user?.name}
              </div>
              <div>
                <span className="text-gray-500 font-medium mr-2">Email:</span>{" "}
                {user?.email}
              </div>
              <div>
                <span className="text-gray-500 font-medium mr-2">Phone:</span>{" "}
                {orderDetail?.shippingInfo?.phoneNo}
              </div>
              <div className="break-words">
                <span className="text-gray-500 font-medium mr-2">Address:</span>{" "}
                {orderDetail?.shippingInfo?.address},{" "}
                {orderDetail?.shippingInfo?.city},{" "}
                {orderDetail?.shippingInfo?.postalCode},{" "}
                {orderDetail?.shippingInfo?.country}
              </div>
              <div>
                <span className="text-gray-500 font-medium mr-2">Date:</span>{" "}
                {convertToTargetDateFormat(orderDetail?.createdAt)}
              </div>
              <div>
                <span className="text-gray-500 font-medium mr-2">Status:</span>{" "}
                <span
                  className={`${
                    orderDetail?.paymentInfo?.status?.toLowerCase() !== "paid"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {orderDetail?.paymentInfo?.status || "Unknown"}
                </span>
              </div>
            </div>
            {/* Company Info */}
            <div id="company" className="text-right">
              <div>ShopIT</div>
              <div>455 Foggy Heights, AZ 85004, US</div>
              <div>(602) 519-0450</div>
              <div>
                <a
                  href="mailto:info@shopit.com"
                  className="text-blue-500 hover:underline"
                >
                  info@shopit.com
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-5">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">ID</th>
                  <th className="border px-4 py-2 text-left">NAME</th>
                  <th className="border px-4 py-2">PRICE</th>
                  <th className="border px-4 py-2">QTY</th>
                  <th className="border px-4 py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail?.orderItems?.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item?.product}</td>
                    <td className="border px-4 py-2 text-sm">
                      <p className="line-clamp-2 break-words">{item?.name}</p>
                    </td>
                    <td className="border px-4 py-2">
                      ${item?.price?.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{item?.quantity}</td>
                    <td className="border px-4 py-2">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-right font-semibold"
                  >
                    SUBTOTAL
                  </td>
                  <td className="border px-4 py-2">
                    ${orderDetail?.itemsPrice?.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-right font-semibold"
                  >
                    TAX 15%
                  </td>
                  <td className="border px-4 py-2">
                    ${orderDetail?.taxAmount?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-right font-semibold"
                  >
                    SHIPPING
                  </td>
                  <td className="border px-4 py-2">
                    ${orderDetail?.shippingAmount?.toFixed(2)}
                  </td>
                </tr>
                <tr className="font-bold bg-gray-200">
                  <td colSpan="4" className="border px-4 py-2 text-right">
                    GRAND TOTAL
                  </td>
                  <td className="border px-4 py-2">
                    ${orderDetail?.totalAmount?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notices */}
          <div id="notices" className="text-gray-500 text-sm mt-5">
            <div className="font-medium">NOTICE:</div>
            <div>
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t mt-5 pt-2">
          Invoice was created on a computer and is valid without the signature.
        </footer>
      </div>
    </div>
  );
};

export default Invoice;
