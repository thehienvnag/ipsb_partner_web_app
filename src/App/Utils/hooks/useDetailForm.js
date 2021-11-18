import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { keyObjectStringify, nonNullKeyValue, pipe } from "../utils";
const msgStyle = { top: "12vh", right: "10vw", position: "absolute" };
export const useDetailForm = ({
  model,
  createCallback,
  createParams,
  updateCallback,
  paramsKeyToStringify,
  deleteCallback,
  handleRefresh,
  handleCancel,
  effectCallback,
}) => {
  const [btnState, setBtnState] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (model) {
      form.setFieldsValue(model);
    }
    effectCallback && effectCallback();
  }, [model]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSave = async () => {
    const stringify = (values) =>
      keyObjectStringify(values, paramsKeyToStringify);
    const values = pipe(
      nonNullKeyValue,
      stringify
    )(await form.validateFields());

    if (model) {
      update(values);
    } else {
      create(values);
    }
  };

  const showError = (err, type) => {
    let msg = `${type} failed: `;
    if (err?.response?.status === 403) {
      msg += err?.response?.data ?? "";
    } else {
      msg += err?.response?.data?.message ?? "";
    }
    message.error({
      content: msg,
      style: msgStyle,
      duration: 3,
    });
  };

  const create = async (values) => {
    try {
      setBtnState({ saveLoading: true });
      const data = await createCallback({ ...values, ...createParams });
      if (data?.id) {
        handleRefresh();
        message.success({
          content: "Create success",
          style: msgStyle,
          duration: 3,
        });
      }
    } catch (error) {
      showError(error, "Create");
    }
    setBtnState({ saveLoading: false });
  };
  const update = async (values) => {
    try {
      setBtnState({ saveLoading: true });
      const res = await updateCallback(model.id, values);
      if (res) {
        handleRefresh();
        message.success({
          content: "Update success",
          style: msgStyle,
          duration: 3,
        });
      }
    } catch (error) {
      showError(error, "Update");
    }
    setBtnState({ saveLoading: false });
  };

  const onDelete = async () => {
    try {
      setBtnState({ removeLoading: true });
      const result = await deleteCallback(model.id);
      if (result) {
        handleRefresh();
        handleCancel();
        message.success({
          content: "Delete success",
          style: msgStyle,
          duration: 3,
        });
      }
    } catch (error) {
      showError(error, "Delete");
    }
    setBtnState({ removeLoading: false });
  };

  return { form, onSave, onDelete, btnState };
};
