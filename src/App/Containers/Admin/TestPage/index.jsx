import React from "react";
import "./index.scss";
import { PageWrapper } from "App/Components/PageWrapper";
import { PageBody } from "App/Components/PageWrapper";
import { PageHeader, Card } from "antd";

const dataSource = [
  {
    key: "1",
    firstName: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    firstName: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

function TableTest() {
  return (
    <>
      <table className="table table-custom">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          <ListItems items={dataSource} title="Hello mn" />
        </tbody>
      </table>
    </>
  );
}

function ListItems(props) {
  return props.items.map((item, index) => (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{item.firstName}</td>
      <td>{item.age}</td>
      <td>{item.address}</td>
    </tr>
  ));
}

const TestPage = () => {
  return (
    <div>
      <PageWrapper>
        <PageHeader
          className="site-page-header"
          title="Title"
          subTitle="This is a subtitle"
        />
        <PageBody>
          <Card className="col-md-12">
            <TableTest></TableTest>
          </Card>
        </PageBody>
      </PageWrapper>
    </div>
  );
};

export default TestPage;
