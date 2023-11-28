import { message } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MyLoading from "./components/MyLoading";
import Home from "./pages/Home";
import { stateActions } from "./states";
import { OpenApiType } from "./typing";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res: Response = await fetch("http://0.0.0.0:8001/api/docs/openapi");
      // const res: Response = await fetch("/api/docs/openapi");
      if (res.status !== 200) {
        void message.error("请求失败");
      } else {
        const openapi = (await res.json()) as OpenApiType;
        stateActions.setOpenApi(openapi);
        setReady(true);
      }
    }

    void fetchData();
  }, []);

  if (!ready) return <MyLoading />;

  return (
    <Routes>
      <Route path="/docs/index.html" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
