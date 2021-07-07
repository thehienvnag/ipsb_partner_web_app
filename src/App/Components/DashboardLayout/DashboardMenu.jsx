import { Dropdown, Menu } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import { BiHomeAlt } from "react-icons/bi";

const menuItems = [
  { title: "Home", icon: <BiHomeAlt size={25} />, type: "normal" },
  {
    title: "Home",
    icon: <BiHomeAlt size={25} />,
    type: "dropdown",
    menu: (
      <Menu>
        <Menu.Item key="0">1st menu item</Menu.Item>
        <Menu.Item key="1">2nd menu item</Menu.Item>
      </Menu>
    ),
  },
];

//#region Nav items components
const NavListItems = ({ items }) =>
  items.map((item) => {
    if (item.type === "normal") {
      return <NavItem item={item} />;
    }
    return <NavItemDropdown item={item} />;
  });

const NavItem = ({ item }) => (
  <li className="nav-item">
    <Link className="nav-link">
      <span className="nav-link-icon d-md-none d-lg-inline-block">
        {item.icon}
      </span>
      <span className="nav-link-title">{item.title}</span>
    </Link>
  </li>
);
const NavItemDropdown = ({ item }) => (
  <li className="nav-item dropdown">
    <Dropdown overlay={item.menu} trigger={["click"]}>
      <Link className="nav-link dropdown-toggle">
        <span className="nav-link-icon d-md-none d-lg-inline-block">
          {item.icon}
        </span>
        <span className="nav-link-title">{item.title}</span>
      </Link>
    </Dropdown>
  </li>
);
//#endregion

const DashboardMenu = () => {
  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar navbar-light">
          <div className="container-xl">
            <ul className="navbar-nav">
              <NavListItems items={menuItems} />
            </ul>
            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
              <form action="." method="get">
                <div className="input-icon">
                  <span className="input-icon-addon">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
