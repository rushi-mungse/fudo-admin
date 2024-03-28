"use client";

import { Button, Input, Table, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { deleteUser, getUsers } from "@/api/auth";

import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";

import { ErrorType, IGetUsers, IUser } from "@/types";
import { TableTitle } from "@/components/ui/table-title";
import { ShowUser } from "@/components/drawers/show-user";
import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { AxiosError } from "axios";
import { EditUser } from "@/components/drawers/edit-user";
import { CreateUser } from "@/components/drawers/create-user";
import debounce from "debounce";

const PER_PAGE = 6;

const UserPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const showUserDrawer = () => setOpen(true);
  const closeUserDrawer = () => setOpen(false);
  const onClickHandler = (id: string) => {
    setUserId(id);
    showUserDrawer();
  };

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [isEditUserDrawerOpen, setEditUserDrawerOpen] = useState(false);
  const editUserDrawerOpen = () => setEditUserDrawerOpen(true);
  const editUserDrawerClose = () => setEditUserDrawerOpen(false);
  const onEditUserHandler = (id: string) => {
    setEditUserId(id);
    editUserDrawerOpen();
  };

  const [isCreateUserDrawerOpen, setCreateUserDrawerOpen] = useState(false);
  const createUserDrawerClose = () => setCreateUserDrawerOpen(false);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const { isLoading, refetch, isError } = useQuery({
    queryKey: ["get-users", queryParams],
    queryFn: async () => {
      const data = queryParams as unknown as Record<string, string>;
      const queryString = new URLSearchParams(data).toString();
      return getUsers(queryString);
    },
    onSuccess: ({ data }: IGetUsers) => {
      setTotalCount(data.metadata.totalCount);
      setUsers(data.users);
    },
  });

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

  const { mutate, isLoading: isPending } = useMutation({
    mutationKey: ["delete-user", userId],
    mutationFn: async (userId: string) => deleteUser(userId),
    onSuccess: async () => handleOnSuccess(),
    onError: async (err: AxiosError) => handleOnError(err),
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
              onClick={() => onEditUserHandler(record._id)}
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
              loading={isPending}
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
            onChange={debounce((e) => {
              setQueryParams((prev) => ({ ...prev, q: e.target.value }));
            }, 500)}
          />
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setCreateUserDrawerOpen(true)}
        >
          Create User
        </Button>
      </div>

      <Table
        bordered
        columns={UserTable}
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
        dataSource={users}
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

      {editUserId && (
        <EditUser
          userId={editUserId}
          onClose={editUserDrawerClose}
          open={isEditUserDrawerOpen}
        />
      )}

      <CreateUser
        onClose={createUserDrawerClose}
        open={isCreateUserDrawerOpen}
      />
    </div>
  );
};
export default UserPage;
