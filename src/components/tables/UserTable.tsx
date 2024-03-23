import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";

import Link from "next/link";
import { IUser } from "@/types";
import { TableTitle } from "@/components/ui/table-title";

export const UserTable: ColumnsType<IUser> = [
  {
    title: <TableTitle title="User Id" />,
    dataIndex: "_id",
    key: "_id",
    render: (_id) => (
      <Link href={`/user/${_id}`} className="hover:text-active text-active/80">
        {_id}
      </Link>
    ),
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
