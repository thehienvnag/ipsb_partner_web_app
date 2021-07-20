import React, { useState, useEffect } from "react";
import { getAllStore } from "App/Services/store.service";
import { Table, Image, Tag, Typography, Avatar } from "antd";

const StoreTable = ({ onRowClick }) => {
  const [data, setData] = useState({ list: null, isLoading: false });
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  useEffect(() => {
    const fetchApi = async () => {
      setData({ isLoading: true });
      const data = await getAllStore({ buildingId: 1, pageIndex: currentPage });
      setData({ list: data.content, isLoading: false });
      setTotalCount(data.totalCount);
      setPageSize(data.pageSize);
    };

    fetchApi();
  }, [currentPage]);

  return (
    <>
      <Table
        dataSource={data.list}
        loading={data.isLoading}
        onRow={(record) => ({
          onClick: (evt) => onRowClick(record),
        })}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: (value) => setCurrentPage(value),
          showSizeChanger: false,
        }}
      >
        <Table.Column
          title="#No"
          key="id"
          render={(value, record, index) => {
            return <Tag>{index + 1}</Tag>;
          }}
        />
        <Table.Column
          title="Image"
          key="imageUrl"
          dataIndex="imageUrl"
          render={(value) => {
            return (
              <Avatar
                shape="square"
                size={100}
                src={<Image width="90px" src={value} />}
              />
            );
          }}
        />
        <Table.Column title="Name" key="name" dataIndex="name" />
        <Table.Column title="Phone" key="phone" dataIndex="phone" />
        <Table.Column
          title="Floor Plan"
          key="floorPlan"
          render={(value, record, index) => {
            return (
              <Typography.Text>
                Floor {value.floorPlan.floorCode}
              </Typography.Text>
            );
          }}
        />
        <Table.Column title="Status" key="status" dataIndex="status" />
      </Table>
    </>
  );
};

export default StoreTable;
