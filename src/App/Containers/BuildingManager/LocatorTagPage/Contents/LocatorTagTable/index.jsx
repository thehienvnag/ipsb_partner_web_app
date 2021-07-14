import React, {useState} from "react";
import { Table, Tag, Modal,
  Row,
  Col,Input,
  Form,
  Select, Typography} from "antd";
import { Link } from "react-router-dom";
import {
  selectIsLoading,
  selectListLocatorTag,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/locatorTag.slice";
import { useSelector } from "react-redux";



const LocatorTagTable = ({
  selectedItems,
  setSelectedItems,
  currentPage,
  setCurrentPage,
}) => {
  //#region selector of [listFloor, isLoading]
  const listLocatorTag = useSelector(selectListLocatorTag);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);

  const { TextArea } = Input;
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(null);
  

  const showModal = (value) => {setVisible(true);
  setModel(value)} 
  const hideModal = () => setVisible(false);


  //#endregion

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
          onChange: (value) => setCurrentPage(value),
        }}
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
            <Typography.Link onClick={()=> showModal(item)}> {item.macAddress} </Typography.Link>
          )}
        />
        
        <Table.Column
          title="Store name"
          // key="location.x"
          render={(item) => (
            <Typography> {item.location.store?.name} </Typography>
            
          )}
        />

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
        />
      </Table>
      <Modal
              width={700}
              title={`Chi tiết của thẻ định vị ID${model?.id}`}
              visible={visible}
              //visible={true}
              back
              onOk={hideModal}
              onCancel={hideModal}
              okText="Lưu"
              cancelText="Hủy"
            >
              <Row justify="space-between">
                <Col span={12}>
                  <Col span={21}>
                    <Form.Item
                      label="Địa chỉ MAC: "
                      required
                      tooltip="Đây là địa chỉ MAC của thẻ định vị"
                    >
                      <Input
                        value={model?.macAddress}
                        placeholder="Nhập địa chỉ MAC của thẻ định vị"
                        onChange={() => {
                          // setInput(!input);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Tầng trong tòa nhà:"
                      required
                      tooltip="Đây là vị trí của thẻ định vị nằm ở tầng nào trong tòa nhà"
                    >
                      <Select
                        defaultValue={model?.floorPlan.floorCode}
                        style={{ width: 145 }}
                        onChange={() => {
                          // setInput(!input);
                        }}
                      >
                        <Option value="L1">Tầng 1</Option>
                        <Option value="L2">Tầng 2</Option>
                        <Option value="L3">Tầng 3</Option>
                        <Option value="L4">Tầng 4 </Option>
                        <Option value="L5">Tầng 5 </Option>
                        <Option value="L6">Tầng 6</Option>
                        <Option value="L7">Tầng 7 </Option>
                        <Option value="L8">Tầng 8</Option>
                        <Option value="L9">Tầng 9</Option>
                        <Option value="L10">Tầng 10</Option>
                        <Option value="L11">Tầng 11</Option>
                        <Option value="L12">Tầng 12</Option>
                        <Option value="L13">Tầng 13</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Trạng thái:"
                      required
                      tooltip="Đây là trạng thái của thẻ định vị"
                    >
                      <Select
                        defaultValue={model?.status === 'Active' ? "Hoạt động" : "Không hoạt động"}
                        style={{ width: 145 }}
                        onChange={() => {
                          // setInput(!input);
                        }}
                      >
                        <Option value="1">Hoạt động</Option>
                        <Option value="2">Không hoạt động</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Col>
              </Row>

              <div style={{ width: "94%" }}>
                <Row justify={"space-between"}>
                  <Col span={10}>
                    <Form.Item
                      label="Ngày cập nhật"
                      required
                      tooltip="Đây là ngày gần nhất mà thẻ định vị được cập nhật"
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
                      label="Ngày gần nhất được quét"
                      required
                      tooltip="Đây là ngày gần nhất mà thẻ định vị được quét"
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
