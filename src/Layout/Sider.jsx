import menu from "../menu/menu";
import { MenuFoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

export default function SiderCom() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [controlWidth, setcontrolWidth] = useState("200px");
  const menuHeight = window.innerHeight-64-46 + 'px'

  //跳转路由
  const toPage = (item, key, keyPath, domEvent) => {
    if (item.keyPath.length == 1) {
      const path = menu.find((el) => el.key == item.key).path;
      navigate(path);
    } else {
      let obj = null;
      item.keyPath.reverse().forEach((el) => {
        if (obj) {
          obj = getObj(el, obj);
        } else {
          obj = menu.find((item) => item.key === el);
        }
      });
      navigate(obj.path);
    }
  };
  const getObj = (el, obj) => {
    const { children } = obj;
    if (children && children.length > 0) {
      return children.find((item) => item.key === el);
    } else {
      return obj;
    }
  };
  const closeMenu = () => {
    setcontrolWidth(showMenu ? "200px" : "80px");
    setShowMenu(!showMenu);
  };
  return (
    <Sider
      width={200}
      collapsed={showMenu}
      trigger={null}
      style={{
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <div style={{height:menuHeight,overflowY:"scroll",padding:'10px0'}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          onClick={toPage}
          items={menu}
        />
        <div
          style={{
            display: "flex",
            position: "fixed",
            bottom: "0",
            width: controlWidth,
            justifyContent: !showMenu ? "flex-end" : "center",
            height: "46px",
            lineHeight: "46px",
            paddingRight: !showMenu ? "16px" : 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #EFEFEF",
            fontSize: "16px",
          }}
        >
          <div
            style={{
              textAlign: "right",
              marginRight: "10px",
              display: !showMenu ? "block" : "none",
              backgroundColor: "#fff",
            }}
          >
            点击收起菜单
          </div>
          <MenuFoldOutlined onClick={closeMenu} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </Sider>
  );
}
