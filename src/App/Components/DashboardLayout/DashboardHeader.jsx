import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Dropdown, Menu, Button, Tooltip } from "antd";
import Link from "antd/lib/typography/Link";
import { logout, selectAccount } from "App/Stores/auth.slice";
import { selectMenuItems } from "App/Stores/uiData.slice";
import "./DashboardHeader.scss";
import { useNavigate } from "react-router-dom";

const notifications = (
  <Menu>
    <Menu.Item key="0">1st menu item</Menu.Item>
    <Menu.Item key="1">2nd menu item</Menu.Item>
  </Menu>
);

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logOutFunc = () => {
    dispatch(logout()).then(() => navigate("/login"));
  };
  return (
    <Menu>
      <Menu.Item key="0">Profile &amp; account</Menu.Item>
      <Menu.Item key="1">Feedback</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logOutFunc}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
const DashboardHeader = ({ handleCollapsed }) => {
  const account = useSelector(selectAccount);

  return (
    <div
      style={{
        position: "sticky",
        paddingTop: 12,
        top: 0,
        zIndex: 8,
        backgroundColor: "#EFF0F2",
      }}
    >
      <header className="navbar navbar-expand-md navbar-light d-print-none header header-dark">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 5px",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleCollapsed}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon" />
          </Button>
          <StarredMenu />

          <div className="navbar-nav flex-row" style={{ marginRight: 15 }}>
            <div className="nav-item d-none d-md-flex me-3">
              {/* <div className="btn-list"></div> */}
            </div>

            <div className="nav-item">
              <Dropdown
                overlay={<Profile />}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Link
                  className="nav-link d-flex lh-1 text-reset p-0"
                  data-bs-toggle="dropdown"
                  aria-label="Open user menu"
                >
                  <span
                    className="avatar avatar-sm"
                    style={{
                      backgroundImage: `url(${account?.imageUrl})`,
                    }}
                  />
                  <div className="d-none d-xl-block ps-2">
                    <div>{account?.name}</div>
                    <div className="mt-1 small text-muted">{account?.role}</div>
                  </div>
                </Link>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

const StarredMenu = () => {
  // const dispatch = useDispatch();
  const menuItems = useSelector(selectMenuItems);
  // const starredMenuItems = useSelector(selectStarredMenuItems);
  return (
    <div className="starred-menu">
      {menuItems.map(({ icon, title, path }, index) => (
        <Tooltip key={index} placement="bottom" title={title}>
          <RouterLink to={path}>{icon}</RouterLink>
        </Tooltip>
      ))}
    </div>
  );
};

export default DashboardHeader;
