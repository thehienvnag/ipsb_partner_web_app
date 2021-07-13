import React, { useState, useEffect } from "react";
import "./createBuilding.scss";
import { PageWrapper } from "App/Components/PageWrapper";
import { PageBody } from "App/Components/PageWrapper";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "App/Utils/utils";
import {
  PageHeader,
  Card,
  Modal,
  Button,
  Row,
  Col,
  Image,
  Input,
  Form,
  Upload,
  Select,
  Space,
  Steps,
  message,
  Spin,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectListAccount, loadAccounts } from "App/Stores/account.slice";

const CreateBuildingPage = () => {
  //#region selector of [listAccount, isLoading]
  const listAccount = useSelector(selectListAccount);
  const dispatch = useDispatch();
  //#endregion

  useEffect(() => {
    dispatch(loadAccounts());
  }, [dispatch]);
  const [form] = Form.useForm();
  const { Step } = Steps;
  const { TextArea } = Input;
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [currentStep, setStep] = useState(1);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
    setStep(0);
    setImageUrl(null);
  };
  const handleChange = (info) => {
    getBase64(info.fileList[0]?.originFileObj, (imageUrl) =>
      setImageUrl(imageUrl)
    );
  };

  const onFinishCreateAccount = (values) => {
    if (values != null) {
      message
        .loading("Action in progress...", 3)
        .then(() => message.success("Tạo mới tài khoản thành công", 2.5))
        .then(() => setStep(currentStep + 1), setImageUrl(null));
    }
  };

  const onFinishCreateBuilding = (values) => {
    if (values != null) {
      message
        .loading("Action in progress...", 3)
        .then(() => message.success("Tạo mới tòa nhà thành công", 3))
        .then(() => setStep(currentStep + 1), setImageUrl(null));
    }
  };

  function CreateBuildingForm() {
    return (
      <Form
        form={form}
        name="register"
        onFinish={onFinishCreateBuilding}
        scrollToFirstError
        id="myForm"
      >
        <Row justify="space-between">
          <Col span={11}>
            <div className="ant-image-custom">
              <Image
                style={{
                  width: "280px",
                  transform: "translateY(-10%)",
                }}
                src={imageUrl}
                preview={true}
              />
            </div>
          </Col>
          ,
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên tòa nhà: "
              required
              rules={[
                {
                  required: true,
                  message: "Nhập tên của tòa nhà",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Nhập tên tòa nhà" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ:"
              required
              rules={[
                {
                  required: true,
                  message: "Nhập địa chỉ của tòa nhà",
                  whitespace: true,
                },
              ]}
            >
              <div className="test">
                <TextArea rows={2} placeholder="Nhập địa chỉ tòa nhà" />
              </div>
            </Form.Item>

            <Form.Item
              name="numberOfFloor"
              label="Số tầng tòa nhà:"
              required
              rules={[
                {
                  required: true,
                  message: "Chọn tầng của tòa nhà",
                },
              ]}
            >
              <Select placeholder="Chọn số tầng">
                <Option value="1">1 tầng</Option>
                <Option value="2">2 tầng</Option>
                <Option value="3">3 tầng</Option>
                <Option value="4">4 tầng</Option>
                <Option value="5">5 tầng</Option>
                <Option value="6">6 tầng</Option>
                <Option value="7">7 tầng</Option>
                <Option value="8">8 tầng</Option>
                <Option value="9">9 tầng</Option>
                <Option value="10">10 tầng</Option>
                <Option value="11">11 tầng</Option>
                <Option value="12">12 tầng</Option>
                <Option value="13">13 tầng</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="managerId"
              label="Quản lý tòa nhà"
              required
              rules={[
                {
                  required: true,
                  message: "Chọn quản lý tòa nhà",
                },
              ]}
            >
              <Select placeholder="Chọn quản lý">
                {listAccount &&
                  listAccount.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item name="imageUrl" label="Thêm ảnh tòa nhà:" required>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  function CreateAccountForm() {
    return (
      <Form
        id="myForm"
        form={form}
        name="register"
        onFinish={onFinishCreateAccount}
        scrollToFirstError
      >
        <Row justify="space-between">
          <Col span={11}>
            <div className="ant-image-custom">
              <Image
                style={{
                  width: "260px",
                }}
                src={imageUrl}
                preview={true}
              />
            </div>
          </Col>
          ,
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên: "
              rules={[
                {
                  required: true,
                  message: "Nhập đầy đủ tên của người dùng ",
                  whitespace: true,
                },
              ]}
            >
              <div className="form-input">
                <Input placeholder="Nhập tên của người dùng" />
              </div>
            </Form.Item>

            <Form.Item
              name="email"
              label="Email: "
              required
              rules={[
                {
                  type: "email",
                  message: "E-mail không xác định !",
                },
                {
                  required: true,
                  message: "Nhập email",
                },
              ]}
            >
              <Input placeholder="Nhập email liên lạc" type="email" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              // required
              rules={[
                {
                  required: true,
                  message: "Chọn quyền cho người dùng",
                },
              ]}
            >
              <Select placeholder="Chọn quyền">
                <Option value="Store Owner">Chủ cửa hàng</Option>
                <Option value="Building Manager">Quản lý tòa nhà</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại: "
              required
              rules={[
                {
                  required: true,
                  message: "Nhập số điện thoại",
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                type="number"
                maxLength={10}
              />
            </Form.Item>

            <Form.Item name="imageUrl" label="Thêm ảnh cá nhân:">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                required
                beforeUpload={() => false}
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  function DoneForm() {
    return (
      <div className="example">
        <h1>
          <Spin /> Tòa nhà đã được thêm mới vào hệ thống <Spin />
        </h1>
        <h2 style={{ color: "Highlight" }}>
          <a
            href="http://localhost:3000/admin/building"
            // target="_blank"
            rel="noreferrer"
          >
            Quản lý ngay
          </a>
        </h2>
      </div>
    );
  }
  function Footer() {
    if (currentStep != "2")
      return (
        <Row>
          <Space>
            <Form.Item>
              <Button
                type="ghost"
                onClick={() => {
                  hideModal();
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
            </Form.Item>

            <Form.Item>
              <Button form="myForm" type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Space>
        </Row>
      );
    return null;
  }

  return (
    <div data-backdrop="static" data-keyboard="false" aria-hidden="true">
      <PageWrapper>
        <PageHeader />
        <PageBody>
          <Card className="col-md-12">
            <Button type="primary" onClick={showModal}>
              Thêm mới tòa nhà
            </Button>
            <Modal
              width={700}
              title="Thêm mới tòa nhà"
              visible={visible}
              //visible={true}
              onCancel={hideModal}
              footer={[<Footer />]}
            >
              <Steps current={currentStep}>
                <Step title="Đăng ký tài khoản" />
                <Step title="Đăng ký tòa nhà" />
                <Step title="Hoàn thành" />
              </Steps>
              <Space> </Space>
              {currentStep == "0" ? <CreateAccountForm /> : null}
              {currentStep == "1" ? <CreateBuildingForm /> : null}
              {currentStep == "2" ? <DoneForm /> : null}
            </Modal>
          </Card>
        </PageBody>
      </PageWrapper>
    </div>
  );
};

export default CreateBuildingPage;
