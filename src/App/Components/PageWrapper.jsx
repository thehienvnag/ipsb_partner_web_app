import React from "react";
import "./DashboardLayout/DashboardLayout.scss";
import { Row } from "antd";
/**
 * Page wrapper for new page
 * @param {object} props Component props
 * @param {String}[props.type = "container-xl"] props.type Type of container wrapper. ['xl', 'fluid']
 * @param {String}[props.className = ""] Class name
 * @param {React.ReactElement[]} [props.children = []] Elements inside
 */
export const PageWrapper = ({ children }) => {
  return <>{children}</>;
};
/**
 * Page wrapper for new page
 * @param {object} props Component props
 * @param {React.ReactElement[] | React.ReactElement} [props.children = []] Elements inside
 */
export const PageBody = ({ children, noWrap = false }) => (
  <div className="page-body" style={{ padding: "5px 18px" }}>
    <Row style={{ flexFlow: "nowrap" }}>{children}</Row>
  </div>
);
