export type TreeNode = {
  title: string;
  key: string;
  intro?: string;
  isLeaf?: boolean;
  children?: TreeNode[];
};

export type SessionType = {
  openapi: OpenApiType | undefined;
  type: string | undefined;
  key: string | undefined;
  apiTree: TreeNode[] | undefined;
  dbTree: TreeNode[] | undefined;
  enumTree: TreeNode[] | undefined;
};

export type OpenApiType = {
  paths: {
    [path: string]: {
      [method: string]: {
        tags: string[];
        summary: string;
        description: string;
        "x-response-json"?: string;
        "x-response-intro-json"?: string;
        requestBody?: {
          content: {
            [key: string]: {
              schema: {
                type: string;
                properties: {
                  [key: string]: {
                    required: boolean;
                    type: string;
                    description: string;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  tags?: {
    name: string;
    description: string;
  }[];
  components: {
    schemas: {
      [key: string]: {
        type: string;
        title: string;
        "x-type"?: string;
        properties: {
          [key: string]: {
            type: string;
            description: string;
            required?: string;
          };
        };
      };
    };
  };
};

export type StateType = {
  session: SessionType;
};

export type KeyEnum = "api" | "db" | "enum" | "dev";
