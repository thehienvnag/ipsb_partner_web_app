import React, { useState } from "react";
import "./index.scss";
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
} from "antd";

const CreateBuildingPage = () => {
  const { TextArea } = Input;
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState({
    buildName: null,
    address: null,
    numberFloor: null,
    managerPhone: null,
    managerName: null,
    managerEmail: null,
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleChange = (info) => {
    getBase64(info.fileList[0]?.originFileObj, (imageUrl) =>
      setImageUrl(imageUrl)
    );
  };

  return (
    <div>
      <PageWrapper>
        <PageHeader />
        <PageBody>
          <Card className="col-md-12">
            <Button type="primary" onClick={showModal}>
              Thêm mới tòa nhà
            </Button>
            <Modal
              width={700}
              title="Thêm mới một tòa nhà"
              visible={visible}
              //visible={true}
              onOk={hideModal}
              onCancel={hideModal}
              okText="Lưu"
              cancelText="Hủy"
            >
              <Row justify="space-between">
                <Col span={11}>
                  <div className="ant-image-custom">
                    <Image
                      style={{
                        width: "280px",
                        //height: "280px",
                        transform: "translateY(-10%)",
                      }}
                      src={imageUrl}
                      preview={true}
                    />
                  </div>
                </Col>
                ,
                <Col span={12}>
                  <Col span={21}>
                    <Form.Item
                      label="Tên tòa nhà: "
                      required
                      tooltip="Đây là mục yêu cầu nhập"
                    >
                      <Input
                        placeholder="Nhập tên tòa nhà"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={21}>
                    <Form.Item
                      label="Địa chỉ tòa nhà:"
                      required
                      tooltip="Đây là mục yêu cầu nhập"
                    >
                      {/* <Input placeholder="Nhập địa chỉ tòa nhà" /> */}
                      <TextArea
                        rows={2}
                        placeholder="Nhập địa chỉ tòa nhà"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Số tầng tòa nhà:"
                      required
                      tooltip="Đây là mục yêu cầu chọn"
                    >
                      <Select
                        defaultValue="Chọn tầng"
                        style={{ width: 145 }}
                        onChange={() => {
                          // setInput(!input);
                        }}
                      >
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
                  </Col>
                  <Col span={21}>
                    <Form.Item
                      label="Chọn ảnh cho tòa nhà::"
                      required
                      tooltip="Đây là mục yêu cầu chọn"
                    >
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
                </Col>
              </Row>

              <div style={{ width: "94%" }}>
                <Row justify={"space-between"}>
                  <Col span={8}>
                    <Form.Item
                      label="Tên quản lý tòa nhà: "
                      required
                      tooltip="Đây là mục yêu cầu nhập"
                    >
                      <Input
                        placeholder="Nhập tên quản lý"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      label="Số điện thoại quản lý: "
                      required
                      tooltip="Đây là mục yêu cầu nhập"
                    >
                      <Input
                        placeholder="Nhập số điện thoại"
                        type="number"
                        inputMode="numeric"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Email quản lý: "
                      required
                      tooltip="Đây là mục yêu cầu nhập"
                    >
                      <Input
                        placeholder="Nhập email liên lạc"
                        type="email"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Modal>
          </Card>
        </PageBody>
      </PageWrapper>
    </div>
  );
};

export default CreateBuildingPage;
