import { PageHeader } from "antd";
import React from "react";
import "./DashboardLayout/DashboardLayout.scss";
/**
 * Page wrapper for new page
 * @param {object} props Component props
 * @param {String}[props.type = "container-xl"] props.type Type of container wrapper. ['xl', 'fluid']
 * @param {React.ReactElement[]} [props.children = []] Elements inside
 */
export const PageWrapper = ({ type = "container-xl", children }) => {
  return (
    <div className={type + " page"}>
      {children && children.find((item) => item.type === PageHeader)}
      {children && children.find((item) => item.type === PageBody)}
    </div>
  );
};
/**
 * Page wrapper for new page
 * @param {object} props Component props
 * @param {React.ReactElement[] | React.ReactElement} [props.children = []] Elements inside
 */
export const PageBody = ({ children }) => (
  <div className="page-body" style={{ marginTop: 6 }}>
    <div className="row row-deck row-cards">{children}</div>
  </div>
);
