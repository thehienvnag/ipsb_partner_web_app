import React from "react";
import { Table, Tag, Input, Typography, Checkbox, Space, Button } from "antd";
import {
  selectIsLoading,
  selectListLocatorTag,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/locatorTag.slice";
import Moment from "moment";

import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const LocatorTagTable = ({ currentPage, setCurrentPage, onRowSelect }) => {
  //#region selector of [listFloor, isLoading]

  const listLocatorTag = useSelector(selectListLocatorTag);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);

  const handlePaging = (number) => {
    // console.log(number);
    // if (search) {
    //   console.log(search);
    //   dispatch(
    //     loadLocatorTags({ pageIndex: number, searchObject: search, status: "" })
    //   );
    // } else {
    //   dispatch(loadLocatorTags({ pageIndex: number }));
    // }
    setCurrentPage(number);
  };

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={listLocatorTag}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: handlePaging,
        }}
        onRow={(record, recordIndex) => ({
          onClick: (event) => onRowSelect(record),
        })}
      >
        <Table.Column
          title="#No"
          // dataIndex="locatorTagNumber"
          key="locatorTagNumber"
          render={(item, record, index) => <Tag>{index + 1}</Tag>}
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
                  // const value = e.target.value;
                  // if (value && value.length) {
                  //   setSearch({ macAddress: value });
                  // } else {
                  //   setSearch(null);
                  // }
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
            <Typography> Floor {item.floorPlan.floorCode} </Typography>
          )}
        />
        <Table.Column
          title="Update date"
          dataIndex="updateTime"
          key="updateTime"
          render={(value) => (
            <Typography.Text>{Moment(value).format("lll")}</Typography.Text>
          )}
        />
        <Table.Column
          title="Last seen"
          dataIndex="lastSeen"
          key="lastSeen"
          render={(value) => (
            <Typography.Text>{Moment(value).format("lll")}</Typography.Text>
          )}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value) => (
            <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
          )}
          filterDropdown={() => (
            <div style={{ padding: 8 }}>
              <Space>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(value) => {}}
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
    </>
  );
};

export default LocatorTagTable;
