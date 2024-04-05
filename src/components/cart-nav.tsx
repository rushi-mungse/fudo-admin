"use client";
import Link from "next/link";

import { CartIcon } from "@/icons/cart";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const CartNav = ({ isActive = false }: { isActive?: boolean }) => {
  const { cart } = useCart((state) => state);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setTotalItems(cart.totalItems);
  }, [cart.totalItems]);

  return (
    <Link href="/cart" className="group">
      <div
        className={cn(
          "group transition-all rounded-full px-3 py-1 flex items-center justify-center gap-1 ring-[1px] ring-n-2 group-hover:ring-active",
          isActive && "ring-active"
        )}
      >
        <CartIcon
          className={cn(
            "size-5 text-n-9 group-hover:text-active",
            isActive && "text-active"
          )}
        />
        <p
          className={cn(
            "mb-0 mr-1 text-n-9 text-sm group-hover:text-active",
            isActive && "text-active"
          )}
        >
          {totalItems}
        </p>
      </div>
    </Link>
  );
};
