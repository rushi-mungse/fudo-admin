"use client";

import React, { useState } from "react";
import { Avatar, Button, Space, Tag, Modal, Radio } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import {
  IAttributeForProduct,
  IPriceConfigurationForProduct,
  IPriceConfigurationValue,
  IProduct,
} from "@/types";
import { getRandomColor } from "@/utils/radndom-color";

const { Group } = Radio;

interface IPriceType {
  label: string;
  value: number;
  name: string;
}
interface IPrices {
  name: string;
  defaultValue: {
    price: number;
    name: string;
  };
  priceType: "base" | "aditional";
  prices: IPriceType[];
}

export const getDefaultValue = (
  data: IPriceConfigurationValue
): [number, string] => {
  let result: number = 1e9;
  let priceKey: string = "";

  Object.entries(data.availableOptions).map(
    ([key, value]: [string, number]) => {
      if (value < result) {
        priceKey = key;
        result = value;
      }
      return;
    }
  );

  return [result, priceKey];
};

export const getPrices = (
  data: IPriceConfigurationForProduct
): [IPrices[], IPriceConfiguration, number] => {
  let result: IPrices[] = [];
  let obj: IPriceConfiguration = {};
  let total = 0;

  Object.entries(data).map(
    ([configurationKey, value]: [string, IPriceConfigurationValue]) => {
      const defaultVal: [number, string] = getDefaultValue(value);
      obj[configurationKey] = {
        name: defaultVal[1],
        value: defaultVal[0],
      };
      total += defaultVal[0];

      result.push({
        priceType: value.priceType,
        name: configurationKey,
        defaultValue: {
          name: defaultVal[1],
          price: defaultVal[0],
        },
        prices: Object.entries(value.availableOptions).map(
          ([key, val]: [string, Number]) => {
            return {
              label: key,
              value: val,
              name: key,
            } as IPriceType;
          }
        ),
      });
      return;
    }
  );

  return [result, obj, total];
};

interface IPriceConfiguration {
  [key: string]: {
    name: string;
    value: number;
  };
}

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const data = getPrices(product.priceConfiguration);
  const prices = data[0];

  const [priceConfiguration, setPriceConfiguration] =
    useState<IPriceConfiguration>(data[1]);
  const [totalPrice, setTotalPrice] = useState<number>(data[2]);

  return (
    <>
      <Modal
        width={700}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="totalPrice" type="text">
            ₹ {totalPrice}
          </Button>,
          <Button
            key="addToCart"
            type="primary"
            icon={<ShoppingCartOutlined />}
          >
            Add To Cart
          </Button>,
        ]}
      >
        <div className="flex items-center justify-center flex-col sm:grid grid-cols-6 border-b border-n-6">
          <div className="flex items-center justify-center col-span-2 border-n-6">
            <Avatar src={product.image} size={200}></Avatar>
          </div>

          <div className="py-5 col-span-4 sm:border-l sm:border-n-6 pl-4">
            <div>
              <h1 className="font-bold tracking-wider text-lg">
                {product.name}
              </h1>
              <p className="text-n-4">{product.description}</p>

              <div className="mt-2">
                <Tag>{product.category.name}</Tag>
              </div>
            </div>

            <div className="space-y-10 mt-4">
              {prices.map((prices: IPrices) => (
                <div key={prices.name}>
                  <h1 className="text-sm font-semibold pb-2">
                    Choose the {prices.name.toLowerCase()}
                  </h1>

                  <Group
                    onChange={(value) => {
                      const data = JSON.parse(value.target.value) as {
                        name: string;
                        price: number;
                      };
                      const prevVlaue = priceConfiguration[prices.name].value;
                      setTotalPrice((prev) => prev - prevVlaue + data.price);
                      setPriceConfiguration((prev) => ({
                        ...prev,
                        [prices.name]: {
                          name: data.name,
                          value: data.price,
                        },
                      }));
                    }}
                    defaultValue={JSON.stringify(prices.defaultValue)}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    {prices.prices.map((price) => {
                      return (
                        <Radio.Button
                          value={JSON.stringify({
                            name: price.name,
                            price: price.value,
                          })}
                          style={{
                            height: 45,
                          }}
                          name={price.name}
                          key={price.name}
                        >
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm"> {price.label}</span>
                            <span className="text-xs">₹ {price.value}</span>
                          </div>
                        </Radio.Button>
                      );
                    })}
                  </Group>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <div className="relative border rounded-lg">
        <div className="absolute bg-active/40 rounded-[50%] h-10 w-10 top-2 right-2 flex items-center justify-center flex-col">
          <span className="text-xs text-pure">{product.discount}%</span>
          <span className="text-[8px] text-pure">Off</span>
        </div>

        <div className="grid flex flex-col sm:grid-cols-2">
          <div className="bg-active/80 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-bl-lg col-span-1 flex w-full items-center justify-center">
            <Avatar src={product.image} style={{ margin: 10 }} size={250} />
          </div>

          <div className="flex items-center justify-center flex-col my-6 sm:col-span-1">
            <Space direction="vertical">
              <h1 className="font-bold tracking-wider text-center">
                {product.name}
              </h1>

              <p className="text-n-4 text-center px-2 text-sm">
                {product.description}
              </p>
            </Space>

            <Space
              style={{
                marginTop: 10,
                width: "100%",
              }}
              direction="vertical"
            >
              <div className="text-center">
                {product.attributes.map((attribute: IAttributeForProduct) => (
                  <Tag key={attribute.name} color={getRandomColor()}>
                    {attribute.name}
                  </Tag>
                ))}
              </div>

              <div className="flex items-center justify-between w-full px-6 mt-3">
                <span className="text-sm font-semibold border px-4 py-1 rounded-full">
                  From ₹ {prices[0].defaultValue.price}
                </span>
                <button
                  className="rounded-full border bg-active/40 px-4 py-1 text-sm hover:bg-active/60 transition-all"
                  onClick={() => showModal()}
                >
                  Choose
                </button>
              </div>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
