import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Upload,
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
import { getBase64 } from "App/Utils/utils";
import "./index.scss";
import { GrLocation } from "react-icons/gr";
import { getAllProductCategories } from "App/Services/productCategory.service";
import { postStore } from "App/Services/store.service";
import {
  loadAll as LoadFloor,
  selectListFloorCode,
} from "App/Stores/floorPlan.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAccounts,
  selectIsLoading,
  selectListAccount,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/account.slice";
import { productCategories } from "App/Constants/endpoints";

const { TextArea } = Input;
const { Option } = Select;
const CreateStoreModal = ({ visible, handleCancel, store }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listFloor = useSelector(selectListFloorCode);
  const [categories, setCategories] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Preview upload image");
  const [previewImage, setPreviewImage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState(null);

  const listAccount = useSelector(selectListAccount);

  useEffect(() => {
    const initStore = () => {
      if (store) {
        form.setFieldsValue(store);
        setPreviewImage(store.imageUrl);
        setFileList([{ thumbUrl: store.imageUrl }]);
        console.log(store?.floorPlanId);
      } else {
        setFileList([]);
        setPreviewImage(null);
        form.resetFields();
      }
    };
    const loadProductCategories = async () => {
      const productCategories = await getAllProductCategories();
      console.log(productCategories);
      setCategories(
        productCategories?.content?.map(({ id, name }) => ({ id, name }))
      );
    };
    dispatch(LoadFloor());
    loadProductCategories();
    dispatch(loadAccounts({ role: "Store Owner" }));
    initStore();
  }, [store]);
  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    setCategoryList(value);
  };
  const onFloorChange = () => {};

  const onFinish = (values) => {
    console.log(values);
  };

  const handleCancelPreview = () => setPreviewVisible(false);

  const handlePreview = (file) => {
    if (file.originFileObj) {
      getBase64(file.originFileObj, (fileSrc) => {
        setPreviewImage(fileSrc);
      });
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    }
  };
  // const handleChange = ({ fileList }) => {
  //   setFileList(fileList);
  //   setFile(fileList[0]?.originFileObj);
  // };

  const handleChange = (info) => {
    console.log("Hú", info);
    setFileList(info.fileList);
    // getBase64(
    //   info.fileList[0]?.originFileObj,
    setFile(info.fileList[0]?.originFileObj);
    // );
  };

  const onSubmitForm = async () => {
    try {
      const value = await form.validateFields();
      if (fileList.length) {
        message.loading({
          content: "loading...",
          key: "createStore",
        });
        const result = await postStore({
          ...value,
          ...{ productCategoryIds: categoryList },
          ...{ buildingId: 12 },
          ...{ imageUrl: [file] },
        });
        message.success({
          content: "Create Success",
          key: "createStore",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        width="50%"
        title="Create Store"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        onOk={onSubmitForm}
      >
        <Row>
          <Col className="col-md-7">
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && <UploadButton />}
            </Upload>
            <Modal
              width="800px"
              visible={previewVisible}
              title={previewTitle}
              onCancel={handleCancelPreview}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>

            <Form layout="vertical" form={form}>
              <FormItem
                name="description"
                label="Description"
                rules={[{ required: true }]}
                required
              >
                <TextArea
                  style={{ width: "88%" }}
                  rows={3}
                  placeholder="Description..."
                />
              </FormItem>
              <FormItem
                name="accountId"
                label="Store Owner:"
                rules={[
                  {
                    required: true,
                    message: "Select store owner",
                  },
                ]}
              >
                <Select
                  placeholder="Select store owner"
                  style={{ width: "88%" }}
                >
                  {listAccount &&
                    listAccount.map((item) => (
                      <Option value={item.id}>{item.name}</Option>
                    ))}
                </Select>
              </FormItem>
            </Form>
          </Col>
          <Col className="col-md-5">
            <Form
              layout="vertical"
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="Store name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Input store name" />
              </Form.Item>
              <Form.Item
                name="floorPlanId"
                label="Floor plan"
                rules={[{ required: true }]}
                required
              >
                <Select
                  defaultValue={[store?.floorPlanId]}
                  placeholder="Select a floor plan"
                  onChange={onFloorChange}
                  allowClear
                >
                  {listFloor &&
                    listFloor.map(({ id, floorCode }) => (
                      <Option value={id} label={floorCode}>
                        Floor {floorCode}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone number"
                rules={[{ required: true }]}
              >
                <Input placeholder="Input phone number" />
              </Form.Item>
              <FormItem
                // name="productCategories"
                label="Product Category"
                rules={[{ required: true }]}
                required
              >
                <Select
                  value={store?.productCategoryIds.split(",")}
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select product categorys"
                  onChange={handleChangeSelect}
                  optionLabelProp="label"
                >
                  {categories &&
                    categories.map(({ id, name }) => (
                      <Option value={"" + id} label={name}>
                        {name}
                      </Option>
                    ))}
                </Select>
              </FormItem>
              <FormItem
                label="Position of store"
                rules={[{ required: true }]}
                required
              >
                <Button icon={<GrLocation />}> Location</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default CreateStoreModal;
