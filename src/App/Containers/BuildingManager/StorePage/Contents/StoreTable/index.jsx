import React, { useState, useEffect } from "react";
import { getAllStore } from "App/Services/store.service";
import { Table, Image, Tag, Typography, Avatar } from "antd";

const StoreTable = () => {
  const [listStore, setListStore] = useState(null);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const data = await getAllStore({ buildingId: 1 });

    setListStore(data.content);
    console.log(data.content);
  };
  return (
    <>
      <Table dataSource={listStore}>
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
