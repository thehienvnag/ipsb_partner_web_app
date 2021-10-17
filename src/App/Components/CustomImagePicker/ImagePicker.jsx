import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const ImagePicker = ({ value, onChange }) => {
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
      className="upload-wrapper"
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
