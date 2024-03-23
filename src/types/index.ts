export type IconProps = React.HTMLAttributes<HTMLOrSVGElement>;

export interface INavItem {
  title: string;
  href: string;
  isOnlyMobile?: boolean;
  showIfIsAuth?: boolean;
}

export interface ILoginData {
  fullname: string;
  password: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "customer";
  status: "valid" | "active" | "banned";
  password: string;
  avatar: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface ILoginResponseData {
  user: IUser;
}

export interface IVerifyOtpResponse {
  user: IUser;
}

export interface IUserResponse {
  user: IUser;
}

export interface ISendOtpResponse {
  otpInfo: IOtpInfo;
  otp?: string;
}

export interface IOtpInfo {
  fullName: string;
  email: string;
  hashOtp: string;
}

export interface HttpErrorType {
  type: string;
  msg: string;
  path: string;
  location: string;
}
export interface ErrorType {
  error: HttpErrorType[];
}

export interface IVerifyOtp {
  fullName: string;
  email: string;
  hashOtp: string;
  otp?: string;
}

export interface ISendOtpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IForgetPasswordData {
  email: string;
}

export interface IForgetPasswordResponse {
  otpInfo: IOtpInfo;
  otp?: string;
}

export interface ISetPasswordData {
  fullName: string;
  email: string;
  otp: string;
  hashOtp: string;
  password: string;
  confirmPassword: string;
}

export interface ISetPasswordResponse {
  user: IUser;
}
