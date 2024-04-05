import { ICart, IOtpInfo, IUser } from "@/types";
import { create } from "zustand";

export type AuthStoreState = {
  auth: {
    isAuth: boolean;
    user: IUser | null;
  };
};

export type AuthStoreAction = {
  setAuth: (user: IUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>()(
  (set) => ({
    auth: {
      isAuth: false,
      user: null,
    },
    setAuth: (user: IUser) =>
      set(() => ({
        auth: {
          isAuth: true,
          user,
        },
      })),
    clearAuth: () =>
      set(() => ({
        auth: {
          isAuth: false,
          user: null,
        },
      })),
  })
);

export type OtpStoreState = {
  otpInfo: IOtpInfo | null;
};

export type OtpStoreAction = {
  setOtp: (otpInfo: IOtpInfo) => void;
  clearOtp: () => void;
};

export const useOtpStore = create<OtpStoreState & OtpStoreAction>()((set) => ({
  otpInfo: null,
  setOtp: (otpInfo: IOtpInfo) =>
    set(() => ({
      otpInfo,
    })),
  clearOtp: () =>
    set(() => ({
      otpInfo: null,
    })),
}));

export interface CartStoreState {
  cart: ICart;
}

export interface IPriceConfig {
  [key: string]: string;
}

export interface CartStoreAction {
  addToCart: (
    productId: string,
    priceConfiguration: string,
    config: IPriceConfig
  ) => void;
  setCart: (cart: ICart) => void;
  removeToCart: (productId: string, priceConfiguration: string) => void;
  decQuantity: (productId: string, priceConfiguration: string) => void;
  deleteCart: () => void;
}

export const useCart = create<CartStoreState & CartStoreAction>()((set) => ({
  cart: {
    items: null,
    totalItems: 0,
  },
  setCart: (cart: ICart) =>
    set(() => ({
      cart,
    })),

  addToCart: (
    productId: string,
    priceConfiguration: string,
    config: IPriceConfig
  ) =>
    set((state) => {
      if (!state.cart.items) {
        state.cart.items = {};
      }

      if (!state.cart.items[productId])
        state.cart.items[productId] = {
          [priceConfiguration]: {
            quantity: "0",
            ...config,
          },
        };

      if (!state.cart.items[productId][priceConfiguration]) {
        state.cart.items[productId][priceConfiguration] = {
          quantity: "0",
          ...config,
        };
      }

      state.cart.items[productId][priceConfiguration]["quantity"] = (
        +state.cart.items[productId][priceConfiguration]["quantity"] + 1
      ).toString();

      state.cart.totalItems += 1;
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;
    }),

  removeToCart: (productId: string, priceConfiguration: string) =>
    set(() => ({})),

  decQuantity: (productId: string, priceConfiguration: string) =>
    set(() => ({})),

  deleteCart: () => set(() => ({})),
}));
