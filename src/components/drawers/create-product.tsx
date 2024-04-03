"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  UploadFile,
  message,
} from "antd";

import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";

import { ErrorType, ICategory } from "@/types";

import { createProduct, createUser } from "@/api/client";
import { getsCategory } from "@/api/category";

import { getCategoryOptionsWithCategory } from "@/utils/get-categories";
import { UploadField } from "@/components/ui/upload-field";
import { ProductPricing } from "@/components/product-pricing";
import { ProductAttributes } from "@/components/product-attributes";
import { getAttributes, getPriceConfiguration } from "@/utils";

const { useForm, Item, useWatch } = Form;

interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProduct = ({ onClose, open }: CreateProductProps) => {
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form.setFieldValue("isPublish", true), []);

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
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      context.open({
        type: "success",
        content: "Product created successfully.",
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
        title="Create Product"
        open={open}
        width={600}
        style={{ background: "#FAFAFA" }}
      >
        {contextHolder}
        <Form
          layout="vertical"
          onFinish={(data) => {
            if (!fileList.length) {
              return context.open({
                type: "error",
                content: "Please upload product image!",
                duration: 2,
              });
            }

            const category = JSON.parse(data.categoryId) as ICategory;
            const formData = new FormData();

            formData.append("image", fileList[0].originFileObj as File);
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("categoryId", category._id);
            formData.append("discount", data.discount);
            formData.append("preparationTime", data.preparationTime);
            formData.append("isPublish", data.isPublish);

            formData.append(
              "attributes",
              JSON.stringify(getAttributes(data.attributes))
            );

            formData.append(
              "priceConfiguration",
              JSON.stringify(getPriceConfiguration(data.priceConfiguration))
            );

            mutate(formData);
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

              <Card title={<Typography.Text>Metadata</Typography.Text>}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Item
                      name="discount"
                      label="Discount"
                      rules={[
                        {
                          required: true,
                          message: "Product discount required!",
                        },
                      ]}
                    >
                      <InputNumber addonAfter="₹" />
                    </Item>
                  </Col>

                  <Col span={8}>
                    <Item
                      name="preparationTime"
                      label="Preparation Time"
                      rules={[
                        {
                          required: true,
                          message: "Product preparation time required!",
                        },
                      ]}
                    >
                      <InputNumber addonAfter="min" />
                    </Item>
                  </Col>

                  <Col span={8}>
                    <Item label="Published" name="isPublish">
                      <Switch
                        defaultChecked
                        onChange={(value) =>
                          form.setFieldValue("isPublish", value)
                        }
                      />
                    </Item>
                  </Col>
                </Row>
              </Card>
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
