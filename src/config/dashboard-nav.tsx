import { INavItem } from "@/types";

import { HiOutlineHome } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";

export const dashboardNavConfig: INavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <HiOutlineHome style={{ height: 25, width: 25, paddingRight: 10 }} />,
  },
  {
    title: "Products",
    href: "/products",
    icon: (
      <BsBoxSeam
        className="size-5"
        style={{ height: 25, width: 25, paddingRight: 10 }}
      />
    ),
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <CgProfile style={{ height: 25, width: 25, paddingRight: 10 }} />,
  },
  {
    title: "DashBoard",
    href: "/dashboard",
    icon: <RxDashboard style={{ height: 25, width: 25, paddingRight: 10 }} />,
  },
];
