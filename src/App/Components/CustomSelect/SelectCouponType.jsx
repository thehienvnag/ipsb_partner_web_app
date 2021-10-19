import React from "react";
import SelectWrapper from "./SelectWrapper";
import { getAllCouponType } from "App/Services/couponType.service";

const SelectCouponType = ({
  disabled,
  initialValue,
  defaultLabel,
  onChange,
}) => {
  const fetchCouponTypes = (searchParams) =>
    getAllCouponType({}, searchParams).then((data) => data.content);
  return (
    <SelectWrapper
      mode="single"
      disabled={disabled}
      placeholder="Select coupon type"
      initialValue={initialValue}
      defaultLabel={defaultLabel}
      keyIndex="id"
      labelIndex="name"
      onChange={onChange}
      loadData={fetchCouponTypes}
    />
  );
};

export default SelectCouponType;
