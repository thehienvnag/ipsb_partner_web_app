import React, { useEffect } from "react";
import { Row, Col, Input, Form, message } from "antd";
import DetailCard from "App/Components/DetailCard";
import RichEditor from "App/Components/RichEditor";
import SelectCategory from "App/Components/CustomSelect/SelectCategory";
import SelectProductGroup from "App/Components/CustomSelect/SelectProductGroup";
import ImagePicker from "App/Components/CustomImagePicker/ImagePicker";
import { postProduct, putProduct } from "App/Services/product.service";
import { useSelector } from "react-redux";
import { selectStoreId } from "App/Stores/auth.slice";
const ProductDetails = ({ visible, onCancel, model }) => {
  const storeId = useSelector(selectStoreId);

  const [form] = Form.useForm();

  useEffect(() => {
    if (model) {
      form.setFieldsValue(model);
    } else {
      form.resetFields();
    }
  }, [model]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const requestData = { ...values, storeId };
      console.log(requestData);
      if (model) {
        update(requestData);
      } else {
        create(requestData);
      }
    } catch (error) {}
  };
  const create = async (values) => {
    if (values) {
      message.loading("Action in progress...", 3);
      const data = await postProduct(values);
      if (data?.id) {
        message.success("Create success", 3);
      } else {
        message.error("Create Failed", 3);
      }
    }
  };
  const update = async (values) => {
    if (values) {
      message.loading("Action in progress...", 3);
      const data = await putProduct(model.id, values);
      if (data?.id !== null) {
        message.success("Update success", 3);
      } else {
        message.error("Update Failed", 3);
      }
    }
  };
  const deleteAccount = async () => {
    // const data = await deleteAccounts(selectedItems);
    // console.log(selectedItems);
    // if (data === "Request failed with status code 405") {
    //   message.error("Method Not Allowed", 4);
    // } else {
    //   message.loading("Action in progress...", 3);
    //   message.success("Delete success", 3);
    // }
  };

  return (
    <DetailCard
      span={9}
      visible={visible}
      onCancel={onCancel}
      onSave={onSave}
      onRemove={deleteAccount}
    >
      <Form form={form} name="register" layout="vertical" scrollToFirstError>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item name="productGroupId" label="Group: ">
              <SelectProductGroup initialValue={model?.productGroup} />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              rules={[
                {
                  required: true,
                  message: "Pick image of product",
                },
              ]}
            >
              <ImagePicker />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Input name of product",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Name of product" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price:"
              style={{ marginTop: "8px" }}
              rules={[
                {
                  required: true,
                  message: "Input product price",
                },
              ]}
            >
              <Input placeholder="Input product price" type="number" />
            </Form.Item>
            <Form.Item
              name="productCategoryId"
              label="Category: "
              required
              rules={[
                {
                  required: true,
                  message: "Select category",
                },
              ]}
            >
              <SelectCategory initialValue={model?.productCategory} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description:"
              rules={[
                {
                  required: true,
                  message: "Description of product",
                  whitespace: false,
                },
              ]}
            >
              <RichEditor />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};

export default ProductDetails;
