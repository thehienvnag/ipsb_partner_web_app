import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { postBuilding, putBuilding } from "App/Services/building.service";
import DetailCard from "App/Components/DetailCard";
import SelectAccount from "App/Components/CustomSelect/SelectAccount";

const { TextArea } = Input;
const BuildingDetails = ({ visible, onCancel, building }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const handleChange = (info) => setFileList(info.fileList);

  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    if (values.imageUrl == null) {
      message.error("Add image for building", 4);
    } else if (values != null && values.imageUrl != null) {
      message.loading("Action in progress...", 3);
      const data = await postBuilding({
        ...values,
        ...{ adminId: 2 },
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      if (data != null) {
        message.success("Create success", 3);
        form.resetFields();
        setFileList([]);
      } else {
        message.error("Create failed", 4);
      }
    }
  };

  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Add image for building manager", 4);
    } else if (
      values.name == null ||
      values.numberOfFloor == null ||
      values.address == null ||
      values.imageUrl == null
    ) {
      message.error("All Fields need to Fill !!", 4);
    } else if (
      values.name !== null &&
      values.numberOfFloor != null &&
      values.imageUrl != null &&
      values.address != null
    ) {
      message.loading("Action in progress...", 3);
      const data = await putBuilding({
        ...values,
        ...{ id: building.id },
        ...{ adminId: 2 },
        ...{ status: "Active" },
      });
      if (data !== null) {
        message.success("Update success", 3);
      } else {
        message.error("Update failed", 4);
      }
    }
  };

  const onSave = () => {
    if (building) {
      update();
    } else {
      create();
    }
  };
  useEffect(() => {
    if (building) {
      form.setFieldsValue(building);
      setFileList([{ thumbUrl: building.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [building]);
  return (
    <DetailCard visible={visible} onCancel={onCancel} onSave={onSave} span={9}>
      <Form form={form} layout="vertical">
        <Row justify="space-between">
          <Col span={10}>
            <Form.Item name="imageUrl" label="Add image:" required>
              <Upload
                className="upload-wrapper"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {!fileList.length && <UploadButton />}
              </Upload>
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
                initialValue={building?.manager}
              />
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
              name="numberOfFloor"
              label="Number of floor:"
              required
              rules={[
                {
                  required: true,
                  message: "Input number of floor",
                },
              ]}
            >
              <Input
                placeholder="Input number of floor"
                type="number"
                maxLength={3}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default BuildingDetails;
