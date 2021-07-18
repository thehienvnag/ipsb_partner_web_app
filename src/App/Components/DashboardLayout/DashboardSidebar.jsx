import React from "react";
import "./DashboardSidebar.scss";
import { Menu, Col, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { GrMap } from "react-icons/gr";
import { BsBuilding } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { IoWifi, IoStorefrontOutline } from "react-icons/io5";
const { Sider } = Layout;
const logo = process.env.PUBLIC_URL + "/logo.svg";
const logoText = process.env.PUBLIC_URL + "/logo-text.png";
const DashboardSidebar = ({ isCollapsed }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Sider
        theme="light"
        collapsedWidth={0}
        collapsed={isCollapsed}
        className="responsive-sidebar"
        style={{ paddingTop: 0 }}
      >
        <Menu defaultSelectedKeys={["2"]} mode="vertical">
          <Col
            type="flex"
            justify="center"
            align="middle"
            style={{ margin: "10px 0" }}
          >
            <div
              style={{
                display: "flex",
                marginLeft: 28,
                marginTop: 50,
                marginBottom: 45,
              }}
            >
              <img
                src={logo}
                style={{ transform: "scale(4.5)" }}
                alt="Tabler"
                className="navbar-brand-image"
              />
              <img
                src={logoText}
                style={{
                  transform: "scale(1.8) translate(26px, 0px)",
                }}
                alt="Tabler"
                className="navbar-brand-image"
              />
            </div>
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
              />
            </div>
          </Col>

          {/* <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={{ pathname: "home" }} replace>
              Home
            </Link>
          </Menu.Item> */}
          {pathname.includes("admin") && (
            <>
              <Menu.Item key="2" icon={<BsBuilding />}>
                <Link to={{ pathname: "buildings" }} replace>
                  Buildings
                </Link>
              </Menu.Item>
            </>
          )}
          {pathname.includes("building-manager") && (
            <>
              <Menu.Item key="2" icon={<IoStorefrontOutline />}>
                <Link to={{ pathname: "stores" }} replace>
                  Stores
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<GrMap />}>
                <Link to={{ pathname: "floor-plans" }} replace>
                  Floor plan
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<GoLocation />}>
                <Link to={{ pathname: "location-type" }} replace>
                  Locations
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<IoWifi />}>
                <Link to={{ pathname: "locator-tags" }} replace>
                  Locator tag
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>
    </>
  );
};

export default DashboardSidebar;
