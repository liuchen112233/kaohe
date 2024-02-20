import React from "react";
import { useRoutes } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
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
    <Provider store={store}>
      <div className="App">
        {pathname === "/login" ? <Router></Router> : <Layout></Layout>}
      </div>
    </Provider>
  );
}
export default App;
