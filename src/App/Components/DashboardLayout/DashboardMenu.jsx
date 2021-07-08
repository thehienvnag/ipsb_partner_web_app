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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
