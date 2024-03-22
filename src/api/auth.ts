import api from "@/api/client";

import { ILoginData, ISendOtpData, IVerifyOtp } from "@/types";

export const login = (data: ILoginData) => api.post("/auth/login", data);
export const sendOtp = (data: ISendOtpData) => api.post("/auth/send-otp", data);
export const verifyOtp = (data: IVerifyOtp) =>
  api.post("/auth/verify-otp", data);
export const self = () => api.get("/auth/self");
