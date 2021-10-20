import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMenuItems } from "App/Stores/uiData.slice";
import "./DashboardSidebar.scss";
import { Menu, Layout, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { selectRole } from "App/Stores/auth.slice";
const { Sider } = Layout;
const logo = process.env.PUBLIC_URL + "/logo.png";

const AppMenu = ({ children, collapsed }) => {
  const navigate = useNavigate();
  const menuItems = useSelector(selectMenuItems);
  const role = useSelector(selectRole);
  const { pathname } = useLocation();
  return (
    <Menu
      mode="vertical"
      className="side-bar-dark-menu"
      selectedKeys={[pathname.replace(/\/page-\d+/g, "")]}
    >
      {children}
      {role !== "Admin" && (
        <Menu.Item key="/" icon={<BiHomeAlt />} onClick={() => navigate("")}>
          {!collapsed && "Home"}
        </Menu.Item>
      )}

      {!collapsed && (
        <>
          <li style={{ height: 25 }}></li>
          <li class="navigation-header">
            <span>APPS</span>
          </li>
        </>
      )}
      {menuItems.map(({ icon, title, path }, index) => (
        <Menu.Item icon={icon} key={path} onClick={() => navigate(path)}>
          {!collapsed && title}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const DashboardSidebar = () => {
  const [collapsed, setCollapse] = useState(false);
  const [collapsedBtn, setCollapsedBtn] = useState(false);
  const onMouseEnter = () => {
    if (collapsed) {
      setCollapse(false);
    }
  };
  const onMouseLeave = () => {
    if (!collapsedBtn) {
      return;
    }
    if (!collapsed) {
      setCollapse(true);
    }
  };
  const collapsedClassName = () => {
    if (!collapsedBtn) return "false";
    if (collapsedBtn && !collapsed) return "false-fixed";
    return "true";
  };
  return (
    <>
      <Sider
        collapsedWidth={0}
        className={`responsive-sidebar side-bar-dark is-collapsed-${collapsedClassName()}`}
        style={{ paddingTop: 0, position: "sticky", top: 0, zIndex: 10 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <AppMenu collapsed={collapsed}>
          <>
            <ul class="nav navbar-nav flex-row">
              <li class="nav-item mr-auto">
                <a class="navbar-brand">
                  <img src={logo} className="brand-logo" alt="App logo" />
                  {!collapsed && (
                    <>
                      <h2 class="brand-text mb-0">IPSB</h2>{" "}
                      <Button
                        className="button-collapse"
                        type="link"
                        block
                        icon={
                          collapsedBtn ? (
                            <FaRegCircle color="#7367F0" />
                          ) : (
                            <FaRegDotCircle color="#7367F0" />
                          )
                        }
                        onClick={() => {
                          setCollapsedBtn(!collapsedBtn);
                        }}
                      ></Button>
                    </>
                  )}
                </a>
              </li>
            </ul>
          </>
        </AppMenu>
      </Sider>
      <div
        style={{
          marginRight: collapsedBtn ? 70 : 255,
          height: "100vh",
        }}
      ></div>
    </>
  );
};

export default DashboardSidebar;
