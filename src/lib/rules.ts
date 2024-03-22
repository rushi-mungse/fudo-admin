import { Rule } from "antd/es/form";

export const FullNameRules: Rule[] = [
  {
    required: true,
    message: "Please enter full name",
  },
];

export const EmailRules: Rule[] = [
  {
    required: true,
    message: "Please enter your email",
  },
  {
    type: "email",
    message: "Please enter valid email",
  },
];

export const PasswordRules: Rule[] = [
  {
    required: true,
    message: "Please enter password",
  },
];

export const ConfirmPasswordRules: Rule[] = [
  {
    required: true,
    message: "Please confirm password",
  },
];

export const OtpRules: Rule[] = [
  { required: true, message: "Please enter otp" },
];
