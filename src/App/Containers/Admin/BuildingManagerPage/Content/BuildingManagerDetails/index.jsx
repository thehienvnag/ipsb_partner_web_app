import React from "react";
import { Row, Col, Input, Form, Upload, Select } from "antd";
import {
  postAccount,
  putAccount,
  deleteAccount,
} from "App/Services/account.service";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import { PlusOutlined } from "@ant-design/icons";
import DetailCard from "App/Components/DetailCard";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";

const BuildingManagerDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createCallback: postAccount,
    updateCallback: putAccount,
    deleteCallback: deleteAccount,
    handleRefresh,
    handleCancel,
  });
  const disabled = model && model.status !== "Active";
  return (
    <DetailCard
      span={9}
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
      onRemove={onDelete}
    >
      <Form form={form} name="register" layout="vertical" scrollToFirstError>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item name="imageUrl">
              <ImagePicker />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input name of store owner",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Input name of store owner" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email:"
              rules={[
                {
                  type: "email",
                  message: "E-mail invalid !",
                },
                {
                  required: true,
                  message: "Input email",
                },
              ]}
            >
              <Input placeholder="Input email for contact" type="email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone: "
              required
              rules={[
                {
                  required: true,
                  message: "Input phone number",
                },
              ]}
            >
              <Input
                placeholder="Input phone number"
                type="number"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default BuildingManagerDetails;
