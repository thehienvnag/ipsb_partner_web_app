import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Input, Form, Upload, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { selectListAccount } from "App/Stores/account.slice";
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
    if (values.imageUrl == null) {
      message.error("Add image for building", 4);
    } else if (values != null && values.imageUrl != null) {
      message.loading("Action in progress...", 3);
      const data = await postBuilding({
        ...values,
        ...{ adminId: 2 },
        // ...{ imageUrl: file },
      });
      if (data?.id != null) {
        message.success("Update success", 3);
      }
    }
  };

  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    if (values.imageUrl == null) {
      message.error("Add image for building manager", 4);
    } else if (values !== null && values.imageUrl != null) {
      message.loading("Action in progress...", 3);
      const data = await putBuilding({
        ...values,
        // ...{ imageUrl: file },
        // ...{ id: buildingId },
        ...{ adminId: 2 },
        ...{ status: "Active" },
      });
      if (data?.id !== null) {
        message.success("Update success", 3);
      }
    }
  };
  const onSave = () => {
    form.validateFields();
    console.log(form.getFieldsValue());
  };
  useEffect(() => {
    if (building) {
      const managerId = `${building.managerId},${building.manager.name}`;
      form.setFieldsValue({
        ...building,
        managerId,
      });
      setFileList([{ thumbUrl: building.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [building]);
  return (
    <DetailCard visible={visible} onCancel={onCancel} onSave={onSave} span={9}>
      <Form form={form} layout="vertical">
        <Row justify="space-between" style={{ marginBottom: 10 }}>
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
              <SelectAccount role="Building Manager" />
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
