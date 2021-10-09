import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button,Space,Checkbox,Table,Tag,Typography } from "antd";
import { loadFacilitys, selectListFacility, selectIsLoading, selectPageSize, selectTotalCount } from "App/Stores/facility.slice";

const FacilityTable = ({ currentPage, handlePaging, onRowSelect }) => {
  
  const dispatch = useDispatch();
  const listFacility = useSelector(selectListFacility);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(loadFacilitys());
  }, [dispatch]);

  return (
    <Table
      loading={isLoading}
      dataSource={listFacility}
      pagination={{
        size: "small",
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
        onChange: (page) => handlePaging(page, search),
      }}
      onRow={(record) => ({
        onClick: (event) => onRowSelect(record),
      })}
    >
      <Table.Column
        title="#No"
        key="facility"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />
      <Table.Column
        title="Location"
        dataIndex="locationId"
        key="locationId"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />

      <Table.Column
        title="Description"
        dataIndex="description"
        key="description"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />

      <Table.Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(value) => {
          if (!value) {
            value = Math.floor(Math.random() * 2) % 2 === 0 ? "Active" : "Inactive";
          }
          return <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>;
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
  );
};

export default FacilityTable;
