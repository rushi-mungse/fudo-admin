"use client";

import { Button, Input, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { UserTable } from "@/components/tables/UserTable";
import { getUsers } from "@/api/auth";

const UserPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => getUsers(),
  });

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
    </div>
  );
};
export default UserPage;
