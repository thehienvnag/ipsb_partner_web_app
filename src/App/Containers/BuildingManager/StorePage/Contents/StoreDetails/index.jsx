import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import "./index.scss";
import DetailCard from "App/Components/DetailCard";
import SelectAccount from "App/Components/CustomSelect/SelectAccount";
import SelectFloorPlan from "App/Components/CustomSelect/SelectFloorPlan";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import { deleteStore, postStore, putStore } from "App/Services/store.service";
import PickLocation from "App/Components/PickLocation/PickLocation";
import { useSelector } from "react-redux";
import { selectBuildingId } from "App/Stores/auth.slice";
const { TextArea } = Input;

const StoreDetails = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const [floorPlanId, setFloorPlanId] = useState(null);
  const buildingId = useSelector(selectBuildingId);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createCallback: postStore,
    updateCallback: putStore,
    deleteCallback: deleteStore,
    createParams: { buildingId },
    paramsKeyToStringify: ["locationJson"],
    handleRefresh,
    handleCancel,
    effectCallback: () => setFloorPlanId(model?.floorPlanId),
  });
  const disabled = model && model.status !== "Active";
  return (
    <>
      <DetailCard
        span={9}
        btnState={btnState}
        visible={visible}
        onCancel={onCancel}
        onSave={!disabled && onSave}
        onRemove={!disabled && onDelete}
      >
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onValuesChange={(changed, { floorPlanId, location, imageUrl }) => {
            setFloorPlanId(floorPlanId);
          }}
        >
          <Row justify="space-between">
            <Col span={11}>
              <FormItem
                name="imageUrl"
                rules={[
                  {
                    required: true,
                    message: "Input store image",
                  },
                ]}
              >
                <ImagePicker disabled={disabled} />
              </FormItem>
              <Form.Item
                name="floorPlanId"
                label="Floor plan"
                rules={[{ required: true, message: "Input floor plan" }]}
                required
              >
                <SelectFloorPlan
                  initialValue={model?.floorPlan}
                  disabled={disabled}
                />
              </Form.Item>
              <FormItem
                name="locationJson"
                label="Store location"
                rules={[{ required: true, message: "Input store location" }]}
                required
              >
                <PickLocation
                  disabled={disabled}
                  floorPlanId={floorPlanId}
                  locationTypeId={1} // Location Type Id of store
                  initialValue={{
                    ...model?.location,
                    locationName: model?.name,
                    init: true,
                  }}
                />
              </FormItem>
            </Col>
            <Col span={11}>
              <Form.Item
                name="name"
                label="Store name"
                rules={[{ required: true, message: "Input store name" }]}
              >
                <Input placeholder="Input store name" disabled={disabled} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Store phone"
                rules={[{ required: true, message: "Input store phone" }]}
              >
                <Input
                  placeholder="Input store phone"
                  minLength={10}
                  maxLength={10}
                  disabled={disabled}
                />
              </Form.Item>
              <FormItem
                name="description"
                label="Description"
                rules={[{ required: true, message: "Input store description" }]}
                required
              >
                <TextArea
                  rows={3}
                  placeholder="Input store description"
                  disabled={disabled}
                />
              </FormItem>
              <FormItem
                name="accountId"
                label="Store Owner:"
                rules={[
                  {
                    required: true,
                    message: "Input store owner",
                  },
                ]}
              >
                <SelectAccount
                  role="Store Owner"
                  initialValue={model?.account}
                  disabled={disabled}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </DetailCard>
    </>
  );
};
export default StoreDetails;
