import { Button, Col, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import IndoorMap from "../IndoorMap";
import { getBase64 } from "App/Utils/utils";
import "./index.scss";

const DrawRoute = ({
  value,
  onChange,
  disabled = false,
  floorPlanId,
  floorCode,
}) => {
  const [fileList, setFileList] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    if (value) {
      setFileList([{ url: value, name: `Floor_${floorCode}` }]);
      setImageSrc(value);
    }
  }, [value]);

  const handlePickFile = ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      onChange(file);
      getBase64(file, (src) => {
        setImageSrc(src);
      });
      setFileList([file]);
    } else {
      setFileList([]);
    }
  };

  return (
    <>
      <Col span={24} style={{ marginBottom: 20 }} className="btn-map">
        <Upload
          style={{ width: "100%" }}
          fileList={fileList}
          onChange={handlePickFile}
          disabled={disabled}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Col>
      <IndoorMap src={imageSrc} disabled={disabled} floorPlanId={floorPlanId} />
    </>
  );
};

export default DrawRoute;
