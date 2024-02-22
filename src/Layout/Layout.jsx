import menu from "../menu/menu";
import React, { useMemo, useState } from "react";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { useDispatch } from "react-redux";
import { closeAllMenu } from "@/redux/routerSlice.js";
import {
  openMenu,
  changeActiveKey,
  changeactiveMenu,
} from "@/redux/routerSlice.js";
import { Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function LayoutCom() {
  const dispatch = useDispatch();
  const [breadData, setBreadData] = useState([
    {
      title: (
        <div>
          <UserOutlined />
          <span>工作台</span>
        </div>
      ),
    },
  ]);
  //修改面包屑数据
  const changeBreadData = (val) => {
    setBreadData(val);
  };
  //剥层bread方法
  const getBreadObj = (el, obj) => {
    const { children } = obj;
    if (children && children.length > 0) {
      return children.find((item) => item.key === el);
    } else {
      return obj;
    }
  };
  useMemo(() => {
    //首次加载时查询tab缓存
    const tabobj = JSON.parse(sessionStorage.getItem("tabObj"));
    if (tabobj) {
      dispatch(changeActiveKey(tabobj.key));
      dispatch(changeactiveMenu(tabobj.menuKeypath));
      if (tabobj.key != "1") {
        //控制台
        dispatch(openMenu(tabobj));
      }
      //关联面包屑
      const obj = menu.find((el) => el.key === tabobj.menuKey);
      if (obj) {
        setBreadData([
          {
            title: (
              <div>
                {obj.icon}
                <span style={{ marginLeft: "5px" }}>{obj.label}</span>
              </div>
            ),
          },
        ]);
      } else {
        let menuObj = null;
        let arr = [];
        tabobj.menuKeypath.forEach((el) => {
          if (menuObj) {
            menuObj = getBreadObj(el, menuObj);
          } else {
            menuObj = menu.find((item) => item.key === el);
          }
          arr.push({
            title: (
              <div>
                {menuObj.icon}
                <span style={{ marginLeft: "5px" }}>{menuObj.label}</span>
              </div>
            ),
          });
          setBreadData(arr);
        });
      }
    } else {
      const obj = menu[0]; //工作台
      dispatch(closeAllMenu());
      setBreadData([
        {
          title: (
            <div>
              {obj.icon}
              <span style={{ marginLeft: "5px" }}>{obj.label}</span>
            </div>
          ),
        },
      ]);
    }
  }, []);

  return (
    <Layout style={{ minWidth: "1300px" }}>
      <Header changeBreadData={changeBreadData} />
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
