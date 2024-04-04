import { IProduct } from "@/types";
import { Avatar, Button, Card, Col, Row, Space } from "antd";

export const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card size="small">
      <Row gutter={24}>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={product.image}
            size={{ xs: 100, sm: 150, md: 200, lg: 200, xl: 200, xxl: 250 }}
          ></Avatar>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Space direction="vertical">
            <h1 className="font-bold tracking-wider text-center">
              {product.name}
            </h1>

            <p className="text-n-4 text-center">{product.description}</p>
          </Space>

          <Space
            style={{
              marginTop: 10,
            }}
          >
            <div className="flex items-center justify-center gap-24">
              <span>From 100 </span>
              <Button>Choose</Button>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
