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
}
interface IPrices {
  name: string;
  defaultValue: number;
  priceType: "base" | "aditional";
  prices: IPriceType[];
}

export const getDefaultValue = (data: IPriceConfigurationValue): number => {
  let result: number = 1e9;
  Object.entries(data.availableOptions).map(
    ([key, value]: [string, number]) => {
      result = Math.min(result, value);
    }
  );

  return result;
};

export const getPrices = (data: IPriceConfigurationForProduct): IPrices[] => {
  let result: IPrices[] = [];

  Object.entries(data).map(
    ([configurationKey, value]: [string, IPriceConfigurationValue]) => {
      result.push({
        priceType: value.priceType,
        name: configurationKey,
        defaultValue: getDefaultValue(value),
        prices: Object.entries(value.availableOptions).map(
          ([key, val]: [string, Number]) => {
            return {
              label: key,
              value: val,
            } as IPriceType;
          }
        ),
      });
    }
  );

  return result;
};

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <>
      <Modal
        width={600}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="totalPrice" type="text">
            ₹ {totalPrice}
          </Button>,
          <Button key="close" onClick={() => handleCancel()}>
            Close
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
        <div className="flex items-center justify-center flex-col sm:grid grid-cols-2 mb-2">
          <div className="flex items-center justify-center col-span-1">
            <Avatar src={product.image} size={200}></Avatar>
          </div>

          <div className="py-5 sm:py-0 col-span-1">
            <div>
              <h1 className="font-bold tracking-wider text-lg">
                {product.name}
              </h1>
              <p className="text-n-4">{product.description}</p>
            </div>

            <div className="space-y-10 mt-4">
              {getPrices(product.priceConfiguration).map((prices: IPrices) => (
                <div key={prices.name}>
                  <h1 className="text-sm font-semibold pb-2">
                    Choose the {prices.name.toLowerCase()}
                  </h1>

                  <Group
                    onChange={(value) => {
                      setTotalPrice((prev) => prev + value.target.value);
                    }}
                    options={prices.prices}
                    defaultValue={prices.defaultValue}
                    optionType="button"
                    buttonStyle="solid"
                  />
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
                  From ₹ 100
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
