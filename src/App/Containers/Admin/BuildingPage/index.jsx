import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Menu, Table, Tag, Typography } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { getBase64 } from "App/Utils/utils";
import { loadAccounts, selectListAccount } from "App/Stores/account.slice";
import "./index.scss";
import Header from "./Header";
import {
  loadBuildings,
  selectIsLoading,
  selectListBuilding,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/building.slice";
import {
  GlobalOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
import { postBuilding, putBuilding } from "App/Services/building.service";

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
  const handleCreate = () => {
    showModalCreate();
  };
  //#endregion
  //#region Store dispatch & selector of [listBuilding, isLoading]
  //#region Store dispatch & selector of [listAccount, isLoading]
  const dispatch = useDispatch();
  const listAccount = useSelector(selectListAccount);
  const listBuilding = useSelector(selectListBuilding);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  useEffect(() => {
    dispatch(loadBuildings());
    dispatch(loadAccounts({ isAll: true }));
  }, [dispatch]);

  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [buildingId, setBuildingId] = useState(null);
  const [file, setFile] = useState(null);

  const showModalCreate = () => {
    setVisibleCreate(true);
    setFile(null);
  };

  const hideModalCreate = () => {
    setVisibleCreate(false);
    form1.resetFields();
    setImageUrl(null);
  };
  const hideModalDetail = () => {
    setVisibleDetail(false);
    form.resetFields();
    setImageUrl(null);
  };

  const showModalDetail = (value) => {
    setVisibleDetail(true);
  };

  const saveBuilding = async () => {
    form1.validateFields();
    const values = form1.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Add image for building", 4);
    } else if (values != null && values.imageUrl != null) {
      const data = await postBuilding({
        ...values,
        ...{ adminId: 2 },
        ...{ imageUrl: file },
      });
      if (data?.id != null) {
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Create building successfull", 3))
          .then(() => hideModalCreate())
          .then(() => dispatch(loadBuildings({ pageIndex: currentPage })));
      }
    }
  };

  const updateBuilding = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    if (values.imageUrl == null) {
      message.error("Add image for building manager", 4);
    } else if (values !== null && values.imageUrl != null) {
      const data = await putBuilding({
        ...values,
        ...{ imageUrl: file },
        ...{ id: buildingId },
        ...{ adminId: 2 },
        ...{ status: "Active" },
      });
      if (data?.id !== null) {
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Update success", 3))
          .then(() => hideModalDetail())
          .then(() => dispatch(loadBuildings({ pageIndex: currentPage })));
      }
    }
  };
  const handleChange = (info) => {
    getBase64(
      info.fileList[0]?.originFileObj,
      (imageUrl) => setImageUrl(imageUrl),
      setFile(info.fileList[0]?.originFileObj)
    );
  };

  function FooterCreate() {
    return (
      <Row justify="end">
        <Space>
          <Form.Item>
            <Button
              type="ghost"
              onClick={() => {
                hideModalCreate();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={saveBuilding}>
              Save
            </Button>
          </Form.Item>
        </Space>
      </Row>
    );
  }

  function FooterDetail() {
    return (
      <Row justify="end">
        <Space>
          <Form.Item>
            <Button
              type="ghost"
              onClick={() => {
                hideModalDetail();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={updateBuilding}>
              Save
            </Button>
          </Form.Item>
        </Space>
      </Row>
    );
  }

  return (
    <PageWrapper className="building-page">
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
                  showModalDetail(record);
                  setImageUrl(record.imageUrl);
                  setBuildingId(record.id);
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
              className="modal-building"
              width={800}
              title="Detail of building"
              visible={visibleDetail}
              onCancel={hideModalDetail}
              footer={[<FooterDetail />]}
            >
              <Form
                form={form}
                layout="vertical"
                name="register"
                scrollToFirstError
              >
                <Row justify="space-between">
                  <Col span={13}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "380px",
                          height: "290px",
                        }}
                        src={imageUrl}
                        preview={true}
                      />
                    </div>
                    <Space />
                    <Form.Item name="imageUrl" label="Add image:" required>
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

                  <Col span={10}>
                    <Form.Item
                      name="name"
                      label="Building name: "
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input building name",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input placeholder="Input building name" />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      label="Address:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input address of building",
                          whitespace: true,
                        },
                      ]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Input address of building"
                      />
                    </Form.Item>

                    <Form.Item
                      name="numberOfFloor"
                      label="Number of floor:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input number of floor",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input number of floor"
                        type="number"
                        maxLength={3}
                      />
                    </Form.Item>

                    <Form.Item
                      name="managerId"
                      label="Manager:"
                      rules={[
                        {
                          required: true,
                          message: "Please choose manager!",
                        },
                      ]}
                    >
                      <Select placeholder="Choose manager">
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
            <Modal
              className="modal-building"
              width={800}
              title="Create building"
              visible={visibleCreate}
              onCancel={hideModalCreate}
              footer={[<FooterCreate />]}
            >
              <Form
                form={form1}
                layout="vertical"
                name="register"
                scrollToFirstError
              >
                <Row justify="space-between">
                  <Col span={13}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "380px",
                          height: "290px",
                        }}
                        src={imageUrl}
                        preview={true}
                      />
                    </div>

                    <Form.Item name="imageUrl" label="Add image:" required>
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
                      label="Name of building: "
                      rules={[
                        {
                          required: true,
                          message: "Input name of building",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input placeholder="Input name of building" />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      label="Address:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input address of building",
                          whitespace: true,
                        },
                      ]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Input address of building"
                      />
                    </Form.Item>

                    <Form.Item
                      name="numberOfFloor"
                      label="Number of floor:"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input number floor of building",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input number floor of building"
                        type="number"
                        maxLength={3}
                      />
                    </Form.Item>
                    <Form.Item
                      name="managerId"
                      label="Building manager:"
                      rules={[
                        {
                          required: true,
                          message: "Select manager",
                        },
                      ]}
                    >
                      <Select placeholder="Select manager">
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
