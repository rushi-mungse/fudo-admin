import { Input } from "antd";
import React from "react";

interface InputWithLabelProps {
  label: string;
  value: string;
  children?: React.ReactNode;
}

export const InputWithLabel = ({
  label,
  value,
  children,
}: InputWithLabelProps) => {
  return (
    <div className="space-y-2">
      <label className="tracking-wider text-active">{label}</label>
      <div className="flex items-center justify-center gap-2">
        <Input value={value} disabled />
        {children}
      </div>
    </div>
  );
};
