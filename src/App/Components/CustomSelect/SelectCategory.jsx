import { getAllProductCategories } from "App/Services/productCategory.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";

const SelectCategory = ({ disabled, initialValue, defaultLabel, onChange }) => {
  const fetchCategories = (searchObject) =>
    getAllProductCategories({ searchObject }).then((data) => data.content);
  return (
    <SelectWrapper
      disabled={disabled}
      placeholder="Select category"
      initialValue={initialValue}
      defaultLabel={defaultLabel}
      keyIndex="id"
      labelIndex="name"
      onChange={onChange}
      loadData={fetchCategories}
    />
  );
};

export default SelectCategory;
