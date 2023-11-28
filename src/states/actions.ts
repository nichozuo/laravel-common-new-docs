import { OpenApiType } from "../typing";
import { convertToTree } from "../utils/treeNodesHelper";
import { state } from "./index";

export const stateActions = {
  setOpenApi: (openapi: OpenApiType) => {
    state.session.openapi = openapi;
    stateActions.parseApiTree(openapi);
    stateActions.parseDbTree(openapi);
  },
  setType: (type: string | undefined) => {
    state.session.type = type;
  },
  setKey: (key: string | undefined) => {
    state.session.key = key;
  },
  parseApiTree: (openapi: OpenApiType) => {
    const output = convertToTree(openapi);
    state.session.apiTree = output;
  },
  parseDbTree: (openapi: OpenApiType) => {
    const output = [];
    const input = openapi?.components;
    for (const key in input) {
      if (input[key]["x-type"] !== "database") continue;
      const { title } = input[key];
      output.push({
        title: key,
        key,
        intro: title,
        isLeaf: true,
      });
    }
    state.session.dbTree = output;
  },
};
