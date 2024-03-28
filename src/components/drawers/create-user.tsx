"use client";

import React, { useState } from "react";
import { Button, Drawer, Form, UploadFile, message } from "antd";
import {
  EmailRules,
  FullNameRules,
  PasswordRules,
  PhoneNumberRules,
  UserRoleRules,
} from "@/lib/rules";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { UserRoleOptions } from "@/constants";

import { PasswordInputField } from "@/components/ui/password-field";
import { InputField } from "@/components/ui/input-field";
import SelectField from "@/components/ui/select-filed";
import { UploadField } from "@/components/ui/upload-field";

import { RiLockPasswordLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { CgNametag } from "react-icons/cg";
import { MdOutlinePhoneEnabled } from "react-icons/md";

import { ErrorType, ICreateUser } from "@/types";
import { createUser } from "@/api/client";

const { useForm } = Form;

interface CreateUserProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUser = ({ onClose, open }: CreateUserProps) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [context, contextHolder] = message.useMessage();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["create-user", form.getFieldValue],
    mutationFn: (data: FormData) => createUser(data),
    onSuccess: () => {
      context.open({
        type: "success",
        content: "User created successfully.",
        duration: 2,
      });
      form.resetFields();
    },
    onError: (err: AxiosError) => {
      const errors = err.response?.data as unknown as ErrorType;
      context.open({
        type: "error",
        content: errors.error[0].msg,
        duration: 2,
      });
    },
  });

  return (
    <>
      <Drawer onClose={onClose} title="Create User" open={open} width={600}>
        {contextHolder}
        <Form
          onFinish={(data: ICreateUser) => {
            if (!fileList)
              return context.open({
                type: "error",
                content: "User profile picture required!",
                duration: 2,
              });

            const formData = new FormData();
            formData.append("avatar", fileList[0].originFileObj as File);
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("role", data.role);
            formData.append("password", data.password);
            formData.append("phoneNumber", data.phoneNumber);
            mutate(formData);
          }}
          form={form}
        >
          <label className="pb-2 block">Profile Picture</label>
          <div className="mb-4">
            <UploadField
              fileSize={1}
              fileList={fileList}
              setFileList={setFileList}
              listType="picture"
            />
          </div>

          <div className="relative">
            <label className="pb-2 block">Full Name</label>
            <InputField
              name="fullName"
              placeholder="Enter full name address"
              icon={<CgNametag className="pr-2 size-6" />}
              fieldRules={FullNameRules}
            />
          </div>

          <div className="relative">
            <label className="pb-2 block">Email</label>
            <InputField
              name="email"
              placeholder="Enter email address"
              icon={<CiMail className="pr-2 size-6" />}
              fieldRules={EmailRules}
            />
          </div>

          <div className="relative">
            <label className="pb-2 block">Phone Number</label>
            <InputField
              name="phoneNumber"
              placeholder="Enter phone number"
              icon={<MdOutlinePhoneEnabled className="pr-2 size-6" />}
              fieldRules={PhoneNumberRules}
            />
          </div>

          <div className="relative">
            <label className="pb-2 block">Password</label>
            <PasswordInputField
              name="password"
              placeholder="Enter strong password"
              icon={<RiLockPasswordLine className="pr-2 size-6" />}
              fieldRules={PasswordRules}
            />
          </div>

          <div>
            <label className="pb-2 block">User Role</label>
            <SelectField
              name="role"
              fieldRules={UserRoleRules}
              options={UserRoleOptions}
              placeholder="User role"
              isLoading={false}
            />
          </div>

          <div className="flex items-center justify-end">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create User
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
