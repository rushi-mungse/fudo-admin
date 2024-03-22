"use client";

import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { OtpRules } from "@/lib/rules";
import { verifyOtp } from "@/api/auth";

import { OtpField } from "@/components/ui/otp-field";
import { ErrorType, IVerifyOtp, IVerifyOtpResponse } from "@/types";
import { useAuthStore, useOtpStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const { useForm } = Form;

const VerifyOtpPage = () => {
  const [form] = useForm();
  const [context, contextHolder] = message.useMessage();
  const { otpInfo, clearOtp } = useOtpStore((state) => state);
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleOnSuccess = (data: IVerifyOtpResponse) => {
    form.resetFields();
    context.open({
      type: "success",
      content: "Otp verify successfully.",
      duration: 2,
    });
    setAuth(data.user);
    clearOtp();
    router.push("/dashboard");
  };

  const handleOnError = (err: AxiosError) => {
    const errors = err.response?.data as unknown as ErrorType;
    context.open({
      type: "error",
      content: errors.error[0].msg,
      duration: 2,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (data: IVerifyOtp) => verifyOtp(data),
    onSuccess: async ({ data }) => handleOnSuccess(data),
    onError: async (err: AxiosError) => handleOnError(err),
  });

  const handleOnFinish = () => {
    if (!otpInfo) {
      return context.open({
        type: "error",
        content: "Otp info not found!",
        duration: 2,
      });
    }
    const otp = form.getFieldsValue().otp.join("");
    mutate({
      otp,
      email: otpInfo.email,
      fullName: otpInfo.fullName,
      hashOtp: otpInfo.hashOtp,
    });
  };

  return (
    <div className="container mx-auto w-[90%]">
      {contextHolder}
      <div className="flex items-center justify-center w-full min-h-screen py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="hidden md:flex items-center justify-center">
            <Image
              src="/assets/login.svg"
              alt="verify"
              height={500}
              width={500}
            />
          </div>

          <div className="flex items-center justify-center flex-col md:ring-1 md:ring-n-4 py-10 rounded-md">
            <div className="w-full md:w-[350px]">
              <p className="h3 text-xl lg:text-3xl text-center">
                Otp Verification
              </p>
              <div className="text-n-4 text-xs sm:italic text-center tracking-widest md:text-sm py-5 max-w-[350px]">
                4 Digit code has been sent to your email address
              </div>

              <div className="text-6xl text-n-4 text-center py-6">
                <CheckCircleOutlined />
              </div>

              <Form
                form={form}
                className="flex items-center flex-col"
                onFinish={() => handleOnFinish()}
              >
                <OtpField name="otp" fieldRules={OtpRules} />
                <Button
                  type="primary"
                  shape="round"
                  className="mt-6"
                  htmlType="submit"
                  loading={isPending}
                >
                  Verify Otp
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
