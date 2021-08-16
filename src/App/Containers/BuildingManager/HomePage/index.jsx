import React from "react";
import Card from "App/Components/Card";
import { PageHeader } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
// import { getFloorPlans } from "App/Services/floorPlan.service";
import "./index.scss";

const BmHomePage = () => {
  // const [listFloor, setListFloor] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   //#region function fetch data
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const floors = await getFloorPlans();
  //     setIsLoading(false);
  //     setListFloor(floors?.content);
  //   };
  //   //#endregion
  //   fetchData();
  // }, []);
  return (
    <PageWrapper>
      <PageHeader title="Overview" subTitle="Building Manager" />
      <PageBody>
        <Card title="Card">Home Page</Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BmHomePage;
