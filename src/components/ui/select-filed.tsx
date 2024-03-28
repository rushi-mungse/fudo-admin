import { OptionType } from "@/types";
import { Form, Select } from "antd";
import { Rule } from "antd/es/form";

interface PropType {
  options: OptionType[];
  name: string;
  fieldRules: Rule[];
  isLoading: boolean;
  placeholder: string;
}

const SelectField = ({
  options,
  name,
  fieldRules,
  isLoading,
  placeholder,
}: PropType) => {
  return (
    <Form.Item name={name} rules={fieldRules}>
      <Select
        placeholder={placeholder}
        style={{ width: "100%" }}
        options={options}
        loading={isLoading}
      />
    </Form.Item>
  );
};

export default SelectField;
