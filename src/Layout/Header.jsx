import logo from "@/assets/images/logo1.png";
import touxiang from "@/assets/images/touxiang.png";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

export default function HeaderCom() {
  const username = sessionStorage.getItem("username");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const showLogout = () => {
    setShow(!show);
  };
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#3377FF",
        color: "#fff",
        lineHeight: "normal",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image width={105} src={logo} preview={false} />
        <div style={{ margin: "0 16px" }}>|</div>
        <div>综合积分权益平台</div>
      </div>
      <div
        onMouseLeave={() => {
          showLogout();
        }}
        style={{ display: "flex", position: "relative", alignItems: "center" }}
      >
        <Image
          width={32}
          style={{ borderRadius: "50%" }}
          src={touxiang}
          preview={false}
        />
        <div
          style={{ marginRight: "6px", fontSize: "14px", marginLeft: "10px" }}
        >
          {username}
        </div>
        <DownOutlined
          onMouseOver={() => {
            showLogout();
          }}
        />
        {show && (
          <div
            onMouseLeave={() => {
              showLogout();
            }}
            onClick={logout}
            style={{
              position: "absolute",
              width: "50px",
              border: "1px solid #fff",
              borderRadius: "6px",
              lineHeight: "normal",
              textAlign:'center',
              padding: "5px",
              bottom: -10,
              right: 0,
              transform: `translateY(60%)`,
              cursor: "pointer",
              backgroundColor: "#999",
            //   opacity: 0.5,
            }}
          >
            退出
          </div>
        )}
      </div>
    </Header>
  );
}
