"use client";

import Image from "next/image";
import Link from "next/link";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Button, Form, message } from "antd";

import { EmailRules, PasswordRules } from "@/lib/rules";
import { login } from "@/api/auth";

import { InputField } from "@/components/ui/input-field";
import { PasswordInputField } from "@/components/ui/password-field";
import { TextBorder } from "@/components/ui/top-border";

import { ErrorType, ILoginData, ILoginResponseData } from "@/types";

const { useForm } = Form;

import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [form] = useForm();
  const [context, contextHolder] = message.useMessage();
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleOnSuccess = (data: ILoginResponseData) => {
    form.resetFields();
    context.open({
      type: "success",
      content: "User login successfully.",
      duration: 2,
    });
    setAuth(data.user);
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

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: ILoginData) => login(data),
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
            <p className="h3 text-xl lg:text-3xl">Login Your Account</p>
            <div className="text-n-4 text-xs sm:italic text-center tracking-widest md:text-sm py-5 max-w-[350px]">
              Hey there! We are glad to see you again, Your journey continues
              here. Please take a moment to log in and dive into the healthy
              food and offers awaiting you.
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

                <PasswordInputField
                  name="password"
                  placeholder="Enter login password"
                  icon={<RiLockPasswordLine className="pr-2 size-6" />}
                  fieldRules={PasswordRules}
                />

                <div className="flex items-center justify-between w-full mb-4 space-x-4">
                  <Link
                    href="/auth/register/send-otp"
                    className="text-n-5 hover:text-n-8 transition-all text-sm"
                  >
                    Don&apos;t have an account?
                  </Link>

                  <Link
                    href="/auth/forget-password"
                    className="text-n-5 hover:text-n-8 transition-all text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  className="w-full sm:w-fit"
                  loading={isLoading}
                >
                  Login An Account
                </Button>
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

export default LoginPage;
