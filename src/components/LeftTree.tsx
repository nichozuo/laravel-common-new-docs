import { Space, Tree } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";
import { TreeNode } from "../typing";

const { DirectoryTree } = Tree;

export default function LeftTree() {
  const { snap } = useMyState();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!snap.session.type || !snap.session.openapi) return;
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
        treeData={
          snap.session.type === "api"
            ? snap.session.apiTree
            : snap.session.type === "db"
            ? snap.session.dbTree
            : snap.session.enumTree
        }
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
        titleRender={(node: TreeNode) => {
          return (
            <Space
              style={{
                lineHeight: "30px",
              }}
            >
              <span>{node?.title}</span>
              <span style={{ color: "#999" }}>{node?.intro}</span>
            </Space>
          );
        }}
      />
    </div>
  );
}
