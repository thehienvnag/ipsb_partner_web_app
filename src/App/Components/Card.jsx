import React from "react";

const CardDropdown = ({ dropdown }) => (
  <div className="ms-auto lh-1">
    <div className="dropdown">
      <a
        className="dropdown-toggle text-muted"
        href="link"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {dropdown.title}
      </a>
      <div className="dropdown-menu dropdown-menu-end">
        {dropdown.items.map(({ title, link }) => (
          <a className="dropdown-item" href={link}>
            {title}
          </a>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Page wrapper for new page
 * @param {object} props Component props
 * @param {String} [props.className] Card class name
 * @param {String} [props.title] Card title
 * @param {boolean} [props.hasDropdown] has dropdown
 * @param {object} [props.dropdown] Dropdown content
 * @param {React.ReactElement[] | React.ReactElement} [props.children = []] Elements inside
 */
const Card = ({
  className,
  title,
  hasDropdown = false,
  dropdown = {},
  children,
}) => (
  <div className={className}>
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="subheader">{title}</div>
          {hasDropdown && <CardDropdown dropdown={dropdown} />}
        </div>
        {children}
      </div>
    </div>
  </div>
);
export default Card;
