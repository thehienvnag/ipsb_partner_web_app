import React from "react";
import "./index.scss";
import { PageWrapper } from "App/Components/PageWrapper";
import { PageBody } from "App/Components/PageWrapper";
import { UploadOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Card,
  Modal,
  Button,
  Row,
  Col,
  Image,
  Input,
  Form,
  Upload,
  Space,
} from "antd";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class TestPage extends React.Component {
  state = {
    visible: false,
    loading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
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
      <>
        <PageWrapper>
          <PageHeader />
          <PageBody>
            <Card className="col-md-12">
              <Button type="primary" onClick={this.showModal}>
                Modal
              </Button>
              <Modal
                width={700}
                title="Thêm mới một tòa nhà"
                // visible={this.state.visible}
                visible={true}
                onOk={this.hideModal}
                onCancel={this.hideModal}
                okText="Lưu"
                cancelText="Hủy"
              >
                <Row justify="space-between">
                  <Col span={11}>
                    {/* <Image
                      src={
                        "http://www.vtr.org.vn/FileManager/Anh%20web%202019/Thang%2011/2130/tttmgigamall%20(3).jpg"
                      }
                    /> */}

                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      maxCount={1}
                      beforeUpload={() => false}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? (
                        <Image
                          width={700}
                          // height={400}
                          src={imageUrl}
                          preview={false}
                        />
                      ) : (
                        <Button
                          icon={<UploadOutlined />}
                          style={{ width: "500" }}
                        >
                          Upload
                        </Button>
                      )}
                    </Upload>
                  </Col>
                  ,
                  <Col span={12}>
                    {/* <label>Tên tòa nhà: </label> */}
                    <Col span={18}>
                      <Form.Item
                        label="Tên tòa nhà: "
                        required
                        tooltip="Đây là mục yêu cầu nhập"
                      >
                        <Input placeholder="Nhập tên tòa nhà" />
                      </Form.Item>

                      {/* <Input placeholder="Nhập tên tòa nhà" /> */}
                    </Col>

                    {/* <label>Địa chỉ: </label> */}
                    <Col span={18}>
                      <Form.Item
                        label="Địa chỉ:"
                        required
                        tooltip="Đây là mục yêu cầu nhập"
                      >
                        <Input placeholder="Nhập địa chỉ tòa nhà" />
                      </Form.Item>
                      {/* <textarea
                        style={{ width: "100%" }}
                        value={this.state.value}
                        onChange={this.handleChange}
                      /> */}
                    </Col>

                    <Col>
                      <Form.Item
                        label="Số tầng tòa nhà:"
                        required
                        tooltip="Đây là mục yêu cầu chọn"
                      >
                        <div>
                          <select
                            className="custom-select"
                            id="inputGroupSelect02"
                          >
                            <option selected>Chọn số tầng</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                      </Form.Item>
                    </Col>
                  </Col>
                </Row>

                <div style={{ width: "88%" }}>
                  <Row justify={"space-between"}>
                    <Col span={7}>
                      <Form.Item
                        label="Tên quản lý tòa nhà: "
                        required
                        tooltip="Đây là mục yêu cầu nhập"
                      >
                        <Input placeholder="Nhập tên quản lý" />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        label="Số điện thoại quản lý: "
                        required
                        tooltip="Đây là mục yêu cầu nhập"
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        label="Email quản lý: "
                        required
                        tooltip="Đây là mục yêu cầu nhập"
                      >
                        <Input placeholder="Nhập email liên lạc" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Modal>
            </Card>
          </PageBody>
        </PageWrapper>
      </>
    );
  }
}
export default TestPage;
