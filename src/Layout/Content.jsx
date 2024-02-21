import menu from "../menu/menu";
import React, { useEffect, useMemo } from "react";
import Router from "../router/index";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveKey,
  changeactiveMenu,
  closeMenu,
  closeAllMenu,
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

export default function ContentCom(props) {
  const { changeBreadData } = props;
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
    dispatch(changeactiveMenu(obj.menuKeypath));

    //关联tabData
    let obj2 = null;
    let arr = [];
    if (obj.menuKeypath.length === 1) {
      obj2 = menu.find((el) => el.key === obj.menuKey);
      //面包屑数据
      arr.push({
        title: (
          <div>
            {obj2.icon}
            <span style={{ marginLeft: "5px" }}>{obj2.label}</span>
          </div>
        ),
      });
    } else {
      [...obj.menuKeypath].forEach((el) => {
        if (obj2) {
          obj2 = getObj(el, obj2);
        } else {
          obj2 = menu.find((item) => item.key === el);
        }
        arr.push({
          title: (
            <div>
              {obj2.icon}
              <span style={{ marginLeft: "5px" }}>{obj2.label}</span>
            </div>
          ),
        });
      });
    }
    changeBreadData(arr);
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

  const onEdit = (targetKey, action) => {
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
    dispatch(closeAllMenu());
    navigate("/index");
    //修改breadData
    let arr=[]
    const obj = menu.find(el=>el.key=='1')
    if(obj){
      arr.push({
        title: (
          <div>
            {obj.icon}
            <span style={{ marginLeft: "5px" }}>{obj.label}</span>
          </div>
        ),
      });
      changeBreadData(arr);
    }
  };

  const islast = useMemo(() => {
    const index = tabList.findIndex((el) => el.key === activeKey);
    return index === tabList.length - 1;
  }, [activeKey]);

  useEffect(() => {
    const obj = tabList.find((el) => el.key === activeKey);
    sessionStorage.setItem("tabObj", JSON.stringify(obj));
  }, [activeKey]);

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
                  disabled={tabList.length === 1 || islast}
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
        <Breadcrumb separator=">" items={props.breadData} />
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
