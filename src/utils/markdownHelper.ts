/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { state } from "../states";
import { KeyEnum } from "../typing";

export const parseMarkdown = (type: KeyEnum, key: string) => {
  console.log(type, key);
  switch (type) {
    case "api":
      return parseApi(key);
    case "db":
      return parseDatabase(key);
    case "enum":
      return parseEnum();
    default:
      return "# helloworld";
  }
};

const parseApi = (key: string) => {
  // const api = state.session.openapi?.paths[key] ?? undefined;
  // if (!api) return "";
  let output = {} as any;
  const input = state.session.openapi?.paths[key];

  for (const method in input) {
    const { summary, description, requestBody } = input[method];
    let propertiesString = "";

    if (requestBody !== null) {
      const properties =
        requestBody.content["application/x-www-form-urlencoded"].schema
          .properties ?? {};
      for (const key in properties) {
        const property = properties[key];
        const required = property?.required ? "Y" : "-";
        propertiesString += `| ${key} | ${property?.type} | ${required} | ${property?.description} |\n`;
      }
    }

    output = {
      method,
      summary,
      description,
      propertiesString,
    };
  }

  return `
  # ${output?.summary || ""}
  > ${output?.description || ""}

  #### METHOD
  \`\`\`
  ${output?.method || ""}
  \`\`\`
  
  #### URI
  \`\`\`
  ${key}
  \`\`\`

  #### PARAMS
  | name | type | required | description |
  | ---- | ---- | ---- | ---- |
  ${output?.propertiesString}
  
  `;
};

const parseDatabase = (key: string) => {
  let output = "";

  const input = state.session.openapi?.components;
  const { title, properties } = input?.[key];
  let propertiesOutput = "";

  for (const propKey in properties) {
    const { type, description, required } = properties[propKey];
    const notnull = required === "required" ? "YES" : "NO";
    propertiesOutput += `| ${propKey} | ${type} |  |  |  | ${notnull} |  | ${
      description || ""
    } |\n`;
  }

  output += `
  # ${key}
  > ${title}
  
  | name | type | length | precision | scale | notnull | default | comment |
  | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
  ${propertiesOutput}
  `;

  return output;
};

const parseEnum = () => {
  let output = "";

  const input = state.session.openapi?.components;
  for (const key in input) {
    if (input[key]["x-type"] !== "enum") continue;
    const { title, properties } = input[key];
    const enumOutput = JSON.stringify(properties, null, 2);

    output += `// ${title}\n`;
    output += `export const ${key} = ${enumOutput};\n\n`;
  }
  console.log("output: ", output);
  return `
  \`\`\`javascript
  ${output}
  \`\`\`
  `;
};
