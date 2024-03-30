"use client";

import { Button, Input, Table, Tag, message } from "antd";
import { useQuery } from "react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { IAttribute, ICategory } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

import debounce from "debounce";
import { getsCategory } from "@/api/category";
import { dateFormater } from "@/utils/date-formater";
import { getRandomColor } from "@/utils/radndom-color";

const PER_PAGE = 6;

const CategoryPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

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
      return getsCategory(queryString);
    },
    onSuccess: ({ data }) => {
      // setTotalCount(data.metadata.totalCount);
      setCategories(data.categories);
    },
  });

  const [context, contextHolder] = message.useMessage();

  const CategoryTable: ColumnsType<ICategory> = [
    {
      title: <TableTitle title="Category Id" />,
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <button className="hover:text-active text-active/80">{_id}</button>
        );
      },
    },
    {
      title: <TableTitle title="Category Name" />,
      dataIndex: "name",
      key: "name",
      render: (name) => <Tag color={getRandomColor()}>{name}</Tag>,
    },
    {
      title: <TableTitle title="Attribute" />,
      dataIndex: "attribute",
      key: "attribute",
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
            placeholder="Search category"
            style={{ width: 250 }}
            suffix={<SearchOutlined className="text-gray" />}
            onChange={debounce((e) => {
              setQueryParams((prev) => ({ ...prev, q: e.target.value }));
            }, 500)}
          />
        </div>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => {}}>
          Create Category
        </Button>
      </div>

      <Table
        bordered
        columns={CategoryTable}
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
        dataSource={categories}
        loading={isLoading}
        rowKey="_id"
        className="overflow-x-auto bg-white"
      />
    </div>
  );
};
export default CategoryPage;
