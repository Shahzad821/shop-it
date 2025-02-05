import React, { useEffect, useState, useCallback } from "react";
import MetaData from "./helmet";
import Item from "./item";
import Skeleton from "./skeleton";
import CustomPagination from "./CustomPagination";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  // Get `page` and `keyword` from the search params
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";

  const skeletonCount = 10;
  const skeleton = Array.from({ length: skeletonCount });

  // Memoize the getProducts function to avoid re-creation on every render
  const getProducts = useCallback(async (page, keyword) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/products?page=${page}&keyword=${keyword}`
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to fetch products");
      }
      setData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts(page, keyword);
  }, [page, keyword, getProducts]); // Depend only on page and keyword

  return (
    <>
      <MetaData title={"Buy Best Products From Here"} />
      <div className="px-4 md:mt-2">
        <h1
          id="products_heading"
          className="text-2xl text-gray-600 font-semibold"
        >
          {keyword ? `Results for "${keyword}"` : "Latest Products"}
        </h1>
        <div className="min-h-[70vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 ">
            {loading ? (
              skeleton.map((_, index) => <Skeleton key={index} />)
            ) : data?.products?.length > 0 ? (
              data?.products.map((item) => <Item item={item} key={item._id} />)
            ) : (
              <p className="text-xl text-gray-700 font-medium flex items-center justify-center col-span-full">
                No products found
              </p>
            )}
          </div>
        </div>
        {data?.resperpage && data?.filteredProductsCount && (
          <CustomPagination
            resPerPage={data.resperpage}
            filteredProductsCount={data.filteredProductsCount}
          />
        )}
      </div>
    </>
  );
};

export default Home;
