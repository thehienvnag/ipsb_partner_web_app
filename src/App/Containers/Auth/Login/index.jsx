import React from "react";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { checkWebLogin } from "App/Stores/auth.slice";
import { useNavigate } from "react-router-dom";
import { accounts } from "App/Constants/endpoints";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccessLogin = (values) => {
    message
      .loading("Action in progress...", 1.5)
      .then(() => message.success("Login Successfully!!!", 1))
      .then(() => navigate(values));
  };

  const onErrorLogin = (values) => {
    message
      .loading("Action in progress...", 1.5)
      .then(() => message.error(values, 1));
  };

  const onFinish = (values) => {
    dispatch(checkWebLogin(values)).then((values) => {
      if (values.type !== checkWebLogin.rejected.toString()) {
        let path = "";
        if (values.payload.status === "New") {
          path = "../change-password";
        } else if (values.payload.role === "Admin") {
          path = "../admin/buildings";
        } else if (values.payload.role === "Building Manager") {
          path = "../building-manager/stores";
        }
        onSuccessLogin(path);
      } else {
        const msg = values.payload;
        onErrorLogin(msg);
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
      <h1 style={{ marginLeft: "90px", paddingBottom: "60px" }}>Login Page</h1>
      <h1></h1>
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
