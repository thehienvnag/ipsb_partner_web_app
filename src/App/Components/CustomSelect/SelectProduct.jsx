import React from "react";
import { getAllProduct } from "App/Services/product.service";
import { selectStoreId } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";
import SelectWrapper from "./SelectWrapper";

const SelectProduct = ({
  disabled,
  initialValue,
  defaultLabel,
  onChange,
  placeHolder,
}) => {
  const storeId = useSelector(selectStoreId);
  const fetchProducts = (searchParams) =>
    getAllProduct({ storeId }, searchParams).then((data) => data.content);
  return (
    <SelectWrapper
      mode="multiple"
      disabled={disabled}
      placeholder={placeHolder}
      initialValue={initialValue}
      defaultLabel={defaultLabel}
      keyIndex="id"
      labelIndex="name"
      onChange={onChange}
      loadData={fetchProducts}
    />
  );
};

export default SelectProduct;
