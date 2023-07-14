export type TreeNode = {
  title: string;
  key: string;
  intro?: string | undefined;
  isLeaf?: boolean;
  children?: TreeNode[];
  parentKey?: string | null;
};

export type TypeType = "api" | "database" | "enum" | "dev";

export type TreeNodesType = { [key in TypeType]: TreeNode[] } | undefined;

export type SessionType = {
  openapi: OpenAPIObject | undefined;
  type: string | undefined;
  key: string | undefined;
  treeNodes: TreeNodesType;
};

export type StateType = {
  session: SessionType;
};
