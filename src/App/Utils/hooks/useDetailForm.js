import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { keyObjectStringify, nonNullKeyValue, pipe } from "../utils";
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

  const create = async (values) => {
    try {
      setBtnState({ saveLoading: true });
      const data = await createCallback({ ...values, ...createParams });
      if (data?.id) {
        handleRefresh();
        message.success("Create success", 3);
      } else {
        message.error("Create Failed", 3);
      }
    } catch (error) {
      message.error("Create Failed", 3);
    }
    setBtnState({ saveLoading: false });
  };
  const update = async (values) => {
    try {
      setBtnState({ saveLoading: true });
      const res = await updateCallback(model.id, values);
      if (res) {
        handleRefresh();
        message.success("Update success", 3);
      }
    } catch (error) {
      let msg;
      if (error?.response?.status === 403) {
        msg = error.response.data;
      } else {
        msg = error.response.data.message;
      }
      message.error({
        content: msg,
        style: { top: "12vh", right: "10vw", position: "absolute" },
      });
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
        message.success("Delete success!", 3);
      }
    } catch (error) {
      message.error("Delete Failed", 3);
    }
    setBtnState({ removeLoading: false });
  };

  return { form, onSave, onDelete, btnState };
};
