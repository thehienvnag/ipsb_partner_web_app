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
  Popover,
  Tag,
  message,
  Tooltip,
} from "antd";
import { Svg, Circle, Polyline } from "react-svg-path";
import {
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  DeleteOutlined,
  SaveOutlined,
  LinkOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {
  loadLocationTypes,
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
  selectSelected,
  selectNextFloorPlan,
  selectNextFloorMarkers,
  removeFacilityLocation,
  setFacilityLocation,
  selectFacilityLocation,
  selectLocationName,
  resetFloorPlan,
  selectFloorConnectVisible,
  changeFloorConnectMenuVisble,
} from "App/Stores/indoorMap.slice";
import { selectListFloorCode, loadAll } from "App/Stores/floorPlan.slice";
import LocationHelper from "App/Utils/locationHelper";
import { setNextFloorMarkers } from "App/Stores/map.slice";

const FilterDropdown = ({ className }) => {
  const dispatch = useDispatch();
  const locationType = useSelector(selectLocationTypes);
  return (
    <Select
      className={className}
      allowClear
      onChange={(values) => dispatch(setTypesSelect(values))}
      defaultValue={[
        locationType?.reduce((acc, { id }) => acc + "," + id, "") ?? "All",
      ]}
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
  disabled,
}) => {
  const dispatch = useDispatch();
  const markers = useSelector(selectMarkers);
  const edges = useSelector(selectEdges);
  const selected = useSelector(selectSelected);
  const facilityLocation = useSelector(selectFacilityLocation);
  const [typeSelect, setTypeSelect] = useState(2);
  useEffect(() => {
    dispatch(loadLocationTypes());
  }, []);
  useEffect(() => {
    if (
      (mode === "pickLocation" &&
        floorPlanId !== facilityLocation?.floorPlanId &&
        typeId !== facilityLocation?.locationTypeId &&
        initialValue?.status === "Active") ||
      initialValue?.locationName
    ) {
      dispatch(
        setFacilityLocation({
          ...initialValue,
          locationPicked: true,
        })
      );
    } else {
      dispatch(removeFacilityLocation({ init: true }));
    }
    setTypeSelect(typeId);
  }, [dispatch, initialValue, typeId]);
  useEffect(() => {
    if (floorPlanId !== facilityLocation?.floorPlanId) {
      dispatch(removeFacilityLocation({ init: true }));
    }
    if (mode === "floorPlan" && floorPlanId) {
      dispatch(resetFloorPlan());
      dispatch(loadEdgesOnFloor({ floorPlanId }));
      dispatch(loadLocationByFloor({ floorPlanId }));
      dispatch(loadAll({ notFloorPlanId: floorPlanId }));
    }
    // if (mode === "chooseStairLift" && floorPlanId) {
    // }
  }, [floorPlanId]);

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
      {!disabledPreview && floorPlanId && (
        <FilterDropdown className="filter-select" />
      )}
      <Wrapper
        initialValue={initialValue}
        disabledPreview={disabledPreview}
        mode={mode}
        typeId={typeSelect}
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
        disabled={disabled}
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
              typeId={typeSelect}
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
  initialValue,
  floorPlanId,
  disabled,
}) => {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(null);
  const facilityLocation = useSelector(selectFacilityLocation);
  const [modalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [enableDrawMode, setEnableDrawMode] = useState(false);
  const [rotate, setRotate] = useState(0);

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
      dispatch(saveLocationAndEdges());
      message.success("Saved successfully!!");
    } else if (mode === "pickLocation") {
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
              disabled={!floorPlanId || disabled}
              style={{ width: "100%" }}
              onClick={() => {
                setModalVisible(true);
                dispatch(loadEdgesOnFloor({ floorPlanId }));
                dispatch(loadLocationByFloor({ floorPlanId }));
                if (facilityLocation?.x) {
                  dispatch(setSelected({ location: facilityLocation }));
                  setScrollPosition({
                    x: -facilityLocation.x + 550,
                    y: -facilityLocation.y + 420,
                  });
                }
              }}
            >
              {facilityLocation && floorPlanId
                ? `x: ${Math.round(facilityLocation.x)}, y: ${Math.round(
                    facilityLocation.y
                  )}`
                : "Pick location"}
            </Button>
          </Col>
        </Row>
      )}
      {!disabledPreview && src && floorPlanId && (
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
          dispatch(setSelected({}));
          setTimeout(() => setModalVisible(false), 100);
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
            initialPositionX={scrollPosition?.x}
            initialPositionY={scrollPosition?.y}
          >
            <TransformComponent>
              <ImageRealSize
                initialValue={initialValue}
                src={src}
                typeId={typeSelect}
                mode={mode}
                scale={scale ?? 1}
                enabled={enableDrawMode}
                rotate={rotate}
                markers={markers}
                edges={edges}
                selected={selected}
                floorPlanId={floorPlanId}
                modalVisible={modalVisible}
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
            <Select.Option value={2}>Point on route</Select.Option>
            <Select.Option value={3}>Elevator</Select.Option>
            <Select.Option value={4}>Stair</Select.Option>
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
  initialValue,
  edges,
  selected,
  handleSelect,
  floorConnects,
  floorPlanId,
  modalVisible,
}) => {
  const dispatch = useDispatch();
  const facilityLocation = useSelector(selectFacilityLocation);
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
      const typeRoutes = [2, 3, 4];
      if (typeRoutes.includes(typeId)) {
        dispatch(createLocation({ rawLocation }));
      } else if (!facilityLocation) {
        dispatch(
          setFacilityLocation({
            ...rawLocation,
            locationPicked: true,
            locationName: initialValue?.locationName,
            imageUrl: initialValue?.imageUrl,
          })
        );
        dispatch(setSelected({ location: rawLocation }));
      }
    }
  };

  const onPathClick = async (location, evt) => {
    evt?.preventDefault && evt.preventDefault();
    const { type, shiftKey } = evt;
    if (
      type === "contextmenu" &&
      mode === "floorPlan" &&
      location.locationTypeId == 2
    ) {
      dispatch(removeLocation(location));
    }
    if (
      location &&
      type === "click" &&
      mode !== "chooseStairLift" &&
      mode !== "pickLocation" &&
      !shiftKey
    ) {
      dispatch(setSelected({ location }));
    }

    if (mode === "chooseStairLift") {
      dispatch(createEdge(location));
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
        modalVisible={modalVisible}
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
  modalVisible,
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
            modalVisible={modalVisible}
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
      <Circle size={20} fill="#198754" cx={28} cy={-1}></Circle>
      <path
        fill="white"
        transform="translate(19, -9) scale(0.017)"
        d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"
      ></path>
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
  modalVisible,
}) => {
  const locationTypes = useSelector(selectLocationTypes);

  const { x, y, locationTypeId } = location;
  const img = (typeId, locationTypes) => {
    return locationTypes?.find(({ id }) => id == typeId)?.imageUrl;
  };
  if (locationTypeId !== 2) {
    return (
      <PlaceMarker
        className={
          LocationHelper.includes(floorConnects, location) && "not-allowed"
        }
        src={img(locationTypeId, locationTypes)}
        location={location}
        selected={selected}
        mode={mode}
        typeId={typeId}
        onPathClick={onPathClick}
        modalVisible={modalVisible}
        rotate={rotate}
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
    <Button onClick={onDelete} icon={<DeleteOutlined color="#ef5350" />}>
      Remove
    </Button>
  );
};

const StairLiftMenu = ({ location }) => {
  const dispatch = useDispatch();
  const selected = useSelector(selectSelected);
  const floors = useSelector(selectListFloorCode);
  const selectedFloor = useSelector(selectNextFloorPlan);
  const floorConnectVisible = useSelector(selectFloorConnectVisible);

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

  const onDelete = async () => {
    dispatch(changeFloorConnectMenuVisble({ visible: false }));
    dispatch(removeLocation(location));
  };
  const onSave = async () => {};

  return (
    <>
      <div style={{ width: 200 }}>
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Select
            placeholder="Connect to floor"
            style={{ width: "100%" }}
            onChange={handleChange}
            tokenSeparators={[","]}
            defaultValue={-1}
            value={selectedFloor?.id ?? -1}
          >
            <Select.Option value={-1}>Choose Floor --</Select.Option>
            {floors &&
              floors?.map((item) => (
                <Select.Option value={item.id}>{item.floorCode}</Select.Option>
              ))}
          </Select>
          {!floorConnectVisible && (
            <Button
              style={{ marginLeft: 5 }}
              onClick={() =>
                dispatch(
                  changeFloorConnectMenuVisble({
                    visible: true,
                  })
                )
              }
              icon={<FullscreenOutlined />}
            ></Button>
          )}
        </div>
        <div style={{ marginBottom: 5 }}>
          {location?.floorConnects &&
            location.floorConnects.map((item) => (
              <Tag key={item.id} closable onClose={() => removeLoc(item)}>
                <LinkOutlined /> {item.floorPlan.floorCode}
              </Tag>
            ))}
        </div>
        <Button
          style={{ marginBottom: 8 }}
          block
          onClick={onDelete}
          icon={<DeleteOutlined />}
        >
          Remove
        </Button>
      </div>
    </>
  );
};
const ChooseStairLiftConnection = ({ handleSelect }) => {
  const dispatch = useDispatch();
  const [scale, setScale] = useState(0.1);
  const floorPlan = useSelector(selectNextFloorPlan);
  const markers = useSelector(selectNextFloorMarkers);
  const [floorConnects, setFloorConnects] = useState([]);
  const selected = useSelector(selectSelected);
  const floorConnectVisible = useSelector(selectFloorConnectVisible);
  useEffect(() => {
    if (selected && floorPlan && selected.floorPlanId !== floorPlan.id) {
      // dispatch(setSelectedFloorId(selected.floorPlanId));
    }
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
      {floorPlan && floorConnectVisible && (
        <div className="choose-stair-lift-wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Choose floor connections</h4>
            <Button
              style={{ marginLeft: 5 }}
              onClick={() =>
                dispatch(
                  changeFloorConnectMenuVisble({
                    visible: false,
                  })
                )
              }
              icon={<FullscreenExitOutlined />}
            ></Button>
          </div>

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
  rotate,
}) => {
  const locationName = useSelector(selectLocationName);

  const {
    x,
    y,
    store,
    locatorTag,
    facility,
    locationTypeId,
    floorConnects,
    locationPicked,
  } = location;
  const dispatch = useDispatch();
  const getMenu = () => {
    switch (locationTypeId) {
      case 3:
      case 4:
        return <StairLiftMenu location={location} />;
      default:
        return <DeleteMenu location={location} />;
    }
  };
  const fixedRotate = rotate === -90 ? 90 : rotate === 90 ? -90 : rotate;
  if (
    ((!locationPicked || mode !== "pickLocation" || locationTypeId == 2) &&
      ((locationTypeId != 3 && locationTypeId != 4) ||
        mode === "pickLocation")) ||
    mode === "chooseStairLift"
  ) {
    return (
      <Tooltip
        title={
          locationPicked
            ? locationName
            : store
            ? store.name
            : locatorTag
            ? locatorTag.uuid
            : facility && facility.name
        }
        placement="top"
      >
        <g
          transform={`translate(${x - 10}, ${y - 10}) rotate(${fixedRotate})`}
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
            height="21"
          />

          {mode === "floorPlan" && floorConnects?.length && (
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
      </Tooltip>
    );
  }
  return (
    <Popover
      placement="rightTop"
      title="Menu"
      content={getMenu()}
      trigger="click"
    >
      <Tooltip
        title={
          locationPicked
            ? locationName
            : store
            ? store.name
            : locatorTag && locatorTag.uuid
        }
        placement="top"
      >
        <g
          transform={`translate(${x - 10}, ${y - 10})  rotate(${fixedRotate})`}
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
            height="21"
          />

          {mode === "floorPlan" && floorConnects?.length && (
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
      </Tooltip>
    </Popover>
  );
};

// const PlaceMarkerToolTip = (
//   src,
//   location,
//   selected,
//   onPathClick,
//   mode = "floorPlan",
//   rotate
// ) => {
//   const locationName = useSelector(selectLocationName);
//   const { x, y, store, locatorTag, floorConnects, locationPicked } = location;
//   return (
//     <Tooltip
//       title={
//         locationPicked
//           ? locationName
//           : store
//           ? store.name
//           : locatorTag && locatorTag.uuid
//       }
//       placement="top"
//     >
//       <g
//         transform={`translate(${x - 10}, ${y - 10}) rotate(${rotate})`}
//         onClick={(evt) => onPathClick(location, evt)}
//         onContextMenu={(evt) => onPathClick(location, evt)}
//       >
//         <rect
//           width="28"
//           height="28"
//           fill="white"
//           rx="2"
//           strokeWidth="0.2"
//           stroke="grey"
//           transform="translate(-3.7, -4)"
//         ></rect>

//         {LocationHelper.equal(location, selected) && (
//           <rect
//             width="28"
//             height="28"
//             fill="#333642"
//             rx="2"
//             strokeWidth="0.2"
//             stroke="grey"
//             transform="translate(-3.7, -4)"
//           ></rect>
//         )}

//         <image
//           className={
//             LocationHelper.equal(location, selected) ? "img-white" : ""
//           }
//           href={src}
//           height="21"
//         />

//         {mode === "floorPlan" && floorConnects.length && (
//           <>
//             <rect
//               className="img-red"
//               x="22"
//               y="-8"
//               height="14"
//               width="30"
//               rx="3"
//             />
//             <path
//               fill="white"
//               transform="translate(23, -7) scale(0.012)"
//               d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"
//             ></path>
//             <text
//               x="62"
//               y="2.8"
//               transform="scale(0.7)"
//               textAnchor="middle"
//               fill="white"
//             >
//               {floorConnects.length}
//             </text>
//           </>
//         )}
//         {mode === "pickLocation" && location.locationPicked && (
//           <>
//             <rect
//               className="img-green"
//               x="19"
//               y="-7"
//               height="14"
//               width="15"
//               rx="3"
//             />
//             <text
//               x="19"
//               y="4.2"
//               transform="scale(1.4)"
//               textAnchor="middle"
//               fill="white"
//             >
//               +
//             </text>
//           </>
//         )}
//       </g>
//     </Tooltip>
//   );
// };

export default IndoorMap;
