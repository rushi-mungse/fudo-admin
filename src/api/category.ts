import api from "@/api/client";
import { ICategory, IUpdateCategory } from "@/types";

export const postCategory = (data: ICategory) => api.post("/category", data);

export const getsCategory = () => api.get(`/category`);

export const putCategory = (data: IUpdateCategory, categoryId: string) =>
  api.put(`/category/${categoryId}`, data);

export const deleteCategory = (categoryId: string) =>
  api.delete(`/category/${categoryId}`);
