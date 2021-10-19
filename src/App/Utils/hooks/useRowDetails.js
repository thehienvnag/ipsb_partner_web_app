import { useState } from "react";

export const useRowDetails = () => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };
  const handleCreate = () => {
    setVisible(true);
    setItem(null);
  };
  const handleCancel = () => setVisible(false);
  const onRowSelect = (value) => {
    setVisible(true);
    setItem(value);
  };

  return {
    refresh,
    visible,
    item,
    handleRefresh,
    handleCreate,
    handleCancel,
    onRowSelect,
    
  };
};
