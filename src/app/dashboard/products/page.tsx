"use client";

import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { useQuery } from "react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { IAttribute, ICategory, IProduct, OptionType } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

import debounce from "debounce";
import { dateFormater } from "@/utils/date-formater";
import { getRandomColor } from "@/utils/radndom-color";
import { getProducts } from "@/api/product";

import { FaProductHunt } from "react-icons/fa6";
import { getsCategory } from "@/api/category";
import { getCategoryOptions } from "@/utils/get-categories";

const { Item } = Form;
const { Text } = Typography;

const PER_PAGE = 6;

const CategoryPage = () => {
  const [context, contextHolder] = message.useMessage();
  const [product, setProduct] = useState<IProduct[]>([]);
  const [category, setCagegory] = useState<ICategory[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const {} = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => getsCategory(),
    onSuccess: ({ data }) => setCagegory(data.categories),
  });

  const { isLoading, refetch, isError } = useQuery({
    queryKey: ["get-products", queryParams],
    queryFn: async () => {
      const data = queryParams as unknown as Record<string, string>;
      const queryString = new URLSearchParams(data).toString();
      return getProducts(queryString);
    },
    onSuccess: ({ data }) => {
      // setTotalCount(data.metadata.totalCount);
      setProduct(data.products);
    },
  });

  const ProductTable: ColumnsType<IProduct> = [
    {
      title: <TableTitle title="Product Id" />,
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <button className="hover:text-active text-active/80">{_id}</button>
        );
      },
    },
    {
      title: <TableTitle title="Image" />,
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Avatar
          src={text}
          alt="food-image"
          size={"large"}
          icon={<FaProductHunt />}
        />
      ),
    },
    {
      title: <TableTitle title="Product Name" />,
      dataIndex: "name",
      key: "name",
    },

    {
      title: <TableTitle title="Category" />,
      dataIndex: "category.name",
      key: "category-name",
      render: (_, record) => (
        <Tag color={getRandomColor()}>{record.categoryId.name}</Tag>
      ),
    },
    {
      title: <TableTitle title="Status" />,
      dataIndex: "isPublish",
      key: "is-publish",
      render: (isPublish) => (
        <Tag color={isPublish ? "blue" : "red"}>
          {isPublish ? "Published" : "Draft"}
        </Tag>
      ),
    },
    {
      title: <TableTitle title="Attributes" />,
      dataIndex: "attributes",
      key: "attributes",
      render: (attribute) => {
        return attribute.map((a: IAttribute, id: number) => (
          <Tag className="border" color={getRandomColor()} key={id}>
            {a.name}
          </Tag>
        ));
      },
    },
    {
      title: <TableTitle title="Created At" />,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <p>{dateFormater(createdAt)}</p>,
    },
    {
      title: <TableTitle title="Action" />,
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-between">
            <Button
              style={{
                border: "none",
                background: "none",
                outline: "none",
                boxShadow: "none",
              }}
              icon={
                <TiEdit className="text-green-300 hover:text-green-500 size-4 transition-all" />
              }
            />

            <Button
              style={{
                border: "none",
                background: "none",
                outline: "none",
                boxShadow: "none",
              }}
              icon={
                <MdOutlineDelete className="text-red-300 hover:text-red-500 size-4 transition-all" />
              }
            />
          </div>
        );
      },
    },
  ];

  if (isError)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Something Went Wrong !
      </div>
    );

  return (
    <div className="w-full">
      {contextHolder}
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:justify-items-center">
          <Input
            allowClear
            placeholder="Search product"
            style={{ width: 250, height: 32 }}
            suffix={<SearchOutlined className="text-gray" />}
            onChange={debounce((e) => {
              setQueryParams((prev) => ({ ...prev, q: e.target.value }));
            }, 500)}
          />

          <Item name={"category"}>
            <Select
              onChange={(value) =>
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    category: value,
                  };
                })
              }
              placeholder={"filter category wise"}
              style={{ width: 250 }}
              options={getCategoryOptions(category)}
              loading={isLoading}
            />
          </Item>

          <Space>
            <Item name="isPublish">
              <Switch
                defaultChecked={false}
                onChange={(value) => {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      isPublish: value,
                    };
                  });
                }}
              />
            </Item>
            <Text style={{ marginBottom: 22, display: "block" }}>
              Show only published
            </Text>
          </Space>

          <Button
            className="inline-block w-[250px]"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => {}}
          >
            Create Product
          </Button>
        </div>
      </div>

      <Table
        bordered
        columns={ProductTable}
        pagination={{
          total: totalCount,
          current: queryParams.currentPage,
          pageSize: queryParams.perPage,
          onChange: (page) => {
            setQueryParams((prev) => {
              return { ...prev, currentPage: page };
            });
          },
        }}
        dataSource={product}
        loading={isLoading}
        rowKey="_id"
        className="overflow-x-auto bg-white"
      />
    </div>
  );
};
export default CategoryPage;
