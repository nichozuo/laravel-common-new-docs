import { MyOpenApiType } from "../typing";
import { state } from "./index";

export const stateActions = {
  setOpenApi: (openapi: MyOpenApiType) => {
    state.session.openapi = openapi;
    // const tree = parseTree(openapi);
    // console.log("parseTree", tree);
    // stateActions.setTreeNodes(tree);
  },
  setType: (type: string | undefined) => {
    state.session.type = type;
  },
  setKey: (key: string | undefined) => {
    state.session.key = key;
  },
  // setTreeNodes: (treeNodes: LeftTreeNodeType) => {
  //   state.session.treeNodes = treeNodes;

  //   console.log("tree 111", state.session.treeNodes);
  // },
};
