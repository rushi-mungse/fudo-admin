import { ICategory, OptionType } from "@/types";

export const getCategoryOptions = (data: ICategory[]): OptionType[] => {
  return data.map((category) => {
    return { value: category._id, key: category._id, label: category.name };
  });
};

export const getCategoryOptionsWithName = (data: ICategory[]): OptionType[] => {
  return data.map((category) => {
    return { value: category.name, key: category._id, label: category.name };
  });
};

export const getCategoryOptionsWithCategory = (
  data: ICategory[]
): OptionType[] => {
  return data.map((category) => {
    return {
      value: JSON.stringify(category),
      key: category._id,
      label: category.name,
    };
  });
};
