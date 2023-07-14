import { OpenAPIObject } from "../openapi";
import { TreeNodesType } from "../typing";
import { parseTree } from "../utils/treeNodesHelper";
import { state } from "./index";

export const stateActions = {
  setOpenApi: (openapi: OpenAPIObject) => {
    state.session.openapi = openapi;
    stateActions.setTreeNodes(parseTree(openapi));
  },
  setType: (type: string | undefined) => {
    state.session.type = type;
  },
  setKey: (key: string | undefined) => {
    state.session.key = key;
  },
  setTreeNodes: (treeNodes: TreeNodesType) => {
    state.session.treeNodes = treeNodes;
  },
};
