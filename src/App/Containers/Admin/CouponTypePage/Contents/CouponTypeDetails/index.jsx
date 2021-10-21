import React from "react";
import { Row, Col, Input, Form } from "antd";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import DetailCard from "App/Components/DetailCard";
import {
  deleteCouponType,
  postCouponType,
  putCouponType,
} from "App/Services/couponType.service";

const { TextArea } = Input;
const CouponTypeDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { role: "Building Manager" },
    createCallback: postCouponType,
    updateCallback: putCouponType,
    deleteCallback: deleteCouponType,
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
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Col span={10}>
            <Form.Item
              name="name"
              label="Name: "
              required
              rules={[
                {
                  required: true,
                  message: "Input coupon type name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Input coupon type name" />
            </Form.Item>
          </Col>

          <Col span={12}>
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
              <TextArea rows={3}placeholder="Input description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default CouponTypeDetails;
