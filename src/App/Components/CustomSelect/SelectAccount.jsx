import { getAccounts } from "App/Services/account.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";

const SelectAccount = ({
  disabled,
  role = "Building Manager" || "Store Owner",
  storeOwnerBuildingId,
  initialValue,
  onChange,
}) => {
  const fetchAccounts = (searchParams) => {
    const notMange =
      role === "Building Manager"
        ? { notManageBuilding: true }
        : role === "Store Owner"
        ? { notManageStore: true, storeOwnerBuildingId }
        : null;

    return getAccounts({ pageSize: 10, role }, notMange, searchParams).then(
      (data) => data.content
    );
  };

  return (
    <SelectWrapper
      disabled={disabled}
      placeholder={`Select ${role}`}
      onChange={onChange}
      initialValue={initialValue}
      loadData={fetchAccounts}
      keyIndex="id"
      labelIndex="name"
    />
  );
};

export default SelectAccount;
