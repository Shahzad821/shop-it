import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UseGetProduct = () => {
  // State hooks for loading, error, and products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);

  const getProduct = async (id) => {
    setLoading(true);
    setError(null);
    if (id.length > 24 || id.length < 24) {
      setLoading(false);
      return setError("Product not available");
    }

    try {
      const res = await fetch(`/api/v1/product/${id}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch products");
        setError(data.error || "Failed to fetch products");
      }

      setProduct(data);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, product, getProduct };
};

export default UseGetProduct;
