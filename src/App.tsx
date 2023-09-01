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
    console.log("App.tsx useEffect start");
    async function fetchData() {
      // const res: Response = await fetch(
      //   "https://gold.szsx.cc/api/docs/openapi"
      // );
      const res: Response = await fetch("/api/docs/openapi");
      if (res.status !== 200) {
        void message.error("请求失败");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const openapi = (await res.json()) as OpenApiType;
        stateActions.setOpenApi(openapi);
        setReady(true);
      }
    }

    void fetchData();
    console.log("App.tsx useEffect end");
  }, []);

  if (!ready) return <MyLoading />;

  return (
    <Routes>
      <Route path="/docs/index.html" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
