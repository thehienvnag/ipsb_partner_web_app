import React from "react";
import "./index.scss";
import { Form, Input, Row, Col } from "antd";
import DetailCard from "App/Components/DetailCard";

import { useSelector } from "react-redux";
import { selectBuildingId } from "App/Stores/auth.slice";
import { useDetailForm } from "App/Utils/hooks/useDetailForm";
import {
  deleteFloorPlan,
  postFloorPlan,
  putFloorPlan,
} from "App/Services/floorPlan.service";
import DrawRoute from "App/Components/DrawRoute/DrawRoute";
import RatioMaskInput from "App/Components/RatioMaskInput/RatioMaskInput";
const FloorPlanDetail = ({
  visible,
  onCancel,
  handleRefresh,
  handleCancel,
  model,
}) => {
  const buildingId = useSelector(selectBuildingId);
  const { form, btnState, onSave, onDelete } = useDetailForm({
    model,
    createCallback: postFloorPlan,
    updateCallback: putFloorPlan,
    deleteCallback: deleteFloorPlan,
    createParams: { buildingId },
    paramsKeyToStringify: ["locationJson"],
    handleRefresh,
    handleCancel,
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
        <Form layout="vertical" form={form} name="control-hooks">
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item
                label="Floor number"
                name="floorNumber"
                rules={[{ required: true, message: "Input floor number!" }]}
              >
                <Input type="number" placeholder="Input floor number" />
              </Form.Item>
              <Form.Item
                label="Map scale"
                name="mapScale"
                rules={[{ required: true, message: "Input map scale!" }]}
              >
                <RatioMaskInput />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Floor code"
                name="floorCode"
                rules={[{ required: true, message: "Input floor code!" }]}
              >
                <Input placeholder="Input floor code" />
              </Form.Item>
              <Form.Item
                label="Rotation Angle"
                name="rotationAngle"
                rules={[{ required: true, message: "Input rotation angle!" }]}
              >
                <Input type="number" placeholder="Input rotation angle" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="imageUrl" label="Floor map" required>
                <DrawRoute
                  floorPlanId={model?.id}
                  floorCode={model?.floorCode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DetailCard>
    </>
  );
};

export default FloorPlanDetail;
