"use client";
import { Button } from "antd";
import React, { useState } from "react";
import { CopyOutlined, CheckCircleFilled } from "@ant-design/icons";

interface CopyClipboardProps {
  data: string;
}

export const CopyClipboard = ({ data }: CopyClipboardProps) => {
  const [copy, setCopy] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const copyClipboard = () => {
    navigator.clipboard.writeText(data);
    setCopy(true);
    setButtonDisabled(true);
    setTimeout(() => {
      setCopy(false);
      setButtonDisabled(false);
    }, 2000);
  };
  return (
    <Button
      onClick={copyClipboard}
      disabled={buttonDisabled}
      type="text"
      icon={copy ? <CheckCircleFilled /> : <CopyOutlined />}
      shape="circle"
    />
  );
};
