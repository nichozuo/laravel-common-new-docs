import {
  OpenAPIObject,
  OperationObject,
  PathItemObject,
  SchemaObject,
} from "../openapi";
import { TreeNode, TreeNodesType } from "../typing";

function buildTree(nodes: TreeNode[]): TreeNode[] {
  const map: { [key: string]: TreeNode } = {};

  // 创建一个映射，以便可以通过节点的 key 快速查找节点
  nodes.forEach((node) => {
    map[node.key] = node;
  });

  const tree: TreeNode[] = [];

  // 遍历每个节点，将子节点添加到父节点的 children 属性下
  nodes.forEach((node) => {
    const parentKey = node.parentKey;
    if (parentKey && map[parentKey]) {
      const parent = map[parentKey];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}

export const parseTree = (openapi: OpenAPIObject) => {
  return {
    api: parseApi(openapi),
    database: parseDatabase(openapi),
    enum: parseEnum(),
    dev: parseDocs(),
  } as TreeNodesType;
};

export const parseApi = (openapi: OpenAPIObject) => {
  const apis: TreeNode[] = [];
  const paths = Object.entries(openapi.paths);
  const apiKeys: string[] = [];

  paths.forEach(([key, value]: [key: string, value: PathItemObject]) => {
    const method = Object.keys(value)[0] as keyof PathItemObject;
    const a = value[method] as OperationObject;

    // 处理文件夹
    const folderName = a.tags?.[0] as string;
    let parentKey: string | null = null;

    const folderSplit = folderName.split("/");
    const folderTemp: string[] = [];
    folderSplit?.forEach((f: string) => {
      folderTemp.push(f);
      const node = {
        title: folderTemp.join("/"),
        key: folderTemp.join("/"),
        parentKey: parentKey,
      };
      parentKey = node.key;
      if (!apiKeys.includes(node.key)) {
        apis.push(node);
        apiKeys.push(node.key);
      }
    });

    const item: TreeNode = {
      key: key, //a?.tags[0] + "@" + a?.summary,
      title: a?.summary ?? "",
      intro: a?.description ?? "",
      isLeaf: true,
      parentKey: parentKey,
    };
    apis.push(item);
  });
  const apiTree = buildTree(apis);
  // console.log(apis, apiTree);
  return apiTree;
};

export const parseDatabase = (openapi: OpenAPIObject) => {
  const schemas = openapi.components?.schemas ?? {};
  const dbData: TreeNode[] = [];
  for (const key in schemas) {
    dbData.push({
      key: key,
      title: key,
      intro: (schemas[key] as SchemaObject).description as string,
      isLeaf: true,
    });
  }
  return dbData;
};

export const parseEnum = () => {
  return [
    {
      key: "enum",
      title: "enum",
      intro: "枚举",
      isLeaf: true,
    },
  ];
};

export const parseDocs = () => {
  return [
    {
      key: "docs",
      title: "docs",
      intro: "开发手册",
      isLeaf: true,
    },
  ];
};
