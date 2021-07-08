import { PageHeader, Menu, Dropdown, Button, Tag } from "antd";
import PropTypes from "prop-types";
import {
  EllipsisOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./index.scss";

const menu = (
  <Menu>
    <Menu.Item key="menu-1">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key="menu-2">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item key="menu-3">
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

const Header = ({ handleCreate, handleDelete, handleRefresh }) => (
  <PageHeader
    title="FLOOR PLANS"
    className="site-page-header"
    subTitle="Manages floor plans inside your building"
    tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button
        key="1"
        type="dashed"
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
      >
        Refresh
      </Button>,
      <Button
        key="2"
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
      >
        Create
      </Button>,
      <Button key="3" danger icon={<DeleteOutlined />} onClick={handleDelete}>
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

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
