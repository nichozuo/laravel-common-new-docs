import { Space, Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";
import { KeyEnum } from "../typing";

const { DirectoryTree } = Tree;

export default function LeftTree() {
  const { snap } = useMyState();
  const [, setSearchParams] = useSearchParams();
  const [tree, setTree] = useState<DataNode[]>([]);

  useEffect(() => {
    if (!snap.session.type || !snap.session.openapi) return;
    const tree1 = snap.session.openapi.extends.tree?.[
      snap.session.type as KeyEnum
    ] as DataNode[];
    console.log("left tree", tree1);
    setTree(tree1 || []);
  }, [snap.session.openapi, snap.session.type]);

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
        treeData={tree}
        autoExpandParent
        defaultExpandedKeys={[snap.session.key as string]}
        selectedKeys={[snap.session.key as string]}
        onSelect={(_keys, event) => {
          const node = event.selectedNodes[0];
          if (node?.isLeaf) {
            setSearchParams({
              type: snap.session.type as string,
              key: node.key as string,
            });
          }
        }}
        titleRender={(node) => {
          return (
            <Space
              style={{
                lineHeight: "30px",
              }}
            >
              <span>{node.title}</span>
              <span style={{ color: "#999" }}>{node.description}</span>
            </Space>
          );
        }}
      />
    </div>
  );
}
