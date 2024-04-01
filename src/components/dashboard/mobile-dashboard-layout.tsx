"use client";

import { Layout, Menu, theme } from "antd";
const { Header, Content } = Layout;

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChartOutlined,
  FileTextOutlined,
  BarsOutlined,
  TeamOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { DashboardMobileHeader } from "@/components/dashboard/dashboard-mobile-header";
import { LogoLink } from "@/components/logo-link";

import { MdDashboard } from "react-icons/md";

export const MobileDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#ffffff",
        }}
        className="border-b"
      >
        <LogoLink />
        <Menu
          mode="horizontal"
          style={{ flex: 1, minWidth: 0, border: "none" }}
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: "1",
              label: "Dashboard",
              icon: <MdDashboard />,
              children: [
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
              ],
            },
          ]}
        />

        <DashboardMobileHeader />
      </Header>
      <Content className="min-h-full">
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 48,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
