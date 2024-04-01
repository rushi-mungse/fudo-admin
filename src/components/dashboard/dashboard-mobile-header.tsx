"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { Avatar, Button, Drawer, Typography } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import { dashboardNavConfig } from "@/config/dashboard-nav";

const { Text } = Typography;

export const DashboardMobileHeader = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const pathname = usePathname();

  const { auth } = useAuthStore((state) => state);

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showDrawer} icon={<MenuOutlined />} />

      <Drawer placement="right" onClose={onClose} closable={false} open={open}>
        <Button onClick={onClose} type="text" icon={<CloseOutlined />} />

        <div className="flex items-center justify-between my-4 pb-2 border-b">
          <Avatar src={auth.user?.avatar}>
            {auth.user?.fullName.charAt(0)}
          </Avatar>
          <Text className="font-bold">{auth.user?.fullName}</Text>
        </div>

        <div className="flex flex-col space-y-2">
          {dashboardNavConfig.map(
            (nav, id) =>
              (nav.showIfIsAuth === auth.isAuth ||
                nav?.showIfIsAuth === undefined) && (
                <Link
                  key={id}
                  href={nav.href}
                  className={cn(
                    "text-sm text-n-9 flex items-center w-full bg-white border rounded-lg px-4 py-1",
                    pathname === nav.href && "text-active"
                  )}
                  onClick={onClose}
                >
                  {nav.icon}
                  {nav.title}
                </Link>
              )
          )}
        </div>
      </Drawer>
    </div>
  );
};
