import { useState } from "react";
import {
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Tag,
  Space,
  Modal,
  Row,
  Col,
  Input,
  Form,
  Select,
} from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  EllipsisOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Option } = Select;

const floorPlanMenu = (
  <Menu>
    <Menu.Item key="1" icon={<UnorderedListOutlined />}>
      Tầng 1
    </Menu.Item>
    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
      Tầng 2
    </Menu.Item>
    <Menu.Item key="3" icon={<UnorderedListOutlined />}>
      Tầng 3
    </Menu.Item>
  </Menu>
);

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

const FloorPlanDropdownMenu = () => (
  <Space wrap>
    <Dropdown.Button
      overlay={floorPlanMenu}
      placement="bottomCenter"
      icon={<UnorderedListOutlined />}
    >
      Chọn tầng
    </Dropdown.Button>
  </Space>
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
    path: "locator-tags",
    breadcrumbName: "Locator Tags",
  },
];

/**
 * Page wrapper for new page
 * @param {object} [props] props of component
 * @param {PropTypes.func} [props.handleDelete] current page size of get request
 * @param {PropTypes.func} [props.handleRefresh] floor plan id which contains locator tags
 */
const Header = ({ handleDelete, handleRefresh }) => {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const handleCreate = () => setVisible(true);

  return (
    <>
      <PageHeader
        title="LOCATOR TAGS"
        className="site-page-header"
        subTitle="Manages locator tags inside your building"
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
          <Button
            key="3"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <DropdownMenu key="more" />,
        ]}
        avatar={{
          src: "https://icon-library.com/images/d345179a9c_25276.png",
        }}
        breadcrumb={{ routes }}
        footer={[<FloorPlanDropdownMenu />]}
      ></PageHeader>
      <CreateLocatorTag visible={visible} hideModal={hideModal} />
    </>
  );
};

/**
 * Page wrapper for new page
 * @param {object} [props] props of component
 * @param {PropTypes.func} [props.hideModal] dispose create model
 */
const CreateLocatorTag = ({ hideModal, visible }) => {
  return (
    <Modal
      width={700}
      title={`Tạo mới thẻ định vị`}
      visible={visible}
      //visible={true}
      back
      onOk={hideModal}
      onCancel={hideModal}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Row justify="space-between">
        <Col span={12}>
          <Col span={21}>
            <Form.Item
              label="Địa chỉ MAC: "
              required
              tooltip="Đây là địa chỉ MAC của thẻ định vị"
            >
              <Input
                placeholder="Nhập địa chỉ MAC của thẻ định vị"
                onChange={() => {
                  // setInput(!input);
                }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Tầng trong tòa nhà:"
              required
              tooltip="Đây là vị trí của thẻ định vị nằm ở tầng nào trong tòa nhà"
            >
              <Select
                defaultValue="Chọn tầng"
                style={{ width: 145 }}
                onChange={() => {
                  // setInput(!input);
                }}
              >
                <Option value="L1">Tầng 1</Option>
                <Option value="L2">Tầng 2</Option>
                <Option value="L3">Tầng 3</Option>
                <Option value="L4">Tầng 4 </Option>
                <Option value="L5">Tầng 5 </Option>
                <Option value="L6">Tầng 6</Option>
                <Option value="L7">Tầng 7 </Option>
                <Option value="L8">Tầng 8</Option>
                <Option value="L9">Tầng 9</Option>
                <Option value="L10">Tầng 10</Option>
                <Option value="L11">Tầng 11</Option>
                <Option value="L12">Tầng 12</Option>
                <Option value="L13">Tầng 13</Option>
              </Select>
            </Form.Item>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
};

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
