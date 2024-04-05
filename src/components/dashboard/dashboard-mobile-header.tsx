"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { Avatar, Button, Drawer, Typography } from "antd";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import { dashboardNavConfig } from "@/config/dashboard-nav";
import { useMutation } from "react-query";
import { logout } from "@/api/auth";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export const DashboardMobileHeader = () => {
  const { auth } = useAuthStore((state) => state);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

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

          {auth.isAuth && (
            <Button
              icon={<LogoutOutlined />}
              onClick={() => mutate()}
              loading={isLoading}
            >
              Logout
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
};
