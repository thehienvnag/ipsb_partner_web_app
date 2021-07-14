import React, { useState } from "react";
import { Modal, Row, Col, Upload, Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "App/Utils/utils";
import "./index.scss";
import FormItem from "antd/lib/form/FormItem";
import { GrLocation } from "react-icons/gr";

const { TextArea } = Input;
const { Option } = Select;

const CreateStoreModal = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Preview upload image");
  const [previewImage, setPreviewImage] = useState("");
  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };
  const onFloorChange = () => {};

  const onFinish = (values) => {
    console.log(values);
  };

  const handleCancelPreview = () => setPreviewVisible(false);
  const handlePreview = (file) => {
    getBase64(file.originFileObj, (fileSrc) => {
      setPreviewImage(fileSrc);
    });

    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      <Modal
        width="50%"
        title="Create Store"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col className="col-md-7">
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && <UploadButton />}
            </Upload>
            <Modal
              width="800px"
              visible={previewVisible}
              title={previewTitle}
              onCancel={handleCancelPreview}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            <FormItem
              label="Position of store"
              rules={[{ required: true }]}
              required
            >
              <Button icon={<GrLocation />}> Location</Button>
            </FormItem>
          </Col>
          <Col className="col-md-5">
            <Form
              layout="vertical"
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <Form.Item
                name="storeName"
                label="Store name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Input store name" />
              </Form.Item>
              <Form.Item
                label="Floor plan"
                rules={[{ required: true }]}
                required
              >
                <Select
                  placeholder="Select a floor plan"
                  onChange={onFloorChange}
                  allowClear
                >
                  <Option value="id">Floor L1</Option>
                  <Option value="id">Floor L2</Option>
                  <Option value="id">Floor L3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone number"
                rules={[{ required: true }]}
              >
                <Input placeholder="Input phone number" />
              </Form.Item>

              <FormItem
                label="Product Category"
                rules={[{ required: true }]}
                required
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select product categorys"
                  onChange={handleChangeSelect}
                  optionLabelProp="label"
                >
                  <Option value="Cà phê" label="Cà phê" />
                  <Option value="Bánh mì" label="Bánh mì" />
                  <Option value="Trà sữa" label="Trà sữa" />
                  <Option value="Nước cam" label="Nước cam" />
                </Select>
              </FormItem>
              <FormItem
                label="Description"
                rules={[{ required: true }]}
                required
              >
                <TextArea rows={4} placeholder="Description..." />
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default CreateStoreModal;
