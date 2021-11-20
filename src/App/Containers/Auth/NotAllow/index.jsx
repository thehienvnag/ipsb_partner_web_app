import { PageHeader, Layout } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "antd/dist/antd.css";
import "./index.scss";
import { Card, Col, Form } from "antd";
import { useSelector } from "react-redux";
import { selectRole } from "App/Stores/auth.slice";

const { Footer } = Layout;

const NotAllow = () => {
  const role = useSelector(selectRole);
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
            >
              <Card
                className="col-md-12 shadow mb-4 rounded"
                style={{ backgroundColor: "white" }}
              >
                <Col>
                  <div className="text-center" style={{ width: 300 }}>
                    <img
                      className="rounded"
                      src={process.env.PUBLIC_URL + "/logo.png"}
                      style={{
                        position: "absolute",
                        top: -70,
                        transform: "translateX(-50%)",
                        width: 80,
                        height: 80,
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <h3 className="text-center mt-4">
                    Not assigned with{" "}
                    {role === "Building Manager" ? "building" : "store"}
                  </h3>
                </Col>
                <Col>
                  <h4 className="text-center text-secondary py-2">
                    Please contact your{" "}
                    {role === "Building Manager" ? "Admin" : "Building Manager"}
                  </h4>
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

export default NotAllow;
