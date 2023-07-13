import {
  ApiOutlined,
  DatabaseOutlined,
  ProfileOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";

export default function MySiderMenu() {
  const { snap } = useMyState();
  let [, setSearchParams] = useSearchParams();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[snap.session.type as string]}
      onSelect={(e) => {
        setSearchParams({ type: e.key });
      }}
      items={[
        {
          key: "api",
          icon: <ApiOutlined />,
          label: "接口",
        },
        {
          key: "database",
          icon: <DatabaseOutlined />,
          label: "表结构",
        },
        {
          key: "enum",
          icon: <ProfileOutlined />,
          label: "枚举",
        },
        {
          key: "dev",
          icon: <ReadOutlined />,
          label: "开发帮助",
        },
      ]}
    />
  );
}
