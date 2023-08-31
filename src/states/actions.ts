import { OpenApiType, TreeNode } from "../typing";
import { state } from "./index";

export const stateActions = {
  setOpenApi: (openapi: OpenApiType) => {
    state.session.openapi = openapi;
    stateActions.parseApiTree(openapi);
    stateActions.parseDbTree(openapi);
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
  parseApiTree: (openapi: OpenApiType) => {
    const output: TreeNode[] = [];
    const map: { [key: string]: TreeNode } = {};

    for (const path in openapi?.paths) {
      // console.log("path", path);
      const { tags, summary, description } = openapi?.paths?.[path].post as any;
      // console.log("path", tags, summary, description);
      const [title, controller] = tags[0].split("/");
      if (!map[title]) {
        map[title] = [];
        output.push({ title, key: title, children: map[title] });
      }
      if (!map[tags[0]]) {
        map[tags[0]] = [];
        map[title].push({
          title: controller,
          key: tags[0],
          children: map[tags[0]],
        });
      }
      map[tags[0]].push({
        title: summary,
        key: path,
        intro: description,
        isLeaf: true,
      });
    }
    console.log("parseApiTree", output);
    state.session.apiTree = output;
    // return output;
  },
  parseDbTree: (openapi: OpenApiType) => {
    const output: TreeNode[] = [];
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
    console.log("parseDbTree", output);
    state.session.dbTree = output;
  },

  // setTreeNodes: (treeNodes: LeftTreeNodeType) => {
  //   state.session.treeNodes = treeNodes;

  //   console.log("tree 111", state.session.treeNodes);
  // },
};
