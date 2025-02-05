import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full my-3">
      <div className="p-3 rounded-lg shadow-lg">
        {/* Skeleton for Image */}
        <div className="w-full h-44 bg-gray-200 animate-pulse mx-auto rounded-lg"></div>

        <div className="px-3 py-2 flex flex-col justify-between">
          {/* Skeleton for Title */}
          <div className="w-1/2 h-6 bg-gray-200 animate-pulse mb-4"></div>

          {/* Skeleton for Rating */}
          <div className="mt-auto flex items-center">
            <div className="star-ratings flex text-yellow-500">
              {/* Skeleton for Star Icons */}
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-1"></div>
            </div>
            <span id="no_of_reviews" className="ml-2 text-gray-500">
              {/* Skeleton for Review Count */}
              <div className="w-10 h-4 bg-gray-200 animate-pulse inline-block"></div>
            </span>
          </div>

          {/* Skeleton for Price */}
          <div className="w-1/3 h-6 bg-gray-200 animate-pulse mt-2"></div>

          {/* Skeleton for Button */}
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
