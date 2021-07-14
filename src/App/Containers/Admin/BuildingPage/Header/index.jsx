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
    path: "buildings",
    breadcrumbName: "Buildings",
  },
];

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {PropTypes.func} [params.handleCreate] current page of get request
 * @param {PropTypes.func} [params.handleDelete] current page size of get request
 * @param {PropTypes.func} [params.handleRefresh] building id which contains floor plans
 */
const Header = ({ handleCreate, handleDelete, handleRefresh }) => (
  <PageHeader
    title="BUILDINGS"
    className="site-page-header"
    subTitle="Manages buildings inside your application"
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
      src: "https://maisonoffice.vn/wp-content/uploads/2020/01/toa-nha-thai-building-duong-dinh-nghe.jpg",
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
