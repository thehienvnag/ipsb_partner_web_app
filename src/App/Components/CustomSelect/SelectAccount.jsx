import { getAccounts } from "App/Services/account.service";
import React from "react";
import SelectWrapper from "./SelectWrapper";
/**
 * Get accounts functions
 * @param {object} [props] props of components
 * @param {string} [role] role of account
 */
const SelectAccount = ({
  role = "Building Manager" || "Store Owner",
  value,
  onChange,
}) => {
  const fetchAccounts = (searchObject) =>
    getAccounts({ pageSize: 10, role, searchObject }).then(
      (data) => data.content
    );
  return (
    <SelectWrapper
      placeholder={`Select ${role}`}
      value={value}
      onChange={onChange}
      loadData={fetchAccounts}
      keyIndex="id"
      labelIndex="name"
    />
  );
};

export default SelectAccount;
