import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLock, FaUpload, FaUser, FaUserEdit } from "react-icons/fa";

const Sidebar = ({ menuItems, onNavigate }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="w-full md:w-64 p-4 h-full">
      {!isAdmin && (
        <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase px-3 mb-2">
          Account
        </p>
      )}
      <ul className="space-y-1">
        {menuItems
          .filter((i) => i.path !== "/update-password")
          .map((item, index) => (
            <li key={index}>
              <Link
                onClick={onNavigate}
                to={item.path}
                aria-label={item.label}
                className={`relative flex items-center gap-3 px-3 py-[10px] rounded-xl transition-all duration-200 group
                ${
                  isActive(item.path)
                    ? "bg-purple-200 text-purple-600"
                    : "text-gray-500 hover:bg-purple-200 hover:text-purple-600"
                }`}
              >
                {/* Active left bar */}
                {isActive(item.path) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#C27AFF] rounded-r-full" />
                )}

                {/* Icon Box */}
                <div
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center border flex-shrink-0 transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-[#C27AFF] border-[#C27AFF] text-white"
                    : "bg-white border-gray-200 text-gray-400 group-hover:bg-[#C27AFF] group-hover:border-[#C27AFF] group-hover:text-white"
                }`}
                >
                  <item.icon className="text-sm" />
                </div>

                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
      </ul>
      {/* Divider */}
      <div className="my-3 border-t border-gray-100" />
      {/* Security Section */}
      {!isAdmin && (
        <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase px-3 mb-2">
          Security
        </p>
      )}
      <ul className="space-y-1">
        {menuItems
          .filter((i) => i.path === "/update-password")
          .map((item, index) => (
            <li key={index}>
              <Link
                onClick={onNavigate}
                to={item.path}
                aria-label={item.label}
                className={`relative flex items-center gap-3 px-3 py-[10px] rounded-xl transition-all duration-200 group
                ${
                  isActive(item.path)
                    ? "bg-purple-200 text-purple-600"
                    : "text-gray-500 hover:bg-purple-200 hover:text-purple-600"
                }`}
              >
                {isActive(item.path) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#C27AFF] rounded-r-full" />
                )}
                <div
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center border flex-shrink-0 transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-[#C27AFF] border-[#C27AFF] text-white"
                    : "bg-white border-gray-200 text-gray-400 group-hover:bg-[#C27AFF] group-hover:border-[#C27AFF] group-hover:text-white"
                }`}
                >
                  <item.icon className="text-sm" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
