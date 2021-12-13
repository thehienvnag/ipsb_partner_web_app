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
 * @param {object} [params] parameters for get request
 * @param {PropTypes.func} [params.handleCreate] current page of get request
 * @param {PropTypes.func} [params.handleDelete] current page size of get request
 * @param {PropTypes.func} [params.handleRefresh] building id which contains floor plans
 */
const Header = ({ handleCreate, handleDelete, handleRefresh }) => (
  <PageHeader
    title="FACILITIES"
    className="site-page-header"
    // subTitle="Manages store owner inside your building"
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
    ]}
  ></PageHeader>
);

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
