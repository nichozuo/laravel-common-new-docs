import { ColumnWidthOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useSearchParams } from "react-router-dom";
import LeftTree from "../components/LeftTree";
import MySiderMenu from "../components/MySiderMenu";
import RightMarkdown from "../components/RightMarkdown";
import { stateActions } from "../states";

export default function Home() {
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type") || "api";
    const key = searchParams.get("key") || undefined;
    console.log("useEffect searchParams", type, key);
    stateActions.setType(type);
    stateActions.setKey(key);
  }, [searchParams]);

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Header
        style={{
          height: "55px",
          lineHeight: "55px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space
          style={{
            color: "#fff",
            fontSize: "16px",
          }}
        >
          <Avatar
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            size={24}
          />
          <span style={{ margin: "0 30px 0 0" }}>开发文档</span>
          <MySiderMenu />
        </Space>
      </Header>
      <Layout>
        <Content>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={20}>
              <LeftTree />
            </Panel>
            <PanelResizeHandle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ColumnWidthOutlined />
              </div>
            </PanelResizeHandle>
            <Panel>
              <RightMarkdown />
            </Panel>
          </PanelGroup>
        </Content>
      </Layout>
    </Layout>
  );
}
