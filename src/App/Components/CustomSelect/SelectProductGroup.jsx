import { getAllProduct } from "App/Services/product.service";
import { selectStoreId } from "App/Stores/auth.slice";
import React from "react";
import { useSelector } from "react-redux";
import SelectWrapper from "./SelectWrapper";
/**
 * Get accounts functions
 * @param {object} [props] props of components
 */
const SelectProductGroup = ({ initialValue, onChange }) => {
  const storeId = useSelector(selectStoreId);
  const fetchProductGroups = (searchObject) =>
    getAllProduct({ searchObject, storeId }).then((data) => data.content);
  return (
    <SelectWrapper
      placeholder="Select group"
      initialValue={initialValue}
      keyIndex="id"
      labelIndex="name"
      onChange={onChange}
      loadData={fetchProductGroups}
    />
  );
};

export default SelectProductGroup;
