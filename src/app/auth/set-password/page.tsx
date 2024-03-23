"use client";

import Image from "next/image";
import { Button, Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { OtpRules, PasswordRules } from "@/lib/rules";
import { setPassword } from "@/api/auth";

import { OtpField } from "@/components/ui/otp-field";
import { PasswordInputField } from "@/components/ui/password-field";

import { ErrorType, ISetPasswordData, ISetPasswordResponse } from "@/types";
import { useOtpStore } from "@/lib/store";

import { RiLockPasswordLine } from "react-icons/ri";

const { useForm } = Form;

const SetPasswordPage = () => {
  const [form] = useForm();
  const [context, contextHolder] = message.useMessage();
  const { otpInfo, clearOtp } = useOtpStore((state) => state);
  const router = useRouter();

  const handleOnSuccess = (data: ISetPasswordResponse) => {
    context.open({
      type: "success",
      content: "Set password successfully please login an account.",
      duration: 2,
    });

    clearOtp();
    setTimeout(() => {
      form.resetFields();
      router.push("/auth/login");
    }, 1000);
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
    mutationKey: ["set-password"],
    mutationFn: async (data: ISetPasswordData) => setPassword(data),
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
    const { password, confirmPassword, otp } = form.getFieldsValue();
    const userOtp = otp.join("");

    mutate({
      otp: userOtp,
      email: otpInfo.email,
      fullName: otpInfo.fullName,
      hashOtp: otpInfo.hashOtp,
      password,
      confirmPassword,
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
              <p className="h3 text-xl lg:text-3xl text-center">Set Password</p>
              <div className="text-n-4 text-xs sm:italic text-center tracking-widest md:text-sm py-5 max-w-[350px]">
                4 Digit code has been sent to your email address
              </div>
              <div className="text-active italic py-2 text-center text-sm">
                {otpInfo?.email}
              </div>

              <Form
                form={form}
                className="flex items-center flex-col"
                onFinish={() => handleOnFinish()}
              >
                <OtpField name="otp" fieldRules={OtpRules} />

                <PasswordInputField
                  name="password"
                  placeholder="Enter strong password"
                  icon={<RiLockPasswordLine className="pr-2 size-6" />}
                  fieldRules={PasswordRules}
                />

                <PasswordInputField
                  name="confirmPassword"
                  placeholder="Confirm password"
                  icon={<RiLockPasswordLine className="pr-2 size-6" />}
                  fieldRules={PasswordRules}
                />

                <Button
                  type="primary"
                  shape="round"
                  className="mt-6"
                  htmlType="submit"
                  loading={isPending}
                >
                  Set Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;
