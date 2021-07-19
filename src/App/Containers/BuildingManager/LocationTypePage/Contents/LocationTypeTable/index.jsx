import React, { useState, useEffect } from "react";
import { getAllLoctionType } from "App/Services/location.service";
import { Table, Image, Tag, Avatar, Button, Typography } from "antd";

const LocationTypeTable = () => {
  const [listLocationType, setListLocationType] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  useEffect(() => {
    fetchApi();
  }, [currentPage]);
  const fetchApi = async () => {
    const data = await getAllLoctionType({
      buildingId: 12,
      pageIndex: currentPage,
    });
    setTotalCount(data.totalCount);
    setPageSize(data.pageSize);
    setListLocationType(data.content);
    console.log(data.content);
  };

  return (
    <>
      <Table
        dataSource={listLocationType}
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
          render={(value) => {
            return (
              <Avatar
                shape="square"
                size={100}
                src={<Image width="90px" src={value.locationType.imageUrl} />}
              />
            );
          }}
        />
        <Table.Column
          title="Name"
          key="name"
          render={(value) => {
            return <Typography.Text>{value.locationType.name}</Typography.Text>;
          }}
        />
        <Table.Column title="Status" key="status" dataIndex="status" />
        <Table.Column
          title="Position"
          render={(value, record, index) => {
            return <Button type="link">View</Button>;
          }}
        />
      </Table>
    </>
  );
};

export default LocationTypeTable;
