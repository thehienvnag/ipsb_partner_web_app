import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Form,
  Input,
  Upload,
  Select,
  Switch,
  Row,
  Col,
  Button,
  message,
} from "antd";
import { getBase64 } from "App/Utils/utils";
import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import IndoorMap from "App/Components/IndoorMap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeLocations } from "App/Stores/location.slice";
import { removeEdges } from "App/Stores/edge.slice";
import {
  postFloorPlanForm,
  putFloorPlanForm,
} from "App/Stores/floorPlan.slice";

const FloorPlanDetail = ({ floor, onCancel }) => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (id === "create-new") {
      dispatch(removeEdges());
      dispatch(removeLocations());
      form.resetFields();
    }
    if (floor) {
      form.setFieldsValue(floor);
    } else {
      form.resetFields();
    }
  }, [floor]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      if (file) {
        Object.assign(values, { imageUrl: file });
      }
      message.loading("Loading...", "post/putFloor");
      if (id === "create-new" && file) {
        await dispatch(postFloorPlanForm(values));
      } else {
        await dispatch(putFloorPlanForm(values));
      }
      setRefresh(refresh + 1);
      message.success("Success!", "post/putFloor");
    } catch (error) {}
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Row justify="space-between">
          {floor && (
            <Col span={11}>
              <>
                <Form.Item name="status" label="Floor status">
                  <Switch checked={floor?.status === "Active"} />
                </Form.Item>
                <Form.Item name="buildingId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
              </>
            </Col>
          )}
          <Col span={11}>
            <Form.Item
              label="Floor position"
              required
              name="floorNumber"
              rules={[
                { required: true, message: "Please input floor number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Floor code"
              required
              name="floorCode"
              rules={[{ required: true, message: "Please input floor code!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="floorType"
              label="Floor type"
              required
              rules={[{ required: true, message: "Please input your !" }]}
            >
              <Select>
                <Select.Option value="Upper">Upper</Select.Option>
                <Select.Option value="Ground">Ground</Select.Option>
                <Select.Option value="Basement">Basement</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Floor map image" required>
              <Upload
                multiple={false}
                maxCount={1}
                onChange={({ fileList }) => {
                  if (fileList[0]) {
                    setFile(fileList[0]?.originFileObj);
                    getBase64(fileList[0].originFileObj, (imageUrl) =>
                      setSrc(imageUrl)
                    );
                  }
                }}
                onRemove={() => setSrc(null)}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <IndoorMap
        src={src ?? floor?.imageUrl}
        floorPlanId={id !== "create-new" && floor?.id}
        refresh={refresh}
      />
      <Row justify="end" className="detail-card-footer">
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        {floor && (
          <Button
            key="3"
            danger
            style={{ marginRight: 10 }}
            icon={<DeleteOutlined />}
            onClick={() => {}}
          >
            Remove
          </Button>
        )}

        <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
          Save
        </Button>
      </Row>
    </>
  );
};

export default FloorPlanDetail;
