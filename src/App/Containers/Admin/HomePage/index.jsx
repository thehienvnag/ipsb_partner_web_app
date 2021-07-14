import { Card, List, PageHeader, Typography } from "antd";
import React, { useEffect } from "react";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAll,
  selectIsLoading,
  selectListFloor,
} from "App/Stores/floorPlan.slice";

const AdHomePage = () => {
  const dispatch = useDispatch();
  const listFloor = useSelector(selectListFloor);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);
  return (
    <PageWrapper>
      <PageHeader title="Overview" subTitle="Admin" />
      <PageBody>
        <Card className="col-md-12">
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

export default AdHomePage;
