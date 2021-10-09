import { React, useEffect, useState } from "react";
import { PageHeader, Layout } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, message, Card, Col } from "antd";
import { useDispatch } from "react-redux";
import { checkChangePassword } from "App/Stores/auth.slice";
import { useNavigate, useParams } from "react-router-dom";
import { authorizeToken } from "App/Services/auth.service";

const { Footer } = Layout;

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const [result, setResult] = useState([]);

  const [account, setAccount] = useState([]);

  const dataResult = (result) => {
    setResult(result);
  };

  const authorizeWebToken = async () => {
    try {
      const data = await authorizeToken({
        token: token,
      });
      setAccount(data);
      sessionStorage.setItem("accessToken", token);
      return true;
    } catch (e) {
      return false;
    }
  };

  const checkToken = async () => {
    if (await authorizeWebToken()) {
      dataResult(true);
    } else {
      dataResult(false);
    }
  };

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
    if (result) {
      const accountId = account.id;
      const data = { ...values, accountId };

      dispatch(checkChangePassword(data)).then((values) => {
        if (values.type !== checkChangePassword.rejected.toString()) {
          let path = "";
          if (account.role === "Admin") {
            path = "../../";
          } else if (account.role === "Building Manager") {
            path = "../../";
          }
          onSuccessLogin(path);
        } else {
          // const msg = values.payload;
          onErrorLogin("Change password unsuccessfully");
        }
      });
    } else {
      navigate("../../forgot-password");
    }
  };

  useEffect(() => {
    if (token && token.length) {
      checkToken();
    } else {
      navigate("../../");
    }
  }, [dispatch, token]);

  if (result) {
    return (
      <div id="div-body">
        <PageHeader>
          <PageWrapper>
            <PageBody>
              <Form
                style={{ margin: "auto", paddingTop: 80 }}
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
                onFinish={onFinish}
              >
                <Card
                  className="col-md-12 shadow mb-4 rounded"
                  style={{ backgroundColor: "white" }}
                >
                  <Col>
                    <div className="text-center">
                      <img
                        className="rounded"
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        style={{
                          position: "absolute",
                          top: -70,
                          left: 110,
                          right: 0,
                          width: 80,
                          height: 80,
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h3 className="text-center mt-4">Change your password</h3>
                  </Col>
                  <Col>
                    <h4 className="text-left text-secondary py-2">
                      Enter your new password to continue.
                    </h4>
                  </Col>
                  {/* <Form.Item
                    name="accountId"
                    style={{ display: "none" }}
                    initialValue={accountId}
                  ></Form.Item> */}
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
                    <Input.Password className="col-md-12 shadow-sm p-2 background-white rounded" />
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
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="col-md-12 shadow-sm p-2 background-white rounded" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button mt-2"
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Card>
              </Form>
            </PageBody>
          </PageWrapper>
        </PageHeader>
        <Footer
          className="text-center"
          style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          &copy;2021 IPSB, FPTU. All rights reserved.
        </Footer>
      </div>
    );
  } else {
    return (
      <div id="div-body">
        <PageHeader>
          <PageWrapper>
            <PageBody>
              <Form
                style={{ margin: "auto", paddingTop: 80 }}
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
                onFinish={onFinish}
              >
                <Card
                  className="col-md-12 shadow mb-4 rounded"
                  style={{ backgroundColor: "white" }}
                >
                  <Col>
                    <div className="text-center">
                      <img
                        className="rounded"
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        style={{
                          position: "absolute",
                          top: -70,
                          left: 110,
                          right: 0,
                          width: 80,
                          height: 80,
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h3 className="text-center mt-4">
                      Unable to reset password
                    </h3>
                  </Col>
                  <Col>
                    <h4 className="text-center text-secondary py-2">
                      The reset link is invalid or expired. Try requesting a new
                      one.
                    </h4>
                  </Col>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button mt-2"
                    >
                      Reset Password
                    </Button>
                  </Form.Item>
                </Card>
              </Form>
            </PageBody>
          </PageWrapper>
        </PageHeader>
        <Footer
          className="text-center"
          style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          &copy;2021 IPSB, FPTU. All rights reserved.
        </Footer>
      </div>
    );
  }
};

export default ChangePasswordPage;
