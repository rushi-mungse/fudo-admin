"use client";

import { getProducts } from "@/api/product";
import { ProductCard } from "@/components/cards/product-card";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ErrorType, IProduct } from "@/types";
import { message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";

const PER_PAGE = 6;

const ProductPage = () => {
  const [context, contextHolder] = message.useMessage();
  const [product, setProduct] = useState<IProduct[]>([]);

  // query params
  const [totalCount, setTotalCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  // get products
  const { isLoading, refetch, isError } = useQuery({
    queryKey: ["get-products", queryParams],
    queryFn: async () => {
      const data = queryParams as unknown as Record<string, string>;
      const queryString = new URLSearchParams(data).toString();
      return getProducts(queryString);
    },
    onSuccess: ({ data }) => {
      setTotalCount(data.metadata.totalCount);
      setProduct(data.products);
    },
  });

  const handleOnSuccess = () => {
    context.open({
      type: "success",
      content: "User deleted successfully.",
      duration: 2,
    });
    refetch();
  };

  const handleOnError = (err: AxiosError) => {
    const errors = err.response?.data as unknown as ErrorType;
    context.open({
      type: "error",
      content: errors.error[0].msg,
      duration: 2,
    });
  };

  return (
    <main className="overflow-hidden">
      <Section>
        <div className="container w-[90%] mx-auto relative">
          <div className="relative">
            <Heading
              title="Order Your Favourite Food"
              text="Add to your list and enjoy your favirate food."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {product.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default ProductPage;
