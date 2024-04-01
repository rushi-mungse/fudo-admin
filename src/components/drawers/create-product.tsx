"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  UploadFile,
  message,
} from "antd";

import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";

import { ErrorType, ICategory } from "@/types";

import { createUser } from "@/api/client";
import { getsCategory } from "@/api/category";

import { getCategoryOptionsWithCategory } from "@/utils/get-categories";
import { UploadField } from "@/components/ui/upload-field";
import { ProductPricing } from "@/components/product-pricing";
import { ProductAttributes } from "@/components/product-attributes";

const { useForm, Item, useWatch } = Form;

interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProduct = ({ onClose, open }: CreateProductProps) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [context, contextHolder] = message.useMessage();
  const selectedCategory = useWatch("categoryId", form);

  // get categories
  const [category, setCagegory] = useState<ICategory[]>([]);
  useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => getsCategory(),
    onSuccess: ({ data }) => setCagegory(data.categories),
  });

  // create product
  const { mutate, isLoading } = useMutation({
    mutationKey: ["create-product", form.getFieldValue],
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
      <Drawer
        onClose={onClose}
        title="Create User"
        open={open}
        width={600}
        style={{ background: "#FAFAFA" }}
      >
        {contextHolder}
        <Form
          layout="vertical"
          onFinish={(data) => {
            console.log(data);
          }}
          form={form}
        >
          <Row>
            <Space direction="vertical" size="large">
              <Card
                title={<Typography.Text>Product Info</Typography.Text>}
                bordered={false}
              >
                <Row>
                  <Col span={24}>
                    <Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Product name is required",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Product Name"
                      />
                    </Item>
                  </Col>

                  <Col span={24}>
                    <Item
                      name="categoryId"
                      style={{ width: "100%" }}
                      className="col-span-3 xl:col-span-1"
                    >
                      <Select
                        allowClear
                        placeholder={"Select Category"}
                        style={{ width: "100%" }}
                        options={getCategoryOptionsWithCategory(category)}
                        loading={isLoading}
                      />
                    </Item>
                  </Col>

                  <Col span={24}>
                    <Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Description is required",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={2}
                        maxLength={200}
                        style={{ resize: "none" }}
                        placeholder="Product description"
                      />
                    </Item>
                  </Col>
                </Row>
              </Card>

              <Card title={<Typography.Text>Product Image</Typography.Text>}>
                <UploadField
                  fileSize={1}
                  fileList={fileList}
                  setFileList={setFileList}
                  listType="picture"
                />
              </Card>

              {selectedCategory && (
                <ProductPricing selectedCategory={selectedCategory} />
              )}

              {selectedCategory && (
                <ProductAttributes selectedCategory={selectedCategory} />
              )}
            </Space>
          </Row>

          <div className="flex items-center justify-end mt-8">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create Product
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
