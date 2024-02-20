import React, { useMemo, useState } from "react";
import Router from "../router/index";
import { useSelector, useDispatch } from "react-redux";
// import { init } from "@/redux/routerSlice.js";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Layout, theme, Button, Tabs, Breadcrumb } from "antd";
import "./Content.less";
const { Content } = Layout;
const OperationsSlot = {
  left: (
    <Button
      style={{ marginRight: "8px" }}
      icon={<LeftOutlined />}
      className="tabs-extra-demo-button"
    ></Button>
  ),
  right: (
    <Button style={{ marginLeft: "8px" }} icon={<RightOutlined />}></Button>
  ),
};

export default function ContentCom() {
  const { activeKey,tabList } = useSelector((state) => state.routerSlice);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [position, setPosition] = useState(["left", "right"]);
  const contentHeight = window.innerHeight - 64 - 48 - 22 - 40 + "px";
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {}
    );
  }, [position]);
  return (
    <div>
      <div style={{ marginTop: "8px" }}>
        <Tabs
          tabBarExtraContent={slot}
          type="editable-card"
          activeKey={activeKey}
          hideAdd
          items={tabList}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: "An Application",
            },
          ]}
        />
      </div>
      <div
        style={{
          height: contentHeight,
          overflowY: "scroll",
          borderRadius: "8px",
        }}
      >
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "3000px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Router></Router>
        </Content>
      </div>
    </div>
  );
}
