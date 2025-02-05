import React, { useState } from "react";
import MetaData from "./helmet";
import { useSelector } from "react-redux";
import { calculatedPrices } from "../helper/amounts";
import usePlaceOrder from "../hooks/usePlaceOrder";
import usePayment from "../hooks/usePayment";

const PaymentMethod = () => {
  const { placeOrder, loading } = usePlaceOrder();
  const { makePayment, isLoading } = usePayment();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { totalAmount, itemsPrice, shippingAmount, taxAmount } =
    calculatedPrices(cartItems);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentMethod === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalAmount,
        shippingAmount,
        taxAmount,
        paymentMethod: "COD",
        itemsPrice,
        paymentInfo: {
          status: "Not Paid",
        },
      };
      placeOrder(orderData);
      //
    }
    if (paymentMethod === "Card") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalAmount,
        shippingAmount,
        taxAmount,
        itemsPrice,
      };
      makePayment(orderData);
    }
  };
  return (
    <>
      <MetaData title={"Payment Method"} />
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Select Payment Method
            </h2>

            {/* Cash on Delivery Option */}
            <div className="mb-4">
              <input
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={handlePaymentMethodChange}
                checked={paymentMethod === "COD"}
                className="form-radio text-yellow-500 focus:ring-yellow-500"
              />
              <label
                htmlFor="codradio"
                className="ml-2 text-gray-700 font-medium"
              >
                Cash on Delivery
              </label>
            </div>

            {/* Card Payment Option */}
            <div className="mb-6">
              <input
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={handlePaymentMethodChange}
                checked={paymentMethod === "Card"}
                className="form-radio text-yellow-500 focus:ring-yellow-500"
              />
              <label className="ml-2 text-gray-700 font-medium">
                Card - VISA, MasterCard
              </label>
            </div>

            {/* Continue Button */}
            <button
              disabled={!paymentMethod}
              type="submit"
              className=" disabled:cursor-not-allowed w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
            >
              {loading || isLoading ? "Loading..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
