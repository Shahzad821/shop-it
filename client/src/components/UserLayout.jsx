import React from "react";
import Sidebar from "./Sidebar";
import { FaLock, FaUpload, FaUser, FaUserEdit } from "react-icons/fa";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      path: "/me/profile",
      icon: FaUser,
      label: "Profile",
    },
    {
      path: "/update-profile",
      icon: FaUserEdit,
      label: "Update Profile",
    },
    {
      path: "/upload-avatar",
      icon: FaUpload,
      label: "Upload Avatar",
    },
    {
      path: "/update-password",
      icon: FaLock,
      label: "Update Password",
    },
  ];

  return (
    <div>
      <div className=" min-h-[70vh]  w-full mx-auto">
        <h1 className="text-center text-2xl font-medium text-gray-800 font-mono">
          User Settings
        </h1>
        <div className="flex md:flex-row flex-col justify-between mt-12  md:h-[70vh]">
          <Sidebar menuItems={menuItems} />

          <div className=" w-full md:w-2/3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
