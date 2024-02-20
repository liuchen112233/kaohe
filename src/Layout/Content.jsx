import React, { useMemo, useState } from "react";
import Router from "../router/index";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveKey,changeactiveMenu } from "@/redux/routerSlice.js";
import { useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Layout, theme, Button, Tabs, Breadcrumb } from "antd";
import "./Content.less";
const { Content } = Layout;

export default function ContentCom() {
  const { activeKey, tabList } = useSelector((state) => state.routerSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const contentHeight = window.innerHeight - 64 - 48 - 22 - 40 + "px";

  const clickTab = (key, e) => {
    dispatch(changeActiveKey(key));
    const obj = tabList.find((el) => el.key == key);
    dispatch(changeactiveMenu(obj.menuKey))
    navigate(obj.path);
  };
  return (
    <div>
      <div style={{ marginTop: "8px" }}>
        <Tabs
          tabBarExtraContent={{
            left: (
              <Button
                style={{ marginRight: "8px" }}
                icon={<LeftOutlined />}
                onClick
                className="tabs-extra-demo-button"
              ></Button>
            ),
            right: (
              <div>
                <Button
                  style={{ marginLeft: "8px" }}
                  icon={<RightOutlined />}
                ></Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  icon={<CloseCircleOutlined />}
                ></Button>
              </div>
            ),
          }}
          type="editable-card"
          activeKey={activeKey}
          hideAdd
          items={tabList}
          onTabClick={clickTab}
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
