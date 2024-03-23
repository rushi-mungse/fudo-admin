"use client";

import { Menu } from "antd";
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
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { useAuthStore } from "@/lib/store";

const DashboardSidebarLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: async () => {
      clearAuth();
      return router.push("/auth/login");
    },
  });

  return (
    <div className="flex justify-between flex-col h-[calc(100vh_-80px)]">
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
