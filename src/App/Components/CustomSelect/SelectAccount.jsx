import { getAccounts } from "App/Services/account.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";

const SelectAccount = ({
  disabled,
  role = "Building Manager" || "Store Owner",
  initialValue,
  onChange,
}) => {
  const fetchAccounts = (searchParams) =>
    getAccounts(
      { pageSize: 10, role, notBuildingManager: true },
      searchParams
    ).then((data) => data.content);
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
