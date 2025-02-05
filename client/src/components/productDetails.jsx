import React, { useEffect, useState } from "react";
import UseGetProduct from "../hooks/getProduct";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../store/cartSlice";
import MetaData from "./helmet";
import NewReview from "./NewReview";
import Reviews from "./Reviews";
import NotFound from "./NoFound";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { loading, error, product, getProduct } = UseGetProduct();
  const [productImage, setProductImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setProductImage(product.images[0].url);
    }
  }, [product]);

  const setItemToCart = () => {
    if (!product) return;
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.images?.[0]?.url || "/default_product.png",
      quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success("Product Added");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full w-20 h-20 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error || error?.statusCode === 404) {
    return <NotFound />;
  }

  return (
    <>
      <MetaData title={product?.name} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="w-full h-[400px] bg-white rounded-xl shadow-lg overflow-hidden p-4 border border-gray-100 flex items-center justify-center">
              <img
                src={productImage || "/default_product.png"}
                alt="Main product"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {product?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setProductImage(image?.url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ease-in-out ${
                    productImage === image?.url
                      ? "border-purple-600 shadow-md"
                      : "border-gray-200 hover:border-purple-500"
                  }`}
                >
                  <img
                    src={image?.url || "/default_product.png"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product?.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <StarRatings
                  rating={product?.ratings || 0}
                  starRatedColor="#f59e0b"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
                <span className="text-gray-600">
                  ({product?.numOfReviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-semibold text-purple-600 mb-4">
                ${product?.price?.toFixed(2) || 0}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-l bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center bg-gray-50 text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product?.stock || product?.stock <= quantity}
                    className="w-10 h-10 rounded-r bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={setItemToCart}
                  disabled={product?.stock <= 0}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    product?.stock > 0
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
