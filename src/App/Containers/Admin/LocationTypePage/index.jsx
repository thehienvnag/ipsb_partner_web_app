import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import { loadLocationTypes } from "App/Stores/location_type_2.slice";
import LocationTypeTable from "./Contents/LocationTypeTable";
import LocationTypeDetails from "./Contents/LocationTypeDetails";

const LocationTypePageV2 = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [locationTypeModel, setLocationType] = useState(null);
  const [visible, setVisible] = useState(false);

  const handlePaging = (number, search) => {
    if (search) {
      dispatch(
        loadLocationTypes({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadLocationTypes({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadLocationTypes({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    setLocationType(null);
    setVisible(true);
  };

  const onRowSelect = (value) => {
    setLocationType(value);
    setVisible(true);
  };
  return (
    <PageWrapper>
      <PageBody noWrap={true}>
        <Col flex="auto">
          <Card className="card-table">
            <Header
              handleRefresh={handleRefresh}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
            />
            <LocationTypeTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <LocationTypeDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          locationTypeModel={locationTypeModel}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default LocationTypePageV2;
