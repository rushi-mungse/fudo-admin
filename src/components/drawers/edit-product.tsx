"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
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

import { ErrorType, ICategory, IProduct } from "@/types";

import { createProduct, updateProduct } from "@/api/client";
import { getCategoryByName, getsCategory } from "@/api/category";

import {
  getCategoryOptions,
  getCategoryOptionsWithName,
} from "@/utils/get-categories";
import { UploadField } from "@/components/ui/upload-field";
import {
  getAttributes,
  getAttributesInitialValue,
  getPriceConfiguration,
  getPriceConfigurationInitialValue,
} from "@/utils";
import { getProduct } from "@/api/product";
import { Loader } from "../loader";

const { useForm, Item, useWatch } = Form;

export const EditProduct = ({ productId }: { productId: string }) => {
  const [form] = useForm();

  const getCategoryId = (categoryName: string) => {
    return category.filter((category) => category.name === categoryName);
  };

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

  // get product
  const [product, setProduct] = useState<IProduct>();
  const { refetch } = useQuery({
    queryKey: ["get-product", productId],
    queryFn: async () => getProduct(productId),
    onSuccess: ({ data }) => setProduct(data.product),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // edit product
  const { mutate, isLoading } = useMutation({
    mutationKey: ["edit-product", form.getFieldValue],
    mutationFn: (data: FormData) => updateProduct(data, productId),
    onSuccess: () => {
      context.open({
        type: "success",
        content: "Product updated successfully.",
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

  if (!product) return <Loader />;

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={(data) => {
          const formData = new FormData();

          if (fileList.length) {
            formData.append("image", fileList[0].originFileObj as File);
          }

          const categoryId = getCategoryId(data.categoryId)[0]._id;

          // console.log(data);

          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("categoryId", categoryId);
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
        initialValues={{
          ...product,
          categoryId: product?.category.name,
          ...{
            priceConfiguration: getPriceConfigurationInitialValue(
              product.priceConfiguration
            ),
          },
          ...{ attributes: getAttributesInitialValue(product.attributes) },
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
                    initialValue={product?.name}
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
                      value={product?.category.name}
                      allowClear
                      placeholder={"Select Category"}
                      style={{ width: "100%" }}
                      options={getCategoryOptionsWithName(category)}
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
              <PricingConfiguration selectedCategory={selectedCategory} />
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
            Update Product
          </Button>
        </div>
      </Form>
    </>
  );
};

export const PricingConfiguration = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-category", selectedCategory],
    queryFn: () => getCategoryByName(selectedCategory),
  });

  if (isLoading)
    return (
      <Card>
        <Loader />;
      </Card>
    );

  return (
    <>
      <Card
        style={{ marginBottom: 24 }}
        title={<Typography.Text>Product price</Typography.Text>}
        bordered={false}
      >
        {Object.entries(
          (data?.data.category as ICategory)?.priceConfiguration
        ).map(([configurationKey, configurationValue]) => {
          return (
            <div key={configurationKey}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Text>
                  {`${configurationKey} (${configurationValue.priceType})`}
                </Typography.Text>

                <Row gutter={20}>
                  {configurationValue.availableOptions.map((option: string) => {
                    return (
                      <Col span={8} key={option}>
                        <Item
                          name={[
                            "priceConfiguration",
                            JSON.stringify({
                              configurationKey: configurationKey,
                              priceType: configurationValue.priceType,
                            }),
                            option,
                          ]}
                          rules={[
                            {
                              required: true,
                              message: "Product price required!",
                            },
                          ]}
                          label={option}
                        >
                          <InputNumber addonAfter="₹" />
                        </Item>
                      </Col>
                    );
                  })}
                </Row>
              </Space>
            </div>
          );
        })}
      </Card>

      <Card
        title={<Typography.Text>Attributes</Typography.Text>}
        bordered={false}
      >
        {(data?.data.category as ICategory).attribute.map((attribute) => {
          return (
            <div key={attribute.name}>
              {attribute.widgetType === "radio" ? (
                <Form.Item
                  label={attribute.name}
                  name={["attributes", attribute.name]}
                  initialValue={attribute.defaultValue}
                  rules={[
                    {
                      required: true,
                      message: `${attribute.name} is required`,
                    },
                  ]}
                >
                  <Radio.Group>
                    {attribute.availableOptions.map((option) => {
                      return (
                        <Radio.Button value={option} key={option}>
                          {option}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              ) : attribute.widgetType === "switch" ? (
                <Row>
                  <Col>
                    <Form.Item
                      name={["attributes", attribute.name]}
                      valuePropName="checked"
                      label={attribute.name}
                      initialValue={attribute.defaultValue}
                    >
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
            </div>
          );
        })}
      </Card>
    </>
  );
};
