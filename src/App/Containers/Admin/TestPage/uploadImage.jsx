import React from "react";
import { Upload, Button, Space, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class UploadImage extends React.Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file.imageUrl + "nè nè");
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;

    return (
      <Space direction="horizontal" style={{ width: "200%" }} size="large">
        {/* <Upload listType="picture" maxCount={1} onChange={this.handleChange}> */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          maxCount={1}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img
              width={300}
              src={imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            <Button icon={<UploadOutlined />} style={{ width: "500" }}>
              Upload
            </Button>
          )}
        </Upload>
      </Space>
    );
  }
}

export default UploadImage;
