export type IconProps = React.HTMLAttributes<HTMLOrSVGElement>;

export interface INavItem {
  title: string;
  href: string;
  isOnlyMobile?: boolean;
  showIfIsAuth?: boolean;
  icon?: React.ReactNode;
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
  phoneNumber: string;
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

export interface OptionType {
  value: string;
  key: string;
  label?: React.ReactNode;
}

export interface IGetUsers {
  data: {
    users: IUser[];
    metadata: {
      totalCount: number;
      perPage: number;
      currentPage: number;
    };
  };
}

export interface ICreateUser {
  fullName: string;
  email: string;
  role: "admin" | "customer" | "tester";
  phoneNumber: string;
  password: string;
}

export interface ICategory {
  name: string;
  priceConfiguration: IPriceConfiguration;
  attribute: [IAttribute];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: [string];
  };
}

export interface IAttribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string | number;
  availableOptions: [string];
}

export interface IUpdateCategory {
  name: string;
}

export interface IAttributeForProduct {
  name: string;
  value: string;
}

export interface IPriceConfigurationForProduct {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface IProductBody {
  name: string;
  description: string;
  image: string;
  isPublish: string;
  discount: string;
  categoryId: string;
  preparationTime: string;
  attributes: string;
  priceConfiguration: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  isPublish: boolean;
  discount: number;
  category: ICategory;
  preparationTime: number;
  attributes: IAttributeForProduct[];
  priceConfiguration: IPriceConfigurationForProduct;
}
