import React from "react";
import { useSelector } from "react-redux";
import SelectWrapper from "./SelectWrapper";
import { selectBuildingId } from "App/Stores/auth.slice";
import { getAll as getAllFloor } from "App/Services/floorPlan.service";

const SelectFloorPlan = ({ disabled, initialValue, value, onChange }) => {
  const buildingId = useSelector(selectBuildingId);
  const fetchFloorPlans = (searchParams) =>
    getAllFloor({ buildingId }, searchParams).then((data) => data.content);
  return (
    <SelectWrapper
      disabled={disabled}
      placeholder={`Select Floor Plan`}
      value={value}
      initialValue={initialValue}
      onChange={onChange}
      keyIndex="id"
      labelIndex="floorCode"
      loadData={fetchFloorPlans}
    />
  );
};

export default SelectFloorPlan;
