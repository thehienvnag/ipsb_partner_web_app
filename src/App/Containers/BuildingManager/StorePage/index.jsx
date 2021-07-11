import React from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import StoreTable from "./Contents/StoreTable/index";

const StorePage = () => {
  return (
    <PageWrapper>
      <Header />
      <PageBody>
        <Card>
          <StoreTable />
        </Card>
      </PageBody>

      {/* <DataArr list={dataArr} /> */}
    </PageWrapper>
  );
};

// const dataArr = [
//   { name: "A San Mập địt", homeTown: "Long Xuyên" },
//   { name: "E San cute", homeTown: "Long Xuyên" },
// ];

// const DataArr = ({ list }) => {
//   return list.map((item) => {
//     return (
//       <li>
//         {item.name}-{item.homeTown}
//       </li>
//     );
//   });
// };

export default StorePage;
