import {
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Space,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import {
  LuChevronDown,
  LuInfo,
  LuMinus,
  LuMoreVertical,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import { PopModal } from "../../../../../components/shared/PopModals";
import { useEffect, useState } from "react";
import { useModuleContext } from "../../../screens/Modules/ModuleManage";
import {
  BaseFormComponents,
  ContainerFormComponents,
} from "../../../../../lib/data/StaticData";
import { cn } from "../../../../../lib/utils/cn";

const leftMarginIcon = (icon) => <span className="ms-4">{icon}</span>;

export default function FormContent({ form, parentUtils, updateParentUtils }) {
  const [utils, setUtils] = useState({ isAddTabModal: true });
  const updateUtils = (newUtils) =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  const handleDeleteTab = (key) => {
    form.setFieldValue(
      ["form", "tabs"],
      [
        ...(form
          .getFieldValue(["form", "tabs"])
          ?.filter((tab) => tab.tabKey !== key) || []),
      ]
    );
  };
  return (
    <>
      <Form.Item
        shouldUpdate={(prev, curr) =>
          JSON.stringify(prev.form?.tabs) !== JSON.stringify(curr.form?.tabs)
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const tabs = getFieldValue(["form", "tabs"]) || [];
          return (
            <Tabs
              type="card"
              renderTabBar={(tabProps, DefaultTabBar) => (
                <div className="tabsWithStickyBar pt-2 sticky top-0 backdrop-blur z-[1] bg-gradient-to-b from-[hsl(var(--background))] to-transparent">
                  <DefaultTabBar
                    {...tabProps}
                    style={{
                      marginBottom: 0,
                    }}
                  />
                </div>
              )}
              items={tabs
                .sort((a, b) => a.tabOrder - b.tabOrder)
                .map((tab, index) => ({
                  label: (
                    <div className="flex items-center gap-2">
                      <Tooltip
                        title={
                          <ToolTipKeyValuePairs
                            content={[
                              { key: "Key", value: tab.tabKey },
                              { key: "Order number", value: tab.tabOrder },
                            ]}
                          />
                        }
                        trigger={"hover"}
                      >
                        <span>{tab.tabName}</span>
                      </Tooltip>
                      {tabs.length > 1 && (
                        <Dropdown
                          menu={{
                            items: [
                              {
                                label: "Edit",
                                key: "edit",
                                icon: <LuPencil />,
                                onClick: () => {
                                  updateParentUtils({
                                    tabModalProps: {
                                      ...parentUtils.tabModalProps,
                                      isOpen: true,
                                      mode: "edit",
                                      editData: tab,
                                    },
                                  });
                                },
                              },
                              {
                                label: "Delete",
                                key: "delete",
                                icon: <LuTrash2 />,
                                danger: true,
                                onClick: () => {
                                  PopModal.confirm({
                                    title: "Delete Tab!",
                                    content:
                                      "You will lose this tab and its content!",
                                    okDanger: true,
                                    okText: "Delete",
                                    cancelText: "Cancel",
                                    onOk: () => handleDeleteTab(tab.tabKey),
                                  });
                                },
                              },
                            ],
                          }}
                          trigger={"click"}
                        >
                          <Button
                            icon={<LuMoreVertical />}
                            type="text"
                            className="p-0"
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Dropdown>
                      )}
                    </div>
                  ),
                  key: tab.tabKey,
                  children: (
                    <TabItem
                      tabIndex={index}
                      tabKey={tab.tabKey}
                      tabName={tab.tabName}
                    />
                  ),
                }))}
              tabBarExtraContent={
                <Button
                  icon={<LuPlus />}
                  type="primary"
                  ghost
                  onClick={() =>
                    updateParentUtils({
                      tabModalProps: {
                        ...parentUtils.tabModalProps,
                        isOpen: true,
                        mode: "add",
                        editData: null,
                      },
                    })
                  }
                >
                  Add
                </Button>
              }
            />
          );
        }}
      </Form.Item>
    </>
  );
}

const TabItem = ({ tabIndex, tabKey, tabName }) => {
  const { form, topUtils, updateTopUtils } = useModuleContext();
  const groups =
    Form.useWatch(["form", "tabs", tabIndex, "groups"], {
      form,
      preserve: true,
    }) || [];

  const [utils, setUtils] = useState({
    selectedComponents: [],
    componentAddDropdown: { button: [], menuItems: [] },
  });
  const updateUtils = (newUtils) =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  const handleManageComponent = (
    type,
    location = [],
    mode = "add",
    editData = null
  ) => {
    console.log(editData);
    updateTopUtils({
      formComponentModalProps: {
        isOpen: true,
        type,
        mode,
        editData,
        location,
      },
    });
  };
  const handleDeleteComponent = (names, key) => {
    form.setFieldValue(
      ["form", "tabs", tabIndex, ...names],
      [
        ...(form
          .getFieldValue(["form", "tabs", tabIndex, ...names])
          ?.filter((item) => key !== item.key) || []),
      ]
    );
  };

  const handleSelectComponentInDropdown = (keyPath = []) => {
    updateUtils({
      selectedComponents: keyPath.reverse().reduce((acc, curr, i, arr) => {
        const componentKey = curr.split("-");
        if (componentKey[1] === "grp") {
          const grp = groups?.find((grp) => grp.key === componentKey[0]);
          if (grp) acc.push({ label: grp.name, key: grp.key });
        }
        if (componentKey[1] === "fgrp") {
          let grp;
          if (arr.length > 1) {
            grp = groups?.find((grp) => grp.key === arr[i - 1].split("-")[0]);
          } else {
            grp = groups?.find(
              (grp) => grp.key === utils.selectedComponents[0]?.key
            );
            if (grp) acc.push({ label: grp.name, key: grp.key });
          }
          const fgrp = grp?.fieldGroups?.find(
            (fgrp) => fgrp.key === componentKey[0]
          );
          if (fgrp) acc.push({ label: fgrp.name, key: fgrp.key });
        }
        return acc;
      }, []),
    });
  };

  useEffect(() => {
    switch (utils.selectedComponents.length) {
      case 0:
        updateUtils({
          componentAddDropdown: {
            button: { label: "Group", key: "group" },
            menuItems: [
              {
                ...BaseFormComponents[0],
                icon: <LuPlus />,
                itemIcon: leftMarginIcon(BaseFormComponents[0].icon),
              },
            ],
          },
        });
        break;
      case 1:
        updateUtils({
          componentAddDropdown: {
            button: { label: "Field Group", key: "fieldGroup" },
            menuItems: [
              ...ContainerFormComponents.slice(-1).map((item) => ({
                ...item,
                icon: <LuPlus />,
                itemIcon: leftMarginIcon(item.icon),
              })),
              {
                ...BaseFormComponents[0],
                icon: <LuPlus />,
                itemIcon: leftMarginIcon(BaseFormComponents[0].icon),
              },
            ],
          },
        });
        break;
      default:
        updateUtils({
          componentAddDropdown: {
            button: { label: "Field", key: "field" },
            menuItems: [
              ...ContainerFormComponents.map((item) => ({
                ...item,
                icon: <LuPlus />,
                itemIcon: leftMarginIcon(item.icon),
              })),
              {
                ...BaseFormComponents[0],
                icon: <LuPlus />,
                itemIcon: leftMarginIcon(BaseFormComponents[0].icon),
              },
            ],
          },
        });
    }
  }, [utils.selectedComponents]);

  return (
    <>
      <div className="px-3">
        <div
          className="flex items-center gap-2 justify-between py-2 stickyBar"
          style={{ top: "46px" }}
        >
          <div className="flex items-center gap-2 ps-2">
            <span className="opacity-50">{tabName + "  >"}</span>
            <Breadcrumb
              separator=">"
              items={utils.selectedComponents.map((com, i) => ({
                title: com.label,
                menu: {
                  items:
                    i == 1
                      ? groups
                          ?.find(
                            (grp) =>
                              grp.key === utils.selectedComponents[0]?.key
                          )
                          ?.fieldGroups.map((fgrp) => ({
                            label: fgrp.name,
                            key: fgrp.key + "-fgrp",
                          }))
                      : groups?.map((grp) => ({
                          label: (
                            <span
                              onClick={() =>
                                handleSelectComponentInDropdown([grp.key])
                              }
                              className="w-full h-full block"
                            >
                              {grp.name}
                            </span>
                          ),
                          key: grp.key + "-grp",
                          children: grp.fieldGroups?.map((fgrp) => ({
                            label: fgrp.name,
                            key: fgrp.key + "-fgrp",
                          })),
                        })),
                  selectedKeys:
                    i == 1
                      ? [com?.key + "-fgrp"]
                      : [
                          utils.selectedComponents[1]?.key + "-fgrp",
                          com?.key + "-grp",
                        ],
                  onClick: (e) => handleSelectComponentInDropdown(e.keyPath),
                },
              }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Dropdown.Button
              icon={<LuChevronDown />}
              onClick={() => {
                switch (utils.selectedComponents.length) {
                  case 0:
                    handleManageComponent("group", [
                      { label: tabName, key: tabKey, index: tabIndex },
                    ]);
                    break;
                  case 1:
                    handleManageComponent("fieldGroup", [
                      { label: tabName, key: tabKey, index: tabIndex },
                      utils.selectedComponents[0],
                    ]);
                    break;
                  default:
                    handleManageComponent("field", [
                      { label: tabName, key: tabKey, index: tabIndex },
                      ...utils.selectedComponents,
                    ]);
                    break;
                }
              }}
              menu={{
                items: utils.componentAddDropdown.menuItems,
                onClick: (slc) => handleManageComponent(slc.key),
              }}
            >
              Add {utils.componentAddDropdown.button.label}
            </Dropdown.Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-4">
          {groups
            ?.sort((a, b) => a.order - b.order)
            .map((grp, grpIndex) => (
              <div
                key={grpIndex}
                className={cn(
                  "border border-gray-300 rounded-xl py-4 mt-8 px-2 relative",
                  utils.selectedComponents[0]?.key === grp.key
                    ? utils.selectedComponents.length > 1
                      ? "border-dashed border-blue-500"
                      : "border-blue-500"
                    : "border-dashed hover:border-gray-500"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  updateUtils({
                    selectedComponents: [
                      { label: grp.name, key: grp.key, index: grpIndex },
                    ],
                  });
                }}
                style={{}}
              >
                <ComponentInfo
                  componentName="Group"
                  component={grp}
                  onClick={(e) => {
                    if (e.key === "delete")
                      return PopModal.confirm({
                        title: `Delete Group!`,
                        content: `You will lose this group and its content!`,
                        okDanger: true,
                        okText: "Delete",
                        cancelText: "Cancel",
                        onOk: () => handleDeleteComponent(["groups"], grp.key),
                      });
                    else if (e.key === "edit")
                      handleManageComponent(
                        "group",
                        [{ label: tabName, key: tabKey, index: tabIndex }],
                        "edit",
                        grp
                      );
                    else
                      handleManageComponent(e.key, [
                        { label: tabName, key: tabKey, index: tabIndex },
                      ]);
                  }}
                />
                {grp.fieldGroups
                  ?.sort((a, b) => a.order - b.order)
                  ?.map((fieldGrp, fieldGrpIndex) => (
                    <div
                      key={fieldGrpIndex}
                      className={cn(
                        "border border-gray-300 rounded-xl mt-8 pb-4 pt-8 px-2 relative hover:border-blue-500",

                        utils.selectedComponents[0]?.key === grp.key &&
                          utils.selectedComponents[1]?.key === fieldGrp.key
                          ? "border-blue-500"
                          : "border-dashed hover:border-gray-500"
                      )}
                      style={
                        fieldGrp.options.columns
                          ? {
                              display: "grid",
                              gridTemplateColumns: `repeat(${fieldGrp.options.columns}, minmax(0, 1fr))`,
                            }
                          : {}
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        updateUtils({
                          selectedComponents: [
                            { label: grp.name, key: grp.key, index: grpIndex },
                            {
                              label: fieldGrp.name,
                              key: fieldGrp.key,
                              index: fieldGrpIndex,
                            },
                          ],
                        });
                      }}
                    >
                      <ComponentInfo
                        componentName="Field Group"
                        component={fieldGrp}
                        onClick={(e) => {
                          if (e.key === "delete")
                            return PopModal.confirm({
                              title: `Delete Field Group!`,
                              content: `You will lose this field group and its content!`,
                              okDanger: true,
                              okText: "Delete",
                              cancelText: "Cancel",
                              onOk: () =>
                                handleDeleteComponent(
                                  ["groups", grpIndex, "fieldGroups"],
                                  fieldGrp.key
                                ),
                            });
                          else if (e.key === "edit")
                            handleManageComponent(
                              "fieldGroup",
                              [
                                {
                                  label: tabName,
                                  key: tabKey,
                                  index: tabIndex,
                                },
                                {
                                  label: grp.name,
                                  key: grp.key,
                                  index: grpIndex,
                                },
                              ],
                              "edit",
                              fieldGrp
                            );
                          else
                            handleManageComponent(e.key, [
                              {
                                label: tabName,
                                key: tabKey,
                                index: tabIndex,
                              },
                              {
                                label: grp.name,
                                key: grp.key,
                                index: grpIndex,
                              },
                            ]);
                        }}
                      />
                      {fieldGrp.fields
                        ?.sort((a, b) => a.order - b.order)
                        ?.map((field, fieldIndex) => (
                          <FieldComponent
                            field={field}
                            key={fieldIndex}
                            onEdit={() =>
                              handleManageComponent(
                                "field",
                                [
                                  {
                                    label: tabName,
                                    key: tabKey,
                                    index: tabIndex,
                                  },
                                  {
                                    label: grp.name,
                                    key: grp.key,
                                    index: grpIndex,
                                  },
                                  {
                                    label: fieldGrp.name,
                                    key: fieldGrp.key,
                                    index: fieldGrpIndex,
                                  },
                                ],
                                "edit",
                                field
                              )
                            }
                            onDelete={() =>
                              handleDeleteComponent(
                                [
                                  "groups",
                                  grpIndex,
                                  "fieldGroups",
                                  fieldGrpIndex,
                                  "fields",
                                ],
                                field.key
                              )
                            }
                          />
                        ))}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const FieldComponent = ({ field, onEdit, onDelete }) => (
  <div
    style={
      field.options?.colspan
        ? {
            gridColumn: `span ${field.options?.colspan} / span ${field.options?.colspan}`,
          }
        : {}
    }
    className="flex flex-col gap-2"
  >
    <div className="flex items-center gap-10 justify-between ps-1">
      <div className="flex items-center gap-4">
        <span>{field.name}</span>
        <Tooltip
          title={
            <div onClick={(e) => e.stopPropagation()}>
              <p>Type: {field.type}</p>
              <p>Required: {field.options?.isRequired ? "Yes" : "No"}</p>
              <p>Default Value: {field.options?.defaultValue || "-"}</p>
              <p>Description: {field.options?.description || "-"}</p>
              <Divider className="!my-2 bg-white" />
              <p>key: {field.key}</p>
              <p>Order: {field.order}</p>
            </div>
          }
        >
          <span className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <LuInfo />
          </span>
        </Tooltip>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              label: "Edit",
              key: "edit",
              icon: <LuPencil />,
              onClick: onEdit,
            },
            {
              label: "Delete",
              key: "delete",
              icon: <LuTrash2 />,
              danger: true,
              onClick: () => {
                PopModal.confirm({
                  title: `Delete Field: ${field.name}!`,
                  content: `Are you sure you want to delete this field?`,
                  okDanger: true,
                  okText: "Delete",
                  cancelText: "Cancel",
                  onOk: onDelete,
                });
              },
            },
          ],
          onClick: (e) => e.domEvent.stopPropagation(),
        }}
        trigger={"click"}
      >
        <Button
          icon={<LuMoreVertical />}
          className="p-0"
          size="small"
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    </div>
    <Input placeholder={field.options?.placeholder} disabled />
  </div>
);

const ComponentInfo = ({ componentName, component, onClick }) => (
  <Space.Compact
    className="absolute -top-3 right-2"
    onClick={(e) => e.stopPropagation()}
  >
    <Tooltip
      title={
        <ToolTipKeyValuePairs
          content={[
            { key: "Key", value: component.key },
            { key: "Order number", value: component.order },
          ]}
        />
      }
    >
      <Tag
        color={component.isDefault ? "default" : "processing"}
        rootClassName="mr-0 rounded-r-none place-content-center"
      >
        {component.name}
      </Tag>
    </Tooltip>
    <Dropdown
      menu={{
        items: [
          ...(componentName === "Group"
            ? [
                ...ContainerFormComponents.slice(-2).map((item) => ({
                  ...item,
                  itemIcon: leftMarginIcon(item.icon),
                  icon: <LuPlus />,
                })),
                {
                  ...BaseFormComponents[0],
                  itemIcon: leftMarginIcon(BaseFormComponents[0].icon),
                  icon: <LuPlus />,
                },
              ]
            : componentName === "Field Group"
            ? [
                {
                  ...BaseFormComponents[1],
                  itemIcon: leftMarginIcon(BaseFormComponents[1].icon),
                  icon: <LuPlus />,
                },
                ...ContainerFormComponents.map((item) => ({
                  ...item,
                  itemIcon: leftMarginIcon(item.icon),
                  icon: <LuPlus />,
                })),
                {
                  ...BaseFormComponents[0],
                  itemIcon: leftMarginIcon(BaseFormComponents[0].icon),
                  icon: <LuPlus />,
                },
              ]
            : []),
          { type: "divider" },
          {
            label: "Edit",
            key: "edit",
            icon: <LuPencil />,
          },
          {
            label: "Delete",
            key: "delete",
            icon: <LuTrash2 />,
            danger: true,
          },
        ],
        onClick: onClick,
      }}
      trigger={"click"}
    >
      <Button
        icon={<LuMoreVertical />}
        className="p-0"
        size="small"
        // onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  </Space.Compact>
);

const ToolTipKeyValuePairs = ({ content = [] }) => (
  <div>
    {content.map((item, i) => (
      <p key={i}>
        {item.key}: {item.value}
      </p>
    ))}
  </div>
);

const SelectedBreadCrumb = ({ selectedComponents, groups }) => {
  const [selected, setSelected] = useState({ fieldGroups: [], fields: [] });

  useEffect(() => {
    const fgrp =
      groups?.find((grp) => grp.key === selectedComponents[0]?.key)
        ?.fieldGroups || [];
    const field =
      fgrp.find((f) => f.key === selectedComponents[1]?.key)?.fields || [];

    setSelected({
      fieldGroups: fgrp,
      fields: field,
    });
  }, [selectedComponents, groups]);

  const handleSelect = (data) => {
    console.log(data);
  };
  return (
    <Breadcrumb
      separator=">"
      items={selectedComponents.map((com, i) => ({
        title: com.label,
        menu: {
          items:
            i == 1
              ? selected.fieldGroups.map((fgrp) => ({
                  label: fgrp.name,
                  key: "fgrp-" + fgrp.key,
                  children: fgrp.fields?.map((field) => ({
                    label: field.name,
                    key: "field-" + field.key,
                  })),
                }))
              : groups?.map((grp) => ({
                  label: grp.name,
                  key: "grp-" + grp.key,
                  children: grp.fieldGroups?.map((fgrp) => ({
                    label: fgrp.name,
                    key: "fgrp-" + fgrp.key,
                    children: fgrp.fields?.map((field) => ({
                      label: field.name,
                      key: "field-" + field.key,
                    })),
                  })),
                })),
          onselect: handleSelect,
        },
      }))}
    />
  );
};
