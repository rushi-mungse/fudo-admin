"use client";

import { Menu, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BarChartOutlined,
  FileTextOutlined,
  BarsOutlined,
  TeamOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import { logout } from "@/api/auth";
import { useAuthStore } from "@/lib/store";
import { AxiosError } from "axios";
import { ErrorType } from "@/types";

const DashboardSidebarLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [context, contextHolder] = message.useMessage();

  const handleOnError = (err: AxiosError) => {
    const errors = err.response?.data as unknown as ErrorType;
    context.open({
      type: "error",
      content: errors.error[0].msg,
      duration: 2,
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: async () => {
      clearAuth();
      return router.push("/auth/login");
    },
    onError: (err: AxiosError) => handleOnError(err),
  });

  return (
    <div className="flex justify-between flex-col h-[calc(100vh_-80px)]">
      {contextHolder}
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: "/dashboard/summary",
            icon: <BarChartOutlined />,
            label: <Link href="/dashboard/summary">Summary</Link>,
          },
          {
            key: "/dashboard/users",
            icon: <TeamOutlined />,
            label: <Link href="/dashboard/users">Users</Link>,
          },
          {
            key: "/dashboard/products",
            icon: <BarsOutlined />,
            label: <Link href="/dashboard/products">Products</Link>,
          },
          {
            key: "/dashboard/categories",
            icon: <SnippetsOutlined />,
            label: <Link href="/dashboard/categories">Categories</Link>,
          },
          {
            key: "/dashboard/orders",
            icon: <FileTextOutlined />,
            label: <Link href="/dashboard/orders">Orders</Link>,
          },
        ]}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <button onClick={() => mutate()}>Logout</button>,
          },
        ]}
      />
    </div>
  );
};

export default DashboardSidebarLinks;
