"use client";

import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import debounce from "debounce";

import {
  Avatar,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { deleteProduct, getProducts } from "@/api/product";
import { getsCategory } from "@/api/category";

import { ErrorType, IAttribute, ICategory, IProduct } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { FaProductHunt } from "react-icons/fa6";

import { dateFormater } from "@/utils/date-formater";
import { getRandomColor } from "@/utils/radndom-color";
import { getCategoryOptions } from "@/utils/get-categories";
import { CreateProduct } from "@/components/drawers/create-product";
import { AxiosError } from "axios";
import { EditProduct } from "@/components/drawers/edit-product";

const { Item } = Form;

const PER_PAGE = 5;

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

  // edit product drawer
  const [isEditProductDrawerOpen, setEditProductDrawerOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string>("");
  const editProductDrawerClose = () => setEditProductDrawerOpen(false);

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

  // delete product
  const { mutate, isLoading: isPending } = useMutation({
    mutationKey: ["delete-product", Date.now()],
    mutationFn: async (productId: string) => deleteProduct(productId),
    onSuccess: async () => handleOnSuccess(),
    onError: async (err: AxiosError) => handleOnError(err),
  });

  const handleOnSuccess = () => {
    context.open({
      type: "success",
      content: "User deleted successfully.",
      duration: 2,
    });
    refetch();
  };

  const handleOnError = (err: AxiosError) => {
    const errors = err.response?.data as unknown as ErrorType;
    context.open({
      type: "error",
      content: errors.error[0].msg,
      duration: 2,
    });
  };

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
      title: <TableTitle title="Discount" />,
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <span>{discount}%</span>,
    },
    {
      title: <TableTitle title="Prep. Time" />,
      dataIndex: "preparationTime",
      key: "time",
      render: (time) => <span>{time} min</span>,
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
              onClick={() => {
                setEditProductId(record._id);
                setEditProductDrawerOpen(true);
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
              onClick={() => mutate(record._id)}
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
        <Form className="grid grid-cols-4 gap-4 xl:justify-items-center">
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
              onChange={(value) => {
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    category: value,
                  };
                });
              }}
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
        </Form>
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

      <Drawer
        onClose={editProductDrawerClose}
        title="Edit Product"
        open={isEditProductDrawerOpen}
        width={600}
        style={{ background: "#FAFAFA" }}
      >
        <EditProduct productId={editProductId} />
      </Drawer>
    </div>
  );
};

export default ProductPage;
