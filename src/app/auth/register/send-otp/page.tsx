"use client";

import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Button, Form, message } from "antd";

import { sendOtp } from "@/api/auth";

import { EmailRules, FullNameRules, PasswordRules } from "@/lib/rules";

import { InputField } from "@/components/ui/input-field";
import { PasswordInputField } from "@/components/ui/password-field";
import { TextBorder } from "@/components/ui/top-border";

import { ErrorType, ISendOtpData, ISendOtpResponse } from "@/types";

const { useForm } = Form;

import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgNametag } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { useOtpStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const SendOtpPage = () => {
  const [form] = useForm();
  const [context, contextHolder] = message.useMessage();
  const setOtp = useOtpStore((state) => state.setOtp);
  const router = useRouter();

  const handleOnSuccess = (data: ISendOtpResponse) => {
    form.resetFields();
    context.open({
      type: "success",
      content: "User login successfully.",
      duration: 2,
    });
    setOtp(data.otpInfo);
    //TODO:remove and also fix backend
    console.log(data.otp);
    router.push("/auth/register/verify-otp");
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
    mutationKey: ["send-otp"],
    mutationFn: async (data: ISendOtpData) => sendOtp(data),
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

          <div className="flex items-center justify-center flex-col sm:ring-1 sm:ring-n-4 w-full sm:p-10 md:p-10 rounded-md">
            <p className="h3 text-xl lg:text-3xl"> Sign Up Your Account</p>
            <div className="text-n-4 text-xs sm:italic text-center tracking-widest md:text-sm py-5 max-w-[350px]">
              To keep connected with us please signup with your personal
              information by email address and password.
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
                  name="fullName"
                  placeholder="Enter your full name"
                  icon={<CgNametag className="pr-2 size-6" />}
                  fieldRules={FullNameRules}
                />

                <InputField
                  name="email"
                  placeholder="Enter your email address"
                  icon={<CiMail className="pr-2 size-6" />}
                  fieldRules={EmailRules}
                />

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
                  htmlType="submit"
                  className="w-full sm:w-fit"
                  loading={isLoading}
                >
                  Sign Up An Account
                </Button>

                <div className="flex items-center justify-center w-full mt-4">
                  <Link
                    href="/auth/login"
                    className="text-n-5 hover:text-n-8 transition-all text-sm"
                  >
                    Do have an account?
                  </Link>
                </div>
              </Form>
            </div>

            <TextBorder text="OR" />

            <div className="w-full flex items-center justify-center">
              <Button icon={<FcGoogle />} className="w-full sm:w-fit">
                Login with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOtpPage;
