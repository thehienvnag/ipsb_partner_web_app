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
  Divider,
} from "antd";
import { getBase64 } from "App/Utils/utils";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import MapZoomPan from "App/Components/IndoorMap/MapZoomPan";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectInChargeBuildingId } from "App/Stores/building.slice";
import { postFloorPlan } from "App/Services/floorPlan.service";
import { useDispatch } from "react-redux";
import { removeLocations } from "App/Stores/location.slice";
import { removeEdges } from "App/Stores/edge.slice";

const types = [
  { id: 1, name: "Cửa hàng" },
  { id: 2, name: "Đường đi" },
  { id: 3, name: "Thang máy" },
  { id: 4, name: "Cầu thang" },
  { id: 5, name: "Beacon" },
  { id: 6, name: "Checkout" },
  { id: 10, name: "Nhà vệ sinh" },
];
const Overview = ({ floor }) => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [locationType, setLocationType] = useState(types);
  const [typesSelect, setTypesSelect] = useState([
    locationType.reduce((acc, { id }) => acc + "," + id, ""),
  ]);
  const { id } = useParams();
  const buildingIdFromStore = useSelector(selectInChargeBuildingId);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id === "create-new") {
      dispatch(removeEdges());
      dispatch(removeLocations());
      form.resetFields();
    }
    if (floor) {
      form.setFieldsValue(floor);
    }
  }, [floor]);

  const onSave = async () => {
    if (id === "create-new") {
      form.validateFields();
      const values = form.getFieldsValue();
      const data = await postFloorPlan({
        ...values,
        ...{ imageUrl: file },
        ...{ buildingId: buildingIdFromStore },
      });
      console.log(data);
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Row justify="space-between" align="middle">
        <Row>
          <Button icon={<SaveOutlined />} onClick={onSave}>
            Save
          </Button>
        </Row>
        <Row>
          <Divider
            type="vertical"
            style={{ height: 35, borderWidth: 2, marginRight: 20 }}
          />
          <Select
            allowClear
            onChange={(values) => setTypesSelect(values)}
            defaultValue={[
              locationType.reduce((acc, { id }) => acc + "," + id, ""),
            ]}
            style={{ width: 260 }}
            placeholder="Elements to show on map"
            mode="multiple"
          >
            <Select.Option
              value={locationType.reduce((acc, { id }) => acc + "," + id, "")}
            >
              All
            </Select.Option>
            {locationType.map(({ id, name }) => (
              <Select.Option value={id}>{name}</Select.Option>
            ))}
          </Select>
        </Row>
      </Row>
      <Divider style={{ margin: "10px 0 30px 0" }} />
      <Row justify="space-between" align="stretch">
        <Col className="col-md-4">
          <Form
            form={form}
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
            {id !== "create-new" && (
              <Form.Item
                // name="status"
                label="Floor status"
              >
                <Switch checked={floor?.status === "Active"} />
              </Form.Item>
            )}

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
            <Form.Item
              label="Floor code"
              required
              name="floorCode"
              rules={[{ required: true, message: "Please input floor code!" }]}
            >
              <Input />
            </Form.Item>
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
          </Form>
        </Col>
        <Col className="col-md-7">
          <Row></Row>
          <MapZoomPan
            src={src ?? floor?.imageUrl}
            floorPlanId={id !== "create-new" && floor?.id}
            types={typesSelect.join(",")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Overview;
