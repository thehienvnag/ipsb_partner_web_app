import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DetailCard from "App/Components/DetailCard";
import { postLocationType, putLocationType } from "App/Services/locationType.service";

const { TextArea } = Input;
const { Option } = Select;
const LocationTypeDetails = ({ visible, onCancel, locationTypeModel, statusBool }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const handleChange = (info) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    if (locationTypeModel) {
      form.setFieldsValue({
        ...locationTypeModel,
      });
      setFileList([{ thumbUrl: locationTypeModel.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [locationTypeModel]);

  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (fileList == null || fileList.length == 0) {
      message.error("Add image for Locationtpe", 4);
    } else if (values.name == null || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && fileList.length > 0 && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await postLocationType({
        ...values,
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      if (data !== null) {
        message.success("Create success", 3);
        form.resetFields();
      } else {
        message.error("Create failed", 4);
      }
    }
  };

  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log("========================================");
    console.log(values);
    if (fileList == null || fileList.length == 0 ) {
      message.error("Add image for Locationtpe", 4);
    } else if (values.name == null || fileList.length == 0 || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && fileList.length > 0 && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await putLocationType({
        ...values,
        ...{ id: locationTypeModel.id },
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      if (data !== null) {
        message.success("Update success", 3);
      }else{
        message.error("Update failed", 4);
      }
    }
  };
  const onSave = () => {
    if (locationTypeModel) {
      update();
    } else {
      create();
    }
  };

  return (
    <DetailCard visible={visible} onCancel={onCancel} onSave={onSave} span={9}>
      <Form form={form} layout="vertical">
        <Row justify="space-between" >
          <Col span={10}>
            <Form.Item
              name="imageUrl"
              label="Add image"
              required>
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
              name="name"
              label="Name: "
              required
              rules={[
                {
                  required: true,
                  message: "Input location type name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Input location type name" />
            </Form.Item>

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
              <TextArea rows={7} placeholder="Input description" />
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

export default LocationTypeDetails;
