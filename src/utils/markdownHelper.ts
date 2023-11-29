import { state } from "../states";
import { KeyEnum } from "../typing";

export const parseMarkdown = (type: KeyEnum, key: string) => {
  // console.log(type, key);
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
  let output = {
    method: "",
    summary: "",
    description: "",
    propertiesString: "",
    response: "",
  };
  const path = state.session.openapi?.paths[key];

  for (const method in path) {
    const { summary, description, requestBody } = path[method];
    let propertiesString = "";

    if (requestBody !== null) {
      const properties =
        requestBody?.content["application/x-www-form-urlencoded"].schema
          .properties ?? undefined;
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
      response:
        path[method]["x-resp"] == null
          ? ""
          : JSON.stringify(
              JSON.parse(path[method]["x-resp"] as string),
              null,
              4
            ),
    };
  }

  return `
  # ${output?.summary}
  > ${output?.description}

  #### METHOD
  \`\`\`
  ${output?.method}
  \`\`\`
  
  #### URI
  \`\`\`
  ${key}
  \`\`\`

  #### PARAMS
  | name | type | required | description |
  | ---- | ---- | ---- | ---- |
  ${output?.propertiesString}

  #### RESPONSE
  \`\`\`json
  ${output?.response}
  \`\`\`
  
  `;
};

const parseDatabase = (key: string) => {
  let output = "";

  const components = state.session.openapi?.components.schemas;
  if (components === undefined) return output;
  if (components?.[key] === undefined) return output;

  const { title, properties } = components?.[key] ?? {};
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

  const input = state.session.openapi?.components.schemas;
  for (const key in input) {
    if (input[key]["x-type"] !== "enum") continue;
    const { title, properties } = input[key];
    const enumOutput = JSON.stringify(properties);

    output += `// ${title}\n`;
    output += `export const ${key} = ${enumOutput};\n\n`;
  }
  // console.log("output: ", output);
  return `
  \`\`\`javascript
  ${output}
  \`\`\`
  `;
};
