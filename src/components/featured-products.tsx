"use client";

import { useQuery } from "react-query";

import { getProducts } from "@/api/product";
import { Loader } from "@/components/loader";
import { IProduct } from "@/types";
import { ProductCard } from "./cards/product-card";

export const FeaturedProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getProducts(`currentPage=1&perPage=6`),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader />
      </div>
    );

  return (
    <div className="container w-[90%] mx-auto relative mt-10 md:mt-16">
      <div className="relative">
        <h1 className="h5">Featured Products</h1>
        <p className="text-n-4">🔥 Top best seller products</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-10">
        {data?.data.products.map((product: IProduct) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};
