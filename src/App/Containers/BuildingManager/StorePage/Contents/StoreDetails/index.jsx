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
import "./index.scss";
import { getAllProductCategories } from "App/Services/productCategory.service";
import { postStore } from "App/Services/store.service";
import {
  loadAll as LoadFloor,
  selectListFloorCode,
} from "App/Stores/floorPlan.slice";
import { useDispatch, useSelector } from "react-redux";
import { loadAccounts, selectListAccount } from "App/Stores/account.slice";
import { postLocations } from "App/Services/location.service";
import { selectNewLocation } from "App/Stores/map.slice";
import DetailCard from "App/Components/DetailCard";
import SelectAccount from "App/Components/CustomSelect/SelectAccount";
import SelectFloorPlan from "App/Components/CustomSelect/SelectFloorPlan";

const { TextArea } = Input;
const { Option } = Select;
const CreateStoreModal = ({ visible, handleCancel, store, handleRefresh }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listFloor = useSelector(selectListFloorCode);
  const [categories, setCategories] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState(null);
  const [floorPlanId, setFloorPlanId] = useState(-1);
  const newLocation = useSelector(selectNewLocation);

  useEffect(() => {
    const initStore = () => {
      if (store) {
        const accountId = `${store.accountId},${store.account.name}`;
        const floorPlanId = `${store.floorPlanId},${store.floorPlan.floorCode}`;
        form.setFieldsValue({ ...store, accountId, floorPlanId });
        setFileList([{ thumbUrl: store.imageUrl }]);
        setFloorPlanId(store.floorPlanId);
      } else {
        setFileList([]);
        setFloorPlanId(null);
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
  const onFloorChange = (value) => setFloorPlanId(value);

  const onFinish = (values) => {
    console.log(values);
  };

  const handleChange = (info) => {
    setFileList(info.fileList);
    setFile(info.fileList[0]?.originFileObj);
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
          ...{ imageUrl: file },
          ...{ floorPlanId: floorPlanId },
        });

        if (result) {
          await postLocations([
            {
              ...newLocation,
              ...{ floorPlanId: value.floorPlanId, storeId: result.id },
            },
          ]);
          message.success({
            content: "Create Success",
            key: "createStore",
          });
        } else {
          message.error({
            content: "Create Failure",
            key: "createStore",
          });
        }

        handleRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRemove = () => {};
  return (
    <>
      <DetailCard
        visible={visible}
        onCancel={handleCancel}
        span={9}
        onSave={onSubmitForm}
        onRemove={onRemove}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Upload
              className="upload-wrapper"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && <UploadButton />}
            </Upload>

            <Form layout="vertical" form={form}>
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
                <SelectAccount role="Store Owner" />
              </FormItem>
              <Form.Item
                name="floorPlanId"
                label="Floor plan"
                rules={[{ required: true }]}
                required
              >
                <SelectFloorPlan />
              </Form.Item>

              <FormItem
                label="Position of store"
                rules={[{ required: true }]}
                required
              >
                <Button>Pick location</Button>
                {/* {floorPlanId === -1 && <Button disabled>Pick location</Button>} */}
                {/* {floorPlanId > 0 && (
                  <MapZoomPan
                    mode="Other"
                    typeId={1}
                    floorPlanId={floorPlanId}
                    disabledPreview={true}
                    src={
                      listFloor &&
                      listFloor.filter(({ id }) => floorPlanId === id)[0]
                        ?.imageUrl
                    }
                  />
                )} */}
              </FormItem>
            </Form>
          </Col>
          <Col span={11}>
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
                name="phone"
                label="Store's phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Input store phone" />
              </Form.Item>
              <FormItem
                name="description"
                label="Description"
                rules={[{ required: true }]}
                required
              >
                <TextArea rows={3} placeholder="Description..." />
              </FormItem>
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
            </Form>
          </Col>
        </Row>
      </DetailCard>
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
