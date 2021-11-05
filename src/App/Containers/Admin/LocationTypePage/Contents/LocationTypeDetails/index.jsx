import React from "react";
import { Row, Col, Input, Form } from "antd";
import DetailCard from "App/Components/DetailCard";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import {
  deleteLocationType,
  postLocationType,
  putLocationType,
} from "App/Services/locationType.service";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";

const { TextArea } = Input;
const LocationTypeDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { role: "Building Manager" },
    createCallback: postLocationType,
    updateCallback: putLocationType,
    deleteCallback: deleteLocationType,
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
      <Form form={form} layout="vertical">
        <Row justify="space-between">
          <Col span={10}>
            <Form.Item label="Image:" name="imageUrl" required>
              <ImagePicker disabled={disabled} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label="Name: "
              required
              rules={[
                {
                  required: true,
                  message: "Input location type name",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Input location type name"
                disabled={disabled}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description:"
              required
              rules={[
                {
                  required: true,
                  message: "Input description",
                  whitespace: true,
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Input description"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default LocationTypeDetails;
