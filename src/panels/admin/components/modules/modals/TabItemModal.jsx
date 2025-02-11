import { Form, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { FormItem } from "../../../../../components/shared/FormItems";
import { convertText } from "../../../../../lib/utils/nav";

export default function TabItemModal({
  isOpen,
  setIsOpen,
  onSubmit,
  mode = "add",
  editData,
  form,
}) {
  const [addForm] = Form.useForm();
  const tabKeys = useMemo(
    () => (form.getFieldValue(["form", "tabs"]) || []).map((tab) => tab.tabKey),
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit") addForm.setFieldsValue(editData);
      else addForm.resetFields();
    }
  }, [isOpen]);
  return (
    <>
      <Modal
        open={isOpen}
        title={mode == "add" ? "Add Tab" : "Edit Tab"}
        okText="Save"
        onOk={addForm.submit}
        onCancel={() => setIsOpen(false)}
      >
        <Form
          form={addForm}
          name="add-tab-in-module-modal-form"
          layout="vertical"
          onFinish={onSubmit}
          requiredMark={false}
        >
          <FormItem
            label="Tab Name"
            name="tabName"
            required
            formItemProps={{
              getValueFromEvent: (e) => {
                addForm.setFieldValue(
                  "tabKey",
                  convertText(e.target.value, "key")
                );
                return e.target.value;
              },
              rules: [
                {
                  required: true,
                  message: "Tab Key is required",
                },
                {
                  validator: (_, value) => {
                    console.log(value);
                    if (tabKeys.includes(value))
                      return Promise.reject(
                        "Tab already exists with this key! Change Tab name to change key"
                      );
                    return Promise.resolve();
                  },
                },
              ],
            }}
          />
          <FormItem
            label="Tab Key"
            name="tabKey"
            disabled
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: "Tab Key is required",
                },
                {
                  validator: (_, value) => {
                    console.log(value);
                    if (tabKeys.includes(value))
                      return Promise.reject(
                        "Tab already exists with this key! Change Tab name to change key"
                      );
                    return Promise.resolve();
                  },
                },
              ],
            }}
          />
          <FormItem
            label="Tab Order"
            name="tabOrder"
            required
            type="Number"
            inputProps={{ min: 1 }}
            inputClassName="w-full"
          />
        </Form>
      </Modal>
    </>
  );
}
