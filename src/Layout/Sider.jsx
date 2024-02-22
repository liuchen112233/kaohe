import menu from "../menu/menu";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveKey,
  openMenu,
  changeactiveMenu,
} from "@/redux/routerSlice.js";
import { MenuFoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
const uuid = require("uuid");

export default function SiderCom(props) {
  const { changeBreadData } = props;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [controlWidth, setcontrolWidth] = useState("200px");
  const menuHeight = window.innerHeight - 64 - 46 + "px";
  const dispatch = useDispatch();
  let { tabList, activeMenu } = useSelector((state) => state.routerSlice);

  //跳转路由
  const toPage = (item, key, keyPath, domEvent) => {
    let obj = null;
    let arr = [];
    if (item.keyPath.length === 1) {
      obj = menu.find((el) => el.key === item.key);
      //面包屑数据
      arr.push({
        title: (
          <div>
            {obj.icon}
            <span style={{ marginLeft: "5px" }}>{obj.label}</span>
          </div>
        ),
      });
    } else {
      item.keyPath.reverse().forEach((el) => {
        if (obj) {
          obj = getObj(el, obj);
        } else {
          obj = menu.find((item) => item.key === el);
        }
        arr.push({
          title: (
            <div>
              {obj.icon}
              <span style={{ marginLeft: "5px" }}>{obj.label}</span>
            </div>
          ),
        });
      });
    }
    //关联tab
    const tab = tabList.find((el) => el.label == obj.label);
    if (tab) {
      dispatch(changeActiveKey(tab.key));
    } else {
      const tabObj = {
        label: obj.label,
        key: uuid.v4(),
        path: obj.path,
        menuKeypath: item.keyPath,
        menuKey:obj.key
      };
      dispatch(openMenu(tabObj));
      dispatch(changeActiveKey(tabObj.key));
    }

    changeBreadData(arr);
    dispatch(changeactiveMenu(obj.key));
    navigate(obj.path);
  };
  //剥层方法
  const getObj = (el, obj) => {
    const { children } = obj;
    if (children && children.length > 0) {
      return children.find((item) => item.key === el);
    } else {
      return obj;
    }
  };

  //收起菜单
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
      <div
        style={{ height: menuHeight, overflowY: "scroll", padding: "10px0" }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          onClick={toPage}
          items={menu}
          selectedKeys={activeMenu}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "0",
            width: controlWidth,
            justifyContent: !showMenu ? "flex-end" : "center",
            height: "46px",
            lineHeight: "46px",
            paddingRight: !showMenu ? "16px" : 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #EFEFEF",
            fontSize: "14px",
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
