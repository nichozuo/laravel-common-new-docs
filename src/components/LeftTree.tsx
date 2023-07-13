import { Tree } from "antd";

const { DirectoryTree } = Tree;

const treeData: any[] = [
  {
    title: "Admin",
    key: "Admin",
    intro: "后台",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];

export default function LeftTree() {
  return (
    <div
      style={{
        margin: "10px 5px 10px 10px",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#FFF",
        minHeight: "calc(100vh - 75px)",
      }}
    >
      <DirectoryTree
        showLine
        showIcon={false}
        defaultExpandAll
        treeData={treeData}
        titleRender={(node) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                lineHeight: "30px",
              }}
            >
              <span>{node.title}</span>
              <span style={{ color: "#999" }}>{node.intro}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
