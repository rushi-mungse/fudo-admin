"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  BarsOutlined,
  TeamOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const DashboardSidebarLinks = () => {
  return (
    <div className="flex justify-between flex-col h-[calc(100vh_-80px)]">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <BarChartOutlined />,
            label: "Summary",
          },
          {
            key: "2",
            icon: <TeamOutlined />,
            label: "Users",
          },
          {
            key: "3",
            icon: <BarsOutlined />,
            label: "Products",
          },
          {
            key: "4",
            icon: <SnippetsOutlined />,
            label: "Category",
          },
          {
            key: "5",
            icon: <FileTextOutlined />,
            label: "Orders",
          },
        ]}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "8",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
      />
    </div>
  );
};

export default DashboardSidebarLinks;
