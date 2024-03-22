import { IOtpInfo, IUser } from "@/types";
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
      set((state) => ({
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
