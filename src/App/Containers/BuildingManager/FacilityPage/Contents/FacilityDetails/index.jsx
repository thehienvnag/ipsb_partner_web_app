import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Button, Select, message } from "antd";
import DetailCard from "App/Components/DetailCard";
import { postFacility, putFacility } from "App/Services/facility.service";
const { Option } = Select;

const FacilityDetails = ({ visible, onCancel, facility, statusBool }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (facility) {
      form.setFieldsValue(facility);
    } else {
      form.resetFields();
    }
  }, [facility]);

  const onSave = () => {
    if (facility) {
      update();
    } else {
      create();
    }
  };
  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values !== null) {
      message.loading("Action in progress...", 3);
      const data = await postFacility({
        ...values,
      });
      if (data !== null) {
        message.success("Create success", 3);
        form.resetFields();
      } else {
        message.error("Create faild", 3);
      }
    }
  };
  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values !== null) {
      message.loading("Action in progress...", 3);
      const data = await putFacility({
        ...values,
      });
      if (data !== null) {
        message.success("Update success", 3);
      } else {
        message.error("Update faild", 3);
      }
    }
  };

  return (
    <DetailCard
      span={9}
      className="modal-facility"
      title="Facility detail"
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
    >
      <Form form={form} name="register" layout="vertical" scrollToFirstError>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input name of facility",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Input name of facility" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Choose status:"
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
              rules={[
                {
                  required: true,
                  message: "Input description",
                },
              ]}
            >
              <Input placeholder="Input description" type="text" />
            </Form.Item>
            <Form.Item
              label="Location of facility"
              rules={[{ required: true }]}
              required
            >
              <Button>Pick location</Button>
              {/* {floorPlanId === -1 && <Button disabled>Pick location</Button>} */}
              {/* {floorPlanId > 0 && (
                  <MapZoomPan
                    mode="Other"
                    typeId={1}
                    floorPlanId={floorPlanId}
                    disabledPreview={true}
                    src={
                      listFloor &&
                      listFloor.filter(({ id }) => floorPlanId === id)[0]
                        ?.imageUrl
                    }
                  />
                )} */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default FacilityDetails;
