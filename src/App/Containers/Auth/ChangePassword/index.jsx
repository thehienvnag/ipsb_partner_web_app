import React from "react";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount, checkChangePassword } from "App/Stores/auth.slice";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(selectAccount);
  const onSuccessLogin = (values) => {
    message
      .loading("Action in progress...", 1.5)
      .then(() => message.success("Change password successfully!!!", 1))
      .then(() => navigate(values));
  };

  const onErrorLogin = (values) => {
    message
      .loading("Action in progress...", 1.5)
      .then(() => message.error(values, 1));
  };

  const onFinish = (values) => {
    console.log("ACCOUNT: ", account);
    console.log("VALUES", values);
    dispatch(checkChangePassword(values)).then((values) => {
      if (values.type !== checkChangePassword.rejected.toString()) {
        let path = "";
        if (account.role === "Admin") {
          path = "../admin/buildings";
        } else if (account.role === "Building Manager") {
          path = "../building-manager/stores";
        }
        onSuccessLogin(path);
      } else {
        // const msg = values.payload;
        onErrorLogin("Change password unsuccessfully");
      }
    });
  };

  return (
    <Form
      style={{ margin: "auto", transform: "translateY(200px)" }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="accountId"
        style={{ display: "none" }}
        initialValue={account?.id}
      ></Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordPage;
