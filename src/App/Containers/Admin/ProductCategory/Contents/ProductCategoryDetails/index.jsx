import React from "react";
import { Row, Col, Input, Form } from "antd";
import DetailCard from "App/Components/DetailCard";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import {
  deleteProductCategory,
  postProductCategory,
  putProductCategory,
} from "App/Services/productCategory.service";

const ProductCategoryDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { role: "Building Manager" },
    createCallback: postProductCategory,
    updateCallback: putProductCategory,
    deleteCallback: deleteProductCategory,
    handleRefresh,
    handleCancel,
  });
  const disabled = model && model.status !== "Active";
  return (
    <DetailCard
      span={10}
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
      onRemove={onDelete}
    >
      <Form form={form} layout="vertical">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Image:" name="imageUrl" required>
              <ImagePicker disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="name"
              label="Name: "
              required
              rules={[
                {
                  required: true,
                  message: "Input product category name",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Input product category name"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default ProductCategoryDetails;
