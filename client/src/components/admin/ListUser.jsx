import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MetaData from "../helmet";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";

const ListUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch users
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/users");

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/admin/user/delete/${id}`);
      if (res.status === 204) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response.data.message || error.message || "Error deleting user."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <MetaData title="List Users" />
      <div className="  mx-auto px-4 my-8 min-h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Users
        </h2>

        {/* Search and Show Entries */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4  sm:space-y-0">
          <div className="flex items-center ">
            <label htmlFor="itemsPerPage" className="text-gray-600">
              Show
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto" style={{ overflowX: "scroll" }}>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">
                  Role
                </th>
                <th className="px-4 py-2 text-center text-gray-600 border border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200`}
                  >
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {user._id}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center space-x-2 border border-gray-200">
                      <button
                        className="border-blue-500 border content-center p-2 rounded-sm"
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                      >
                        <FaEdit size={15} className="text-blue-500" />
                      </button>
                      <button
                        className="border-red-400 border text-red-500 p-2 rounded-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-row justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 text-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListUsers;
