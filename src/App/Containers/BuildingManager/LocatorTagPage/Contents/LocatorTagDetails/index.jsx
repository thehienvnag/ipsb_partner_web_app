import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Row, Col, Input, Select } from "antd";
import {
  selectListFloor,
  loadAll as loadFloors,
} from "App/Stores/floorPlan.slice";
import DetailCard from "App/Components/DetailCard";

const { Option } = Select;
const LocationDetails = ({ model, visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [valueLocationId, setLocationId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [status, setStatus] = useState(null);
  const listFloorPlan = useSelector(selectListFloor);

  const onSave = async () => {
    // if (valueMac !== null && valueLocationId != null && valueFloor != null) {
    // const data = await putLocatorTag({
    //   ...{ id: model?.id },
    //   ...{ macAddress: valueMac },
    //   ...{ status: valueStatus },
    //   ...{ floorPlanId: valueFloor },
    //   ...{ locationId: valueLocationId },
    //   ...{ lastSeen: new Datetime.now() },
    // });
    // if (data?.id !== null) {
    //   message
    //     .loading("Action in progress...", 3)
    //     .then(() => message.success("Update success", 3))
    //     .then(() => hideModalDetail())
    //     .then(() => dispatch(loadAccounts({ pageIndex: currentPage })));
    // }
    // }
  };
  const onRemove = () => {};

  useEffect(() => {
    if (model) {
      form.setFieldsValue(model);
      setStatus(model.status);
      setFloor(model.floorPlan?.floorCode);
    } else {
      form.resetFields();
      setStatus(null);
      setFloor(null);
    }
    dispatch(loadFloors());
  }, [dispatch, model]);

  return (
    <DetailCard
      visible={visible}
      onSave={onSave}
      onCancel={onCancel}
      onRemove={onRemove}
      span={8}
    >
      <Form layout="vertical" form={form}>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="macAddress"
              label="MAC Address: "
              required
              tooltip="This is MAC Address of locator tag"
            >
              <Input placeholder="Enter Mac Address" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Floor in building:"
              required
              tooltip="This is the location of the locator tag on which floor of building"
            >
              <Select
                placeholder="Select Floor"
                defaultValue={floor && `Floor ${floor}`}
                onChange={(value) => setFloor(value)}
              >
                {listFloorPlan &&
                  listFloorPlan.map((item) => (
                    <Option value={item.id}>Floor {item.floorCode}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Location: "
              required
              tooltip="This is location ID of locator tag"
            >
              <Input
                value={model?.location.id}
                placeholder="Pick location"
                onChange={(value) => {
                  setLocationId(value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Status:"
              required
              tooltip="This is status of locator tag"
            >
              <Select
                placeholder="Select status"
                value={status}
                onChange={(value) => {
                  setStatus(value);
                }}
              >
                <Option value="1">Active</Option>
                <Option value="2">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={11}>
            <Form.Item
              name="updateTime"
              label="Update date"
              required
              tooltip="This is the most recent date the locator tag was updated"
            >
              <Input
                disabled={true}
                value={model?.updateTime}
                onChange={() => {
                  // setInput(!input);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="lastSeen"
              label="Last date scanned"
              required
              tooltip="This is the last date the location tag was scanned"
            >
              <Input
                disabled={true}
                value={model?.lastSeen}
                onChange={() => {
                  // setInput(!input);
                }}
              />
            </Form.Item> 
      </Col> */}
        </Row>
      </Form>
    </DetailCard>
  );
};

export default LocationDetails;
