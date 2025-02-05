import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../ProtectedRoute";
import ListProducts from "../admin/ListProducts";
import NewProduct from "../admin/CreateNewProduct";
import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";
import ListOrders from "../admin/ListOrders";
import ProcessOrder from "../admin/ProcessOrder";
import ListUsers from "../admin/ListUser";
import UpdateUser from "../admin/UpdateUser";
import ProductReviews from "../admin/ProductReviews";

const UseAdminRoute = () => {
  return (
    <>
      <Route element={<ProtectedRoute admin={true} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ListProducts />} />
        <Route path="/admin/dashboard/new" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<ListOrders />} />
        <Route path="/admin/orders/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/admin/users/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        <Route
          path="/admin/product/:id/upload_images"
          element={<UploadImages />}
        />
      </Route>
    </>
  );
};

export default UseAdminRoute;
