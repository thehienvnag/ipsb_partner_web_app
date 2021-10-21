import React from "react";
import { selectBuildingId } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";
import SelectWrapper from "./SelectWrapper";
import { getLocatorTags } from "App/Services/locatorTag.service";

const SelectLocatorTag = ({
  disabled,
  initialValue,
  defaultLabel,
  onChange,
  placeholder,
}) => {
  const buildingId = useSelector(selectBuildingId);
  const fetchLocatorTags = (searchParams) =>
    getLocatorTags({ buildingId }, searchParams).then((data) => data.content);
  return (
    <SelectWrapper
      mode="single"
      disabled={disabled}
      placeholder={placeholder}
      initialValue={initialValue}
      defaultLabel={defaultLabel}
      keyIndex="id"
      labelIndex="uuid"
      onChange={onChange}
      loadData={fetchLocatorTags}
    />
  );
};

export default SelectLocatorTag;
