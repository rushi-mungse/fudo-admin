import { ICategory, OptionType } from "@/types";

export const getCategoryOptions = (data: ICategory[]): OptionType[] => {
  return data.map((category) => {
    return { value: category._id, key: category._id, label: category.name };
  });
};
