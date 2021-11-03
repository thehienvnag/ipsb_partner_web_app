import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ImagePicker.scss";
const ImagePicker = ({ disabled, value, onChange }) => {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (value && typeof value === "string") {
      setFileList([{ thumbUrl: value }]);
    }
  }, [value]);

  const handleChange = (info) => {

    setFileList(info.fileList);
    onChange(info.fileList[0]?.originFileObj);
  };
  return (
    <Upload
      disabled={disabled}
      accept=".jpg,.svg,.png,.jpeg"
      // className={fileList.length === 0 && "margin-bt-34"}
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false}
    >
      {!fileList.length && <UploadButton />}
    </Upload>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default ImagePicker;
