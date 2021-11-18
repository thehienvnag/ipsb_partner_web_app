import React from "react";
import { Row, Col, Input, Form } from "antd";
import DetailCard from "App/Components/DetailCard";
import RichEditor from "App/Components/RichEditor";
import SelectCategory from "App/Components/CustomSelect/SelectCategory";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import {
  postProduct,
  deleteProduct,
  putProduct,
} from "App/Services/product.service";
import { useSelector } from "react-redux";
import { selectStoreId } from "App/Stores/auth.slice";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";

const ProductDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const storeId = useSelector(selectStoreId);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { storeId },
    createCallback: postProduct,
    updateCallback: putProduct,
    deleteCallback: deleteProduct,
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
      onSave={!disabled && onSave}
      onRemove={!disabled && onDelete}
    >
      <Form form={form} name="register" layout="vertical" scrollToFirstError>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="imageUrl"
              rules={[
                {
                  required: true,
                  message: "Input product image",
                },
              ]}
            >
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
                  message: "Input product name",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Input product name" disabled={disabled} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price:"
              style={{ marginTop: "8px" }}
              rules={[
                {
                  required: true,
                  message: "Input product price",
                },
              ]}
            >
              <Input
                placeholder="Input product price"
                type="number"
                disabled={disabled}
              />
            </Form.Item>
            <Form.Item
              name="productCategoryId"
              label="Category: "
              required
              rules={[
                {
                  required: true,
                  message: "Input product category",
                },
              ]}
            >
              <SelectCategory
                initialValue={model?.productCategory}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description:"
              rules={[
                {
                  required: true,
                  message: "Input product description",
                  whitespace: false,
                },
              ]}
            >
              <RichEditor disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default ProductDetails;
