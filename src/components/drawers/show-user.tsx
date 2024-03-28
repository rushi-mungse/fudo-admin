"use client";

import React from "react";
import { Avatar, Drawer, Tag } from "antd";
import { useQuery } from "react-query";
import { getUser } from "@/api/auth";
import { TiUserOutline } from "react-icons/ti";
import { dateFormater } from "@/utils/date-formater";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { CopyClipboard } from "@/components/ui/copy-clipbord";

interface ShowUserProps {
  userId: string;
  open: boolean;
  closeUserDrawer: () => void;
}

interface TagWithLabelProps {
  label: string;
  value: string;
}

export const TagWithLabel = ({ label, value }: TagWithLabelProps) => {
  return (
    <div className="space-y-2 border rounded-md p-3">
      <div className="tracking-wider text-active">{label}</div>
      <div className="flex items-center">
        <Tag color="orange">{value}</Tag>
      </div>
    </div>
  );
};

export const ShowUser = ({ userId, closeUserDrawer, open }: ShowUserProps) => {
  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => getUser(userId),
  });

  return (
    <>
      <Drawer
        onClose={closeUserDrawer}
        title="User Info"
        open={open}
        width={600}
      >
        <>
          <div className="mb-12 border p-3 relative rounded-lg">
            <div className="border border-n-4 h-fit w-fit rounded-full overflow-hidden">
              <Avatar
                src={data?.data.user.avatar}
                icon={<TiUserOutline />}
                size={100}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8">
            <InputWithLabel value={data?.data.user._id} label="User Id">
              <CopyClipboard data={data?.data.user._id} />
            </InputWithLabel>

            <InputWithLabel label="Full Name" value={data?.data.user.fullName}>
              <CopyClipboard data={data?.data.user.fullName} />
            </InputWithLabel>

            <InputWithLabel label="Email" value={data?.data.user.email}>
              <CopyClipboard data={data?.data.user.email} />
            </InputWithLabel>

            <InputWithLabel
              label="Phone Number"
              value={data?.data.user.phoneNumber}
            >
              <CopyClipboard data={data?.data.user.phoneNumber} />
            </InputWithLabel>

            <div className="grid grid-cols-2 gap-8">
              <TagWithLabel value={data?.data.user.role} label="User Role" />
              <TagWithLabel
                value={data?.data.user.status}
                label="User Status"
              />
              <TagWithLabel
                value={dateFormater(data?.data.user.createdAt)}
                label="Created At"
              />
              <TagWithLabel
                value={dateFormater(data?.data.user.updatedAt)}
                label="Updated At"
              />
            </div>
          </div>
        </>
      </Drawer>
    </>
  );
};
