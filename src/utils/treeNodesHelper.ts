// import { MyOpenApiType, TreeNodeType } from "../typing";

// function buildTree(
//   data: {
//     [key: string]: TreeNodeType;
//   },
//   parent: string
// ): TreeNodeType[] {
//   const tree: TreeNodeType[] = [];

//   for (const key in data) {
//     if (data[key].parent === parent) {
//       const node = data[key];

//       const children = buildTree(data, key);
//       if (children.length > 0) {
//         Object.defineProperty(node, "children1", {
//           value: children,
//           writable: true,
//           enumerable: true,
//           configurable: true,
//         });
//       }

//       tree.push(node);
//     }
//   }

//   return tree;
// }

// export const parseTree = (openapi: MyOpenApiType) => {
//   return {
//     api: buildTree(openapi.extends.api, ""),
//     // database: parseDatabase(openapi),
//     // enum: parseEnum(),
//     // dev: parseDocs(),
//   } as LeftTreeNodeType;
// };

// export const parseApi = (openapi: MyOpenApiType) => {
//   return buildTree(openapi.extends.api, "");
// };
// // export const parseApi = (openapi: MyOpenApiType) => {
// //   return buildTree(openapi, "");

// //   const tree: TreeNodeType[] = [];
// //   const apis = openapi.extends.api;

// //   Object.entries(apis).forEach(([key, value]) => {
// //     if (value.parent == "") {
// //       tree.push(value);
// //     } else {
// //       const parent = apis[value.parent];
// //       if (!parent.children) {
// //         parent.children = [];
// //       }
// //       parent.children.push(value);
// //     }
// //   });
// //   //       const parentKey = value.parent;
// //   //   if (parentKey && map[parentKey]) {
// //   //     const parent = map[parentKey];
// //   //     if (!parent.children) {
// //   //       parent.children = [];
// //   //     }
// //   //     parent.children.push(node);
// //   //   } else {
// //   //     tree.push(node);
// //   //   }
// //   // });
// //   // return {};

// //   // const apis: TreeNode[] = [];
// //   // const paths = Object.entries(openapi.paths);
// //   // const apiKeys: string[] = [];
// //   // paths.forEach(([key, value]: [key: string, value: PathItemObject]) => {
// //   //   const method = Object.keys(value)[0] as keyof PathItemObject;
// //   //   const a = value[method] as OperationObject;
// //   //   // 处理文件夹
// //   //   const folderName = a.tags?.[0] as string;
// //   //   let parentKey: string | null = null;
// //   //   const folderSplit = folderName.split("/");
// //   //   const folderTemp: string[] = [];
// //   //   folderSplit?.forEach((f: string) => {
// //   //     folderTemp.push(f);
// //   //     const node = {
// //   //       title: folderTemp.join("/"),
// //   //       key: folderTemp.join("/"),
// //   //       parentKey: parentKey,
// //   //     };
// //   //     parentKey = node.key;
// //   //     if (!apiKeys.includes(node.key)) {
// //   //       apis.push(node);
// //   //       apiKeys.push(node.key);
// //   //     }
// //   //   });
// //   //   const item: TreeNode = {
// //   //     key: key, //a?.tags[0] + "@" + a?.summary,
// //   //     title: a?.summary ?? "",
// //   //     intro: a?.description ?? "",
// //   //     isLeaf: true,
// //   //     parentKey: parentKey,
// //   //   };
// //   //   apis.push(item);
// //   // });
// //   // const apiTree = buildTree(apis);
// //   // // console.log(apis, apiTree);
// //   // return apiTree;
// // };

// // export const parseDatabase = (openapi: OpenAPIObject) => {
// //   const schemas = openapi.components?.schemas ?? {};
// //   const dbData: TreeNode[] = [];
// //   for (const key in schemas) {
// //     dbData.push({
// //       key: key,
// //       title: key,
// //       intro: (schemas[key] as SchemaObject).description as string,
// //       isLeaf: true,
// //     });
// //   }
// //   return dbData;
// // };

// // export const parseEnum = () => {
// //   return [
// //     {
// //       key: "enum",
// //       title: "enum",
// //       intro: "枚举",
// //       isLeaf: true,
// //     },
// //   ];
// // };

// // export const parseDocs = () => {
// //   return [
// //     {
// //       key: "docs",
// //       title: "docs",
// //       intro: "开发手册",
// //       isLeaf: true,
// //     },
// //   ];
// // };
