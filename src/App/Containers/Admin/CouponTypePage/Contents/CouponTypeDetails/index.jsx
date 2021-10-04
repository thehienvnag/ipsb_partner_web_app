import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, message,  Select } from "antd"; 
import DetailCard from "App/Components/DetailCard";
import { postCouponType, putCouponType } from "App/Services/couponType.service";

const { TextArea } = Input;
const { Option } = Select;
const CouponTypeDetails = ({ visible, onCancel, couponTypeModel, statusBool}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (couponTypeModel) {
      form.setFieldsValue({
        ...couponTypeModel,
      });
    } else {
      form.resetFields();
    }
  }, [couponTypeModel]);

  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values.name == null || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await postCouponType({
        ...values,
      });
      if (data!== null) {
        message.success("Create success", 3);
        form.resetFields();
      }else{
        message.error("Create failed", 4);
      }
    }
  };

  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values.name == null || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await putCouponType({
        ...{ id: couponTypeModel.id },
        ...values,
      });
      if (data !== null) {
        message.success("Update success", 3);
        form.resetFields();
      }else{
        message.error("Update failed", 4);
      }
    }
  };
  const onSave = () => {
    if (couponTypeModel) {
      update();
    } else {
      create();
    }
  };

  return (
    <DetailCard visible={visible} onCancel={onCancel} onSave={onSave} span={9}>
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
            <Form.Item
              name="status"
              label="Choose status:"
              style={{ marginTop: 4 }}
            > 
        
              <Select placeholder="Select status" disabled={statusBool} defaultValue="Active"> 
                <Option value="New">New</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
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
              <TextArea rows={5} placeholder="Input description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default CouponTypeDetails;
