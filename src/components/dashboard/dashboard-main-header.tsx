"use client";

import Link from "next/link";
import { Avatar, Layout, Typography } from "antd";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CartNav } from "@/components/cart-nav";
import { dashboardNavConfig } from "@/config/dashboard-nav";

const { Header } = Layout;
const { Text } = Typography;

export const DashboardMainHeader = () => {
  const user = useAuthStore((state) => state.auth.user);
  const pathname = usePathname();

  return (
    <Header
      style={{
        height: 60,
        backgroundColor: "#ffffff",
      }}
      className="hidden lg:flex items-center justify-between gap-4"
    >
      <div className="flex items-center justify-center space-x-6">
        {dashboardNavConfig.map((nav, id) => (
          <Link
            key={id}
            href={nav.href}
            className={cn(
              "text-sm text-n-9 hover:text-n-4 transition-all",
              pathname === nav.href && "text-active hover:text-active"
            )}
          >
            {nav.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <CartNav />
        <div className="border-l border-n-4 pl-4 flex items-center justify-center gap-1">
          <span className="font-light">Hello,</span>
          <Text>{user?.fullName}</Text>
          <Avatar src={user?.avatar} className="border border-gray/50 ml-1">
            R
          </Avatar>
        </div>
      </div>
    </Header>
  );
};
