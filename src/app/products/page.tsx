"use client";

import { message } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

import { getProducts } from "@/api/product";
import { IProduct } from "@/types";

import { ProductCard } from "@/components/cards/product-card";
import { Loader } from "@/components/loader";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

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
  const { isLoading } = useQuery({
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

          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {product.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
};

export default ProductPage;
