import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Row, Col, Input } from "antd";

import DetailCard from "App/Components/DetailCard";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import {
  deleteLocatorTag,
  postLocatorTag,
  putLocatorTag,
} from "App/Services/locatorTag.service";
import { selectBuildingId } from "App/Stores/auth.slice";
import SelectFloorPlan from "App/Components/CustomSelect/SelectFloorPlan";
import PickLocation from "App/Components/PickLocation/PickLocation";
import SelectLocatorTag from "App/Components/CustomSelect/SelectLocatorTag";

const LocationDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const buildingId = useSelector(selectBuildingId);
  const [floorPlanId, setFloorPlanId] = useState(null);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createParams: { buildingId },
    createCallback: postLocatorTag,
    updateCallback: putLocatorTag,
    deleteCallback: deleteLocatorTag,
    paramsKeyToStringify: ["locationJson"],
    handleRefresh,
    handleCancel,
    effectCallback: () => setFloorPlanId(model?.floorPlanId),
  });

  const disabled = model && model.status !== "Active";
  return (
    <DetailCard
      span={8}
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={!disabled && onSave}
      onRemove={!disabled && onDelete}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={(changed, { floorPlanId }) => {
          setFloorPlanId(floorPlanId);
        }}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="locatorTagGroupId"
              label="Locator Tag Group: "
              rules={[
                {
                  required: true,
                  message: "Input locator tag group",
                },
              ]}
              tooltip="This is locator tag group"
            >
              <SelectLocatorTag
                initialValue={model?.locatorTagGroup}
                placeholder="Input locator tag group"
              />
            </Form.Item>
            <Form.Item
              name="uuid"
              label="UUID: "
              rules={[
                {
                  required: true,
                  message: "Input UUID",
                },
              ]}
              tooltip="This is Uuid of locator tag"
            >
              <Input placeholder="Input UUID" disabled={model?.uuid} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="txPower"
              label="TxPower:"
              rules={[
                {
                  required: true,
                  message: "Input TxPower",
                },
              ]}
              tooltip="This is the locator's tag TxPower (RSSI value at 1meter from the locator tag)"
            >
              <Input placeholder="Input TxPower" />
            </Form.Item>
            <Form.Item
              name="floorPlanId"
              label="Floor plan:"
              rules={[
                {
                  required: true,
                  message: "Input TxPower",
                },
              ]}
              tooltip="This is the locator tag's floor plan"
            >
              <SelectFloorPlan initialValue={model?.floorPlan} />
            </Form.Item>
            <Form.Item
              name="locationJson"
              label="Location:"
              rules={[
                {
                  required: true,
                  message: "Input Location",
                },
              ]}
              tooltip="This is the location of the locator tag"
            >
              <PickLocation
                floorPlanId={floorPlanId}
                locationTypeId={5} // Location Type Id of store
                initialValue={model?.location}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default LocationDetails;
