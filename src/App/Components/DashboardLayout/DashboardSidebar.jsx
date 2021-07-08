import React from "react";
import "./DashboardSidebar.scss";
import { Menu, Col, Layout } from "antd";
import { MailOutlined, CalendarOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const DashboardSidebar = ({ isCollapsed }) => {
  return (
    <>
      <Sider
        theme="light"
        collapsedWidth={0}
        collapsed={isCollapsed}
        className="responsive-sidebar"
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="vertical"
          theme="light"
        >
          <Col
            type="flex"
            justify="center"
            align="middle"
            style={{ margin: "10px 0" }}
          >
            <div className="input-icon" style={{ padding: "0 10px" }}>
              <span className="input-icon-addon" style={{ marginLeft: 10 }}>
                {/* Download SVG icon from http://tabler-icons.io/i/search */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search…"
                aria-label="Search in website"
              />
            </div>
          </Col>

          <Menu.Item key="1" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Navigation Two
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default DashboardSidebar;
