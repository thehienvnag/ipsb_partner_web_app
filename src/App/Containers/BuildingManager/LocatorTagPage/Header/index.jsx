import { useEffect, useState } from "react";
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
  message,
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
import { postLocatorTag } from "App/Services/locatorTag.service";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListFloor,
  loadAll,
  setCurrentFloor,
} from "App/Stores/floorPlan.slice";

const { Option } = Select;

const FloorPlanMenu = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);
  const listFloorPlan = useSelector(selectListFloor);

  return (
    <Menu>
      {listFloorPlan?.map((item) => (
        <Menu.Item
          onClick={(value) => {
            dispatch(setCurrentFloor(item));
          }}
          key={item.id}
          icon={<UnorderedListOutlined />}
        >
          Tầng {item.floorCode}
        </Menu.Item>
      ))}
    </Menu>
  );
};

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

const FloorPlanDropdownMenu = () => {
  return (
    <Space wrap>
      <Dropdown.Button
        overlay={<FloorPlanMenu></FloorPlanMenu>}
        placement="bottomCenter"
        icon={<UnorderedListOutlined />}
      >
        Chọn tầng
      </Dropdown.Button>
    </Space>
  );
};

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
  const [form1] = Form.useForm();

  const onSave = async () => {
    // console.log(values);
    try {
      const values = await form1.validateFields();
      const data = await postLocatorTag({
        ...values,
      });
      if (data?.status.valueOf(201)) {
        onFinishCreateLocatorTag(data);
      } else {
        onErrorCreateLocatorTag();
      }
    } catch {}
  };

  const onFinishCreateLocatorTag = (values) => {
    if (values != null) {
      message
        .loading("Action in progress...", 3)
        .then(() => message.success("Create success", 2))
        .then(() => hideModal());
    }
  };

  const onErrorCreateLocatorTag = () => {
    message
      .loading("Action in progress...", 3)
      .then(() => message.error("Error in create locator progress!", 2))
      .then(() => hideModal());
  };

  return (
    <Modal
      width={700}
      title={`Create new locator tag`}
      visible={visible}
      back
      onOk={onSave}
      onCancel={hideModal}
      okText="Save"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form1}>
        <Row justify="space-between">
          <Col span={12}>
            <Col span={21}>
              <Form.Item
                name="macAddress"
                label="MAC Address: "
                tooltip="This is MAC address of locator tag"
                rules={[
                  {
                    required: true,
                    message: "Input MAC address of locator tag",
                    whitespace: false,
                  },
                ]}
              >
                <Input
                  placeholder="Input MAC address of locator tag"
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="locationId"
                label="Location ID of locator tag: "
                tooltip="This is location ID of locator tag"
                rules={[
                  {
                    required: true,
                    message: "Input location ID of locator tag",
                    whitespace: false,
                  },
                ]}
              >
                <Input
                  placeholder="Input location ID of locator tag"
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="floorPlanId"
                label="Floor in building"
                tooltip="This is the location of the locator tag on which floor of building"
                rules={[
                  {
                    required: true,
                    message: "Select floor in building",
                  },
                ]}
              >
                <Select placeholder="Select floor" style={{ width: 145 }}>
                  <Option value="1">Tầng 1</Option>
                  <Option value="2">Tầng 2</Option>
                  <Option value="3">Tầng 3</Option>
                  <Option value="4">Tầng 4 </Option>
                  <Option value="5">Tầng 5 </Option>
                  <Option value="6">Tầng 6</Option>
                  <Option value="7">Tầng 7 </Option>
                  <Option value="8">Tầng 8</Option>
                  <Option value="9">Tầng 9</Option>
                  <Option value="10">Tầng 10</Option>
                  <Option value="11">Tầng 11</Option>
                  <Option value="12">Tầng 12</Option>
                  <Option value="13">Tầng 13</Option>
                </Select>
              </Form.Item>
            </Col>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

Header.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default Header;
