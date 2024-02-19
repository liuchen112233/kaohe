import React from "react";
import Router from "../router/index";
import Header from "./Header";
import Sider from "./Sider";
import { Layout, theme } from "antd";
const { Content } = Layout;

export default function LayoutCom() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height:'3000px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Router></Router>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
