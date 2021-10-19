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

/**
 * Page wrapper for new page
 * @param {object} [props] props of component
 * @param {PropTypes.func} [props.handleCreate] current page of get request
 * @param {PropTypes.func} [props.handleDelete] current page size of get request
 * @param {PropTypes.func} [props.handleRefresh] building id which contains floor plans
 */
const Header = ({ handleCreate, handleDelete, handleRefresh }) => (
  <PageHeader
    title="LOCATIONS"
    className="site-page-header"
    // subTitle="Manages the locations within the floor of the building"
    // tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button
        style={{ marginLeft: 400 }}
        key="1"
        type="dashed"
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
      ></Button>,
      <Button
        key="2"
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
      ></Button>,
    ]}
  ></PageHeader>
);

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
