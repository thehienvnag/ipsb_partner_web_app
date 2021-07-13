import React, { useState } from "react";
import "./createAccount.scss";
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
} from "antd";

const CreateAccountPage = () => {
  const [form] = Form.useForm();

  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleChange = (info) => {
    getBase64(info.fileList[0]?.originFileObj, (imageUrl) =>
      setImageUrl(imageUrl)
    );
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <PageWrapper>
        <PageHeader />
        <PageBody>
          <Card className="col-md-12">
            <Button type="primary" onClick={showModal}>
              Thêm mới tài khoản
            </Button>

            <Modal
              width={630}
              title="Thêm mới một tài khoản"
              visible={visible}
              //visible={true}
              // onOk={hideModal}
              onCancel={hideModal}
              // okText="Lưu mới"
              // cancelText="Hủy"
              footer={null}
            >
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
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
                          message: "Nhập tên của quản lý",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input placeholder="Nhập tên của người dùng" />
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
                      required
                      rules={[
                        {
                          required: true,
                          message: "Chọn quyền cho người dùng",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn quyền">
                        <Option value="Store Owner">Chủ cửa hàng</Option>
                        <Option value="Building Manager">
                          Quản lý tòa nhà
                        </Option>
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
                          <Button type="primary" htmlType="submit">
                            Đăng ký
                          </Button>
                        </Form.Item>
                      </Space>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Card>
        </PageBody>
      </PageWrapper>
    </div>
  );
};

export default CreateAccountPage;
