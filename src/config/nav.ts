import { INavItem } from "@/types";

export const navConfig: INavItem[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  {
    title: "Sign Up",
    href: "/auth/register/send-otp",
    isOnlyMobile: true,
    showIfIsAuth: false,
  },
  {
    title: "Profile",
    href: "/profile",
    showIfIsAuth: true,
  },
  {
    title: "Login",
    href: "/auth/login",
    isOnlyMobile: true,
    showIfIsAuth: false,
  },
  {
    title: "DashBoard",
    href: "/dashboard",
    showIfIsAuth: true,
    isOnlyMobile: true,
  },
];
