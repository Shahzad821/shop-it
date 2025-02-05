import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const location = useLocation();

  // Function to return the appropriate class for each link
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-purple-600 flex items-center px-4 py-2 rounded-lg bg-gray-100 shadow-md transition-all duration-300"
      : "text-gray-600 hover:bg-gray-200 hover:text-purple-600 flex items-center px-4 py-2 rounded-lg transition-all duration-300";
  };

  return (
    <div className="w-64 p-2 md:p-5 space-y-4 overflow-y-auto max-h-screen  left-0 top-0 h-full ">
      <ul className="space-y-4">
        {/* Iterate through the menuItems prop */}
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={getLinkClass(item.path)}
              aria-label={item.label}
            >
              <item.icon className="mr-3 text-xl" /> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
