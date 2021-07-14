import React, { useState } from "react";
//import { getAllLoctionType } from "App/Services/locationType.service";
import { Table, Image, Tag, Avatar, Button, Typography } from "antd";

const LocationTypeTable = () => {
  const [listLocationType, setListLocationType] = useState(listTest);
  return (
    <>
      <Table dataSource={listLocationType}>
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

const listTest = [
  {
    id: 13,
    status: "Active",
    locationType: {
      name: "Baby room",
      description: "Đây là khu vực cho trẻ",
      imageUrl: "https://image.flaticon.com/icons/png/512/2611/2611300.png",
    },
  },
  {
    id: 14,
    status: "Active",
    locationType: {
      name: "Restroom",
      description: "Đây là khu vực nhà vệ sinh",
      imageUrl: "https://image.flaticon.com/icons/png/512/1647/1647794.png",
    },
  },
  {
    id: 15,
    status: "Active",
    locationType: {
      name: "Information desk",
      description: "Đây là khu vực thông tin",
      imageUrl: "https://image.flaticon.com/icons/png/512/1533/1533202.png",
    },
  },
  {
    id: 16,
    status: "Active",
    locationType: {
      name: "Goods lift",
      description: "Đây là khu vực nhà vệ sinh",
      imageUrl: "https://image.flaticon.com/icons/png/512/891/891462.png",
    },
  },

  {
    id: 16,
    status: "Active",
    locationType: {
      name: "Locker",
      description: "Đây là khu vực nhà vệ sinh",
      imageUrl: "https://image.flaticon.com/icons/png/512/869/869012.png",
    },
  },
];

export default LocationTypeTable;
