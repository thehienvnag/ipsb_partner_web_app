import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEdgesOnFloor } from "App/Stores/edge.slice";
import { loadLocationByFloor } from "App/Stores/location.slice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Button,
  Modal,
  Row,
  Col,
  Divider,
  Radio,
  Typography,
  Select,
  Menu,
  Dropdown,
  Tag,
  message,
} from "antd";
import { Svg, Circle, Polyline } from "react-svg-path";
import {
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  DeleteOutlined,
  SaveOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { MdMyLocation } from "react-icons/md";
import "./index.scss";
import {
  selectLocationTypes,
  setTypesSelect,
} from "App/Stores/locationType.slice";

import {
  createLocation,
  removeLocation,
  createEdge,
  removeEdge,
  saveLocationAndEdges,
  setSelected,
  setSelectedFloorId,
  selectMarkers,
  selectEdges,
  selectOpenMenu,
  selectSelected,
  selectNextFloorPlan,
  selectNextFloorMarkers,
  removeFacilityLocation,
  setFacilityLocation,
  selectFacilityLocation,
} from "App/Stores/indoorMap.slice";
import { selectListFloorCode, loadAll } from "App/Stores/floorPlan.slice";
import LocationHelper from "App/Utils/locationHelper";
const stairSvg = process.env.PUBLIC_URL + "/stairs.svg";
const restroom = process.env.PUBLIC_URL + "/restroom.svg";
const elevator = process.env.PUBLIC_URL + "/elevator.svg";
const stores = process.env.PUBLIC_URL + "/stores.svg";
const beacons = process.env.PUBLIC_URL + "/beacon.png";

const FilterDropdown = ({ className }) => {
  const dispatch = useDispatch();
  const locationType = useSelector(selectLocationTypes);
  return (
    <Select
      className={className}
      allowClear
      onChange={(values) => dispatch(setTypesSelect(values))}
      defaultValue={[locationType?.reduce((acc, { id }) => acc + "," + id, "")]}
      style={{ width: 260 }}
      placeholder="Elements to show on map"
      mode="multiple"
    >
      <Select.Option
        key="All"
        value={locationType?.reduce((acc, { id }) => acc + "," + id, "")}
      >
        All
      </Select.Option>
      {locationType?.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

const IndoorMap = ({
  disabledPreview,
  mode = "floorPlan" || "pickLocation",
  typeId = 2,
  refresh,
  src,
  floorPlanId,
  initialValue,
  onChange,
  isValuePresent,
}) => {
  const dispatch = useDispatch();
  const markers = useSelector(selectMarkers);
  const edges = useSelector(selectEdges);
  const selected = useSelector(selectSelected);
  const [typeSelect, setTypeSelect] = useState(2);
  useEffect(() => {
    if (floorPlanId) {
      dispatch(loadEdgesOnFloor({ floorPlanId }));
      dispatch(loadLocationByFloor({ floorPlanId }));
    }
    setTypeSelect(typeId);
  }, [dispatch, floorPlanId, typeId, refresh]);

  useEffect(() => {
    if (
      initialValue?.floorPlanId === floorPlanId &&
      initialValue?.status === "Active"
    ) {
      dispatch(setFacilityLocation({ ...initialValue, locationPicked: true }));
    } else {
      dispatch(removeFacilityLocation());
    }
  }, [initialValue, floorPlanId]);
  const handleChangeType = (type) => setTypeSelect(type);
  if (!src && mode === "floorPlan") {
    return (
      <Wrapper>
        <h3>Please choose floor map image!</h3>
      </Wrapper>
    );
  }
  return (
    <div className="filter-wrapper">
      {!disabledPreview && <FilterDropdown className="filter-select" />}
      <Wrapper
        disabledPreview={disabledPreview}
        mode={mode}
        typeId={typeId}
        src={src}
        markers={markers}
        edges={edges}
        selected={selected}
        typeSelect={typeSelect}
        handleChangeType={handleChangeType}
        onChange={onChange}
        initialValue={initialValue}
        isValuePresent={isValuePresent}
        floorPlanId={floorPlanId}
      >
        <TransformWrapper
          doubleClick={{ disabled: true }}
          pinch={{ disabled: true }}
          minScale={0.2}
          maxScale={0.5}
          initialScale={0.5}
        >
          <TransformComponent>
            <ImageRealSize
              markers={markers}
              edges={edges}
              selected={selected}
              typeId={typeId}
              src={src}
              rotate={0}
            />
          </TransformComponent>
        </TransformWrapper>
      </Wrapper>
    </div>
  );
};

const Wrapper = ({
  disabledPreview,
  markers,
  edges,
  selected,
  mode = "floorPlan",
  typeId,
  children,
  src,
  typeSelect,
  handleChangeType,
  onChange,
  floorPlanId,
}) => {
  const dispatch = useDispatch();
  const facilityLocation = useSelector(selectFacilityLocation);
  const [modalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [enableDrawMode, setEnableDrawMode] = useState(false);
  const [rotate, setRotate] = useState(0);

  // const [rotate, setRotate] = useState(0);
  const onRotateLeft = () => {
    if (rotate === -180) return;
    setRotate(rotate - 90);
  };
  const onRotateRight = () => {
    if (rotate === 180) return;
    setRotate(rotate + 90);
  };
  const onDrawModeChange = (isDrawModeOn) => setEnableDrawMode(isDrawModeOn);
  const handleSelect = (location) => {
    dispatch(createEdge(location));
  };
  const handleOk = async () => {
    if (mode === "floorPlan") {
      message.loading("Saving floor data in progress..");
      await dispatch(saveLocationAndEdges());
      message.success("Saved successfully!!");
    } else {
      if (facilityLocation) {
        onChange(facilityLocation);
        message.success("Choose location success!");
      } else {
        message.error("Please choose location on map!");
      }
    }
  };
  return (
    <div className={disabledPreview ? "without-preview" : "preview-wrapper"}>
      {disabledPreview && (
        <Row justify="space-between">
          <Col flex="auto">
            <Button
              disabled={facilityLocation || !floorPlanId}
              style={{ width: "100%" }}
              onClick={() => setModalVisible(true)}
            >
              {facilityLocation && floorPlanId
                ? `x: ${Math.round(facilityLocation.x)}, y: ${Math.round(
                    facilityLocation.y
                  )}`
                : "Pick location"}
            </Button>
          </Col>
          {facilityLocation && floorPlanId && (
            <Col style={{ marginLeft: "5px" }} flex="40px">
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  onChange(null);
                  dispatch(removeFacilityLocation());
                }}
              >
                x
              </Button>
            </Col>
          )}
        </Row>
      )}
      {!disabledPreview && src && (
        <Button
          className="full-screen-btn"
          onClick={() => setModalVisible(true)}
          icon={<FullscreenOutlined />}
        ></Button>
      )}
      {!disabledPreview && children}
      <Modal
        title={
          <ModalTitle
            onRotateLeft={onRotateLeft}
            onRotateRight={onRotateRight}
            onDrawModeChange={onDrawModeChange}
            mode={mode}
            handleChangeType={handleChangeType}
            typeSelect={typeSelect}
            disabledPreview={disabledPreview}
          />
        }
        wrapClassName={`modal-wrapper${rotate}`}
        visible={modalVisible}
        okText="Save"
        onOk={handleOk}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Row>
          <TransformWrapper
            pinch={{ disabled: true }}
            doubleClick={{ disabled: true }}
            minScale={0.3}
            maxScale={4}
            onZoom={(value) => {
              const { scale } = value.state;
              setScale(scale);
            }}
          >
            <TransformComponent>
              <ImageRealSize
                src={src}
                typeId={typeId}
                mode={mode}
                scale={scale ?? 1}
                enabled={enableDrawMode}
                rotate={rotate}
                markers={markers}
                edges={edges}
                selected={selected}
                floorPlanId={floorPlanId}
              />
            </TransformComponent>
          </TransformWrapper>
          <ChooseStairLiftConnection handleSelect={handleSelect} />
        </Row>
      </Modal>
    </div>
  );
};

const ModalTitle = ({
  onRotateLeft,
  onRotateRight,
  onDrawModeChange,
  typeSelect,
  handleChangeType,
  mode,
  disabledPreview,
}) => {
  const [onOffSwitch, setOnOffSwitch] = useState("OFF");
  return (
    <Row align="middle">
      <Row align="middle">
        <Typography.Text>Draw Mode:</Typography.Text>
        <Radio.Group
          style={{ margin: "0 10px" }}
          className={onOffSwitch === "OFF" ? "off-switch" : ""}
          buttonStyle="solid"
          options={["OFF", "ON"]}
          value={onOffSwitch}
          optionType="button"
          onChange={({ target }) => {
            setOnOffSwitch(target.value);
            onDrawModeChange(target.value === "ON");
          }}
        />
        {mode === "floorPlan" && (
          <Select
            defaultValue={2}
            value={typeSelect}
            style={{ width: 180 }}
            onChange={(value) => handleChangeType(value)}
          >
            <Select.Option value={2}>Điểm trên đường</Select.Option>
            <Select.Option value={3}>Thang máy</Select.Option>
            <Select.Option value={4}>Cầu thang</Select.Option>
          </Select>
        )}
      </Row>
      <Divider
        type="vertical"
        style={{ borderColor: "#9AA0A6", borderWidth: "2px", height: "36px" }}
      ></Divider>

      <Button
        icon={<RotateLeftOutlined />}
        // style={{ margin: "0 15px" }}
        shape="circle"
        onClick={onRotateLeft}
      ></Button>
      <Button
        icon={<RotateRightOutlined />}
        shape="circle"
        style={{ margin: "0 15px" }}
        onClick={onRotateRight}
      ></Button>
      {!disabledPreview && <FilterDropdown />}
    </Row>
  );
};

//#endregion
const ImageRealSize = ({
  src,
  mode = "floorPlan",
  typeId,
  rotate = 0,
  scale,
  enabled,
  markers,
  edges,
  selected,
  handleSelect,
  floorConnects,
  floorPlanId,
}) => {
  const dispatch = useDispatch();

  const [dimension, setDimension] = useState({});
  const wrapperRef = useRef(null);

  const onMapLeftClick = async (evt) => {
    const { clientX, clientY, shiftKey } = evt;

    if (shiftKey) {
      const rectangle = wrapperRef.current.getBoundingClientRect();

      const rawLocation = LocationHelper.initLocation(
        rectangle,
        clientX,
        clientY,
        typeId,
        floorPlanId,
        rotate,
        scale
      );
      if (typeId === 2) {
        dispatch(createLocation({ rawLocation }));
      } else {
        dispatch(setFacilityLocation({ ...rawLocation, locationPicked: true }));
      }
    }
  };

  const onPathClick = async (location, evt) => {
    evt?.preventDefault && evt.preventDefault();
    const { type, shiftKey } = evt;
    if (
      type === "contextmenu" &&
      mode === "floorPlan" &&
      location.locationTypeId === 2
    ) {
      dispatch(removeLocation(location));
    }

    // if (
    //   type === "contextmenu" &&
    //   mode === "floorPlan" &&
    //   location.locationTypeId !== 2
    // ) {
    //   dispatch(setSelected({ location, openMenu: true }));
    // }
    if (
      location &&
      type === "click" &&
      mode !== "chooseStairLift" &&
      !shiftKey
    ) {
      dispatch(setSelected({ location }));
    }

    if (mode === "chooseStairLift") {
      if (handleSelect) {
        handleSelect(location);
      }
    }
  };

  const imgSize = ({ width, height }) => {
    if (!width || !height) return { width: 0, height: 0 };
    return { width, height };
  };

  return (
    <div
      key={"wrapper"}
      ref={wrapperRef}
      className="image-wrapper"
      style={imgSize(dimension)}
      onClick={enabled ? (evt) => onMapLeftClick(evt) : () => {}}
      onContextMenu={(evt) => evt.preventDefault()}
    >
      <img
        src={src}
        alt="Floor map"
        height={dimension.height ?? 0}
        width={dimension.width ?? 0}
        onLoad={({ target }) =>
          setDimension({
            width: target.naturalWidth,
            height: target.naturalHeight,
          })
        }
      />
      <SvgWrapper
        key="wrapper-key"
        dimension={dimension}
        rotate={rotate}
        markers={markers}
        typeId={typeId}
        edges={edges}
        selected={selected}
        onPathClick={enabled ? onPathClick : () => {}}
        mode={mode}
        floorConnects={floorConnects}
      />
    </div>
  );
};

const SvgWrapper = ({
  dimension,
  rotate,
  typeId,
  markers,
  edges,
  selected,
  onPathClick,
  mode = "floorPlan",
  floorConnects,
}) => {
  return (
    <Svg width={dimension.width ?? 0} height={dimension.height ?? 0}>
      {edges &&
        edges.map(({ fromLocation, toLocation }, index) => (
          <Polyline
            key={index}
            points={[
              [fromLocation.x, fromLocation.y],
              [toLocation.x, toLocation.y],
            ]}
            stroke="#0e98dd"
            strokeWidth={1}
            fill="transparent"
            strokeDasharray="10"
            strokeDashoffset={10}
          />
        ))}

      {markers &&
        markers.map((item, index) => (
          <PathWrapper
            key={index}
            location={item}
            typeId={typeId}
            selected={selected}
            onPathClick={onPathClick}
            rotate={rotate}
            mode={mode}
            floorConnects={floorConnects}
          />
        ))}
      {floorConnects &&
        floorConnects.map((item, index) => (
          <StairLiftConnected key={index} location={item} rotate={rotate} />
        ))}
    </Svg>
  );
};
const offset = (rotate) => {
  if (rotate === 90) return { x: -10, y: 30 };
  if (rotate === -90) return { x: 35, y: 4 };
  if (rotate === -180 || rotate === 180) return { x: 24, y: 32 };
  return { x: 0, y: 0 };
};
const StairLiftConnected = ({ location: { x, y }, rotate }) => {
  return (
    <g
      transform={`translate(${x - 12.4 + offset(rotate).x},${
        y - 15.3 + offset(rotate).y
      }) rotate(${-rotate})`}
    >
      <Circle size={20} fill="#198754" cx={20} cy={-10}></Circle>
      <path
        fill="white"
        transform="translate(12, -19) scale(0.017)"
        d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"
      ></path>
      {/* <rect fill="#198754" x="18" y="-8" height="14" width="30" rx="3" />
      <path
        fill="white"
        transform="translate(, -7) scale(0.012)"
        d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"
      ></path> */}
    </g>
  );
};

const PathWrapper = ({
  key,
  rotate,
  selected,
  mode = "floorPlan",
  typeId,
  location,
  onPathClick,
  floorConnects,
}) => {
  const { x, y, locationTypeId } = location;
  const img = (id) => {
    if (id === 1) return stores;
    if (id === 4) return stairSvg;
    if (id === 3) return elevator;
    if (id === 5) return beacons;
    if (id === 10) return restroom;
  };
  if (locationTypeId === 6) return <></>;
  if (locationTypeId !== 2) {
    return (
      <PlaceMarker
        className={
          LocationHelper.includes(floorConnects, location) && "not-allowed"
        }
        src={img(locationTypeId)}
        location={location}
        selected={selected}
        mode={mode}
        typeId={typeId}
        onPathClick={onPathClick}
      />
    );
  }
  return (
    <>
      {LocationHelper.equal(location, selected) ? (
        <SelectedMarker
          location={location}
          selected={selected}
          onPathClick={onPathClick}
          rotate={rotate}
        />
      ) : (
        <Circle
          key={key}
          onClick={(evt) => onPathClick(location, evt)}
          onContextMenu={(evt) => onPathClick(location, evt)}
          size={15}
          fill="#ACDEE9"
          stroke="#4C71EF"
          strokeWidth={1.5}
          cx={x}
          cy={y}
        ></Circle>
      )}
    </>
  );
};

const SelectedMarker = ({ location, onPathClick, rotate }) => {
  const { x, y } = location;
  return (
    <g
      onClick={(evt) => onPathClick(location, evt)}
      onContextMenu={(evt) => onPathClick(location, evt)}
      transform={`translate(${x - 12.4 + offset(rotate).x},${
        y - 15.3 + offset(rotate).y
      }) rotate(${-rotate})`}
    >
      <circle r="9" fill="white" cx={12} cy={10} />
      <path
        fill="#ef5350"
        d="M12 0c-5.522 0-10 4.395-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.42-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8 8 3.582 8 8-3.581 8-8 8zm5-9.585l-5.708 5.627-3.706-3.627 1.414-1.415 2.291 2.213 4.295-4.213 1.414 1.415z"
      />
    </g>
  );
};
const DeleteMenu = ({ location }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    if (location.locationPicked) {
      dispatch(removeFacilityLocation());
    }
  };
  return (
    <Menu>
      <Menu.Item
        onClick={onDelete}
        className="custom-menu-item"
        key="1"
        icon={<DeleteOutlined color="#ef5350" />}
      >
        Remove
      </Menu.Item>
    </Menu>
  );
};

const StairLiftMenu = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectSelected);
  const floors = useSelector(selectListFloorCode);
  const selectedFloor = useSelector(selectNextFloorPlan);

  useEffect(() => {
    if (!floors) {
      dispatch(loadAll());
    }
    handleChange(-1);
  }, [dispatch]);

  const removeLoc = async (connectLoc) => {
    if (connectLoc) {
      dispatch(removeEdge({ fromLocation: connectLoc, toLocation: location }));
    }
  };

  const handleChange = (value) => {
    if (value !== -1) {
      dispatch(setSelectedFloorId(value));
    }
  };

  const onDelete = async () => {};

  return (
    <>
      <Menu title="Options" selectedKeys={["3"]}>
        <Menu.Item
          key={"saveBtn"}
          className="custom-menu-item"
          icon={<SaveOutlined />}
        >
          Save
        </Menu.Item>
        <div>
          <Select
            placeholder="Connect to floor"
            style={{ width: 180, margin: "0 16px", marginBottom: 8 }}
            onChange={handleChange}
            tokenSeparators={[","]}
            defaultValue={-1}
            value={selectedFloor?.id ?? -1}
          >
            <Select.Option value={-1}>Chọn tầng --</Select.Option>
            {floors &&
              floors?.map((item) => (
                <Select.Option value={item.id}>
                  Tầng {item.floorCode}
                </Select.Option>
              ))}
          </Select>
          <div style={{ marginLeft: 15 }}>
            {location?.floorConnects &&
              location.floorConnects.map((item) => (
                <Tag key={item.id} closable onClose={() => removeLoc(item)}>
                  <LinkOutlined /> Tầng {item.floorPlan.floorCode}
                </Tag>
              ))}
          </div>
        </div>

        <Menu.Item
          onClick={onDelete}
          className="custom-menu-item"
          key="removeBtn"
          icon={<DeleteOutlined />}
        >
          Remove
        </Menu.Item>
      </Menu>
    </>
  );
};
const ChooseStairLiftConnection = ({ handleSelect }) => {
  const [scale, setScale] = useState(0.1);
  const floorPlan = useSelector(selectNextFloorPlan);
  const markers = useSelector(selectNextFloorMarkers);
  const [floorConnects, setFloorConnects] = useState([]);
  const selected = useSelector(selectSelected);
  useEffect(() => {
    if (selected) {
      setFloorConnects(
        selected.floorConnects.filter(
          ({ floorPlanId }) => floorPlanId === floorPlan?.id
        )
      );
    }
  }, [selected]);

  return (
    <>
      {floorPlan && selected && (
        <div className="choose-stair-lift-wrapper">
          <h4>Choose floor connections</h4>
          <TransformWrapper
            pinch={{ disabled: true }}
            doubleClick={{ disabled: true }}
            initialScale={0.3}
            minScale={0.3}
            maxScale={1.4}
            onZoom={(value) => {
              const { scale } = value.state;
              setScale(scale);
            }}
          >
            <TransformComponent>
              <ImageRealSize
                src={floorPlan.imageUrl}
                scale={scale}
                markers={markers ?? []}
                handleSelect={handleSelect}
                enabled={true}
                mode="chooseStairLift"
                floorConnects={floorConnects}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </>
  );
};

const PlaceMarker = ({
  src,
  location,
  selected,
  onPathClick,
  mode = "floorPlan",
}) => {
  // const openMenu = useSelector(selectOpenMenu);
  const { x, y, store, locationTypeId, floorConnects } = location;
  const getMenu = () => {
    switch (locationTypeId) {
      case 3:
      case 4:
        return <StairLiftMenu location={location} />;
      default:
        return location.locationPicked ? (
          <DeleteMenu location={location} />
        ) : (
          <></>
        );
    }
  };

  return (
    <Dropdown
      overlay={getMenu()}
      visible={
        LocationHelper.equal(location, selected) && mode !== "chooseStairLift"
      }
      trigger={["contextMenu"]}
    >
      <g
        transform={`translate(${x - 17}, ${y - 17})`}
        onClick={(evt) => onPathClick(location, evt)}
        onContextMenu={(evt) => onPathClick(location, evt)}
      >
        <rect
          width="28"
          height="28"
          fill="white"
          rx="2"
          strokeWidth="0.2"
          stroke="grey"
          transform="translate(-3.7, -4)"
        ></rect>
        {LocationHelper.equal(location, selected) && (
          <rect
            width="28"
            height="28"
            fill="#333642"
            rx="2"
            strokeWidth="0.2"
            stroke="grey"
            transform="translate(-3.7, -4)"
          ></rect>
        )}

        <image
          className={
            LocationHelper.equal(location, selected) ? "img-white" : ""
          }
          href={src}
          height="19"
        />
        {store && <text transform="translate(0, 39)">{store.name}</text>}
        {mode === "floorPlan" && floorConnects.length && (
          <>
            <rect
              className="img-red"
              x="22"
              y="-8"
              height="14"
              width="30"
              rx="3"
            />
            <path
              fill="white"
              transform="translate(23, -7) scale(0.012)"
              d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"
            ></path>
            <text
              x="62"
              y="2.8"
              transform="scale(0.7)"
              textAnchor="middle"
              fill="white"
            >
              {floorConnects.length}
            </text>
          </>
        )}
        {mode === "pickLocation" && location.locationPicked && (
          <>
            <rect
              className="img-green"
              x="19"
              y="-7"
              height="14"
              width="15"
              rx="3"
            />
            <text
              x="19"
              y="4.2"
              transform="scale(1.4)"
              textAnchor="middle"
              fill="white"
            >
              +
            </text>
          </>
        )}
      </g>
    </Dropdown>
  );
};
export default IndoorMap;
