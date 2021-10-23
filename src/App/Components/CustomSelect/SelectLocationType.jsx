import { getAllLocationType } from "App/Services/locationType.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";

const SelectLocationType = ({
  disabled,
  initialValue,
  defaultLabel,
  onChange,
  notLocationTypeIds,
}) => {
  const fetchCategories = (searchParams) =>
    getAllLocationType({ isAll: true, notLocationTypeIds }, searchParams).then(
      (data) => data.content
    );
  return (
    <SelectWrapper
      disabled={disabled}
      placeholder="Select location type"
      initialValue={initialValue}
      defaultLabel={defaultLabel}
      keyIndex="id"
      labelIndex="name"
      onChange={onChange}
      loadData={fetchCategories}
    />
  );
};

export default SelectLocationType;
