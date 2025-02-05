import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "./helmet";
import CheckoutSteps from "./CheckoutSteps";

const ShippingForm = () => {
  const navigate = useNavigate();

  const countryList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    phoneNo: "",
    postalCode: "",
    country: "Pakistan",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ ...formData }));
    navigate("/confirm-order");
  };
  useEffect(() => {
    setFormData({
      address: shippingInfo.address || "",
      city: shippingInfo.city || "",
      phoneNo: shippingInfo.phoneNo || "",
      postalCode: shippingInfo.postalCode || "",
      country: shippingInfo.country || "Pakistan",
    });
  }, [shippingInfo]);
  return (
    <>
      <MetaData title={"Shipping info"} />
      {/* <CheckoutSteps></CheckoutSteps> */}
      <div className="flex justify-center mt-10 ">
        <div className="w-full max-w-md shadow-md rounded-lg bg-white p-6">
          <h2 className="text-2xl font-semibold mb-6">Shipping Info</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full mt-1 p-1 border rounded-md"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                className="w-full mt-1 p-1 border rounded-md"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone No
              </label>
              <input
                type="tel"
                name="phoneNo"
                className="w-full mt-1 p-1 border rounded-md"
                value={formData.phoneNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="number"
                name="postalCode"
                className="w-full mt-1 p-1 border rounded-md"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                name="country"
                className="w-full mt-1 p-1 border rounded-md"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                {/* <option value="Country1">Country1</option> */}

                {countryList.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingForm;
