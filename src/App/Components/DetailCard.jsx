import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Popconfirm } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { useBtnLoading } from "App/Utils/hooks/useBtnLoading";

const DetailCard = ({
  children,
  visible,
  btnState,
  onCancel,
  onSave,
  onRemove,
  span,
  hasFooter = true,
}) => {
  const { removeLoading, saveLoading } = useBtnLoading(
    btnState,
  );
  return (
    <>
      {visible && (
        <Col span={span} className="detail-card">
          <Card>
            <div className="detail-card-header">
              <h4>Details</h4>
              <button type="button" className="custom-close" onClick={onCancel}>
                <span>×</span>
              </button>
            </div>
            <div className="detail-card-body">{children}</div>
            {hasFooter && (
              <Row justify="end" className="detail-card-footer">
                {onCancel && (
                  <Button onClick={onCancel} style={{ marginRight: 10 }}>
                    Cancel
                  </Button>
                )}
                {onRemove && (
                  <Popconfirm
                    title="Are you sure to remove?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={onRemove}
                  >
                    <Button
                      loading={removeLoading}
                      key="3"
                      danger
                      style={{ marginRight: 10 }}
                      icon={<DeleteOutlined />}
                    >
                      Remove
                    </Button>
                  </Popconfirm>
                )}
                {onSave && (
                  <Button
                    loading={saveLoading}
                    type="primary"
                    style={{ marginRight: 10 }}
                    icon={<SaveOutlined />}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                )}
              </Row>
            )}
          </Card>
        </Col>
      )}
    </>
  );
};

export default DetailCard;
