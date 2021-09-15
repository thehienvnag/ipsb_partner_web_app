import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, Select, message } from "antd";
import {
  postAccount,
  putAccount,
  deleteAccounts,
} from "App/Services/account.service";
import { PlusOutlined } from "@ant-design/icons";
import DetailCard from "App/Components/DetailCard";
const { Option } = Select;

const BuildingManagerDetails = ({ visible, onCancel, buildingManager }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (buildingManager) {
      form.setFieldsValue(buildingManager);
      setFileList([{ thumbUrl: buildingManager.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [buildingManager]);

  const handleChange = (info) => {
    setFileList(info.fileList);
  };

  const onSave = () => {
    if (buildingManager) {
      update();
    } else {
      create();
    }
  };
  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Add image for Building Manager", 4);
    } else if (values !== null && values.imageUrl != null) {
      message.loading("Action in progress...", 3);
      const data = await postAccount({
        ...values,
        ...{ role: "Building Manager" },
      });
      if (data === "Request failed with status code 409") {
        message.error("Email existed", 3);
      } else if (data?.id !== null) {
        message.success("Create success", 3);
      }
    }
  };
  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Add image for Building Manager", 4);
    } else if (values !== null && values.imageUrl != null) {
      message.loading("Action in progress...", 3);
      const data = await putAccount({
        ...values,
        // ...{ imageUrl: file },
        ...{ role: "Building Manager" },
      });
      if (data?.id !== null) {
      }
    }
  };
  const deleteAccount = async () => {
    // const data = await deleteAccounts(selectedItems);
    // console.log(selectedItems);
    // if (data === "Request failed with status code 405") {
    //   message.error("Method Not Allowed", 4);
    // } else {
    //   message.loading("Action in progress...", 3);
    //   message.success("Delete success", 3);
    // }
  };

  return (
    <DetailCard
      span={9}
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
      onRemove={deleteAccount}
    >
      <Form form={form} name="register" layout="vertical" scrollToFirstError>
        <Row justify="space-between">
          <Col span={11}>
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {!fileList.length && <UploadButton />}
            </Upload>
            <Form.Item
              name="status"
              label="Choose status:"
              style={{ marginTop: 4 }}
            >
              <Select placeholder="Select status">
                <Option value="New">New</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input name of store owner",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Input name of store owner" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email:"
              rules={[
                {
                  type: "email",
                  message: "E-mail invalid !",
                },
                {
                  required: true,
                  message: "Input email",
                },
              ]}
            >
              <Input placeholder="Input email for contact" type="email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone: "
              required
              rules={[
                {
                  required: true,
                  message: "Input phone number",
                },
              ]}
            >
              <Input
                placeholder="Input phone number"
                type="number"
                maxLength={10}
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

export default BuildingManagerDetails;
