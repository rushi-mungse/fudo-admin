"use client";

import { Avatar, Button, Input, Table, Tag, message } from "antd";
import { useQuery } from "react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { IAttribute, IProduct } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

import debounce from "debounce";
import { dateFormater } from "@/utils/date-formater";
import { getRandomColor } from "@/utils/radndom-color";
import { getProducts } from "@/api/product";

import { FaProductHunt } from "react-icons/fa6";

const PER_PAGE = 6;

const CategoryPage = () => {
  const [product, setProduct] = useState<IProduct[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const { isLoading, refetch, isError } = useQuery({
    queryKey: ["get-categories", queryParams],
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

  const [context, contextHolder] = message.useMessage();

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
        <div className="flex-center">
          <Input
            allowClear
            placeholder="Search product"
            style={{ width: 250 }}
            suffix={<SearchOutlined className="text-gray" />}
            onChange={debounce((e) => {
              setQueryParams((prev) => ({ ...prev, q: e.target.value }));
            }, 500)}
          />
        </div>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => {}}>
          Create Product
        </Button>
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
