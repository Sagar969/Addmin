import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { convertText } from "../../../../lib/utils/nav";
import PageTitle from "../../../../components/template/PageTitle";
import { Form, Tabs, Collapse, Divider } from "antd";
import { FormFooter, FormItem } from "../../../../components/shared/FormItems";
import { adminFunction } from "../../../../routers/AdminPanelRouter";
import {
  ModuleFormInitialData,
  ModuleStaticData,
  fieldTypes,
} from "../../../../lib/data/StaticData";
import { draggableFormComponents } from "../../../../lib/data/FormData";
import FormContent from "../../components/modules/other/FormContent";
import TabItemModal from "../../components/modules/modals/TabItemModal";
import FormComponentModal from "../../components/modules/modals/FormComponentModal";
import DragItem from "../../../../components/DragItem";
import DropZone from "../../../../components/DropZone";

const ModuleContext = createContext();

// New component for the sidebar with draggable items
const FormComponentsSidebar = () => {
  return (
    <div className="w-64 bg-white p-4 border-r sticky bottom-0 h-full overflow-y-auto scrollbar">
      <h3 className="text-lg font-semibold mb-4">Add Components</h3>
      <div className="space-y-4">
        {draggableFormComponents.map((category, index) => (
          <div key={index}>
            <Divider className="my-2" orientation="center">
              <span className="text-sm opacity-50 font-semibold">
                {category.title}
              </span>
            </Divider>
            <div className="space-y-2">
              {category.items.map((component) => (
                <DragItem
                  key={component.type}
                  data={component}
                  className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>{component.icon}</span>
                    <span>{component.label}</span>
                  </div>
                </DragItem>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ModuleManage() {
  const { pathname } = useLocation();
  const { moduleKey } = useParams();

  const [utils, setUtils] = useState({
    isEditing:
      pathname.includes("modules/new") || pathname.includes("modules/edit/"),
    isAdd: pathname.includes("modules/new"),
    tabModalProps: {
      isOpen: false,
      mode: "add",
      editData: null,
    },
    formComponentModalProps: {
      type: null,
      isOpen: false,
      mode: "add",
      editData: null,
      location: [],
    },
  });
  const updateUtils = (newUtils) =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  const [form] = Form.useForm();

  const handleSubmit = (data) => {
    console.log(data);
  };

  const handleSetModuleData = (iteration) => {
    if (iteration > 5) return;
    const module = adminFunction.getModuleByKey(moduleKey);
    form.setFieldsValue(module);
    if (!module) setTimeout(() => handleSetModuleData(iteration + 1), 100);
  };

  useEffect(() => {
    if (
      pathname.includes("modules/view/") ||
      pathname.includes("modules/edit/")
    ) {
      handleSetModuleData(1);
    } else {
      form.resetFields();
    }
    updateUtils({
      isEditing:
        pathname.includes("modules/edit/") || pathname.includes("modules/new"),
      isAdd: pathname.includes("modules/new"),
    });
  }, [pathname]);

  const handleAddTabItem = (addData) => {
    if (utils.tabModalProps.mode === "edit") {
      form.setFieldValue(
        ["form", "tabs"],
        form
          .getFieldValue(["form", "tabs"])
          .map((tab) =>
            tab.tabKey === utils.tabModalProps.editData.tabKey
              ? { ...tab, ...addData }
              : tab
          )
      );
    } else
      form.setFieldValue(
        ["form", "tabs"],
        [...(form.getFieldValue(["form", "tabs"]) || []), addData]
      );
    updateUtils({
      tabModalProps: { ...utils.tabModalProps, isOpen: false },
    });
  };

  const handleDrop = (data) => {
    // Handle the dropped component
    console.log("Dropped component:", data);
    // Open the FormComponentModal with the dropped component type
    updateUtils({
      formComponentModalProps: {
        type: data.type,
        isOpen: true,
        mode: "add",
        editData: null,
        location: [], // Set appropriate location based on where it was dropped
      },
    });
  };

  return (
    <>
      <ModuleContext.Provider
        value={{ topUtils: utils, updateTopUtils: updateUtils, form }}
      >
        <TabItemModal
          {...utils.tabModalProps}
          setIsOpen={(value) =>
            updateUtils({
              tabModalProps: { ...utils.tabModalProps, isOpen: value },
            })
          }
          onSubmit={handleAddTabItem}
          form={form}
        />
        <FormComponentModal
          {...utils.formComponentModalProps}
          form={form}
          setIsOpen={(value) =>
            updateUtils({
              formComponentModalProps: {
                ...utils.formComponentModalProps,
                isOpen: value,
              },
            })
          }
        />
        <div className="h-full flex">
          <FormComponentsSidebar />

          <div className="flex-1 flex flex-col h-full scrollbar">
            <PageTitle
              title={`${
                utils.isAdd ? "Add" : utils.isEditing ? "Edit" : "View"
              } Module`}
              caption={
                utils.isAdd
                  ? "Create new custom module"
                  : `Module: ${convertText(moduleKey, "name")}`
              }
            />
            <div className="flex-1 px-3">
              <Form
                form={form}
                name="custom-module-form"
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={ModuleFormInitialData}
              >
                <div className="grid grid-cols-3 gap-x-3">
                  <FormItem
                    label="Module Name"
                    name="moduleName"
                    required
                    formItemProps={{
                      getValueFromEvent: (e) => {
                        form.setFieldValue(
                          "moduleKey",
                          convertText(e.target.value, "url")
                        );
                        return e.target.value;
                      },
                    }}
                  />
                  <FormItem
                    label="Module Key"
                    name="moduleKey"
                    required
                    disabled
                    inputProps={{ placeholder: "Module key" }}
                  />
                  <FormItem
                    label="Status"
                    name="status"
                    required
                    type="Select"
                    disabled={utils.isAdd || !utils.isEditing}
                    inputProps={{
                      options: ModuleStaticData.moduleStatuses.map((item) => ({
                        lable: item,
                        value: item,
                      })),
                    }}
                  />
                </div>
                <FormItem
                  label="Module Description"
                  name="moduleDescription"
                  required
                />
                <DropZone
                  onDrop={handleDrop}
                  acceptedTypes={draggableFormComponents.flatMap((category) =>
                    category.items.map((item) => item.type)
                  )}
                  className="min-h-[200px] p-4"
                >
                  <FormContent
                    form={form}
                    parentUtils={utils}
                    updateParentUtils={updateUtils}
                  />
                </DropZone>
              </Form>
            </div>
            {utils.isEditing && <FormFooter sticky onSave={form.submit} />}
          </div>
        </div>
      </ModuleContext.Provider>
    </>
  );
}

export const useModuleContext = () => useContext(ModuleContext) || {};
