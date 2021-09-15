import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, Checkbox, message, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  checkWebLogin,
  refreshUserInfo,
  selectLoading,
} from "App/Stores/auth.slice";
import { useNavigate } from "react-router-dom";
// const logo = process.env.PUBLIC_URL + "/logo.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const onFinish = (values) => {
    message.loading("Action in progress...", 1);
    console.log(values);
    dispatch(checkWebLogin(values)).then((values) => {
      if (values.type !== checkWebLogin.rejected.toString()) {
        let path = "";
        if (values.payload.status === "New") {
          path = "../change-password";
        } else {
          path = "../";
        }
        navigate(path);
        message.success("Login Successfully!!!", 1);
      } else {
        message.error("Invalid login!!!", 1);
      }
    });
  };

  return (
    <Form
      style={{ margin: "auto", transform: "translateY(100px)" }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Card className="card-table login-form">
        <h2 style={{ marginTop: 10 }}>Login Page</h2>
        <h5 style={{ marginBottom: 20 }}>
          Welcome back, please login to your account.
        </h5>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default LoginPage;
