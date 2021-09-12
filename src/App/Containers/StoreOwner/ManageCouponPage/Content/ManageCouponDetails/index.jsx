import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Upload, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DetailCard from "App/Components/DetailCard";
import { getAllProductOfStore } from "App/Services/product.service";
import Moment from "moment";
import { postCoupon, putCoupon } from "App/Services/coupon.service";
const { Option } = Select;
const { TextArea } = Input;
const CouponDetails = ({ visible, onCancel, model, visibleDate }) => {
const [form] = Form.useForm();
const [fileList, setFileList] = useState([]);
const [products, setProducts] = useState(null);
const [productListInclude, setProductListInclude] = useState([]);
const [productListExclude, setProductListExclude] = useState([]);
  
  useEffect(() => {
    if (model) {
      form.setFieldsValue(model);
      setFileList([{ thumbUrl: model.imageUrl }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
    const loadProducts = async () => {
      const products = await getAllProductOfStore({ status: "Active", storeId: 15 });
      console.log(products);
      setProducts(products?.content?.map(({ id, name }) => ({ id, name })));
    };
    loadProducts();
  }, [model]);

  const handleChangeSelectInclude = (value) => {
    console.log(`selected ${value}`);
    setProductListInclude(value);
  };

  const handleChangeSelectExclude = (value) => {
    console.log(`selected ${value}`);
    setProductListExclude(value);
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
    console.log(values.name , values.code, values.description);
    if (fileList == null) {
      message.error("Add image for Coupon", 4);
    }else if(values.code == null && fileList.length == 0 && values.amount == null){
      message.error("All Fields need to Fill !!", 4);
    } else if(values.code != null && fileList.length > 0 && values.amount != null){
      message.loading("Action in progress...", 3);
      const data = await postCoupon({
        ...values,
        ...{ storeId: 15 },
        ...{ productInclude: productListInclude },
        ...{ productExclude: productListExclude },
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      if (data === "Request failed with status code 409") {
        message.error("Email existed", 3);
      } else if (data?.id !== null) {
        message.success("Create success", 3);
        form.resetFields();
      }
    }
  };
  const update = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    if (fileList == null) {
      message.error("Add image for Coupon", 4);
    }else if(values.code == null && fileList.length == 0 && values.amount == null){
      message.error("All Fields need to Fill !!", 4);
    } else if(values.code != null && fileList.length > 0 && values.amount != null){
      message.loading("Action in progress...", 3);
      const data = await putCoupon({
        ...values,
        ...{ storeId: 15 },
        ...{ id: model.id },
        ...{ productInclude: productListInclude },
        ...{ productExclude: productListExclude },
        ...{ imageUrl: fileList[0]?.originFileObj },
      });
      if (data === "Request failed with status code 409") {
        message.error("Email existed", 3);
      } else if (data?.id !== null) {
        message.success("Update success", 3);
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
              name="limit"
              label="Limit: "
              required
              rules={[
                {
                  required: true,
                  message: "Input coupon limit",
                },
              ]}
            >
              <Input
                placeholder="Input coupon limit" type="number"
              />
            </Form.Item>
            <Form.Item
              name="discountType"
              label="DiscountType: "
              required
              rules={[
                {
                  required: true,
                  message: "Select discountType",
                },
              ]}
            >
              <Select placeholder="Select discountType">
                <Option value="Percentage">Percentage</Option>
                <Option value="Fixed">Fixed</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="maxDiscount"
              label="MaxDiscount: "
              required
              rules={[
                {
                  required: true,
                  message: "Coupon maxDiscount",
                },
              ]}
            >
              <Input
                placeholder="Coupon maxDiscount" type="number"
              />
            </Form.Item>
            <Form.Item
              name="publishDate"
              label="PublishDate: "
              required
              rules={[
                {
                  required: true,
                  message: "Pick coupon publishDate",
                },
              ]}
            >
              <Input placeholder="Pick coupon publishDate" type="datetime-local" disabled={visibleDate}/>
            </Form.Item>
            <Form.Item
                label="Products Exclude:"
                rules={[{ required: true }]}
                required
                rules={[
                  {
                    required: true,
                    message: "Select products exclude",
                  },
                ]}
              >
                <Select
                  value={model?.productExclude.split(",")}
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select products exclude"
                  onChange={handleChangeSelectExclude}
                  optionLabelProp="label"
                >
                  {products &&
                    products.map(({ id, name }) => (
                      <Option value={"" + id} label={name}>
                        {name}
                      </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="status"
                label="Choose status:"
                style={{ marginTop: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Choose status",
                  },
                ]}
              >
                <Select placeholder="Select status">
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
                  message: "Input name of coupon",
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Name of coupon" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description:"
              rules={[
                {
                  required: true,
                  message: "Description of coupon",
                  whitespace: false,
                },
              ]}
            >
            <TextArea rows={1} placeholder="Description..." />
            </Form.Item>
            <Form.Item
              name="code"
              label="Code:"
              rules={[
                {
                  required: true,
                  message: "Input coupon code",
                },
              ]}
            >
              <Input placeholder="Input coupon code" />
            </Form.Item>
            <Form.Item
              name="minSpend"
              label="MinSpend: "
              required
              rules={[
                {
                  required: true,
                  message: "Price minSpend",
                },
              ]}
            >
              <Input
                placeholder="Price minSpend" type="number"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount: "
              required
              rules={[
                {
                  required: true,
                  message: "Input coupon amount",
                },
              ]}
            >
              <Input
                placeholder="Input coupon amount"
              />
            </Form.Item>
            <Form.Item
              name="expireDate"
              label="ExpireDate: "
              required
              rules={[
                {
                  required: true,
                  message: "Pick coupon expireDate",
                },
              ]}
            >
              <Input placeholder="Pick coupon expireDate" type="datetime-local" disabled={visibleDate}/>
            </Form.Item>
            <Form.Item
                label="Products Include:"
                rules={[{ required: true }]}
                required
                rules={[
                  {
                    required: true,
                    message: "Select products include",
                  },
                ]}
              >
                <Select
                  value={model?.productInclude.split(",")}
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select products include"
                  onChange={handleChangeSelectInclude}
                  optionLabelProp="label"
                >
                  {products &&
                    products.map(({ id, name }) => (
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

export default CouponDetails;
