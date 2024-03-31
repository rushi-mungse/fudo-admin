import { ICategory, OptionType } from "@/types";

export const getCategoryOptions = (data: ICategory[]): OptionType[] => {
  return data.map((category) => {
    return { value: category.name, key: category.name };
  });
};
