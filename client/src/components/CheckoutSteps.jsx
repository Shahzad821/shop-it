import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

const CheckoutSteps = () => {
  return (
    <div className="flex justify-center mt-5 flex-wrap">
      {/* Shipping (Active) */}
      <Link
        to="/shipping"
        className="float-right mt-2 mt-md-0 w-full md:w-1/4 lg:w-1/5 flex flex-col items-center"
      >
        <div className="step active-step bg-yellow-500 text-white p-2 rounded-md clip-right-side">
          Shipping
        </div>
      </Link>

      {/* Shipping (Inactive) */}
      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 w-full md:w-1/4 lg:w-1/5 opacity-50 cursor-not-allowed flex flex-col items-center"
        disabled
      >
        <div className="step incomplete bg-yellow-200 text-gray-500 p-2 rounded-md clip-left-side">
          Shipping
        </div>
      </Link>

      {/* Confirm Order (Active) */}
      <Link
        to="/confirm_order"
        className="float-right mt-2 mt-md-0 w-full md:w-1/3 lg:w-3/12 flex flex-col items-center"
      >
        <div className="step active-step bg-yellow-500 text-white p-2 rounded-md clip-right-side">
          Confirm Order
        </div>
      </Link>

      {/* Confirm Order (Inactive) */}
      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 w-full md:w-1/3 lg:w-3/12 opacity-50 cursor-not-allowed flex flex-col items-center"
        disabled
      >
        <div className="step incomplete bg-yellow-200 text-gray-500 p-2 rounded-md clip-left-side">
          Confirm Order
        </div>
      </Link>

      {/* Payment (Active) */}
      <Link
        to="/payment_method"
        className="float-right mt-2 mt-md-0 w-full md:w-1/4 lg:w-1/5 flex flex-col items-center"
      >
        <div className="step active-step bg-yellow-500 text-white p-2 rounded-md clip-right-side">
          Payment
        </div>
      </Link>

      {/* Payment (Inactive) */}
      <Link
        to="#!"
        className="float-right mt-2 mt-md-0 w-full md:w-1/4 lg:w-1/5 opacity-50 cursor-not-allowed flex flex-col items-center"
        disabled
      >
        <div className="step incomplete bg-yellow-200 text-gray-500 p-2 rounded-md clip-left-side">
          Payment
        </div>
      </Link>
    </div>
  );
};

export default CheckoutSteps;
