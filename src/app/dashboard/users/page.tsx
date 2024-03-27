"use client";

import { Button, Input, Table, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { deleteUser, getUsers } from "@/api/auth";

import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";

import { ErrorType, IUser } from "@/types";
import { TableTitle } from "@/components/ui/table-title";
import { ShowUser } from "@/components/drawers/show-user";
import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { AxiosError } from "axios";

const UserPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const showUserDrawer = () => setOpen(true);
  const closeUserDrawer = () => setOpen(false);
  const onClickHandler = (id: string) => {
    setUserId(id);
    showUserDrawer();
  };

  const { isLoading, data, refetch, isError } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => getUsers(),
  });

  /**
   * Delete user userId : string
   */

  const [context, contextHolder] = message.useMessage();

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

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-user", userId],
    mutationFn: async (userId: string) => deleteUser(userId),
    onSuccess: async () => handleOnSuccess(),
    onError: async (err: AxiosError) => handleOnError(err),
  });

  /**********************/

  const UserTable: ColumnsType<IUser> = [
    {
      title: <TableTitle title="User Id" />,
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <button
            className="hover:text-active text-active/80"
            onClick={() => onClickHandler(_id)}
          >
            {_id}
          </button>
        );
      },
    },
    {
      title: <TableTitle title="Profile Picture" />,
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <Avatar
          src={text}
          alt="food-image"
          size={"large"}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: <TableTitle title="Full Name" />,
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: <TableTitle title="Email" />,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <TableTitle title="Phone Number" />,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => <p>{phoneNumber ? phoneNumber : "-"}</p>,
    },
    {
      title: <TableTitle title="Status" />,
      dataIndex: "status",
      render: (status) => (
        <Tag color={"blue"} key="avail" className="rounded-full px-2">
          {status}
        </Tag>
      ),
    },
    {
      title: <TableTitle title="User Role" />,
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const color = role === "admin" ? "orange" : "green";
        return (
          <Tag color={color} key="avail" className="rounded-full px-2">
            {role}
          </Tag>
        );
      },
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
              onClick={() => {}}
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
              onClick={() => {
                setUserId(record._id);
                mutate(record._id);
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
            placeholder="Search user"
            style={{ width: 250 }}
            suffix={<SearchOutlined className="text-gray" />}
          />
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          // onClick={handleOnClick}
        >
          Create User
        </Button>
      </div>

      <Table
        bordered
        columns={UserTable}
        pagination={{ position: ["bottomRight"] }}
        dataSource={data?.data.users}
        loading={isLoading}
        rowKey="_id"
        className="overflow-x-auto bg-white"
      />

      {userId && (
        <ShowUser
          userId={userId}
          closeUserDrawer={closeUserDrawer}
          open={open}
        />
      )}
    </div>
  );
};
export default UserPage;
