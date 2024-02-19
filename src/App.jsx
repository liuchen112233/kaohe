import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./router/router";
import "@/style/index.less";
import Layout from "./Layout/Layout";
import Router from "./router/index";
function App() {
  const element = useRoutes(routes);
  const {
    props: {
      match: { pathname },
    },
  } = element;
  return (
    <div className="App">
      {pathname === "/login" ? <Router></Router> : <Layout></Layout>}
    </div>
  );
}
export default App;
