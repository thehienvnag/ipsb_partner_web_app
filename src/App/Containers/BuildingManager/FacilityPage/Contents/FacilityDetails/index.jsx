import React, { useState } from "react";
import { Row, Col, Input, Form } from "antd";
import DetailCard from "App/Components/DetailCard";
import {
  postFacility,
  deleteFacility,
  putFacility,
} from "App/Services/facility.service";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import SelectFloorPlan from "App/Components/CustomSelect/SelectFloorPlan";
import PickLocation from "App/Components/PickLocation/PickLocation";
import SelectLocationType from "App/Components/CustomSelect/SelectLocationType";
const { TextArea } = Input;
const FacilityDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const [floorPlanId, setFloorPlanId] = useState(null);
  const [locationTypeId, setLocationTypeId] = useState(null);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createCallback: postFacility,
    updateCallback: putFacility,
    deleteCallback: deleteFacility,
    paramsKeyToStringify: ["locationJson"],
    handleRefresh,
    handleCancel,
    effectCallback: () => {
      setFloorPlanId(model?.floorPlanId);
      setLocationTypeId(model?.location?.locationTypeId);
    },
  });
  const disabled = model && model.status !== "Active";

  return (
    <DetailCard
      span={9}
      btnState={btnState}
      visible={visible}
      onCancel={onCancel}
      onSave={!disabled && onSave}
      onRemove={!disabled && onDelete}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changed, { floorPlanId, locationTypeId }) => {
          setFloorPlanId(floorPlanId);
          if (locationTypeId) {
            setLocationTypeId(locationTypeId);
          }
        }}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input facility name",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Input facility name" disabled={disabled} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Input description",
                },
              ]}
            >
              <TextArea placeholder="Input description" disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="locationTypeId" label="Location type">
              <SelectLocationType
                initialValue={model?.location?.locationType}
                notLocationTypeIds={[1, 2, 3, 4, 5]}
                disabled={disabled}
              />
            </Form.Item>
            <Form.Item name="floorPlanId" label="Floor plan">
              <SelectFloorPlan
                initialValue={model?.floorPlan}
                disabled={disabled}
              />
            </Form.Item>
            <Form.Item
              name="locationJson"
              label="Location"
              rules={[{ required: true }]}
              required
            >
              <PickLocation
                disabled={disabled || !locationTypeId}
                floorPlanId={floorPlanId}
                locationTypeId={locationTypeId} // Location Type Id of store
                initialValue={{
                  ...model?.location,
                  locationName: model?.name,
                  init: true,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default FacilityDetails;
