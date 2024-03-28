"use client";

import React, { useId, useState } from "react";
import { Avatar, Button, Drawer, Form, UploadFile, message } from "antd";
import {
  EmailRules,
  FullNameRules,
  PhoneNumberRules,
  UserRoleRules,
} from "@/lib/rules";

import { UserRoleOptions } from "@/constants";

import SelectField from "@/components/ui/select-filed";
import { UploadField } from "@/components/ui/upload-field";
import { InputField } from "@/components/ui/input-field";

import { TiUserOutline } from "react-icons/ti";
import { CiMail } from "react-icons/ci";

import { CgNametag } from "react-icons/cg";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { getUser } from "@/api/auth";
import { ErrorType, IUser } from "@/types";
import { Loader } from "../loader";
import { editUser } from "@/api/client";
import { AxiosError } from "axios";

const { useForm } = Form;

interface EditUserProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

export const EditUser = ({ userId, onClose, open }: EditUserProps) => {
  console.log(userId);
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [user, setUser] = useState<IUser>();
  const [context, contextHolder] = message.useMessage();

  const { refetch } = useQuery({
    queryKey: ["edit-user", userId],
    queryFn: () => getUser(userId),
    onSuccess: ({ data }) => setUser(data.user),
  });

  const { isLoading: loading, mutate } = useMutation({
    mutationKey: ["edit-user-mutation", useId],
    mutationFn: (data: FormData) => editUser(data, userId),
    onSuccess: () => {
      context.open({
        type: "success",
        content: "User edited successfully.",
        duration: 2,
      });
      refetch();
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

  if (user)
    return (
      <>
        <Drawer onClose={onClose} title="Edit User" open={open} width={600}>
          {contextHolder}
          <Form
            form={form}
            initialValues={{
              ...user,
            }}
            onFinish={(data) => {
              const formData = new FormData();
              if (fileList.length)
                formData.append("avatar", fileList[0].originFileObj as File);
              formData.append("fullName", data.fullName);
              formData.append("email", data.email);
              formData.append("role", data.role);
              formData.append("phoneNumber", data.phoneNumber);
              mutate(formData);
            }}
          >
            <label className="pb-2 block">Profile Picture</label>
            <div className="flex flex-col items-center sm:flex-row gap-4 p-4 border mb-8">
              <Avatar src={user.avatar} icon={<TiUserOutline />} size={100} />

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
              <Button htmlType="submit" type="primary" loading={loading}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Drawer>
      </>
    );

  return <Loader />;
};
