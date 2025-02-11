import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useLocation } from "react-router-dom";
import useFormUtils from "../../lib/hooks/UseFormUtils";
import { cn } from "../../lib/utils/cn";

export const FormItem = ({
  initialValue = "",
  children,
  label = "",
  name = "",
  messageLabel = "",
  type = "",
  inputType = "",
  required,
  disabled,
  size = "",
  className = "",
  inputClassName = "",
  inputProps = {},
  formItemProps = {},
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={
        required
          ? [
              {
                required: true,
                message: `${messageLabel || label} is required!`,
              },
            ]
          : []
      }
      className={className}
      {...(type === "Checkbox"
        ? { valuePropName: "checked", initialValue: false }
        : {})}
      {...(initialValue ? { initialValue } : {})}
      {...formItemProps}
    >
      {children ||
        (type === "Select" ? (
          <Select
            size={size}
            placeholder={`Select ${messageLabel || label}`}
            className={inputClassName}
            showSearch
            optionFilterProp="label"
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ) : type === "Switch" ? (
          <Switch
            size={size}
            className={inputClassName}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ) : type === "Number" ? (
          <InputNumber
            size={size}
            placeholder={`Enter ${messageLabel || label}`}
            className={cn("w-full", inputClassName)}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ) : type === "Password" ? (
          <Input.Password
            size={size}
            placeholder={`Enter ${messageLabel || label}`}
            className={inputClassName}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ) : type === "Textarea" ? (
          <Input.TextArea
            size={size}
            placeholder={`Enter ${messageLabel || label}`}
            className={inputClassName}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ) : type === "Checkbox" ? (
          <Checkbox
            size={size}
            className={inputClassName}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          >
            {messageLabel}
          </Checkbox>
        ) : (
          <Input
            type={inputType}
            size={size}
            placeholder={`Enter ${messageLabel || label}`}
            className={inputClassName}
            {...(typeof disabled === "boolean" ? { disabled } : {})}
            {...inputProps}
          />
        ))}
    </Form.Item>
  );
};

export const FormFooter = ({
  showCancel = true,
  cancelText = "Cancel",
  cancelProps = {},
  onCancel,
  showSave = true,
  saveText = "Save",
  saveProps = {},
  saveType = "submit",
  onSave = () => {},
  className,
  classNames = { container: "", cancel: "", save: "" },
  cancelExtra = null,
  saveExtra = null,
  middleExtra = null,
  children,
  sticky = false,
}) => {
  const { pathname } = useLocation();
  const { goToViewForm, goBack } = useFormUtils();

  const handleCancel = () => {
    if (onCancel) onCancel();
    else {
      if (pathname.includes("/edit")) goToViewForm();
      else if (pathname.includes("/new")) goBack(pathname.replace("/new", ""));
    }
  };

  return (
    <div
      className={cn(
        "w-[100%] border-y px-3 md:px-6 flex justify-between items-center gap-2 min-h-[60px] backdrop-blur",
        classNames.container || "",
        sticky
          ? "sticky bottom-0 bg-gradient-to-t from-[hsl(var(--background))] to-transparent justify-self-end z-[5]"
          : "",
        className || ""
      )}
    >
      {children || (
        <>
          <div className="flex items-center gap-2">
            {showCancel && (
              <Button
                onClick={handleCancel}
                htmlType="button"
                className={cn("px-6", classNames.cancel)}
                {...cancelProps}
              >
                {cancelText}
              </Button>
            )}
            {cancelExtra}
          </div>
          {middleExtra}
          <div className="flex items-center gap-4">
            {saveExtra}
            {showSave && (
              <Button
                onClick={onSave}
                type="primary"
                htmlType={saveType}
                className={cn("px-8", classNames.save)}
                {...saveProps}
              >
                {saveText}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const ErrorTooltip = ({ errors, children }) => (
  <Tooltip
    trigger={"focus"}
    title={
      <Typography.Text type="danger" className="list-decimal list-inside">
        {errors?.map((err) => (
          <li>{err}</li>
        ))}
      </Typography.Text>
    }
    open={errors?.length ? true : false}
    zIndex={3}
  >
    <span className="w-full">{children}</span>
  </Tooltip>
);
