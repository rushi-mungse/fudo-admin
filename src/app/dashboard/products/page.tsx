"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import debounce from "debounce";

import {
  Avatar,
  Button,
  Card,
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
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { getProducts } from "@/api/product";
import { getsCategory } from "@/api/category";

import { IAttribute, ICategory, IProduct } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { FaProductHunt } from "react-icons/fa6";

import { dateFormater } from "@/utils/date-formater";
import { getRandomColor } from "@/utils/radndom-color";
import { getCategoryOptions } from "@/utils/get-categories";
import { CreateProduct } from "@/components/drawers/create-product";

const { Item } = Form;
const { Text } = Typography;

const PER_PAGE = 6;

const ProductPage = () => {
  const [context, contextHolder] = message.useMessage();
  const [product, setProduct] = useState<IProduct[]>([]);
  const [category, setCagegory] = useState<ICategory[]>([]);

  // query params
  const [totalCount, setTotalCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  // create product drawer
  const [isCreateProductDrawerOpen, setCreateProductDrawerOpen] =
    useState(false);
  const createProductDrawerClose = () => setCreateProductDrawerOpen(false);

  // get categories
  useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => getsCategory(),
    onSuccess: ({ data }) => setCagegory(data.categories),
  });

  // get products
  const { isLoading, refetch, isError } = useQuery({
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

  // product table
  const ProductTable: ColumnsType<IProduct> = [
    {
      title: <TableTitle title="Product Id" />,
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <button className="hover:text-active text-active/80">
            ...{_id.slice(20)}
          </button>
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
        <Tag color={getRandomColor()}>{record.category.name}</Tag>
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

      <Card title="Product Filters" style={{ marginBottom: 20 }}>
        <div className="grid grid-cols-4 gap-4 xl:justify-items-center">
          <Input
            className="col-span-3 xl:col-span-1"
            allowClear
            placeholder="Search product"
            style={{ width: "100%", height: 32 }}
            suffix={<SearchOutlined className="text-gray" />}
            onChange={debounce((e) => {
              setQueryParams((prev) => ({ ...prev, q: e.target.value }));
            }, 500)}
          />

          <Space className="col-span-1">
            <Item name="isPublish">
              <Switch
                unCheckedChildren="All"
                checkedChildren="Pub"
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
          </Space>

          <Item
            name={"category"}
            style={{ width: "100%" }}
            className="col-span-3 xl:col-span-1"
          >
            <Select
              allowClear
              onChange={(value) =>
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    category: value,
                  };
                })
              }
              placeholder={"filter category"}
              style={{ width: "100%" }}
              options={getCategoryOptions(category)}
              loading={isLoading}
            />
          </Item>

          <div className="hidden xl:block col-span-1">
            <Button
              className="inline-block w-full"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateProductDrawerOpen(true)}
            >
              Create Product
            </Button>
          </div>

          <div className="xl:hidden col-span-1">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => setCreateProductDrawerOpen(true)}
            />
          </div>
        </div>
      </Card>

      <span className="font-bold text-active block mb-4">Products List</span>
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

      <CreateProduct
        onClose={createProductDrawerClose}
        open={isCreateProductDrawerOpen}
      />
    </div>
  );
};

export default ProductPage;
