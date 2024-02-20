import React, { useMemo, useState } from "react";
import Router from "../router/index";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveKey,
  changeactiveMenu,
  closeMenu,
  closeAllMenu
} from "@/redux/routerSlice.js";
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
    dispatch(changeactiveMenu(obj.menuKey));
    navigate(obj.path);
  };
  const onEdit = (targetKey, action) => {
    console.log(action, targetKey);
    if (action === "remove") {
      remove(targetKey);
    }
  };
  const remove = (targetKey) => {
    const index = tabList.findIndex((el) => el.key === targetKey);
    if (
      index !== 0 &&
      index === tabList.length - 1 &&
      tabList[index].key === activeKey
    ) {
      console.log(444);
      let path = tabList[index - 1].path;
      if (path) {
        navigate(path);
      }
    }
    dispatch(closeMenu(targetKey));
  };
  const prevNav = () => {
    const index = tabList.findIndex((el) => el.key === activeKey);
    let key = "";
    key = tabList[index - 1].key;
    clickTab(key);
  };
  const nextNav = () => {
    const index = tabList.findIndex((el) => el.key === activeKey);
    let key = "";
    key = tabList[index + 1].key;
    clickTab(key);
  };
  const closeAll = () => {
    dispatch(closeAllMenu())
    navigate('/index')
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
                disabled={activeKey === "1"}
                onClick={prevNav}
                className="tabs-extra-demo-button"
              ></Button>
            ),
            right: (
              <div>
                <Button
                  style={{ marginLeft: "8px" }}
                  disabled={tabList.length === 1}
                  onClick={nextNav}
                  icon={<RightOutlined />}
                ></Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  icon={<CloseCircleOutlined />}
                  onClick={closeAll}
                  disabled={tabList.length === 1}
                ></Button>
              </div>
            ),
          }}
          onEdit={onEdit}
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
