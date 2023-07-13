import "github-markdown-css/github-markdown-light.css";
import ReactMarkdown from "react-markdown";

export default function RightMarkdown() {
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
        <ReactMarkdown>// 开发文档 </ReactMarkdown>
      </div>
    </div>
  );
}
