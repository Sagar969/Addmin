import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { LuAlertCircle } from "react-icons/lu";

export let PopModal = {
  confirm: () => console.log("default confirm"),
  alert: () => console.log("default alert"),
  update: () => console.log("default update"),
  close: () => console.log("default close"),
};

const defaultOptions = {
  open: false,
  title: "Confirm",
  content: "Are you sure?",
  centered: true,
  okButton: true,
  okText: "Yes",
  okType: "primary",
  okDanger: false,
  okButtonProps: {},
  onOk: () => {},
  cancelButton: true,
  cancelType: "default",
  cancelDanger: false,
  onCancel: () => {},
  cancelText: "Cancel",
  cancelButtonProps: {},
  footer: null,
  zIndex: 2000,
};

export default function PopModals() {
  const [options, setOptions] = useState(defaultOptions);
  const updateOptions = (configOptions) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...configOptions }));
  };

  useEffect(() => {
    PopModal = {
      confirm: (configOptions) =>
        updateOptions({ ...defaultOptions, ...configOptions, open: true }),
      alert: (configOptions) =>
        updateOptions({
          ...defaultOptions,
          ...configOptions,
          cancelButton: false,
          open: true,
        }),
      update: (configOptions) =>
        updateOptions({ ...defaultOptions, open: true, ...configOptions }),
      close: () => updateOptions({ ...defaultOptions, open: false }),
    };
  }, []);

  const handleOk = () => {
    options.onOk();
    PopModal.close();
  };

  const handleCancel = () => {
    options.onCancel();
    PopModal.close();
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-2">
            <LuAlertCircle color={options.okDanger ? "red" : "orange"} />
            <div>{options.title}</div>
          </div>
        }
        open={options.open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={options.centered || true}
        okText={options.okText}
        cancelText={options.cancelText}
        okType={options.okType}
        keyboard
        maskClosable
        zIndex={options.zIndex}
        footer={
          options.footer ? (
            options.footer(PopModal.close)
          ) : (
            <div className="flex items-center gap-5 justify-end">
              {options.cancelButton && (
                <Button
                  htmlType="button"
                  type={options.cancelType}
                  danger={options.cancelDanger}
                  onClick={handleCancel}
                  {...options.cancelButtonProps}
                >
                  {options.cancelText}
                </Button>
              )}
              {options.okButton && (
                <Button
                  htmlType="button"
                  type={options.okType}
                  danger={options.okDanger}
                  onClick={handleOk}
                  {...options.okButtonProps}
                >
                  {options.okText}
                </Button>
              )}
            </div>
          )
        }
      >
        {options.content}
      </Modal>
    </>
  );
}
