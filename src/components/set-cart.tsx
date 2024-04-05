"use client";

import { useCart } from "@/lib/store";
import { ICart } from "@/types";
import React, { useEffect } from "react";

export const SetCart = () => {
  const { setCart } = useCart((state) => state);
  useEffect(() => {
    const data = window.localStorage.getItem("cart");
    if (data) {
      const cart = JSON.parse(data) as ICart;
      setCart(cart);
    }
  }, [setCart]);
  return <></>;
};
