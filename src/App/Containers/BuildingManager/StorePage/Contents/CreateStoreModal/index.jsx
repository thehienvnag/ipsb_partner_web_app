import React, { useState } from "react";
import { Modal, Row, Col, Upload, Image, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "App/Utils/utils";
import "./index.scss";

const CreateStoreModal = ({ visible, handleCancel }) => {
  const handleCancelPreview = () => setPreviewVisible(false);
  const handlePreview = (file) => {
    getBase64(file.originFileObj, (fileSrc) => {
      setPreviewImage(fileSrc);
    });

    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Preview upload image");
  const [previewImage, setPreviewImage] = useState("");
  return (
    <>
      <Modal
        width="50%"
        title="Create Store"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col>
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && <UploadButton />}
            </Upload>
            <Modal
              width="800px"
              visible={previewVisible}
              title={previewTitle}
              onCancel={handleCancelPreview}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
          <Col></Col>
        </Row>
      </Modal>
    </>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default CreateStoreModal;
