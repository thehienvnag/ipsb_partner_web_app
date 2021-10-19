import React from "react";
import { Row, Col, Input, Form } from "antd";
import {
  deleteBuilding,
  postBuilding,
  putBuilding,
} from "App/Services/building.service";
import DetailCard from "App/Components/DetailCard";
import SelectAccount from "App/Components/CustomSelect/SelectAccount";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";

const { TextArea } = Input;
const BuildingDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createCallback: postBuilding,
    updateCallback: putBuilding,
    deleteCallback: deleteBuilding,
    handleRefresh,
    handleCancel,
  });
  const disabled = model && model.status !== "Active";
  return (
    <DetailCard
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
      onRemove={onDelete}
      span={9}
    >
      <Form form={form} layout="vertical">
        <Row justify="space-between">
          <Col span={10}>
            <Form.Item name="imageUrl" label="Add image:" required>
              <ImagePicker />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label="Building name: "
              required
              rules={[
                {
                  required: true,
                  message: "Input building name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Input building name" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address:"
              required
              rules={[
                {
                  required: true,
                  message: "Input address of building",
                  whitespace: true,
                },
              ]}
            >
              <TextArea rows={3} placeholder="Input address of building" />
            </Form.Item>
            <Form.Item
              name="managerId"
              label="Manager:"
              rules={[
                {
                  required: true,
                  message: "Please choose manager!",
                },
              ]}
            >
              <SelectAccount
                role="Building Manager"
                initialValue={model?.manager}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default BuildingDetails;
