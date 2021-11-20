import React from "react";
import { Row, Col, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import DetailCard from "App/Components/DetailCard";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import {
  deleteAccount,
  postAccount,
  putAccount,
} from "App/Services/account.service";
import { useSelector } from "react-redux";
import { selectBuildingId } from "App/Stores/auth.slice";

const StoreOwnerDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const buildingId = useSelector(selectBuildingId);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { role: "Store Owner", buildingId },
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
              <ImagePicker disabled={disabled} />
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
              <Input
                placeholder="Input name of store owner"
                disabled={disabled}
              />
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
              <Input
                placeholder="Input email for contact"
                type="email"
                disabled={disabled}
              />
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
                minLength={10}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default StoreOwnerDetails;
