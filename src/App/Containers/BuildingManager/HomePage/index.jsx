import React, { useEffect, useState } from "react";
import Card from "App/Components/Card";
import { PageHeader, List, Typography } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { getFloorPlans } from "App/Services/floorPlan.service";
import "./index.scss";

const BmHomePage = () => {
  const [listFloor, setListFloor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //#region function fetch data
    const fetchData = async () => {
      setIsLoading(true);
      const floors = await getFloorPlans();
      setIsLoading(false);
      setListFloor(floors?.content);
    };
    //#endregion
    fetchData();
  }, []);
  return (
    <PageWrapper>
      <PageHeader title="Overview" subTitle="Building Manager" />
      <PageBody>
        <Card className="col-md-6" title="Card">
          <List
            loading={isLoading}
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={listFloor}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>{item.floorCode}</Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BmHomePage;
