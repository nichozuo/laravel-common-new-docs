import { state } from "../states";
import { KeyEnum, NodeType } from "../typing";

export const parseMarkdown = (type: KeyEnum, key: string) => {
  console.log(type, key);
  switch (type) {
    case "api":
      return parseApi(key);
    case "db":
      return parseDatabase(key);
    case "enum":
      return parseEnum(key);
    default:
      return "# helloworld";
  }
};

const parseApi = (key: string) => {
  const apis = state.session.openapi?.extends?.data?.api;
  const node = apis?.[key] as NodeType;
  let properties = "";
  node.params?.forEach((param) => {
    const required = param?.required ? "Y" : "-";
    properties += `| ${param?.key} | ${param?.type} | ${required} | ${param?.description} |\n`;
  });

  return `
  # ${node?.title || ""}
  > ${node?.description || ""}

  #### METHOD
  \`\`\`
  ${node?.method || ""}
  \`\`\`
  
  #### URI
  \`\`\`
  ${key}
  \`\`\`

  #### PARAMS
  | name | type | required | description |
  | ---- | ---- | ---- | ---- |
  ${properties}
  
  #### RESPONSE
  \`\`\`json
  {
    "code": 0
    "message": "ok"
  }
  \`\`\`
  `;
};

const parseDatabase = (key: string) => {
  const db = state.session.openapi?.extends?.data?.db;
  const node = db?.[key] as NodeType;
  let properties = "";
  node.columns?.forEach((column) => {
    properties += `| ${column?.name} | ${column?.type} | ${
      column?.length || ""
    } | ${column?.precision} | ${column?.scale ?? ""} | ${
      column?.notNull ? "Y" : "-"
    } | ${column?.default ?? ""} | ${column?.comment ?? ""} |\n`;
  });

  return `
  # ${node.title}
  > ${node.description}
  
  | name | type | length | precision | scale | notnull | default | comment |
  | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
  ${properties}
  `;
};

const parseEnum = (key: string) => {
  const enums = state.session.openapi?.extends?.data?.enum;
  const node = enums?.[key] as NodeType;
  let properties = "";
  node.consts?.forEach((item) => {
    properties += `| ${item?.label} | ${item?.value} | ${item?.color} |\n`;
  });

  return `
  # ${node.title}
  > ${node.description}
  
  | label | value | color |
  | ---- | ---- | ---- |
  ${properties}
  `;
};
