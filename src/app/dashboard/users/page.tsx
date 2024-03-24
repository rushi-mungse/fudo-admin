"use client";

import { Button, Input, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { getUsers } from "@/api/auth";

import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";

import Link from "next/link";
import { IUser } from "@/types";
import { TableTitle } from "@/components/ui/table-title";
import { ShowUser } from "@/components/drawers/show-user";
import { useState } from "react";

const UserPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const showUserDrawer = () => setOpen(true);
  const closeUserDrawer = () => setOpen(false);
  const onClickHandler = (id: string) => {
    setUserId(id);
    showUserDrawer();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => getUsers(),
  });

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
      render: (text, recorer) => (
        <Link
          href={`/user/${recorer._id}`}
          className="text-n-9 hover:text-active"
        >
          {text}
        </Link>
      ),
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
      render: (_, recoder) => {
        return <h1 className="text-red-500">Delete User</h1>;
      },
    },
  ];

  return (
    <div className="w-full">
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
