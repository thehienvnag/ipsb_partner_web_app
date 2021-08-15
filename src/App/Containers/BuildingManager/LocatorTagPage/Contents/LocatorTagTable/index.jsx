import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Row,
  Col,
  Input,
  Form,
  Select,
  Typography,
  Checkbox,
  Space,
  Button,
} from "antd";
import {
  loadLocatorTags,
  selectIsLoading,
  selectListLocatorTag,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/locatorTag.slice";
import { putLocatorTag } from "App/Services/locatorTag.service";
import {
  selectListFloor,
  loadAll,
  setCurrentFloor,
} from "App/Stores/floorPlan.slice";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const LocatorTagTable = ({
  selectedItems,
  setSelectedItems,
  currentPage,
  setCurrentPage,
}) => {
  //#region selector of [listFloor, isLoading]
  const dispatch = useDispatch();
  const listLocatorTag = useSelector(selectListLocatorTag);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);

  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(null);
  const [valueMac, setMacaddress] = useState(null);
  const [valueLocationId, setLocationId] = useState(null);
  const [valueFloor, setFloor] = useState(null);
  const [valueStatus, setStatus] = useState(null);
  const [updateForm] = Form.useForm();

  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);
  const listFloorPlan = useSelector(selectListFloor);

  const showModal = (value) => {
    setVisible(true);
    setModel(value);
  };
  const hideModal = () => setVisible(false);

  //#endregion
  const handlePaging = (number) => {
    console.log(number);
    if (search) {
      console.log(search);
      dispatch(
        loadLocatorTags({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadLocatorTags({ pageIndex: number }));
    }
    setCurrentPage(number);
  };

  const onUpdate = async () => {
    if (valueMac !== null && valueLocationId != null && valueFloor != null) {
      const data = await putLocatorTag({
        ...{ id: model?.id },
        ...{ macAddress: valueMac },
        ...{ status: valueStatus },
        ...{ floorPlanId: valueFloor },
        ...{ locationId: valueLocationId },
        ...{ lastSeen: new Datetime.now() },
      });
      if (data?.id !== null) {
        message
          .loading("Action in progress...", 3)
          .then(() => message.success("Update success", 3))
          .then(() => hideModalDetail())
          .then(() => dispatch(loadAccounts({ pageIndex: currentPage })));
      }
    }
  };

  return (
    <>
      <Table
        loading={isLoading}
        rowSelection={{
          selectedRowKeys: selectedItems,
          onChange: (values) => setSelectedItems(values),
        }}
        dataSource={listLocatorTag}
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
            updateForm.setFieldsValue(record);
          },
        })}
      >
        <Table.Column
          title="#No"
          // dataIndex="locatorTagNumber"
          key="locatorTagNumber"
          render={(item, record, index) => <Tag>#{index + 1}</Tag>}
        />

        <Table.Column
          title="Mac Address"
          key="macAddress"
          render={(item) => (
            //<Typography.Link onClick={() => showModal(item)}>
            <Typography.Link> {item.macAddress} </Typography.Link>
          )}
          filterDropdown={({ selectedKeys }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder={`Search MAC address`}
                value={selectedKeys[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && value.length) {
                    setSearch({ macAddress: value });
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

        {/* <Table.Column
          title="Store name"
          // key="location.x"
          render={(item) => (
            <Typography> {item.location.store?.name} </Typography>
          )}
        /> */}

        <Table.Column
          title="Floor Plan"
          key="floorPlanCode"
          render={(item) => (
            <Typography> {item.floorPlan.floorCode} </Typography>
          )}
        />

        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value) => {
            if (!value) {
              value =
                Math.floor(Math.random() * 2) % 2 === 0 ? "Active" : "Inactive";
            }
            return (
              <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
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
                  <Checkbox value="Active">Active</Checkbox>
                  <Checkbox value="New">New</Checkbox>
                  <Checkbox value="Inactive">Inactive</Checkbox>
                </Checkbox.Group>

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
        width={700}
        title={`Detail of locator tag ID ${model?.id}`}
        visible={visible}
        onOk={onUpdate}
        onCancel={hideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={updateForm}>
          <Row justify="space-between">
            <Col span={12}>
              <Col span={21}>
                <Form.Item
                  name="macAddress"
                  label="MAC Address: "
                  required
                  tooltip="This is MAC Address of locator tag"
                >
                  <Input
                    //value={model?.macAddress}
                    placeholder="Input MAC Address of locator tag"
                    onChange={(e) => {
                      setMacaddress(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={21}>
                <Form.Item
                  name="locationId"
                  label="Location ID of locator tag: "
                  required
                  tooltip="This is location ID of locator tag"
                >
                  <Input
                    value={model?.location.id}
                    placeholder="Input location ID of locator tag"
                    onChange={(value) => {
                      // setInput(!input);
                      setLocationId(value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Floor in building:"
                  required
                  tooltip="This is the location of the locator tag on which floor of building"
                >
                  <Select
                    placeholder="Select Floor"
                    style={{ width: 141 }}
                    defaultValue={model?.floorPlan.floorCode}
                    onChange={(e) => {
                      const value = e;
                      setFloor(value);
                    }}
                  >
                    {listFloorPlan &&
                      listFloorPlan.map((item) => (
                        <Option value={item.id}>{item.floorCode}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Status:"
                  required
                  tooltip="This is status of locator tag"
                >
                  <Select
                    defaultValue={
                      model?.status === "Active" ? "Active" : "Inactive"
                    }
                    style={{ width: 205 }}
                    onChange={(value) => {
                      setStatus(value);
                    }}
                  >
                    <Option value="1">Active</Option>
                    <Option value="2">Inactive</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </Form>
        <div style={{ width: "94%" }}>
          <Row justify={"space-between"}>
            <Col span={10}>
              <Form.Item
                label="Update date"
                required
                tooltip="This is the most recent date the locator tag was updated"
              >
                <Input
                  disabled={true}
                  value={model?.updateTime}
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Last date scanned"
                required
                tooltip="This is the last date the location tag was scanned"
              >
                <Input
                  disabled={true}
                  value={model?.lastSeen}
                  onChange={() => {
                    // setInput(!input);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default LocatorTagTable;
