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
    responseString: "",
    responseIntroString: "",
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
    if (propertiesString !== "") {
      propertiesString =
        "#### Params\n| name | type | required | description |\n  | ---- | ---- | ---- | ---- |\n" +
        propertiesString;
    }

    const responseIntro = path[method]["x-response-intro-json"] ?? undefined;
    let responseIntroJson;
    if (responseIntro) {
      responseIntroJson = JSON.parse(responseIntro) as Record<string, any>[];
    } else {
      responseIntroJson = JSON.parse("[]") as Record<string, any>[];
    }

    let responseIntroString = "";
    if (responseIntroJson.length > 0) {
      responseIntroJson.forEach(
        (item: {
          name?: string;
          type?: string;
          required?: string;
          intro?: string;
        }) => {
          responseIntroString += `| ${item?.name ?? ""} | ${
            item?.type ?? ""
          } | ${item?.required ?? ""} | ${item?.intro ?? ""} |\n`;
        }
      );
    }
    if (responseIntroString !== "") {
      responseIntroString =
        "#### Response Description\n| name | type | required | description |\n  | ---- | ---- | ---- | ---- |\n" +
        responseIntroString;
    }

    let responseString =
      path[method]["x-response-json"] == null
        ? ""
        : JSON.stringify(
            JSON.parse(path[method]["x-response-json"] as string),
            null,
            4
          );
    if (responseString !== "") {
      responseString =
        "#### Response Example\n```\n" + responseString + "\n```\n";
    }

    output = {
      method,
      summary,
      description,
      propertiesString,
      responseString: responseString,
      responseIntroString: responseIntroString,
    };
  }

  return `
  # ${output?.summary}
  > ${output?.description}

  #### Method
  \`\`\`
  ${output?.method}
  \`\`\`
  
  #### URI
  \`\`\`
  ${key}
  \`\`\`

  ${output?.propertiesString}

  ${output?.responseString}
  
  ${output?.responseIntroString}
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
