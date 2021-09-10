import React, { useEffect, useState } from "react";
import { Form, Select, Button, Row, Col } from "antd";
import "./index.scss";
import FormItem from "antd/lib/form/FormItem";
import { GrLocation } from "react-icons/gr";
import DetailCard from "App/Components/DetailCard";
import {
  loadAll as loadFloor,
  selectListFloorCode,
} from "App/Stores/floorPlan.slice";
import { selectLocationTypes } from "App/Stores/locationType.slice";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

const PlaceDetails = ({ visible, handleCancel, place }) => {
  const floors = useSelector(selectListFloorCode);
  const locationTypes = useSelector(selectLocationTypes);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onLocationChange = (place) => setLocationType(place.locationType.name);
  const onFloorChange = (floor) => setLocationType(`Floor ${floor.floorCode}`);
  const onFinish = (values) => {
    console.log(values);
  };
  const onRemove = (value) => {};
  const [floorPlan, setFloorPlan] = useState(null);
  const [locationType, setLocationType] = useState(null);
  useEffect(() => {
    if (place) {
      setLocationType(place.locationType.name);
      setFloorPlan(`Floor ${place.floorPlan.floorCode}`);
    } else {
      setLocationType(null);
      setFloorPlan(null);
    }
    dispatch(loadFloor());
  }, [place]);

  return (
    <>
      <DetailCard
        visible={visible}
        onCancel={handleCancel}
        span={7}
        onSave={onFinish}
        onRemove={onRemove}
      >
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item label="Place Type" rules={[{ required: true }]} required>
            <Select
              value={locationType}
              placeholder="Select a type"
              onChange={onLocationChange}
              allowClear
            >
              {locationTypes.map(({ id, name }) => (
                <Option value={id}>{name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item
                label="Floor plan"
                rules={[{ required: true }]}
                required
              >
                <Select
                  value={floorPlan}
                  placeholder="Select a floor"
                  onChange={onFloorChange}
                  allowClear
                >
                  {floors &&
                    floors.map(({ id, floorCode }) => (
                      <Option key={id} value={id}>
                        Floor {floorCode}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <FormItem label="Location" rules={[{ required: true }]} required>
                <Button icon={<GrLocation />}>Location</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </DetailCard>
    </>
  );
};
export default PlaceDetails;
