import React from "react";
import Sidebar from "../Sidebar";
import {
  FaTachometerAlt,
  FaPlus,
  FaProductHunt,
  FaUsers,
  FaStar,
  FaFirstOrder,
  FaBook,
} from "react-icons/fa"; // Importing React Icons

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: FaTachometerAlt, // Dashboard icon
      label: "Dashboard", // The label text
    },
    {
      path: "/admin/dashboard/new",
      icon: FaPlus, // New Product icon
      label: "New Product ",
    },
    {
      path: "/admin/products",
      icon: FaProductHunt, // New Product icon
      label: " Products ",
    },
    {
      path: "/admin/orders",
      icon: FaBook, // Orders icon
      label: "Orders",
    },
    {
      path: "/admin/users",
      icon: FaUsers, // Users icon
      label: "Users",
    },
    {
      path: "/admin/reviews",
      icon: FaStar, // Reviews icon
      label: "Reviews",
    },
  ];

  return (
    <div>
      <div className="container min-h-screen max-w-5xl w-full mx-auto">
        <h1 className="text-center text-2xl font-medium text-gray-800 font-mono">
          Admin Dashboard
        </h1>
        <div className="flex md:flex-row flex-col justify-between mt-12 items-start ">
          <Sidebar menuItems={menuItems} />

          <div className="w-full md:w-2/3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
