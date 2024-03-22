import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

interface PropType {
  name: string;
  fieldRules: Rule[];
  placeholder: string;
  icon: React.ReactNode;
}

export const PasswordInputField = ({
  name,
  fieldRules,
  placeholder,
  icon,
}: PropType) => {
  return (
    <Form.Item rules={fieldRules} className="w-full" name={name}>
      <Input.Password
        placeholder={placeholder}
        prefix={icon}
        className="font-light px-4 py-1 text-[14px]"
      />
    </Form.Item>
  );
};
