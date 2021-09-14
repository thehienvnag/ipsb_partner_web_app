import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DetailCard from "App/Components/DetailCard";
import { getAllProductCategories } from "App/Services/productCategory.service";
import { getAllProductGroups } from "App/Services/productGroup.service";
import { postProduct, putProduct } from "App/Services/product.service";
const { Option } = Select;
const { TextArea } = Input;

const ProductDetails = ({ visible, onCancel, model, visibleDate }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState(null);
  const [productGroups, setProductGroups] = useState(null);
  const [categorySelect, setCategorySelect] = useState(null);
  const [proGroupSelect, setProGroupSelect] = useState(null);

  useEffect(() => {
    if (model) {
      form.setFieldsValue(model);
      setFileList([{ thumbUrl: model.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
    const loadProductCategories = async () => {
      const productCategories = await getAllProductCategories();
      setCategories(
        productCategories?.content?.map(({ id, name }) => ({ id, name }))
      );
    };
    loadProductCategories();

    const loadProductGroups = async () => {
      const productGroups = await getAllProductGroups();
      setProductGroups(
        productGroups?.content?.map(({ id, name }) => ({ id, name }))
      );
    };
    loadProductGroups();
    setCategorySelect(null);
    setProGroupSelect(null);
  }, [model]);

  const handleChangeProCate = (info) => {
    setCategorySelect(info);
  };

  const handleChangeProGroup = (info) => {
    setProGroupSelect(info);
  };

  const handleChange = (info) => {
    setFileList(info.fileList);
  };

  const onSave = () => {
    if (model) {
      update();
    } else {
      create();
    }
  };
  const create = async () => {
    form.validateFields();
    const values = form.getFieldsValue();

    if (fileList == null) {
      message.error("Add image for Product", 4);
    } else if (values.name == null || fileList.length == 0 || proGroupSelect == null || categorySelect == null
      || values.price == null || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && fileList.length > 0 && proGroupSelect != null && categorySelect != null
      && values.price != null && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await postProduct({
        ...values,
        ...{ storeId: 15 },
        ...{ productCategoryId: categorySelect },
        ...{ productGroupId: proGroupSelect },
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      console.log("alo", data);
      if (data?.id == null) {
        message.error("Create Failed", 3);
      } else if (data?.id !== null) {
        message.success("Create success", 3);
        form.resetFields();
        setFileList([]);
      }
    }
  };
  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (fileList == null) {
      message.error("Add image for Product", 4);
    } else if (values.name == null || fileList.length == 0 || values.price == null || values.description == null) {
      message.error("All Fields need to Fill !!", 4);
    } else if (values.name != null && fileList.length > 0 && values.price != null && values.description != null) {
      message.loading("Action in progress...", 3);
      const data = await putProduct({
        ...values,
        ...{ storeId: 15 },
        ...{ id: model.id },
        ...{ imageUrl: fileList[0]?.originFileObj },
        ...{ productCategoryId: categorySelect == null ? model.productCategoryId : categorySelect },
        ...{ productGroupId: proGroupSelect == null ? model.productGroupId : proGroupSelect },
      });
      if (data?.id !== null) {
        message.success("Update success", 3);
      }else{
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
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {!fileList.length && <UploadButton />}
            </Upload>

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
              label="Product Cate: "
              required
              rules={[
                {
                  required: true,
                  message: "Select category",
                },
              ]}
            >
              <Select
                //name="productCategoryId"
                value={categorySelect == null ? model?.productCategory.name : categorySelect}

                mode="single"
                style={{ width: "100%" }}
                placeholder="Select product category"
                onChange={handleChangeProCate}
                optionLabelProp="label"
              >
                {categories &&
                  categories.map(({ id, name }) => (
                    <Option value={"" + id} label={name}>
                      {name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Choose status:"
            >
              <Select placeholder="Select status" disabled={!visibleDate} defaultValue="Active">
                <Option value="New">New</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
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
              <TextArea rows={13} placeholder="Description..." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Product Group: "
              required
              rules={[
                {
                  required: true,
                  message: "Select productGroup",
                },
              ]}
            >
              <Select
                //name="productGroupId"
                value={proGroupSelect == null ? model?.productGroup.name : proGroupSelect}
                mode="single"
                style={{ width: "100%" }}
                placeholder="Select productGroup"
                onChange={handleChangeProGroup}
                optionLabelProp="label"
              >
                {productGroups &&
                  productGroups.map(({ id, name }) => (
                    <Option value={"" + id} label={name}>
                      {name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

          </Col>
        </Row>
      </Form>
    </DetailCard>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default ProductDetails;
