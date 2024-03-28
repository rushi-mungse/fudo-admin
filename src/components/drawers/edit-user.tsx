"use client";

import React, { useState } from "react";
import { Avatar, Button, Drawer, Form, UploadFile } from "antd";
import {
  EmailRules,
  FullNameRules,
  PasswordRules,
  PhoneNumberRules,
  UserRoleRules,
} from "@/lib/rules";

import { UserRoleOptions } from "@/constants";

import { PasswordInputField } from "@/components/ui/password-field";
import SelectField from "@/components/ui/select-filed";
import { UploadField } from "@/components/ui/upload-field";
import { InputField } from "@/components/ui/input-field";

import { TiUserOutline } from "react-icons/ti";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";

import { CgNametag } from "react-icons/cg";
import { MdOutlinePhoneEnabled } from "react-icons/md";

const { useForm } = Form;

interface EditUserProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

export const EditUser = ({ userId, onClose, open }: EditUserProps) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <>
      <Drawer onClose={onClose} title="Edit User" open={open} width={600}>
        <Form
          onFinish={(data) => {
            console.log(data);
          }}
          form={form}
        >
          <label className="pb-2 block">Profile Picture</label>
          <div className="flex flex-col items-center sm:flex-row gap-4 p-4 border mb-8">
            <Avatar src={""} icon={<TiUserOutline />} size={100} />

            <div className="h-[70px]">
              <UploadField
                fileSize={1}
                fileList={fileList}
                setFileList={setFileList}
                listType="picture"
              />
            </div>
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
            <Button htmlType="submit" type="primary">
              Save Changes
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
