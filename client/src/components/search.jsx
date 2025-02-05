import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Search = () => {
  const navigate = useNavigate(); // Initialize the navigate function using useNavigate hook
  const [keyword, setKeyword] = useState(""); // State to track the search input

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`); // Redirect to search results page with keyword
    } else {
      navigate("/"); // Redirect to home page if no keyword is entered
    }
  };

  return (
    <div className="w-full md:hidden block mt-2 md:mt-0 mx-auto p-2 rounded-md sticky -top-1 bg-[#f9f9f9]">
      <form onSubmit={submitHandler}>
        {" "}
        {/* Attach submitHandler to the form */}
        <div className="flex">
          <input
            onChange={(e) => setKeyword(e.target.value)} // Update keyword state on input change
            type="text"
            id="search_field"
            aria-describedby="search_btn"
            className="h-12 md:h-11 py-4 px-3 rounded-md flex-1 md:text-gray-900 placeholder-gray-500 bg-gray-300 md:bg-white"
            placeholder="Search for products..."
            name="keyword"
            aria-label="Search for products"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
