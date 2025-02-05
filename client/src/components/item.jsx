import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
const Item = ({ item }) => {
  return (
    <div className="w-full my-3 overflow-hidden  bg-white h-fit shadow-md rounded-md border-2 border-gray-500">
      <div className=" rounded-lg shadow-lg">
        <img
          className="mx-auto object-contain h-40 w-40"
          src={item?.images[0]?.url || "/assets/default_product.png"}
          alt={`Product ${item}`}
        />
        <div className="px-3 py-2 flex flex-col justify-between ">
          <h5 className="text-lg font-medium">
            {/* Replacing <a> with <Link> for React Router */}
            <Link
              to={`/product/${item?._id}`}
              className="text-black hover:text-purple-600 font-medium  "
            >
              <p className="text-ellipsis line-clamp-2 text-sm tracking-tight leading-5">
                {item?.name}
              </p>
            </Link>
          </h5>
          <div className="ratings mt-auto flex items-center">
            <StarRatings
              rating={item?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="1/2px"
            />
            <span id="no_of_reviews" className="ml-2 text-gray-500">
              {item?.numOfReviews}
            </span>
          </div>
          <p className="card-text mt-2 text-md font-medium truncate">
            ${item?.price}
          </p>

          <Link
            to={`/product/${item?._id}`} // Link to the correct product details page
            id="view_btn"
            className="bg-purple-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-purple-400 text-center text-xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
