import { message } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MyLoading from "./components/MyLoading";
import Home from "./pages/Home";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      fetch("http://0.0.0.0:8000/api/docs/openapi").then(async (res) => {
        if (res.status !== 200) {
          message.error("请求失败");
        } else {
          const openapi = await res.json();
          console.log("response data", openapi);
          setReady(true);
        }
      });
    };

    fetchData();
  }, []);

  if (!ready) return <MyLoading />;

  return (
    <Routes>
      <Route path="/dist/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
