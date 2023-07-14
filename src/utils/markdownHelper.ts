import { OpenAPIObject, PathItemObject } from "../openapi";
import { state } from "../states";
import { TypeType } from "../typing";

export const parseMarkdown = (type: TypeType, key: string) => {
  console.log(type, key);
  switch (type) {
    case "api":
      return parseApi(key);
    case "database":
      return parseDatabase(key);
    default:
      return "# helloworld";
  }
};

const parseApi = (key: string) => {
  const openapi = state.session.openapi as OpenAPIObject;
  const api: PathItemObject | undefined = openapi.paths[key];
  console.log(api);
  return `
  # 获取用户信息 
  > 接口说明
  
  ### 请求方式
  \`\`\`
  POST
  \`\`\`

  ### 请求前缀
  \`\`\`
  /api/admin
  \`\`\`
  
  ### 请求后缀
  \`\`\`
  auth/login
  \`\`\`

  ### 请求参数
  
  | 名称 | 类型 | 描述 |
  | ---- | ---- | ---- |
  | userId | integer | 用户ID |
  
  ### 返回字段 
  
  | 名称 | 类型 | 描述 |
  | ---- | ---- | ---- |  
  | id | integer | 用户ID |
  | name | string | 用户名字 |
  | age | integer | 用户年龄 |
  
  ### 示例
  
  **请求示例**
  
  \`\`\`
  GET /users/123
  \`\`\`
  
  **返回示例**
  
  \`\`\`json
  {
    "id": 123,
    "name": "张三",
    "age": 20
  }
  \`\`\`
  
  ### 错误码
  
  | 错误码 | 描述 | 
  | ------ | ---- |
  | 10001 | 用户不存在 |
  | 10002 | 该接口暂未开放 |
  `;
};

const parseDatabase = (key: string) => {
  const openapi = state.session.openapi as OpenAPIObject;
  const api: PathItemObject | undefined = openapi.paths[key];
  console.log(api);
  return "# helloworld database";
};
