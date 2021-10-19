import { useEffect, useState } from "react";
import { Form, message } from "antd";
export const useDetailForm = ({
  model,
  createCallback,
  createParams,
  updateCallback,
  deleteCallback,
  handleRefresh,
  handleCancel,
}) => {
  const [btnState, setBtnState] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (model) {
      form.setFieldsValue(model);
    } else {
      form.resetFields();
    }
  }, [model]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSave = async () => {
    const values = await form.validateFields();
    if (model) {
      update(values);
    } else {
      create(values);
    }
  };
  const create = async (values) => {
    setBtnState({ saveLoading: true });
    const data = await createCallback({ ...values, ...createParams });
    setBtnState({ saveLoading: false });
    if (data?.id) {
      handleRefresh();
      message.success("Create success", 3);
    } else {
      message.error("Create Failed", 3);
    }
  };
  const update = async (values) => {
    setBtnState({ saveLoading: true });
    const data = await updateCallback(model.id, values);
    setBtnState({ saveLoading: false });
    if (data?.id !== null) {
      handleRefresh();
      message.success("Update success", 3);
    } else {
      message.error("Update Failed", 3);
    }
  };
  const onDelete = async () => {
    setBtnState({ removeLoading: true });
    const result = await deleteCallback(model.id);
    setBtnState({ removeLoading: false });
    if (result) {
      handleRefresh();
      handleCancel();
      message.success("Delete success!", 3);
    } else {
      message.error("Delete fail!", 3);
    }
  };

  return { form, onSave, onDelete, btnState };
};
