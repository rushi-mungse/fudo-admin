"use client";

import Image from "next/image";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Button, Form, message } from "antd";

import { EmailRules } from "@/lib/rules";
import { forgetPassword } from "@/api/auth";

import { InputField } from "@/components/ui/input-field";

import {
  ErrorType,
  IForgetPasswordData,
  IForgetPasswordResponse,
} from "@/types";

const { useForm } = Form;

import { CiMail } from "react-icons/ci";
import { useOtpStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const ForgetPasswordPage = () => {
  const [form] = useForm();
  const [context, contextHolder] = message.useMessage();
  const setOtp = useOtpStore((state) => state.setOtp);
  const router = useRouter();

  const handleOnSuccess = (data: IForgetPasswordResponse) => {
    context.open({
      type: "success",
      content: `Sent otp to ${data.otpInfo.email} email.`,
      duration: 2,
    });
    setOtp(data.otpInfo);
    //TODO:remove and also backend logic
    console.log(data.otp);
    setTimeout(() => {
      form.resetFields();
      router.push("/auth/set-password");
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

  const { mutate, isLoading } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (data: IForgetPasswordData) => forgetPassword(data),
    onSuccess: async ({ data }) => handleOnSuccess(data),
    onError: async (err: AxiosError) => handleOnError(err),
  });

  return (
    <div className="container w-[90%] mx-auto ">
      {contextHolder}
      <div className="flex items-center justify-center w-full py-10 md:mt-0 md:min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src="/assets/login.svg"
              alt="login"
              height={500}
              width={500}
              className="h-auto w-auto"
            />
          </div>

          <div className="flex items-center justify-center flex-col sm:ring-1 sm:ring-n-4 w-full sm:p-10 md:p-20 rounded-md">
            <p className="h3 text-xl lg:text-3xl">Forget Password</p>
            <div className="text-n-4 text-xs sm:italic text-center tracking-widest md:text-sm py-5 max-w-[350px]">
              If you&apos;ve forgotten your password, don&apos;t worry -
              we&apos;ve got you covered.
            </div>

            <div className="w-full md:w-[350px]">
              <Form
                form={form}
                className="flex items-center flex-col"
                onFinish={(data) => {
                  mutate(data);
                }}
              >
                <InputField
                  name="email"
                  placeholder="Enter register email address"
                  icon={<CiMail className="pr-2 size-6" />}
                  fieldRules={EmailRules}
                />

                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  className="w-full sm:w-fit"
                  loading={isLoading}
                >
                  Send Otp For Set Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
