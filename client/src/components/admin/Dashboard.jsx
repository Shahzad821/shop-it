import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout"; // Import AdminLayout
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import axios from "axios"; // Import axios for making API requests
import SalesChart from "../charts/SalesChart"; // Import your sales chart component

const Dashboard = () => {
  // State to store the selected start and end dates
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // Function to fetch data from the server
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    try {
      // Send POST request with startDate and endDate as ISO strings in the query
      const response = await axios.get(
        `/api/v1/admin/get_sales?startDate=${new Date(
          startDate
        ).toISOString()}&endDate=${new Date(endDate).toISOString()}`
      );

      const data = response.data;

      setData(data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminLayout>
      <div className="md:p-4 p-3">
        {/* Date Inputs and Fetch Button */}
        <div className="flex flex-col sm:flex-row items-end space-y-4 sm:space-x-4 sm:space-y-0 mb-5">
          {/* Start Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="font-medium mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="font-medium mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Fetch Button */}
          <button
            onClick={fetchData} // Call fetchData function on click
            className="bg-yellow-500 text-white w-full md:w-auto md:py-3 px-6 py-3 text-sm rounded-md mt-3 sm:mt-0 hover:bg-yellow-600 transition-colors"
          >
            {loading ? "Fetching..." : "Fetch "} {/* Corrected button text */}
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Sales Card */}
          <div className="bg-green-600 text-white p-5 rounded-lg shadow-md">
            <div className="text-center text-2xl">
              Sales
              <br />
              <b>${data?.totalSales.toFixed(2) || 0}</b>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-red-600 text-white p-5 rounded-lg shadow-md">
            <div className="text-center text-2xl">
              Orders
              <br />
              <b>{data?.totalOrders || 0}</b>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <SalesChart salesData={data?.salesData} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
