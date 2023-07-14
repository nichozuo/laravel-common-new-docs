import "github-markdown-css/github-markdown-light.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMyState } from "../states";
import { TypeType } from "../typing";
import { parseMarkdown } from "../utils/markdownHelper";

export default function RightMarkdown() {
  const [content, setContent] = useState("");
  const { snap } = useMyState();

  useEffect(() => {
    console.log("RightMarkdown.tsx useEffect");
    const type = snap.session.type as TypeType;
    const key = snap.session.key;
    if (!key) {
      setContent("## 开发文档");
    } else {
      setContent(parseMarkdown(type, key));
    }
  }, [snap.session.type, snap.session.key]);

  return (
    <div
      style={{
        margin: "10px 10px 10px 5px",
        borderRadius: "10px",
        padding: "15px 30px",
        backgroundColor: "#FFF",
        minHeight: "calc(100vh - 75px)",
      }}
    >
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
