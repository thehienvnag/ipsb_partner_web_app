import React, { useState } from "react";
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
  Divider,
} from "antd";
import { getBase64 } from "App/Utils/utils";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import MapZoomPan from "App/Components/IndoorMap/MapZoomPan";

const Overview = ({ floor }) => {
  const [componentSize, setComponentSize] = useState("default");
  const [src, setSrc] = useState(null);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Row justify="space-between" align="middle">
        <Row>
          <Form.Item className="form-item-header">
            <Button icon={<SaveOutlined />} type="primary">
              Save
            </Button>
          </Form.Item>
        </Row>
        <Row>
          <Divider type="vertical" style={{ height: 35, borderWidth: 2 }} />
          <Form.Item label="Elements on floor" className="form-item-header">
            <Select defaultValue="upper" style={{ width: 200 }}>
              <Select.Option value="upper">Show all</Select.Option>
              <Select.Option value="ground">Beacon</Select.Option>
              <Select.Option value="basement">Service</Select.Option>
            </Select>
          </Form.Item>
        </Row>
      </Row>
      <Divider style={{ margin: "10px 0 30px 0" }} />
      <Row justify="space-between" align="stretch">
        <Col className="col-md-4">
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <Form.Item label="Floor status">
              <Switch />
            </Form.Item>
            <Form.Item label="Floor code" required>
              <Input value={floor?.floorCode} />
            </Form.Item>
            <Form.Item label="Floor type" required>
              <Select>
                <Select.Option value="upper">Upper</Select.Option>
                <Select.Option value="ground">Ground</Select.Option>
                <Select.Option value="basement">Basement</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Floor map image" required>
              <Upload
                multiple={false}
                maxCount={1}
                onChange={({ fileList }) => {
                  if (fileList[0]) {
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
          </Form>
        </Col>
        <Col className="col-md-7">
          <Row></Row>

          <MapZoomPan
            // src={"https://cdn.wallpapersafari.com/21/63/kGOzq7.jpg"}
            src={src ?? floor?.imageUrl}
          />
        </Col>
      </Row>
    </>
  );
};

export default Overview;
