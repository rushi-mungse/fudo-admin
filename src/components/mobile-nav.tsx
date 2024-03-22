"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";

import { BiMenuAltRight } from "react-icons/bi";
import { LogoLink } from "@/components/logo-link";
import { CartNav } from "./cart-nav";
import { usePathname } from "next/navigation";

import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "@/lib/store";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const pathname = usePathname();

  const auth = useAuthStore((state) => state.auth);

  return (
    <div className="flex w-[90%] mx-auto container md:hidden h-12 items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <LogoLink />
        <div className="flex items-center justify-center space-x-2">
          <CartNav />
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
        width={200}
      >
        <div className="w-full flex items-center justify-end">
          <Button onClick={onClose} type="text">
            <IoMdClose className="size-5" />
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          {navConfig.map(
            (nav, id) =>
              (nav.showIfIsAuth === auth.isAuth ||
                nav?.showIfIsAuth === undefined) && (
                <Link
                  key={id}
                  href={nav.href}
                  className={cn(
                    "text-sm text-n-9",
                    pathname.startsWith(nav.href) && "text-active"
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
