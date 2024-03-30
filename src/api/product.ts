import api from "@/api/client";
import { IProduct } from "@/types";

export const createProduct = (data: IProduct) => api.post("/product", data);

export const getProducts = (queryString: string) =>
  api.get(`/product?${queryString}`);

export const putProduct = (data: IProduct, productId: string) =>
  api.put(`/product/${productId}`, data);

export const deleteProduct = (productId: string) =>
  api.delete(`/product/${productId}`);

export const getProduct = (productId: string) =>
  api.get(`/product/${productId}`);
