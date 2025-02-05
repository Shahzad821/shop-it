import React from "react";
import StarRatings from "react-star-ratings";

const Reviews = ({ reviews }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-4">Other's Reviews:</h3>
      <hr className="mb-4" />

      {reviews.map((review) => (
        <div
          key={review._id}
          className="review-card my-3 p-4 border border-gray-300 rounded-lg"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar.url
                    : "/assets/default_avatar.jpg"
                }
                alt={review.userName}
                width="50"
                height="50"
                className="rounded-full"
              />
            </div>
            <div className="ml-4 flex-1">
              {/* Star Ratings */}
              <div className="flex mb-2">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1/2px"
                />
              </div>
              <p className="text-gray-700 font-semibold">{`by ${review?.user?.name}`}</p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          </div>
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default Reviews;
