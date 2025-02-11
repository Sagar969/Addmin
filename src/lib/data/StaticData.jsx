import {
  LuLayoutGrid,
  LuMinus,
  LuTable,
  LuTextCursorInput,
} from "react-icons/lu";

export const ModuleStaticData = {
  moduleStatuses: ["Draft", "Active", "Inactive"],
};

export const ContainerFormComponents = [
  { label: "Table", key: "table", icon: <LuTable /> },
  { label: "Field Group", key: "fieldGroup", icon: <LuLayoutGrid /> },
  { label: "Group", key: "group", icon: <LuLayoutGrid /> },
];
export const BaseFormComponents = [
  { label: "Divider", key: "divider", icon: <LuMinus /> },
  { label: "Field", key: "field", icon: <LuTextCursorInput /> },
];

export const AllFormComponents = [
  {
    label: "Field",
    value: "field",
    icon: <LuTextCursorInput />,
  },
  {
    label: "Group",
    value: "group",
    icon: <LuLayoutGrid />,
  },
  {
    label: "Field Group",
    value: "fieldGroup",
    icon: <LuLayoutGrid />,
  },
  {
    label: "Table",
    value: "table",
    icon: <LuTable />,
  },
  {
    label: "Divider",
    value: "divider",
    icon: <LuMinus />,
  },
];
export const ALLINPUTPROPS = [
  {
    label: "Required",
    value: "isRequired",
    type: "Checkbox",
    description: "Marks the field as required",
    default: true,
  },
  {
    label: "Disabled",
    value: "isDisabled",
    type: "Checkbox",
    description: "Disables the field, making it uneditable",
    default: false,
  },
  {
    label: "Read Only",
    value: "isReadonly",
    type: "Checkbox",
    description: "Marks the field as read-only",
    default: false,
  },
  {
    label: "Hidden",
    value: "isHidden",
    type: "Checkbox",
    description: "Hides the field from view",
    default: false,
  },
  {
    label: "Placeholder",
    value: "placeholder",
    type: "Text",
    description: "Text displayed as a hint in the field",
  },
  {
    label: "Min Length",
    value: "minLength",
    type: "Number",
    description: "Minimum number of characters allowed",
    default: 1,
  },
  {
    label: "Max Length",
    value: "maxLength",
    type: "Number",
    description: "Maximum number of characters allowed",
  },
  {
    label: "Min",
    value: "min",
    type: "Number",
    description: "Minimum numeric value allowed",
    default: 1,
  },
  {
    label: "Max",
    value: "max",
    type: "Number",
    description: "Maximum numeric value allowed",
  },
  {
    label: "Pattern",
    value: "pattern",
    type: "Text",
    description: "Regex pattern for input validation",
  },
  {
    label: "Help",
    value: "help",
    type: "Text",
    description: "Additional instructions for the field",
  },
  {
    label: "Default Value",
    value: "defaultValue",
    type: "Text",
    description: "Initial value for the field",
  },
  {
    label: "Toggle Visibility",
    value: "isToggleVisibility",
    type: "Checkbox",
    description: "Enable password visibility toggle for Password fields",
    default: true,
  },
  {
    label: "Options",
    value: "options",
    type: "Select",
    description: "Dropdown options for select-type fields",
  },
  {
    label: "Multiple",
    value: "isMultiple",
    type: "Checkbox",
    description: "Allow multiple selections",
    default: false,
  },
  {
    label: "Search",
    value: "search",
    type: "Checkbox",
    description: "Enable search functionality in dropdowns",
  },
  {
    label: "Step",
    value: "step",
    type: "Number",
    description: "Incremental step value for numbers or ranges",
    default: 1,
  },
  {
    label: "Accept",
    value: "accept",
    type: "Text",
    description: "Accepted file types for upload fields",
  },
  {
    label: "Max Size",
    value: "maxSize",
    type: "Number",
    description: "Maximum file size allowed (in KB)",
  },
  {
    label: "Thumbnail",
    value: "thumbnail",
    type: "Checkbox",
    description: "Display a thumbnail for uploaded files (image/video)",
  },
  {
    label: "Format",
    value: "format",
    type: "Text",
    description: "Formatting for date, time, or number fields",
  },
];

export const fieldTypes = {
  "Text and Numbers": [
    {
      name: "Text",
      props: [
        "isRequired",
        "isDisabled",
        "isReadonly",
        "isHidden",
        "placeholder",
        "minLength",
        "maxLength",
        "pattern",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Textarea",
      props: [
        "isRequired",
        "isDisabled",
        "isReadonly",
        "isHidden",
        "placeholder",
        "minLength",
        "maxLength",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Number",
      props: [
        "isRequired",
        "isDisabled",
        "isReadonly",
        "isHidden",
        "min",
        "max",
        "step",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Email",
      props: [
        "required",
        "disabled",
        "readonly",
        "hidden",
        "placeholder",
        "pattern",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Url",
      props: [
        "required",
        "disabled",
        "readonly",
        "hidden",
        "placeholder",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Tel",
      props: [
        "required",
        "disabled",
        "readonly",
        "hidden",
        "placeholder",
        "pattern",
        "help",
      ],
    },
    {
      name: "Search",
      props: [
        "required",
        "disabled",
        "readonly",
        "placeholder",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Password",
      props: [
        "required",
        "disabled",
        "readonly",
        "hidden",
        "placeholder",
        "toggleVisibility",
        "help",
      ],
    },
  ],
  "Date and Time": [
    {
      name: "Date",
      props: [
        "required",
        "disabled",
        "hidden",
        "defaultValue",
        "min",
        "max",
        "format",
        "help",
      ],
    },
    {
      name: "Time",
      props: [
        "required",
        "disabled",
        "hidden",
        "defaultValue",
        "format",
        "help",
      ],
    },
    {
      name: "DateTime",
      props: [
        "required",
        "disabled",
        "hidden",
        "defaultValue",
        "format",
        "help",
      ],
    },
    {
      name: "Date Range",
      props: ["required", "defaultValue", "min", "max", "format", "help"],
    },
    {
      name: "Time Range",
      props: ["required", "defaultValue", "format", "help"],
    },
    {
      name: "DateTime Range",
      props: ["required", "defaultValue", "format", "help"],
    },
    {
      name: "Month",
      props: ["required", "defaultValue", "help"],
    },
    {
      name: "Week",
      props: ["required", "defaultValue", "help"],
    },
  ],
  Files: [
    {
      name: "File",
      props: ["required", "accept", "maxSize", "multiple", "help"],
    },
    {
      name: "Image",
      props: ["required", "accept", "maxSize", "multiple", "thumbnail", "help"],
    },
    {
      name: "Video",
      props: ["required", "accept", "maxSize", "help"],
    },
    {
      name: "Audio",
      props: ["required", "accept", "maxSize", "help"],
    },
  ],
  Pickers: [
    {
      name: "Select",
      props: [
        "required",
        "options",
        "multiple",
        "search",
        "help",
        "defaultValue",
      ],
    },
    {
      name: "Radio",
      props: ["required", "options", "help", "defaultValue"],
    },
    {
      name: "Checkbox",
      props: ["required", "options", "help", "defaultValue"],
    },
    {
      name: "Color",
      props: ["required", "defaultValue", "help"],
    },
    {
      name: "Range",
      props: ["required", "min", "max", "step", "defaultValue", "help"],
    },
    {
      name: "Rating",
      props: ["required", "max", "defaultValue", "help"],
    },
  ],
};

export const ModuleFormInitialData = {
  status: ModuleStaticData.moduleStatuses[0],
  form: {
    tabs: [
      {
        tabName: "Primary",
        tabKey: "primary",
        tabOrder: 1,
        isDefault: true,
        groups: [
          {
            name: "Default 1",
            key: "default1",
            order: 1,
            isDefault: true,
            fieldGroups: [
              {
                name: "Default 1",
                key: "default1",
                order: 1,
                isDefault: true,
                options: { columns: 3 },
                fields: [
                  {
                    key: "name",
                    name: "Name",
                    type: "Text",
                    order: 1,
                    properties: {
                      colspan: 1,
                      placeholder: "Enter Name",
                      description: "Name",
                      defaultValue: null,
                      isRequired: true,
                      inputProps: {},
                      formItemProps: {},
                    },
                  },
                ],
              },
              {
                name: "Default 2",
                key: "default2",
                order: 2,
                isDefault: true,
                options: { columns: 3 },
                fields: [
                  {
                    key: "name",
                    name: "Name",
                    type: "Text",
                    order: 1,
                    properties: {
                      colspan: 1,
                      placeholder: "Enter Name",
                      description: "Name",
                      defaultValue: null,
                      isRequired: true,
                      inputProps: {},
                      formItemProps: {},
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Default 2",
            key: "default2",
            order: 2,
            isDefault: true,
            fieldGroups: [
              {
                name: "Default 1",
                key: "default1",
                order: 1,
                isDefault: true,
                options: { columns: 3 },
                fields: [
                  {
                    key: "age",
                    name: "Age",
                    type: "Number",
                    order: 1,
                    properties: {
                      colspan: 1,
                      placeholder: "Enter Age",
                      description: "Age",
                      defaultValue: null,
                      isRequired: true,
                      inputProps: {},
                      formItemProps: {},
                    },
                  },
                ],
              },
              {
                name: "Default 2",
                key: "default2",
                order: 2,
                isDefault: true,
                options: { columns: 3 },
                fields: [
                  {
                    key: "age",
                    name: "Age",
                    type: "Number",
                    order: 1,
                    properties: {
                      colspan: 1,
                      placeholder: "Enter Age",
                      description: "Age",
                      defaultValue: null,
                      isRequired: true,
                      inputProps: {},
                      formItemProps: {},
                    },
                  },
                ],
              },
              {
                name: "Default 3",
                key: "default3",
                order: 3,
                isDefault: true,
                options: { columns: 3 },
                fields: [
                  {
                    key: "age",
                    name: "Age",
                    type: "Number",
                    order: 1,
                    properties: {
                      colspan: 1,
                      placeholder: "Enter Age",
                      description: "Age",
                      defaultValue: null,
                      isRequired: true,
                      inputProps: {},
                      formItemProps: {},
                    },
                  },
                ],
              },
            ],
          },
        ],
        dividers: [
          {
            name: "Default 1",
            key: "default1",
            order: 1,
          },
        ],
      },
      {
        tabName: "Tax",
        tabKey: "tax",
        tabOrder: 2,
      },
    ],
  },
};
