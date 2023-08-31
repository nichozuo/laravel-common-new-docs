export type TreeNode = {
  title: string;
  key: string;
  intro?: string;
  isLeaf?: boolean;
  children?: TreeNode[];
}[];

export type SessionType = {
  openapi: OpenApiType | undefined;
  type: string | undefined;
  key: string | undefined;
  apiTree: TreeNode[];
  dbTree: TreeNode[];
  enumTree: TreeNode[];
};

export type OpenApiType = {
  paths: Record<string, any>;
  components: Record<string, any>;
};

export type StateType = {
  session: SessionType;
};

export type KeyEnum = "api" | "db" | "enum" | "dev";

// export type MyOpenApiType = {
//   extends: {
//     tree: {
//       [key in KeyEnum]: DataNode[];
//     };
//     data: {
//       [key in KeyEnum]: {
//         [key: string]: any;
//       };
//     };
//   };
// };

// export type NodeType = {
//   key: string;
//   title: string;
//   description: string;
//   parent?: string;
//   isLeaf?: boolean;
//   method?: string;
//   params?: {
//     key: string;
//     required: boolean;
//     type: string;
//     description: string;
//   }[];
//   columns?: {
//     name: string;
//     type: string;
//     typeString: string;
//     length: number;
//     precision: number;
//     scale: number;
//     notNull: boolean;
//     nullableString: string;
//     comment: string;
//     default: string;
//     isPrimaryKey: boolean;
//     isForeignKey: boolean;
//   }[];
//   consts?: {
//     label: string;
//     value: string;
//     color: string;
//   }[];
// };

// export interface TreeNodeType {
//   key: string;
//   title: string;
//   description: string;
//   parent: string;
//   isLeaf: boolean;
//   method?: string;
//   params: ApiParam[];
//   children?: TreeNodeType[];
// }

// export interface ApiParam {
//   key: string;
//   required: boolean;
//   type: string;
//   description: string;
// }

// export type TreeNode = {
//   title: string;
//   key: string;
//   intro?: string | undefined;
//   isLeaf?: boolean;
//   children?: TreeNode[];
//   parentKey?: string | null;
// };

// export type TreeNodesType = { [key in TypeType]: NodeType } | undefined;
