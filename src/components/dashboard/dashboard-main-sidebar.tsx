"use client";

import { Button, Layout } from "antd";
import { useState } from "react";
const { Sider } = Layout;

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LogoLink } from "@/components/logo-link";
import DashboardSidebarLinks from "./dashboard-sidebar-links";

export const DashboardMainSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      style={{
        backgroundColor: "#ffffff",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="hidden md:block overflow-hidden"
    >
      <div className="flex items-center justify-between my-2 px-4">
        {!collapsed && <LogoLink />}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <DashboardSidebarLinks />
    </Sider>
  );
};
