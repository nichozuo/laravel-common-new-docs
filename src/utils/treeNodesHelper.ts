import { OpenApiType, TreeNode } from "../typing";

function getIntro(openapi: OpenApiType, key: string) {
  const tag = openapi.tags?.find((tag) => "/" + tag.name === key);
  if (tag) return tag.description;
  return "";
}

export function convertToTree(openapi: OpenApiType) {
  const root: TreeNode = {
    title: "",
    children: [],
    isLeaf: false,
    key: "",
    intro: "",
  };

  for (const [path, methods] of Object.entries(openapi.paths)) {
    for (const method of Object.values(methods)) {
      const tags = method.tags[0].split("/");
      let current = root;
      for (const tag of tags) {
        const existingChild = current.children?.find(
          (child) => child.title === tag
        );
        if (existingChild) {
          current = existingChild;
        } else {
          const newChild: TreeNode = {
            title: tag,
            children: [],
            isLeaf: false,
            key: current.key + "/" + tag,
            intro: "",
          };
          newChild.intro = getIntro(openapi, newChild.key);
          current.children?.push(newChild);
          current = newChild;
        }
      }
      current.children?.push({
        title: method.summary,
        children: [],
        isLeaf: true,
        key: path,
        intro: method.description,
      });
    }
  }

  return root.children;
}
