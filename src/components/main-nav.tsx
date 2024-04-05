"use client";

import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";

import { LogoLink } from "@/components/logo-link";
import { CartNav } from "@/components/cart-nav";

import { RxDashboard } from "react-icons/rx";

export const MainNav = () => {
  const auth = useAuthStore((state) => state.auth);
  const pathname = usePathname();
  return (
    <div className="hidden md:flex w-full mx-auto container items-center justify-between h-12">
      <div className="flex items-center justify-center">
        <LogoLink className="mr-8" />
        <div className="flex items-center justify-center space-x-6">
          {navConfig.map(
            (nav, id) =>
              !nav.isOnlyMobile && (
                <Link
                  key={id}
                  href={nav.href}
                  className={cn(
                    "text-sm hover:text-n-4 transition-all",
                    pathname === nav.href && "text-active hover:text-active"
                  )}
                >
                  {nav.title}
                </Link>
              )
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <CartNav isActive={pathname === "/cart"} />

        {!auth.isAuth ? (
          <>
            <Link href="/auth/login">
              <Button>Log In</Button>
            </Link>

            <Link href="/auth/register/send-otp">
              <Button type="primary">Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className={cn("group transition-all")}>
              <RxDashboard
                className={cn(
                  "group-hover:text-n-4",
                  pathname.startsWith("/dashboard") &&
                    "text-active group-hover:text-active"
                )}
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
