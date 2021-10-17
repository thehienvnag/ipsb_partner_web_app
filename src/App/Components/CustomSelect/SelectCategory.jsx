import { getAllProductCategories } from "App/Services/productCategory.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";
/**
 * Get accounts functions
 * @param {object} [props] props of components
 * @param {string} [role] role of account
 */
const SelectCategory = ({ initialValue, defaultLabel, onChange }) => {
  const fetchCategories = (searchObject) =>
    getAllProductCategories({ searchObject }).then((data) => data.content);
  return (
    <SelectWrapper
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
