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
  Steps,
  Spin,
} from "antd";
import { postBuilding, putBuilding } from "App/Services/building.service";
import { postAccount } from "App/Services/account.service";

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
    dispatch(loadAccounts());
  }, [dispatch]);

  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [currentStep, setStep] = useState(2);
  // const [visibleManagerId, setVisibleManagerId] = useState(false);
  const [model, setModel] = useState(null);
  const { Step } = Steps;
  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const showModalCreate = () => {
    setVisibleCreate(true);
    // setVisibleManagerId(false);
  };

  const hideModalCreate = () => {
    setVisibleCreate(false);
    form.resetFields();
    setStep(0);
    setImageUrl(null);
  };
  const hideModalDetail = () => {
    setVisibleDetail(false);
    // setVisibleManagerId(false);
    form.resetFields();
    setImageUrl(null);
  };

  const showModalDetail = (value) => {
    setImageUrl(value);
    setVisibleDetail(true);
    // setVisibleManagerId(true);
  };

  const handleChange = (info) => {
    getBase64(
      info.fileList[0]?.originFileObj,
      (imageUrl) => setImageUrl(imageUrl),
      setFile(info.fileList[0]?.originFileObj)
    );
  };

  function CreateBuildingForm() {
    return (
      <Form form={form1} layout="vertical" name="register" scrollToFirstError>
        <Row justify="space-between">
          <Col span={13}>
            <div className="ant-image-custom">
              <Image
                style={{
                  width: "380px",
                }}
                src={imageUrl}
                preview={true}
              />
            </div>

            <Form.Item name="imageUrl" label="Thêm ảnh tòa nhà:" required>
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
          </Col>
        </Row>
      </Form>
    );
  }
  const saveBuilding = async () => {
    form1.validateFields();
    const values = form1.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Thêm ảnh cho tòa nhà", 4);
    } else if (values != null && values.imageUrl != null) {
      const data = await postBuilding({
        ...values,
        ...{ imageUrl: file },
        ...{ managerId: 3 }, // nà đang set cứng
        ...{ adminId: 2 },
        ...{ name: values.name },
        ...{ address: values.address },
        ...{ numberOfFloor: values.numberOfFloor },
      });
      if (data.id != null) {
        setModel(data); // set data vừa thêm của building
        console.log("id đây nè: " + model.id, model.name);
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Tạo mới tòa nhà thành công", 3))
          .then(() => setStep(currentStep + 1), setImageUrl(null));
      }
    }
  };

  function CreateAccountForm() {
    return (
      <Form form={form2} name="register" scrollToFirstError>
        <Row justify="space-between">
          <Col span={10}>
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
              label="Tên:"
              rules={[
                {
                  required: true,
                  message: "Nhập đầy đủ tên của người dùng ",
                  whitespace: false,
                },
              ]}
            >
              <div className="form-input">
                <Input placeholder="Nhập tên của người dùng" />
              </div>
            </Form.Item>

            <Form.Item
              name="email"
              label="Email: "
              required
              rules={[
                {
                  type: "email",
                  message: "E-mail không xác định !",
                },
                {
                  required: true,
                  message: "Nhập email",
                },
              ]}
            >
              <div className="form-input">
                <Input placeholder="Nhập email liên lạc" type="email" />
              </div>
            </Form.Item>

            <Form.Item
              name="role"
              label="Quyền"
              rules={[
                {
                  required: true,
                  message: "Chọn quyền cho người dùng",
                },
              ]}
            >
              <Select placeholder="Chọn quyền">
                <Option value="Building Manager">Quản lý tòa nhà</Option>
                {/* <Option value="Store Owner">Chủ cửa hàng</Option>
                <Option value="Admin">Admin</Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại: "
              required
              rules={[
                {
                  required: true,
                  message: "Nhập số điện thoại",
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                type="number"
                maxLength={10}
              />
            </Form.Item>

            <Form.Item name="imageUrl" label="Thêm ảnh cá nhân:">
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
    );
  }

  const saveAccount = async () => {
    form2.validateFields();
    const values = form2.getFieldsValue();
    if (values.imageUrl == null) {
      message.error("Thêm ảnh cho quản lý", 4);
    } else if (values !== null && values.imageUrl != null) {
      const data = await postAccount({
        ...values,
        ...{ imageUrl: file },
        ...{ name: values.name },
        ...{ phone: values.phone },
        ...{ role: values.role },
        ...{ email: values.email },
      });
      console.log(data);
      if (data.id !== null) {
        message
          .loading("Action in progress...", 3)
          .then(() =>
            message.success("Tạo mới tài khoản quản lý thành công", 3)
          )
          .then(() => setStep(currentStep + 1), setImageUrl(null));
      }
    }
  };

  function AssignManagerForm() {
    return (
      <Form form={form3} layout="vertical" name="register" scrollToFirstError>
        <Row justify="space-around">
          <Col span={10}>
            <Form.Item label="Tên tòa nhà: ">
              <Input
                placeholder="Nhập tên tòa nhà"
                value={model?.name}
                //value="Vincom Q2"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="managerId"
              label="Quản lý tòa nhà"
              rules={[
                {
                  required: true,
                  message: "Chọn quản lý tòa nhà",
                },
              ]}
            >
              <Select placeholder="Chọn quản lý cho tòa nhà">
                {listAccount &&
                  listAccount.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  const saveAssignManager = async () => {
    form3.validateFields();
    const values = form3.getFieldsValue();
    // if (values.managerId != null) {
    //   const data = await putBuilding({
    //     ...values,
    //     ...{ id: model.id }, // ID  của building
    //     // ...{ id: 16 },
    //     ...{ managerId: values.managerId }, // cập nhập  thành manager mình chọn
    //   });
    //   console.log(data);
    //   if (data.id !== null) {
    //     message
    //       .loading("Action in progress...", 3)
    //       .then(() => message.success("Thêm mới quản lý tòa nhà thành công", 3))
    //       .then(() => setStep(currentStep + 1));
    //   }
    // }
  };

  function DoneForm() {
    return (
      <div className="example">
        <h1>
          <Spin /> Tòa nhà đã được thêm mới vào hệ thống <Spin />
        </h1>
        <h2 style={{ color: "Highlight" }}>
          <a
            href="http://localhost:3000/admin/buildings"
            // target="_blank"
            rel="noreferrer"
          >
            Quản lý ngay
          </a>
        </h2>
      </div>
    );
  }

  function FooterCreate() {
    if (currentStep == "0") {
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
                Hủy
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={saveBuilding}>
                Đăng ký
              </Button>
            </Form.Item>
          </Space>
        </Row>
      );
    } else if (currentStep == "1") {
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
                Hủy
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={saveAccount}>
                Đăng ký
              </Button>
            </Form.Item>
          </Space>
        </Row>
      );
    } else if (currentStep == "2") {
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
                Hủy
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={saveAssignManager}>
                Đăng ký
              </Button>
            </Form.Item>
          </Space>
        </Row>
      );
    }
    return null;
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
              Hủy
            </Button>
          </Form.Item>

          <Form.Item>
            <Button form="formDetail" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Space>
      </Row>
    );
  }
  const onFinishSaveBuilding = (values) => {
    if (values != null) {
      message
        .loading("Action in progress...", 3)
        .then(() => message.success("Lưu thông tin tòa nhà thành công", 3))
        .then(() => hideModalDetail());
    }
  };

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
              title="Chia tiết của tòa nhà"
              visible={visibleDetail}
              onCancel={hideModalDetail}
              footer={[<FooterDetail />]}
            >
              <Form
                form={form}
                layout="vertical"
                name="register"
                onFinish={onFinishSaveBuilding}
                scrollToFirstError
                id="formDetail"
              >
                <Row justify="space-between">
                  <Col span={13}>
                    <div className="ant-image-custom">
                      <Image
                        style={{
                          width: "350px",
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
                      rules={[
                        {
                          // required: { visibleManagerId },
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
            <Modal
              className="modal-building"
              width={800}
              title="Thêm mới tòa nhà"
              // visible={visibleCreate}
              visible={true}
              onCancel={hideModalCreate}
              footer={[<FooterCreate />]}
            >
              <Steps current={currentStep}>
                <Step title="Đăng ký tòa nhà" />
                <Step title="Đăng ký tài khoản" />
                <Step title="Thêm quản lý tòa nhà" />
              </Steps>
              <Space> </Space>
              {currentStep == "0" ? <CreateBuildingForm /> : null}
              {currentStep == "1" ? <CreateAccountForm /> : null}
              {currentStep == "2" ? <AssignManagerForm /> : null}
              {currentStep == "3" ? <DoneForm /> : null}
            </Modal>
          </>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BuildingPage;
