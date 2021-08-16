import React from "react";
import { Modal, Form, Select, Button } from "antd";
import "./index.scss";
import FormItem from "antd/lib/form/FormItem";
import { GrLocation } from "react-icons/gr";
const { Option } = Select;

const CreateLocationTypeModal = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();
  const onLocationChange = () => {};
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        width="50%"
        title="Create location"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="inline"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            label="Location Type"
            rules={[{ required: true }]}
            required
          >
            <Select
              placeholder="Select a location"
              onChange={onLocationChange}
              allowClear
            >
              <Option value="id">Cửa hàng</Option>
              <Option value="id">Đường đi</Option>
              <Option value="id">Thang máy</Option>
              <Option value="id">Cầu than</Option>
              <Option value="id">Beacon</Option>
              <Option value="id">Checkout</Option>
              <Option value="id">Nhà vệ sinh</Option>
            </Select>
          </Form.Item>
          <FormItem
            label="Position of location"
            rules={[{ required: true }]}
            required
          >
            <Button icon={<GrLocation />}> Location</Button>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};
export default CreateLocationTypeModal;
