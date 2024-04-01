import { ICategory } from "@/types";
import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd";

type PricingProps = {
  selectedCategory: string;
};

export const ProductPricing = ({ selectedCategory }: PricingProps) => {
  const category: ICategory | null = selectedCategory
    ? JSON.parse(selectedCategory)
    : null;

  if (!category) {
    return null;
  }

  return (
    <Card
      title={<Typography.Text>Product price</Typography.Text>}
      bordered={false}
    >
      {Object.entries(category?.priceConfiguration).map(
        ([configurationKey, configurationValue]) => {
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
                        <Form.Item
                          label={option}
                          name={[
                            "priceConfiguration",
                            JSON.stringify({
                              configurationKey: configurationKey,
                              priceType: configurationValue.priceType,
                            }),
                            option,
                          ]}
                        >
                          <InputNumber addonAfter="₹" />
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              </Space>
            </div>
          );
        }
      )}
    </Card>
  );
};
