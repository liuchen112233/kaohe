import React, { useState } from "react";
import "./Login.less";
import { Button, Form, Input } from "antd";
import { login } from "@/api/api.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [form] = Form.useForm();
  const navagate = useNavigate();
  const loginTo = async () => {
    try {
      let values = await form.validateFields();
      login(values).then((res) => {
        console.log(res);
        navagate("/index");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="img"></div>
      <div className="loginBox">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          form={form}
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
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          >
            <Input.Password placeholder="请输入" />
          </Form.Item>
        </Form>
        <div className="footer">
          <Button type="primary" onClick={loginTo}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
}
