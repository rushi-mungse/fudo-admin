import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

const { Item } = Form;

interface PropType {
  name: string;
  fieldRules: Rule[];
  placeholder: string;
  icon: React.ReactNode;
}

export const InputField = ({
  name,
  fieldRules,
  placeholder,
  icon,
}: PropType) => {
  return (
    <Item rules={fieldRules} className="w-full" name={name}>
      <Input
        placeholder={placeholder}
        prefix={icon}
        className="font-light px-4 py-1 text-[14px]"
      />
    </Item>
  );
};
