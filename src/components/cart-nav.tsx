import { CartIcon } from "@/icons/cart";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const CartNav = () => {
  return (
    <Link href="/cart" className="group">
      <div className="group transition-all rounded-full px-3 py-1 flex items-center justify-center gap-1 ring-[1px] ring-n-2 group-hover:ring-active">
        <CartIcon className="size-5 group-hover:text-active" />
        <p className="mb-0 mr-1 text-sm group-hover:text-active">10</p>
      </div>
    </Link>
  );
};
