import React, { useState } from "react";
import { Row, Col, Input, Form } from "antd";
import DetailCard from "App/Components/DetailCard";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import { useSelector } from "react-redux";
import { selectStoreId } from "App/Stores/auth.slice";
import {
  deleteCoupon,
  postCoupon,
  putCoupon,
} from "App/Services/coupon.service";
import SelectCouponType from "App/Components/CustomSelect/SelectCouponType";

const { TextArea } = Input;

const couponTypeFixed = 2; // Fixed coupon type Id
// const couponTypePercentage = 3; // Percentage coupon type Id

const CouponDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const storeId = useSelector(selectStoreId);
  const [couponTypeId, setCouponTypeId] = useState(null);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { storeId },
    createCallback: postCoupon,
    updateCallback: putCoupon,
    deleteCallback: deleteCoupon,
    handleRefresh,
    handleCancel,
    effectCallback: () => setCouponTypeId(null),
  });
  const disabled = model && model.status !== "Active";
  return (
    <DetailCard
      span={11}
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={!disabled && onSave}
      onRemove={!disabled && onDelete}
    >
      <Form
        form={form}
        name="register"
        layout="vertical"
        onValuesChange={({ couponTypeId }) => setCouponTypeId(couponTypeId)}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="imageUrl"
              label="Coupon image"
              rules={[
                {
                  required: true,
                  message: "Input coupon image",
                },
              ]}
            >
              <ImagePicker disabled={disabled} />
            </Form.Item>

            <Form.Item
              name="publishDate"
              label="Publish date: "
              required
              rules={[
                {
                  required: true,
                  message: "Input publish date",
                },
              ]}
            >
              <Input
                placeholder="Input publish date"
                type="datetime-local"
                disabled={disabled || model}
              />
            </Form.Item>
            <Form.Item
              name="expireDate"
              label="Expire date: "
              required
              rules={[
                {
                  required: true,
                  message: "Pick coupon expireDate",
                },
              ]}
            >
              <Input
                placeholder="Pick coupon expireDate"
                type="datetime-local"
                disabled={disabled || model}
              />
            </Form.Item>
            <Form.Item
              name="limit"
              label="Limit"
              required
              rules={[
                {
                  required: true,
                  message: "Input coupon limit",
                },
              ]}
            >
              <Input
                placeholder="Input coupon limit"
                type="number"
                disabled={disabled || model}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Code:"
              rules={[
                {
                  required: true,
                  message: "Input coupon code",
                },
              ]}
            >
              <Input
                placeholder="Input coupon code"
                disabled={disabled || model}
              />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input name of coupon",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Name of coupon" disabled={disabled} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description:"
              rules={[
                {
                  required: true,
                  message: "Description of coupon",
                  whitespace: false,
                },
              ]}
            >
              <TextArea
                style={{ marginTop: 6 }}
                rows={3}
                placeholder="Description..."
                disabled={disabled}
              />
            </Form.Item>
            <Form.Item
              name="couponTypeId"
              label="Coupon type: "
              required
              rules={[
                {
                  required: true,
                  message: "Select coupon type",
                },
              ]}
            >
              <SelectCouponType
                initialValue={model?.couponType}
                disabled={disabled || model}
              />
            </Form.Item>
            {couponTypeId ||
              (model && (
                <Form.Item
                  name="amount"
                  label="Amount: "
                  required
                  rules={[
                    {
                      required: true,
                      message: "Input coupon amount",
                    },
                  ]}
                >
                  <Input
                    placeholder="Input coupon amount"
                    type="number"
                    disabled={disabled || model}
                  />
                </Form.Item>
              ))}

            {couponTypeId ||
              (model && (
                <Form.Item name="minSpend" label="Min spend: ">
                  <Input
                    placeholder="Input min price"
                    type="number"
                    disabled={disabled || model}
                  />
                </Form.Item>
              ))}
            {((couponTypeId && couponTypeId != couponTypeFixed) ||
              (model?.couponTypeId &&
                model.couponTypeId != couponTypeFixed)) && (
              <Form.Item name="maxDiscount" label="Max discount: ">
                <Input
                  placeholder="Input coupon max discount"
                  type="number"
                  disabled={disabled || model}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default CouponDetails;
