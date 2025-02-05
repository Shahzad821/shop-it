import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import Loader from "./loader";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { logout, loading } = useLogout();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="bg-slate-800 py-1 px-1  shadow-md ">
      <div className=" mx-auto flex items-center justify-between container">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/assets/shopit_logo.png" // Ensure this path is correct
              alt="ShopIT Logo"
              className="w-32 transition-all duration-300 hover:scale-110"
            />
          </Link>
        </div>
        {/* Search Bar */}
        <div className="w-full md:w-1/2 mt-2 md:mt-0  mx-auto p-2 rounded-md hidden md:block">
          <form onSubmit={submitHandler}>
            <div className="flex">
              <input
                onChange={(e) => setKeyword(e.target.value)} // Update keyword state on input change
                type="text"
                className="h-12 md:h-11 py-4 px-3 rounded-md flex-1 md:text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600 placeholder-gray-500 bg-gray-300 md:bg-white"
                placeholder="Search for products..."
                name="keyword"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center justify-end space-x-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white flex items-center hover:text-purple-600 transition-colors"
          >
            <div id="cart" className="relative">
              <FaShoppingCart className="h-6 w-6" />
              <div className="absolute  top-[-12px] right-[-12px] flex items-center justify-center h-5 w-5 rounded-full bg-purple-500 text-white text-xs font-bold">
                {cartItems.length || 0}
              </div>
            </div>
          </Link>
          {/* User Dropdown */}
          {user ? (
            <>
              <div className="relative inline-block dropdown">
                <button
                  className="flex items-center text-white transition-all ease-in hover:border-purple-600 border-2 border-transparent rounded-md px-3 py-1"
                  type="button"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "/assets/default_avatar.jpg"
                    }
                    alt="User Avatar"
                    className="rounded-full w-8 h-8 border-2 border-white"
                  />
                  <p className="ml-2 text-base inline-flex items-center">
                    {user?.role} <MdArrowDropDown />
                  </p>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                    {isAuthenticated && user?.role === "admin" && (
                      <Link
                        className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link
                      className="dropdown-item text-gray-700 py-2 px-4 block hover:bg-[#f6f6f6]"
                      to="/me/orders"
                    >
                      Orders
                    </Link>
                    <Link
                      className="dropdown-item text-gray-700 py-2 px-4 block hover:bg-[#f6f6f6]"
                      to="/me/profile"
                    >
                      Profile
                    </Link>
                    <div
                      className="dropdown-item text-red-500 py-2 px-4 block hover:bg-[#f6f6f6] cursor-pointer"
                      onClick={() => logout()}
                    >
                      {loading ? (
                        <Loader w="5" h={5} color="yellow-500" />
                      ) : (
                        "Logout"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600  transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
