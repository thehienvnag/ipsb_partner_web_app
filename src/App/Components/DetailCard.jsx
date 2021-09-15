import React from "react";
import { Button, Card, Col, Row } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
const DetailCard = ({
  children,
  visible,
  onCancel,
  onSave,
  onRemove,
  span,
  hasFooter = true,
}) => {
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
                {onSave && (
                  <Button
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
