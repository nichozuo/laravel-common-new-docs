import { message } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MyLoading from "./components/MyLoading";
import { OpenAPIObject } from "./openapi";
import Home from "./pages/Home";
import { stateActions } from "./states";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("App.tsx useEffect");
    async function fetchData() {
      const res: Response = await fetch("http://0.0.0.0:8001/api/docs/openapi");
      if (res.status !== 200) {
        void message.error("请求失败");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const openapi = (await res.json()) as OpenAPIObject;
        stateActions.setOpenApi(openapi);
        setReady(true);
      }
    }

    void fetchData();
  }, []);

  if (!ready) return <MyLoading />;

  return (
    <Routes>
      <Route path="/dist/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
