import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Menu, Table, Tag, Typography } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { getBase64 } from "App/Utils/utils";
import {
  loadAccounts,
  selectIsLoading,
  selectListAccount,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/accountStoreOwner.slice";
import "./index.scss";
import Header from "./Header";
import {
  GlobalOutlined,
  SettingOutlined,
  UploadOutlined,
  SearchOutlined,
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
  Avatar,
  Checkbox,
} from "antd";
import { postAccount, putAccount } from "App/Services/account.service";

const StoreOwnerPage = () => {
  //#region state includes: [selectedItems: array], [currentPage: int]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);
  //#endregion
  //#region handle event functions
  const { Option } = Select;
  const handleRows = (values) => setSelectedItems(values);
  const handlePaging = (number) => {
    if (search) {
      console.log(search);
      dispatch(
        loadAccounts({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadAccounts({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadAccounts({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    showModalCreate();
  };
  //#endregion
  //#region Store dispatch & selector of [listAccount, isLoading]
  const dispatch = useDispatch();
  const listAccount = useSelector(selectListAccount);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  useEffect(() => {
    dispatch(loadAccounts());
  }, [dispatch]);

  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [formDetail] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [storeOwnerId, setStoreOwnerId] = useState(null);
  const [file, setFile] = useState(null);

  const showModalCreate = () => {
    setVisibleCreate(true);
  };

  const hideModalCreate = () => {
    setVisibleCreate(false);
    formCreate.resetFields();
    setImageUrl(null);
  };
  const hideModalDetail = () => {
    setVisibleDetail(false);
    formDetail.resetFields();
    setImageUrl(null);
  };

  const showModalDetail = () => {
    setVisibleDetail(true);
  };

  const handleChange = (info) => {
    getBase64(
      info.fileList[0]?.originFileObj,
      (imageUrl) => setImageUrl(imageUrl),
      setFile(info.fileList[0]?.originFileObj)
    );
  };

  const saveAccount = async () => {
    formCreate.validateFields();
    const values = formCreate.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Add image for Store owner", 4);
    } else if (values !== null && values.imageUrl != null) {
      const data = await postAccount({
        ...values,
        ...{ imageUrl: file },
        ...{ role: "Store Owner" },
      });
      if (data == "Request failed with status code 409") {
        message.error("Email existed", 3);
      } else if (data?.id !== null) {
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Create success", 3))
          .then(() => hideModalCreate(), setImageUrl(null))
          .then(() => dispatch(loadAccounts({ role: "Store Owner" })));
      }
    }
  };

  const updateAccount = async () => {
    formDetail.validateFields();
    const values = formDetail.getFieldsValue();
    console.log(values);
    if (values.imageUrl == null) {
      message.error("Add image for store owner", 4);
    } else if (values !== null && values.imageUrl != null) {
      const data = await putAccount({
        ...values,
        ...{ imageUrl: file },
        ...{ id: storeOwnerId },
        ...{ role: "Store Owner" },
      });
      if (data?.id !== null) {
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Update success", 3))
          .then(() => hideModalDetail())
          .then(
            () => dispatch(loadAccounts({ role: "Store Owner" })),
            setImageUrl(imageUrl)
          );
      }
    }
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
                formCreate.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={saveAccount}>
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
                formDetail.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={updateAccount}>
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
              dataSource={listAccount}
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
                  setStoreOwnerId(record.id);
                  formDetail.setFieldsValue(record);
                },
              })}
            >
              <Table.Column
                title="Image"
                dataIndex="imageUrl"
                key="imageUrl"
                render={(item) => <Avatar src={item} />}
              />
              <Table.Column
                title="Name"
                dataIndex="name"
                key="name"
                render={(item) => <Typography.Text>{item}</Typography.Text>}
                filterDropdown={({ selectedKeys }) => (
                  <div style={{ padding: 8 }}>
                    <Input
                      placeholder={`Search name manager`}
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value && value.length) {
                          setSearch({ name: value });
                        } else {
                          setSearch(null);
                        }
                      }}
                      onPressEnter={() => handlePaging(1)}
                      style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => {
                          handlePaging(1);
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                      >
                        Search
                      </Button>
                    </Space>
                  </div>
                )}
                filterIcon={<SearchOutlined />}
              />

              <Table.Column
                title="Email"
                dataIndex="email"
                key="email"
                width={290}
                render={(item) => <Typography.Text>{item}</Typography.Text>}
                filterDropdown={({ selectedKeys }) => (
                  <div style={{ padding: 8 }}>
                    <Input
                      placeholder={`Search email`}
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value && value.length) {
                          setSearch({ email: value });
                        } else {
                          setSearch(null);
                        }
                      }}
                      onPressEnter={() => handlePaging(1)}
                      style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => {
                          handlePaging(1);
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                      >
                        Search
                      </Button>
                    </Space>
                  </div>
                )}
                filterIcon={<SearchOutlined />}
              />
              <Table.Column
                title="Phone"
                dataIndex="phone"
                key="phone"
                render={(item) => <Typography.Text>{item}</Typography.Text>}
                filterDropdown={({ selectedKeys }) => (
                  <div style={{ padding: 8 }}>
                    <Input
                      placeholder={`Search phone`}
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value && value.length) {
                          setSearch({ phone: value });
                        } else {
                          setSearch(null);
                        }
                      }}
                      onPressEnter={() => handlePaging(1)}
                      style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => {
                          handlePaging(1);
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                      >
                        Search
                      </Button>
                    </Space>
                  </div>
                )}
                filterIcon={<SearchOutlined />}
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
                filterDropdown={() => (
                  <div style={{ padding: 8 }}>
                    <Space>
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          const value = e;
                          if (value && value.length) {
                            setSearch({ status: value });
                          } else {
                            setSearch(null);
                          }
                        }}
                      >
                        <Checkbox value="">All</Checkbox>
                        <Checkbox value="New">New</Checkbox>
                        <Checkbox value="Active">Active</Checkbox>
                        <Checkbox value="Inactive">Inactive</Checkbox>
                      </Checkbox.Group>

                      {/* <Select
                        placeholder="Select Status"
                        onChange={(e) => {
                          const value = e;
                          if (value && value.length) {
                            setSearch({ status: value });
                          } else {
                            setSearch(null);
                          }
                        }}
                      >
                        <Option value="">All</Option>
                        <Option value="New">New</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                      </Select> */}

                      <Button
                        type="primary"
                        onClick={() => {
                          handlePaging(1);
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                      >
                        Filter
                      </Button>
                    </Space>
                  </div>
                )}
              />
            </Table>
            <Modal
              className="modal-building-manager"
              width={700}
              title="Store owner detail"
              visible={visibleDetail}
              onCancel={hideModalDetail}
              footer={[<FooterDetail />]}
            >
              <Form
                form={formDetail}
                name="register"
                layout="vertical"
                scrollToFirstError
              >
                <Row justify="space-between">
                  <Col span={11}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "280px",
                          height: "290px",
                        }}
                        src={imageUrl}
                        preview={true}
                      />
                    </div>
                  </Col>
                  ,
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Name:"
                      rules={[
                        {
                          required: true,
                          message: "Input name of store owner",
                          whitespace: false,
                        },
                      ]}
                    >
                      <Input placeholder="Input name of store owner" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email:"
                      rules={[
                        {
                          type: "email",
                          message: "E-mail invalid !",
                        },
                        {
                          required: true,
                          message: "Input email",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input email for contact"
                        type="email"
                        disabled="true"
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Phone: "
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input phone number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input phone number"
                        type="number"
                        maxLength={10}
                      />
                    </Form.Item>
                    <Row justify="space-between">
                      <Form.Item name="imageUrl" label="Add Image:">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          maxCount={1}
                          required
                          beforeUpload={() => false}
                          onChange={handleChange}
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item name="status" label="Choose status:">
                        <Select style={{ width: 150 }}>
                          <Option value="New">New</Option>
                          <Option value="Active">Active</Option>
                          <Option value="Inactive">Inactive</Option>
                        </Select>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Modal>

            <Modal
              className="modal-building"
              width={700}
              title="Create store owner"
              visible={visibleCreate}
              onCancel={hideModalCreate}
              footer={[<FooterCreate />]}
            >
              <Form
                form={formCreate}
                name="register"
                layout="vertical"
                scrollToFirstError
              >
                <Row justify="space-between">
                  <Col span={11}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "270px",
                        }}
                        src={imageUrl}
                        preview={true}
                      />
                    </div>
                  </Col>
                  ,
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Name:"
                      rules={[
                        {
                          required: true,
                          message: "Input name of store owner",
                          whitespace: false,
                        },
                      ]}
                    >
                      <Input placeholder="Input name of store owner" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email:"
                      rules={[
                        {
                          type: "email",
                          message: "E-mail invalid !",
                        },
                        {
                          required: true,
                          message: "Input email",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input email for contact"
                        type="email"
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Phone: "
                      required
                      rules={[
                        {
                          required: true,
                          message: "Input phone number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Input phone number"
                        type="number"
                        maxLength={10}
                      />
                    </Form.Item>

                    <Form.Item name="imageUrl" label="Add Image:">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        maxCount={1}
                        required
                        beforeUpload={() => false}
                        onChange={handleChange}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
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

export default StoreOwnerPage;
