"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  BarsOutlined,
  TeamOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardSidebarLinks = () => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  return (
    <div className="flex justify-between flex-col h-[calc(100vh_-80px)]">
      <Menu
        mode="inline"
        defaultSelectedKeys={[currentPage]}
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

      <Button icon={<LogoutOutlined />} onClick={() => {}}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardSidebarLinks;
