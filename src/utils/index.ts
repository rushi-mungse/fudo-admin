import {
  IAttributeForProduct,
  IPriceConfigurationForProduct,
  IPriceConfigurationValue,
} from "@/types";

interface Attributes {
  [key: string]: string;
}

interface AvailableOptions {
  [key: string]: number;
}

export const getAttributes = (data: Attributes) => {
  const res = Object.entries(data).map(([key, value]: [string, string]) => {
    return { value: value, name: key };
  });
  return res;
};

export const getPriceConfiguration = (priceConfiguration: Attributes) => {
  let obj: IPriceConfigurationForProduct = {};

  Object.entries(priceConfiguration).map(([key, value]) => {
    const availableOptions = value as unknown as AvailableOptions;
    const data = JSON.parse(key) as {
      configurationKey: string;
      priceType: "base" | "aditional";
    };
    obj[data.configurationKey] = {
      priceType: data.priceType,
      availableOptions,
    };
  });

  return obj;
};

export const getPriceConfigurationInitialValue = (
  data: IPriceConfigurationForProduct
) => {
  const obj: {
    [key: string]: {};
  } = {};

  Object.entries(data).map(
    ([key, value]: [string, IPriceConfigurationValue]) => {
      obj[
        JSON.stringify({
          configurationKey: key,
          priceType: value.priceType,
        })
      ] = value.availableOptions;
    }
  );

  return obj;
};

export const getAttributesInitialValue = (data: IAttributeForProduct[]) => {
  const obj: {
    [key: string]: string;
  } = {};

  data.map((attribute) => (obj[attribute.name] = attribute.value));
  return obj;
};
