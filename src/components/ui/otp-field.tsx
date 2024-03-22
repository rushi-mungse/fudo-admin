import { Form } from "antd";
import { InputOTP } from "antd-input-otp";
import { Rule } from "antd/es/form";

const { Item } = Form;

interface PropType {
  name: string;
  fieldRules: Rule[];
}

export const OtpField = ({ name, fieldRules }: PropType) => {
  return (
    <Item name={name} rules={fieldRules}>
      <InputOTP autoFocus inputType="numeric" length={4} />
    </Item>
  );
};
