import { Dropdown, Menu, Button, Tooltip } from "antd";
import Link from "antd/lib/typography/Link";
import { selectAccount } from "App/Stores/auth.slice";
import {
  // addMenuItems,
  // selectStarredMenuItems,
  selectMenuItems,
} from "App/Stores/uiData.slice";
import React from "react";
import {
  useSelector,
  // useDispatch
} from "react-redux";
import "./DashboardHeader.scss";
import { Link as RouterLink, useNavigate, useMatch } from "react-router-dom";
// import { BiStar } from "react-icons/bi";
const notifications = (
  <Menu>
    <Menu.Item key="0">1st menu item</Menu.Item>
    <Menu.Item key="1">2nd menu item</Menu.Item>
  </Menu>
);

const Profile = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("../../login");
  };
  return (
    <Menu>
      <Menu.Item key="0">Profile &amp; account</Menu.Item>
      <Menu.Item key="1">Feedback</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logOut}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
const DashboardHeader = ({ handleCollapsed }) => {
  const account = useSelector(selectAccount);
  return (
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
          <div className="nav-item dropdown d-none d-md-flex me-3">
            <Dropdown
              overlay={notifications}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Link
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex={-1}
                aria-label="Show notifications"
              >
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
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span className="badge bg-red" />
              </Link>
            </Dropdown>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
              <div className="card">
                <div className="card-body">Notifications</div>
              </div>
            </div>
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
  );
};

const StarredMenu = () => {
  // const dispatch = useDispatch();
  const menuItems = useSelector(selectMenuItems);
  // const starredMenuItems = useSelector(selectStarredMenuItems);
  return (
    <div className="starred-menu">
      {menuItems.map(({ icon, title, path }) => (
        <Tooltip placement="bottom" title={title}>
          <RouterLink to={path}>{icon}</RouterLink>
        </Tooltip>
      ))}
    </div>
  );
};

export default DashboardHeader;
