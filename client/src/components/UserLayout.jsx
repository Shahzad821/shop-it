import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  FaLock,
  FaUpload,
  FaUser,
  FaUserEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const UserLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/me/profile", icon: FaUser, label: "Profile" },
    { path: "/update-profile", icon: FaUserEdit, label: "Update Profile" },
    { path: "/upload-avatar", icon: FaUpload, label: "Upload Avatar" },
    { path: "/update-password", icon: FaLock, label: "Update Password" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full mx-auto">
      <button
        className="md:hidden fixed top-[72px] right-4 z-50 bg-[#C27AFF] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars className="text-lg" />
      </button>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Menu</p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-[#C27AFF] transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        <Sidebar
          menuItems={menuItems}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex md:flex-row flex-col">
        <div className="hidden md:block md:w-1/3 w-full">
          <div className="sticky top-[65px] bottom-0">
            <Sidebar menuItems={menuItems} />
          </div>
        </div>

        <div className="w-full md:w-2/3 min-h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
