import React, { useState } from "react";
import "./Login.less";
import { Button, Form, Input } from "antd";

export default function Login() {
  

  const login = ()=>{
    
  }
  return (
    <div className="img">
      <div className="loginBox">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="admin"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="请输入"/>
          </Form.Item>
        </Form>
        <div className="footer">
          <Button type="primary" onClick={login}>登录</Button>
        </div>
      </div>
    </div>
  );
}
