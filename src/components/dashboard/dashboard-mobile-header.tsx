"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Avatar, Button, Drawer, Typography } from "antd";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { BiMenuAltRight } from "react-icons/bi";
import { CartNav } from "@/components/cart-nav";

import { IoMdClose } from "react-icons/io";
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
    <div className="lg:hidden h-[60px] overflow-hidden flex items-center justify-center bg-white">
      <div className="flex items-center justify-end w-full">
        <div className="flex items-center justify-center space-x-2">
          <CartNav isActive={pathname === "/cart"} />
          <Button
            onClick={showDrawer}
            type="text"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <BiMenuAltRight className="size-6" />
          </Button>
        </div>
      </div>

      <Drawer
        placement="right"
        onClose={onClose}
        closable={false}
        open={open}
        className="w-full sm:w-[350px]"
      >
        <div className="w-full flex items-center justify-end">
          <Button onClick={onClose} type="text">
            <IoMdClose className="size-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-1 my-4 pb-2 border-b border-n-4">
          <Text className="font-bold">{auth.user?.fullName}</Text>
          <Avatar
            src={auth.user?.avatar}
            className="border border-gray/50 ml-1"
          >
            R
          </Avatar>
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
                    "text-sm text-n-9",
                    pathname === nav.href && "text-active"
                  )}
                  onClick={onClose}
                >
                  {nav.title}
                </Link>
              )
          )}
        </div>
      </Drawer>
    </div>
  );
};
