import React from "react";
import { PageHeader, Button } from "antd";
import PropTypes from "prop-types";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";
/**
 * Page wrapper for new page
 * @param {object} [props] props of component
 * @param {PropTypes.func} [props.handleDelete] current page size of get request
 * @param {PropTypes.func} [props.handleRefresh] floor plan id which contains locator tags
 */
const Header = ({ handleCreate, handleRefresh }) => {
  return (
    <>
      <PageHeader
        title="LOCATOR TAGS"
        className="site-page-header"
        // subTitle="Manages locator tags inside your building"
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
        ]}
      ></PageHeader>
    </>
  );
};

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
