import { PageHeader, Menu, Dropdown, Button, Tag } from "antd";
import PropTypes from "prop-types";
import {
  EllipsisOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./index.scss";

/**
 * Page wrapper for new page
 * @param {object} [props] props of component
 * @param {PropTypes.func} [props.handleCreate] current page of get request
 * @param {PropTypes.func} [props.handleDelete] current page size of get request
 * @param {PropTypes.func} [props.handleRefresh] building id which contains floor plans
 */
const Header = ({ handleCreate, handleDelete, handleRefresh }) => (
  <PageHeader
    title="STORES"
    className="site-page-header"
    // subTitle="Manages stores inside your building"
    // tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button
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
      <Button
        key="3"
        danger
        icon={<DeleteOutlined />}
        onClick={handleDelete}
      ></Button>,
    ]}
  ></PageHeader>
);

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
