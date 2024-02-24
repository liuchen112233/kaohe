import React from "react";
import { useRoutes } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { routes } from "./router/router";

import Layout from "./Layout/Layout";
import Router from "./router/index";
import "./App.less"
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
        {pathname === "/login" || pathname === "/error"? <Router></Router> : <Layout></Layout>}
      </div>
    </Provider>
  );
}
export default App;
