import React from "react";
import { Route } from "react-router-dom";
import Home from "../home";
import ProductDetails from "../productDetails";
import LoginPage from "../../pages/LoginPage";
import Signup from "../../pages/Signup";
import ForgotPassword from "../ForgetPassword";
import ResetPassword from "../ResetPassword";
import Cart from "../Cart";
import ProtectedRoute from "../ProtectedRoute";
import MyOrders from "../MyOrders";
import OrderDetails from "../OrderDetails";
import Invoice from "../Invoice";
import ShippingForm from "../ShippingForm";
import PaymentMethod from "../Payment";
import ConfirmOrder from "../ConfirmOrder";
import AboutME from "../AboutMe";
import UpdateProfile from "../UpdateProfile";
import AvatarUpload from "../UploadAvatar";
import UpdatePassword from "../UpdatePssword";

const UserRoute = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<Cart />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/me/orders" element={<MyOrders />} />
        <Route path="/me/orders/:id" element={<OrderDetails />} />
        <Route path="/invoice/order/:id" element={<Invoice />} />
        <Route path="/shipping" element={<ShippingForm />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/me/profile" element={<AboutME />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/upload-avatar" element={<AvatarUpload />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>
    </>
  );
};

export default UserRoute;
