import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";

import { loadAll } from "App/Stores/floorPlan.slice";
import "./index.scss";
import Header from "./Header";
import FloorPlanTable from "./FloorPlanTable/index";

const FloorPlanPage = () => {
  //#region state includes: [selectedItems: array]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //#endregion
  //#region handle event functions
  const handleRefresh = () => dispatch(loadAll({ pageIndex: currentPage }));
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region load state of floor plans to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    dispatch(loadAll({ pageIndex: currentPage }));
  }, [dispatch, currentPage]);
  //#endregion
  return (
    <PageWrapper>
      <Header
        handleRefresh={handleRefresh}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <PageBody>
        <Card>
          <div style={{ padding: 10 }}>
            <FloorPlanTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default FloorPlanPage;
