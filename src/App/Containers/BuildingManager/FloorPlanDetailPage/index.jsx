import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import {
  loadById,
  selectOne,
  removeCurrentFloor,
} from "App/Stores/floorPlan.slice";
import "./index.scss";
import Header from "./Header";

import { useSelector } from "react-redux";
import Overview from "./Contents/Overview/index";
const FloorPlanDetailPage = ({ match }) => {
  //#region state includes: [selectedItems: array]
  const { id } = useParams();
  //#endregion
  //#region selector of [listFloor, isLoading]
  const floor = useSelector(selectOne);
  //#endregion
  //#region handle event functions
  const handleRefresh = () => {};
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region load state of floor plans to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    if (id === "create-new") {
      dispatch(removeCurrentFloor());
    } else {
      dispatch(loadById(id));
    }
  }, [dispatch, id]);
  //#endregion

  return (
    <PageWrapper>
      <Header
        floor={floor}
        handleRefresh={handleRefresh}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <PageBody>
        <Card>
          <div style={{ padding: 10 }}>
            <Overview floor={floor} />
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default FloorPlanDetailPage;
