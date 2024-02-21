import menu from "../menu/menu";
import React, { useMemo, useState } from "react";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { useSelector, useDispatch } from "react-redux";
import {
  openMenu,
  changeActiveKey,
  changeactiveMenu,
} from "@/redux/routerSlice.js";
import { Layout, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function LayoutCom() {
  const { tabList, activeMenu } = useSelector((state) => state.routerSlice);
  console.log(tabList);
  const dispatch = useDispatch();
  const [breadData, setBreadData] = useState([
    {
      title: (
        <div>
          <UserOutlined />
          <span>工作台</span>
        </div>
      ),
      href: "/index",
    },
  ]);
  //修改面包屑数据
  const changeBreadData = (val) => {
    setBreadData(val);
  };
  //剥层方法
  const getObj = (key, obj) => {
    if (obj.key === key) {
      return obj;
    } else {
      if (obj.children && obj.children.length > 0) {
        getObj(key, obj.children);
      }
    }
  };
  //首次加载时查询tab缓存
  useMemo(() => {
    const tabobj = JSON.parse(sessionStorage.getItem("tabObj"));
    console.log(tabobj, menu);
    if (tabobj.key != "1") {
      dispatch(changeActiveKey(tabobj.key));
      dispatch(changeactiveMenu(tabobj.menuKeypath));
      dispatch(openMenu(tabobj));
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider changeBreadData={changeBreadData} />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content breadData={breadData} changeBreadData={changeBreadData} />
        </Layout>
      </Layout>
    </Layout>
  );
}
