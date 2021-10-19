const { useState, useEffect } = require("react");

export const useBtnLoading = (btnState = {}) => {
  const [btnLoading, setBtnLoading] = useState({});
  useEffect(() => {
    setBtnLoading({ ...btnLoading, ...(btnState ?? {}) });
  }, [btnState]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...btnLoading,
  };
};
