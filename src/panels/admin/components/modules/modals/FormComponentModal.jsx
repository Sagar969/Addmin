import { Breadcrumb, Collapse, Form, Modal } from "antd";
import { Children, useEffect, useState } from "react";
import { hashArray } from "../../../../../lib/utils/dataManipulation";
import { FormItem } from "../../../../../components/shared/FormItems";
import {
  AllFormComponents,
  ALLINPUTPROPS,
  fieldTypes,
} from "../../../../../lib/data/StaticData";
import { convertText } from "../../../../../lib/utils/nav";
import { PropInput } from "../../../../../components/shared/Inputs";

export default function FormComponentModal({
  isOpen,
  setIsOpen,
  type = "group",
  mode = "add",
  location = [],
  editData,
  form,
}) {
  const [addForm] = Form.useForm();
  const [utils, setUtils] = useState({
    formComponentTypesHash: hashArray(AllFormComponents, "value", "label"),
  });
  const updateUtils = (newUtils) => setUtils({ ...utils, ...newUtils });

  const utilsFunc = {
    updateKeyOnNameChange: (value) => {
      addForm.setFieldValue("key", convertText(value, "key"));
      return value;
    },
  };

  const handleSubmit = (data) => {
    if (mode === "add") {
      switch (type) {
        case "fieldGroup":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
            ],
            [
              ...(form.getFieldValue([
                "form",
                "tabs",
                location[0].index,
                "groups",
                location[1].index,
                "fieldGroups",
              ]) || []),
              data,
            ]
          );
          break;
        case "table":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
              location[2].index,
              "tables",
            ],
            [
              ...(form.getFieldValue([
                "form",
                "tabs",
                location[0].index,
                "groups",
                location[1].index,
                "fieldGroups",
                location[2].index,
                "tables",
              ]) || []),
              data,
            ]
          );
          break;
        case "field":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
              location[2].index,
              "fields",
            ],
            [
              ...(form.getFieldValue([
                "form",
                "tabs",
                location[0].index,
                "groups",
                location[1].index,
                "fieldGroups",
                location[2].index,
                "fields",
              ]) || []),
              data,
            ]
          );
          break;
        default:
          form.setFieldValue(
            ["form", "tabs", location[0].index, "groups"],
            [
              ...(form.getFieldValue([
                "form",
                "tabs",
                location[0].index,
                "groups",
              ]) || []),
              data,
            ]
          );
          break;
      }
    } else {
      switch (type) {
        case "fieldGroup":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
              location[2].index,
            ],
            data
          );
          break;
        case "table":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
              location[2].index,
              "tables",
              location[3].index,
            ],
            data
          );
          break;
        case "field":
          form.setFieldValue(
            [
              "form",
              "tabs",
              location[0].index,
              "groups",
              location[1].index,
              "fieldGroups",
              location[2].index,
              "fields",
              location[3].index,
            ],
            data
          );
          break;
        default:
          form.setFieldValue(
            ["form", "tabs", location[0].index, "groups", location[1].index],
            data
          );
          break;
      }
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      addForm.resetFields();
      if (mode === "edit") addForm.setFieldsValue(editData);
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        title={
          (mode === "edit" ? "Edit " : "Add ") +
          utils.formComponentTypesHash[type] +
          (mode === "edit" ? ` "${editData?.name}"` : "")
        }
        okText="Add"
        onOk={addForm.submit}
        onCancel={() => setIsOpen(false)}
        width={1200}
        classNames={{ body: "max-h-[80vh] scrollbar" }}
      >
        <p className="font-medium mb-4">
          <Breadcrumb
            separator=">"
            items={location.map((item) => ({ title: item.label }))}
          />
        </p>
        <Form
          form={addForm}
          name="form-component-modules-modal-form"
          layout="vertical"
          onFinish={handleSubmit}
        >
          {type === "divider" ? (
            <DividerComponentForm addForm={addForm} utilsFunc={utilsFunc} />
          ) : type === "fieldGroup" ? (
            <FieldGroupComponentForm addForm={addForm} utilsFunc={utilsFunc} />
          ) : type === "table" ? (
            <TableComponentForm addForm={addForm} utilsFunc={utilsFunc} />
          ) : type === "field" ? (
            <FieldComponentForm addForm={addForm} utilsFunc={utilsFunc} />
          ) : (
            <GroupComponentForm addForm={addForm} utilsFunc={utilsFunc} />
          )}
        </Form>
      </Modal>
    </>
  );
}

const DividerComponentForm = ({ addForm }) => {
  const [utils, setUtils] = useState({ isDefault: false });
  useEffect(() => {
    addForm.setFieldsValue({ dividerName: "Default", isDefault: true });
  }, []);
  return (
    <>
      <FormItem
        label="Divider Name"
        name="dividerName"
        required
        disabled={utils.isDefault}
      />
      <FormItem
        messageLabel="Default"
        name="isDefault"
        type="Checkbox"
        initialValue={false}
        formItemProps={{
          getValueFromEvent: (e) => {
            if (e.target.checked) {
              addForm.setFieldsValue({ dividerName: "Default" });
              setUtils({ ...utils, isDefault: true });
            }
            return e.target.checked;
          },
        }}
      />
    </>
  );
};

const GroupComponentForm = ({ addForm, utilsFunc }) => {
  return (
    <>
      <FormItem
        label="Group Name"
        name="name"
        required
        formItemProps={{
          getValueFromEvent: (e) =>
            utilsFunc.updateKeyOnNameChange(e.target.value),
        }}
      />
      <FormItem label="Group Key" name="key" required disabled />
    </>
  );
};

const FieldGroupComponentForm = ({ addForm, utilsFunc }) => {
  return (
    <>
      <FormItem
        label="Field Group Name"
        name="name"
        required
        formItemProps={{
          getValueFromEvent: (e) =>
            utilsFunc.updateKeyOnNameChange(e.target.value),
        }}
      />
      <FormItem label="Field Group Key" name="key" required disabled />
      <FormItem
        label="Number of Columns (max: 4)"
        name="columns"
        initialValue={1}
        type="Number"
        required
        inputProps={{ min: 1, max: 4 }}
      />
    </>
  );
};

const TableComponentForm = ({ addForm, utilsFunc }) => {
  return (
    <>
      <FormItem
        label="Table Name"
        name="name"
        required
        formItemProps={{
          getValueFromEvent: (e) =>
            utilsFunc.updateKeyOnNameChange(e.target.value),
        }}
      />
      <FormItem label="Table Key" name="key" required disabled />
    </>
  );
};

const FieldComponentForm = ({ addForm, utilsFunc }) => {
  const fieldType = Form.useWatch("type", addForm);

  const [utils, setUtils] = useState({
    properties: [],
  });
  const updateUtils = (newUtils) =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  useEffect(() => {
    let properties = [];
    Object.keys(fieldTypes).forEach((key) => {
      const found = fieldTypes[key].find(
        (item) => item.name === fieldType
      )?.props;
      if (found) {
        properties = found;
        return;
      }
    });
    updateUtils({ properties });
  }, [fieldType]);
  return (
    <>
      <Collapse
        defaultActiveKey={[1]}
        ghost
        items={[
          {
            label: "Basic Details",
            key: 1,
            children: (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3">
                <FormItem
                  label="Field Name"
                  name="name"
                  required
                  formItemProps={{
                    getValueFromEvent: (e) =>
                      utilsFunc.updateKeyOnNameChange(e.target.value),
                  }}
                />
                <FormItem label="Field Key" name="key" required disabled />
                <FormItem
                  label="Field Type"
                  name="type"
                  required
                  type="Select"
                  inputProps={{
                    options: Object.keys(fieldTypes).map((type) => ({
                      label: type,
                      options: fieldTypes[type].map((item) => ({
                        label: item.name,
                        value: item.name,
                      })),
                    })),
                  }}
                />
              </div>
            ),
          },
          {
            label: "Properties",
            key: 2,
            children: (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3">
                {ALLINPUTPROPS.filter((inp) =>
                  utils.properties.includes(inp.value)
                ).map((inp) => (
                  <PropInput
                    label={inp.label}
                    name={["properties", inp.value]}
                    key={inp.value}
                    type={inp.type}
                    initialValue={inp.default}
                  />
                ))}
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
