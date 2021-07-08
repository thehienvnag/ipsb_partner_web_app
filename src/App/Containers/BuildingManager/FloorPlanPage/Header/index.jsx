import { PageHeader, Menu, Dropdown, Button, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./index.scss";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: "none",
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: "top",
        }}
      />
    </Button>
  </Dropdown>
);

const routes = [
  {
    path: "home",
    breadcrumbName: "Home",
  },
  {
    path: "floor-plans",
    breadcrumbName: "Floor Plans",
  },
];

const Header = () => (
  <PageHeader
    title="FLOOR PLANS"
    className="site-page-header"
    subTitle="Manages floor plans inside your building"
    tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button key="2" type="dashed">
        Refresh
      </Button>,
      <Button key="3" type="primary">
        Create
      </Button>,
      <Button key="2" danger>
        Delete
      </Button>,
      <DropdownMenu key="more" />,
    ]}
    avatar={{
      src: "https://icon-library.com/images/d345179a9c_25276.png",
    }}
    breadcrumb={{ routes }}
  ></PageHeader>
);

export default Header;
