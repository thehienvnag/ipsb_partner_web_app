import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Menu, Table, Tag, Typography } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import {
  GlobalOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.scss";
import Header from "./Header";
import {
  loadBuildings,
  selectIsLoading,
  selectListBuilding,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/building.slice";
import { getBase64 } from "App/Utils/utils";
import {
  Button,
  Row,
  Col,
  Image,
  Input,
  Form,
  Upload,
  Select,
  message,
  Modal,
  Space,
} from "antd";
import { loadAccounts, selectListAccount } from "App/Stores/account.slice";

const BuildingPage = () => {
  //#region state includes: [selectedItems: array], [currentPage: int]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //#endregion
  //#region handle event functions

  const handleRows = (values) => setSelectedItems(values);
  const handlePaging = (number) => {
    dispatch(loadBuildings({ pageIndex: number }));
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadBuildings({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region Store dispatch & selector of [listBuilding, isLoading]
  const listAccount = useSelector(selectListAccount);

  const dispatch = useDispatch();
  const listBuilding = useSelector(selectListBuilding);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  useEffect(() => {
    dispatch(loadBuildings());
    dispatch(loadAccounts());
  }, [dispatch]);

  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(null);

  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const showModal = (value) => {
    setImageUrl(value);
    setVisible(true);
    setModel(value);
  };
  const hideModal = () => setVisible(false);

  const handleChange = (info) => {
    getBase64(
      info.fileList[0]?.originFileObj,
      (imageUrl) => setImageUrl(imageUrl),
      setFile(info.fileList[0])
    );
  };

  const onFinishSaveBuilding = (values) => {
    if (values != null) {
      message
        .loading("Action in progress...", 3)
        .then(() => message.success("Lưu thông tin tòa nhà thành công", 3))
        .then(() => setImageUrl(null));
    }
  };

  function Footer() {
    return (
      <Row>
        <Space>
          <Form.Item>
            <Button
              type="ghost"
              onClick={() => {
                hideModal();
                form.resetFields();
              }}
            >
              Hủy
            </Button>
          </Form.Item>

          <Form.Item>
            <Button form="myForm" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Space>
      </Row>
    );
  }

  return (
    <PageWrapper>
      <Header
        handleRefresh={handleRefresh}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <PageBody>
        <Card>
          <Menu defaultSelectedKeys={["mail"]} mode="horizontal">
            <Menu.Item key="mail" icon={<GlobalOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="app" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
          <>
            <Table
              loading={isLoading}
              rowSelection={{
                selectedRowKeys: selectedItems,
                onChange: handleRows,
              }}
              dataSource={listBuilding}
              pagination={{
                size: "small",
                current: currentPage,
                pageSize: pageSize,
                total: totalCount,
                onChange: handlePaging,
              }}
              onRow={(record, recordIndex) => ({
                onClick: (event) => {
                  showModal(record);
                  setImageUrl(record.imageUrl);
                  form.setFieldsValue(record);
                },
              })}
            >
              <Table.Column
                title="Image"
                dataIndex="imageUrl"
                key="imageUrl"
                render={(item) => <Image width={140} src={item} />}
              />
              <Table.Column
                title="Building Name"
                dataIndex="name"
                key="name"
                render={(item) => <Typography.Text>{item}</Typography.Text>}
              />

              <Table.Column
                title="Address"
                dataIndex="address"
                key="address"
                width={290}
                render={(item) => <Typography.Text>{item}</Typography.Text>}
              />
              <Table.Column
                title="Manager Name"
                dataIndex="manager"
                key="manager"
                render={(item) => (
                  <Typography.Text>{item.name}</Typography.Text>
                )}
              />

              <Table.Column
                title="Num.Floor"
                dataIndex="numberOfFloor"
                key="numberOfFloor"
                render={(item) => <Typography.Text>{item}</Typography.Text>}
              />
              <Table.Column
                title="Status"
                dataIndex="status"
                key="status"
                render={(value) => {
                  if (!value) {
                    value =
                      Math.floor(Math.random() * 2) % 2 === 0
                        ? "Active"
                        : "Inactive";
                  }
                  return (
                    <Tag color={value === "Active" ? "blue" : "red"}>
                      {value}
                    </Tag>
                  );
                }}
              />
            </Table>
            <Modal
              width={800}
              title="Chia tiết của tòa nhà"
              visible={visible}
              onCancel={hideModal}
              footer={[<Footer />]}
            >
              <Form
                form={form}
                layout="vertical"
                name="register"
                onFinish={onFinishSaveBuilding}
                scrollToFirstError
                id="myForm"
              >
                <Row justify="space-between">
                  <Col span={13}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "380px",
                          //transform: "translateY(-10%)",
                        }}
                        src={imageUrl}
                        preview={true}
                      />
                    </div>
                    <Space />
                    <Form.Item
                      name="imageUrl"
                      label="Thêm ảnh tòa nhà:"
                      required
                    >
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={handleChange}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  ,
                  <Col span={10}>
                    <Form.Item
                      name="name"
                      label="Tên tòa nhà: "
                      required
                      rules={[
                        {
                          required: true,
                          message: "Nhập tên của tòa nhà",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input placeholder="Nhập tên tòa nhà" />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      label="Địa chỉ:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Nhập địa chỉ của tòa nhà",
                          whitespace: true,
                        },
                      ]}
                    >
                      <TextArea rows={3} placeholder="Nhập địa chỉ tòa nhà" />
                    </Form.Item>

                    <Form.Item
                      name="numberOfFloor"
                      label="Số tầng tòa nhà:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Chọn tầng của tòa nhà",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập số tầng tòa nhà"
                        type="number"
                        maxLength={3}
                      />
                    </Form.Item>

                    <Form.Item
                      name="managerId"
                      label="Quản lý tòa nhà"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Chọn quản lý tòa nhà",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn quản lý">
                        {listAccount &&
                          listAccount.map((item) => (
                            <Option value={item.id}>{item.name}</Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BuildingPage;
