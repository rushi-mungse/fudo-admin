"use client";

import { Layout } from "antd";
const { Sider } = Layout;

import { LogoLink } from "@/components/logo-link";
import DashboardSidebarLinks from "@/components/dashboard/dashboard-sidebar-links";

export const DashboardMobileSidebar = () => {
  return (
    <Sider
      style={{
        backgroundColor: "#ffffff",
      }}
      trigger={null}
      collapsed={true}
      className="md:hidden"
    >
      <div className="flex items-center justify-center my-2">
        <LogoLink />
      </div>

      <DashboardSidebarLinks />
    </Sider>
  );
};
