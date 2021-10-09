import React from "react";
import { PageHeader, Layout } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, message, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { checkForgotPassword } from "App/Services/auth.service";

// import { Logo } from process.env.PUBLIC_URL + "/logo.png";

const { Footer } = Layout;
const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onSuccessLogin = (path) => {
    message
      .loading("Action in progress...", 1.5)
      .then(() => message.success("Email sent successfully", 1))
      .then(() => navigate(path));
  };

  const onErrorCheck = () => {
    message
      .loading("Action in progress...", 1.5)
      .then(() =>
        message.error("We don't have an account for that username or email.", 1)
      );
  };

  const forgotPassword = async (values) => {
    console.log("Values", values);
    try {
      const data = await checkForgotPassword(values);
      onSuccessLogin("../forgot-password-success/" + data);
    } catch (e) {
      onErrorCheck();
    }

    // if (data != 404) {
    //   onSuccessLogin("../forgot-password-success/" + values);
    //   // navigate("../forgot-password-success/" + values);
    // } else {
    //   console.log("ON ERROR CHECK");
    //   onErrorCheck();
    // }
  };

  const onFinish = (values) => {
    forgotPassword(values);
  };

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
                  <h3 className="text-center mt-4">Trouble signing in?</h3>
                </Col>
                <Col>
                  <h4 className="text-left text-secondary py-2">
                    Don't worry, we've got your back! Just enter your email
                    address and we'll send you a link with which you can reset
                    your password.
                  </h4>
                </Col>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                  hasFeedback
                >
                  <Input className="col-md-12 shadow-sm p-2 background-white rounded" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mt-2"
                  >
                    Submit
                  </Button>
                </Form.Item>
                <Col>
                  <Row className="justify-content-md-center">
                    Return to
                    <a className="login-form-forgot" href="../login">
                      &nbsp;Sign in
                    </a>
                  </Row>
                </Col>
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
};

export default ForgotPasswordPage;
