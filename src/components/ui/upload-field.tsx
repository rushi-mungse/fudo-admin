import Image from "next/image";
import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { UploadListType } from "antd/es/upload/interface";

import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface PropType {
  fileSize: number;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<unknown>[]>>;
  listType: UploadListType | undefined;
}

export const UploadField = ({
  fileSize,
  fileList,
  setFileList,
  listType,
}: PropType) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <Button
      icon={<PlusOutlined />}
      style={{ width: 269, height: 66, marginTop: 5 }}
    >
      Upload
    </Button>
  );

  return (
    <>
      <Upload
        beforeUpload={() => {
          return false;
        }}
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= fileSize ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" src={previewImage} height={400} width={400} />
      </Modal>
    </>
  );
};
