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
        .then(() => message.success("Thêm mới thẻ định vị thành công", 2))
        .then(() => hideModal());
    }
  };

  const onErrorCreateLocatorTag = () => {
    message
      .loading("Action in progress...", 3)
      .then(() =>
        message.error("Có lỗi xảy ra trong quá trình tạo mới thẻ định vị", 2)
      )
      .then(() => hideModal());
  };

  return (
    <Modal
      width={700}
      title={`Tạo mới thẻ định vị`}
      visible={visible}
      back
      onOk={onSave}
      onCancel={hideModal}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form1}>
        <Row justify="space-between">
          <Col span={12}>
            <Col span={21}>
              <Form.Item
                name="macAddress"
                label="Địa chỉ MAC: "
                tooltip="Đây là địa chỉ MAC của thẻ định vị"
                rules={[
                  {
                    required: true,
                    message: "Nhập địa chỉ MAC của thẻ định vị",
                    whitespace: false,
                  },
                ]}
              >
                <Input
                  placeholder="Nhập địa chỉ MAC của thẻ định vị"
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="locationId"
                label="Vị trí ID của thẻ định vị: "
                tooltip="Đây là vị trí của thẻ định vị trong tòa nhà"
                rules={[
                  {
                    required: true,
                    message: "Nhập vị trí của thẻ định vị trong tòa nhà",
                    whitespace: false,
                  },
                ]}
              >
                <Input
                  placeholder="Nhập vị trí ID của thẻ định vị"
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="floorPlanId"
                label="Tầng trong tòa nhà:"
                tooltip="Đây là vị trí của thẻ định vị nằm ở tầng nào trong tòa nhà"
                rules={[
                  {
                    required: true,
                    message: "Chọn tầng của tòa nhà",
                  },
                ]}
              >
                <Select placeholder="Chọn tầng" style={{ width: 145 }}>
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
