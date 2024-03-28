import api from "@/api/client";

import {
  IForgetPasswordData,
  ILoginData,
  ISendOtpData,
  ISetPasswordData,
  IVerifyOtp,
} from "@/types";

export const login = (data: ILoginData) => api.post("/auth/login", data);

export const sendOtp = (data: ISendOtpData) => api.post("/auth/send-otp", data);

export const verifyOtp = (data: IVerifyOtp) =>
  api.post("/auth/verify-otp", data);

export const self = () => api.get("/auth/self");

export const forgetPassword = (data: IForgetPasswordData) =>
  api.post("/auth/forget-password", data);

export const setPassword = (data: ISetPasswordData) =>
  api.post("/auth/set-password", data);

export const logout = () => api.get("/auth/logout");

export const getUsers = (queryString: string) =>
  api.get(`/auth/users?${queryString}`);

export const getUser = (userId: string) => api.get(`/auth/${userId}`);

export const deleteUser = (userId: string) => api.delete(`auth/${userId}`);
