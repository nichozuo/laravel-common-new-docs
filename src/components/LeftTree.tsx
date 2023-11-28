/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Space, Tree } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";

const { DirectoryTree } = Tree;

export default function LeftTree() {
  const { snap } = useMyState();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!snap.session.type || !snap.session.openapi) return;
  }, [snap.session.openapi, snap.session.type]);

  const treeData: any =
    snap.session.type === "api"
      ? snap.session.apiTree
      : snap.session.type === "db"
      ? snap.session.dbTree
      : snap.session.type === "enum"
      ? snap.session.enumTree
      : null;

  // console.log("treeData", treeData);
  return treeData ? (
    <div
      style={{
        margin: "10px 5px 10px 10px",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#FFF",
        height: "calc(100vh - 75px)",
        overflow: "scroll",
      }}
    >
      <DirectoryTree
        showLine
        showIcon={false}
        treeData={treeData}
        // autoExpandParent
        defaultExpandedKeys={[snap.session.key as string]}
        selectedKeys={[snap.session.key as string]}
        onSelect={(_keys, event) => {
          const node = event.selectedNodes[0] as any;
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
              <span>{(node as any)?.title}</span>
              <span style={{ color: "#999" }}>{(node as any)?.intro}</span>
            </Space>
          );
        }}
      />
    </div>
  ) : (
    <> </>
  );
}
