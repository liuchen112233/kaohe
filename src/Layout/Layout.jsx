import React,{useState} from "react";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import { Layout, theme } from "antd";
import { UserOutlined } from '@ant-design/icons'

export default function LayoutCom() {
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
  const changeBreadData = (val)=>{
    setBreadData(val)
  }
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider changeBreadData={changeBreadData}/>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content breadData={breadData} changeBreadData={changeBreadData}/>
        </Layout>
      </Layout>
    </Layout>
  );
}
