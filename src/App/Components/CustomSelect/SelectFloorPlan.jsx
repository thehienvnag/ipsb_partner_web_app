import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListFloorCode,
  loadAll as getFloor,
} from "App/Stores/floorPlan.slice";
import SelectWrapper from "./SelectWrapper";

const SelectFloorPlan = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const floors = useSelector(selectListFloorCode);
  useEffect(() => {
    dispatch(getFloor());
  }, [dispatch]);
  return (
    <SelectWrapper
      placeholder={`Select Floor Plan`}
      value={value}
      onChange={onChange}
      inputData={floors}
      keyIndex="id"
      labelIndex="floorCode"
    />
  );
};

export default SelectFloorPlan;
