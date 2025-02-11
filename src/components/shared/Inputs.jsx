import { FormItem } from "./FormItems";

export const PropInput = ({ label, name, type, ...restProps }) => {
  if (type === "Number")
    return (
      <FormItem
        label={label}
        name={name}
        type={type}
        inputProps={{ min: 0 }}
        {...restProps}
      />
    );
  return <FormItem label={label} name={name} type={type} {...restProps} />;
};
