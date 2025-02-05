import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "./helmet";
import { calculatedPrices } from "../helper/amounts";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, totalAmount, shippingAmount, taxAmount } =
    calculatedPrices(cartItems);

  return (
    <>
      <MetaData title={"Confirm-order  info"} />
      <div className="flex justify-between mt-5 min-h-[70vh] flex-col md:flex-row container px-2">
        <div className="w-full md:w-3/6 ">
          <h4 className="text-xl mb-3 font-semibold font-mono">
            Shipping Info
          </h4>
          <div className="ml-5">
            <p className="text-base">
              <span className="font-semibold mr-2 ">Name:</span> {user?.name}
            </p>
            <p className="text-base my-3">
              <span className="font-semibold  mr-2">Phone:</span>{" "}
              {shippingInfo?.phoneNo}
            </p>
            <p className="text-base">
              <span className="font-semibold  mr-2  ">Address:</span>
              {shippingInfo.address},{shippingInfo.city},
              {shippingInfo.postalCode},{shippingInfo.country}
            </p>
          </div>

          <hr className="my-4" />
          <h4 className="text-xl mt-4 font-semibold text-gray-900">
            Your Cart Items:
          </h4>
          <hr className="my-4" />

          {/* Cart Item */}
          <div className=" my-1">
            {cartItems.map((item, index) => (
              <div
                className="flex border-t border-b items-center justify-center my-2"
                key={index}
              >
                <div className=" w-1/6">
                  <img
                    src={item.image}
                    alt="Laptop"
                    className=" size-16   object-cover"
                  />
                </div>

                <div className="w-3/6 text-xs line-clamp-2 md:text-sm mx-2 tracking-tight leading-tight text-center">
                  <Link to={"/product/:id"} className="text-blue-600">
                    {item.name}
                  </Link>
                </div>

                <div className="w-2/6 text-xs md:text-base text-center">
                  <p>
                    {Math.round(item.quantity)} x {Math.round(item.price)} =
                    <b>{Math.round(item.quantity * item.price)}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-2/6 my-4">
          <div
            id="order_summary"
            className=" p-4 shadow border-gray-300 border rounded-lg md:w-[80%] mx-auto"
          >
            <h4 className="text-xl">Order Summary</h4>
            <hr className="my-2" />
            <p className="my-2 flex justify-between items-center">
              Subtotal:{" "}
              <span className="font-semibold text-sm md:-text-base">
                ${itemsPrice}
              </span>
            </p>
            <p className="my-2 flex justify-between items-center">
              Shipping:{" "}
              <span className="font-semibold text-sm md:-text-base">
                ${shippingAmount}
              </span>
            </p>
            <p className="my-2 flex justify-between items-center">
              Tax:{" "}
              <span className="font-semibold text-sm md:-text-base">
                ${taxAmount}
              </span>
            </p>

            <hr className="my-2 flex justify-between items-center" />
            <p className="my-2 text-sm md:-text-base flex justify-between items-center">
              Total:{" "}
              <span className="font-semibold text-base ">${totalAmount}</span>
            </p>

            <hr className="my-2 " />
            <button
              onClick={() => navigate("/payment-method")}
              className="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
