import { React, useEffect, useState } from "react";
import { PageHeader, Layout } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Button, Col, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { authorizeToken } from "App/Services/auth.service";

const { Footer } = Layout;
const ForgotPasswordSuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const [account, setAccount] = useState([]);

  const authorizeWebToken = async () => {
    try {
      const data = await authorizeToken({
        token: token,
      });
      console.log("SUCCESS");
      setAccount(data);
      sessionStorage.setItem("accessToken", token);
      return true;
    } catch (e) {
      return false;
    }
  };

  const checkToken = async (values) => {
    if (await authorizeWebToken(values)) {
    } else {
      navigate("../../");
    }
  };

  const onFinish = () => {
    navigate("../../");
  };

  useEffect(() => {
    if (token && token.length) {
      checkToken(token);
    } else {
      navigate("../../");
    }
  }, [dispatch, token]);

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
                className="col-lg-16 shadow mb-4 rounded"
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
                  <h2 className="text-center mt-4 font-weight-bold">
                    <span className="text-green">&#10003;</span> Email Sent!
                  </h2>
                </Col>
                <Col>
                  <h4 className="text-center text-secondary py-2">
                    A link to reset your password has been sent to you on{" "}
                    <span style={{ color: "#7367f0" }}>{account.email}</span>.
                  </h4>
                </Col>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mt-2"
                  >
                    Return to Sign In
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
};

export default ForgotPasswordSuccessPage;
