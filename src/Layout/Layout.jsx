import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { Layout, theme } from "antd";

export default function LayoutCom() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content />
        </Layout>
      </Layout>
    </Layout>
  );
}
