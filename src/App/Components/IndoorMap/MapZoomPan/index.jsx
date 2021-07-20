import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEdgesOnFloor } from "App/Stores/edge.slice";
import { loadLocationByFloor } from "App/Stores/location.slice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Button,
  Modal,
  Row,
  Divider,
  Radio,
  Typography,
  Select,
  Menu,
  Dropdown,
  Tag,
} from "antd";
import { Svg, Circle, Polyline } from "react-svg-path";
import {
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { MdMyLocation } from "react-icons/md";
import "./index.scss";
import { pointInRect, duplicateLocation } from "App/Utils/utils";
import {
  selectLocationTypes,
  setTypesSelect,
} from "App/Stores/locationType.slice";
import {
  selectEdges,
  selectMarkers,
  selectSelected,
  setEdges,
  setMarkers,
  setSelected,
  setSelectedFloorId,
  selectNextFloorImg,
  selectNextFloorMarker,
  selectToCreate,
  setToCreateMarkers,
} from "App/Stores/map.slice";
import { selectListFloorCode, loadAll } from "App/Stores/floorPlan.slice";
const stairSvg = process.env.PUBLIC_URL + "/stairs.svg";
const restroom = process.env.PUBLIC_URL + "/restroom.svg";
const elevator = process.env.PUBLIC_URL + "/elevator.svg";
const stores = process.env.PUBLIC_URL + "/stores.svg";

const equal = (one, that) =>
  ((one?.id || that?.id) && one?.id === that?.id) || one === that;

const FilterDropdown = ({ className }) => {
  const dispatch = useDispatch();
  const locationType = useSelector(selectLocationTypes);
  return (
    <Select
      className={className}
      allowClear
      onChange={(values) => dispatch(setTypesSelect(values))}
      defaultValue={[locationType.reduce((acc, { id }) => acc + "," + id, "")]}
      style={{ width: 260 }}
      placeholder="Elements to show on map"
      mode="multiple"
    >
      <Select.Option
        key="All"
        value={locationType.reduce((acc, { id }) => acc + "," + id, "")}
      >
        All
      </Select.Option>
      {locationType.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

const MapZoomPan = ({
  disabledPreview,
  mode = "floorPlan" || "Other",
  typeId = 2,
  // mode = "Other" || "floorPlan",
  // typeId = [3],
  src,
  floorPlanId,
}) => {
  const dispatch = useDispatch();
  const markers = useSelector(selectMarkers);
  const edges = useSelector(selectEdges);
  const selected = useSelector(selectSelected);
  useEffect(() => {
    if (floorPlanId) {
      dispatch(loadEdgesOnFloor({ floorPlanId }));
      dispatch(loadLocationByFloor({ floorPlanId }));
    }
  }, [dispatch, floorPlanId]);
  if (!src) {
    return (
      <Wrapper>
        <h3>Please choose floor map image!</h3>
      </Wrapper>
    );
  }
  return (
    <div className="filter-wrapper">
      <FilterDropdown className="filter-select" />
      <Wrapper
        disabledPreview={disabledPreview}
        mode={mode}
        typeId={typeId}
        src={src}
        markers={markers}
        edges={edges}
        selected={selected}
      >
        <TransformWrapper
          doubleClick={{ disabled: true }}
          pinch={{ disabled: true }}
          minScale={0.3}
          maxScale={4}
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
  mode,
  typeId,
  children,
  src,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [enableDrawMode, setEnableDrawMode] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [isClearAll, setIsClearAll] = useState(false);

  // const [rotate, setRotate] = useState(0);
  const onRotateLeft = () => {
    if (rotate === -180) return;
    setRotate(rotate - 90);
  };
  const onRotateRight = () => {
    if (rotate === 180) return;
    setRotate(rotate + 90);
  };
  const onClearAll = () => {
    setIsClearAll(true);
  };
  const onDrawModeChange = (isDrawModeOn) => setEnableDrawMode(isDrawModeOn);

  return (
    <div className={disabledPreview ? "without-preview" : "preview-wrapper"}>
      {disabledPreview && (
        <Button
          className="without-preview-btn"
          onClick={() => setModalVisible(true)}
          icon={<MdMyLocation />}
        >
          Pick location
        </Button>
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
            onClearAll={onClearAll}
          />
        }
        wrapClassName={`modal-wrapper${rotate}`}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
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
              clearAll={isClearAll}
              scale={scale ?? 1}
              enabled={enableDrawMode}
              rotate={rotate}
              markers={markers}
              edges={edges}
              selected={selected}
            />
          </TransformComponent>
        </TransformWrapper>
      </Modal>
    </div>
  );
};

const ModalTitle = ({
  onRotateLeft,
  onRotateRight,
  onDrawModeChange,
  onClearAll,
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
      <FilterDropdown />
    </Row>
  );
};

//#region onMapClick handle functions
const initLocation = (
  { left, top, right, bottom },
  markers,
  clientX,
  clientY,
  typeId,
  rotate,
  scale
) => {
  let location;
  if (rotate === 180 || rotate === -180) {
    location = {
      x: (right - clientX) / scale,
      y: (bottom - clientY) / scale,
    };
  } else if (rotate === 90) {
    location = {
      x: (clientY - top) / scale,
      y: (right - clientX) / scale,
    };
  } else if (rotate === -90) {
    location = {
      x: (bottom - clientY) / scale,
      y: (clientX - left) / scale,
    };
  } else if (rotate === 0) {
    location = { x: (clientX - left) / scale, y: (clientY - top) / scale };
  }
  return (
    duplicateLocation(location, markers) ?? {
      ...location,
      ...{ locationTypeId: typeId },
    }
  );
};

const duplicateEdge = (edge, edges) => {
  return (
    edges.findIndex(
      (e) =>
        (equal(e.fromLocation, edge.fromLocation) &&
          equal(e.toLocation, edge.toLocation)) ||
        (equal(e.toLocation, edge.fromLocation) &&
          equal(e.fromLocation, edge.toLocation))
    ) !== -1
  );
};
const createMarkers = (location, markers, typeId = 2) => {
  if (markers.findIndex((item) => equal(item, location)) !== -1)
    return { markersNew: markers };
  if (typeId === 2) {
    return { markersNew: [...markers, location] };
  }
  return {
    selectedNew: location,
    markersNew: [...markers.filter(({ id }) => id), location],
  };
};

const edgesIntersect = (selected, location, edges, edgeIntersect) => {
  return [
    ...edges.filter((edge) => !equal(edgeIntersect, edge)),
    {
      fromLocation: selected,
      toLocation: location,
    },
    {
      fromLocation: location,
      toLocation: edgeIntersect.fromLocation,
    },
    { fromLocation: edgeIntersect.toLocation, toLocation: location },
  ];
};
const createEdges = (location, markers, edges, selected, typeId = 2) => {
  if (selected) {
    const edge = { fromLocation: selected, toLocation: location };
    if (markers.findIndex((item) => equal(item, location)) === -1) {
      // Intersect edge
      const edgeIntersect = edges.find((edge) => pointInRect(edge, location));
      // Case of intersect exist
      if (edgeIntersect)
        return edgesIntersect(selected, location, edges, edgeIntersect);
    }
    // Case of duplicate edge
    if (duplicateEdge(edge, edges)) return edges;
    return [...edges, edge];
  }
  return edges;
};
//#endregion
//#region onPathClick handle functions
const markersAfterDelete = (location, markers) =>
  markers.filter((item) => !equal(item, location));
const edgesAfterDelete = (location, edges) =>
  edges.filter(
    ({ fromLocation, toLocation }) =>
      !equal(fromLocation, location) && !equal(toLocation, location)
  );
const selectedChanged = (location, selected, isDelete) => {
  if (equal(selected, location)) return null;
  return isDelete ? null : location;
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
}) => {
  const dispatch = useDispatch();

  const [dimension, setDimension] = useState({});
  const wrapperRef = useRef(null);

  const onMapLeftClick = async (evt) => {
    const { clientX, clientY, shiftKey } = evt;
    if (shiftKey) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const raw = initLocation(
        rect,
        markers,
        clientX,
        clientY,
        typeId,
        rotate,
        scale
      );
      const { selectedNew, markersNew } = createMarkers(raw, markers, typeId);
      const edgeNew = createEdges(raw, markers, edges, selectedNew ?? selected);
      dispatch(setMarkers(markersNew));
      dispatch(setEdges(edgeNew));
      dispatch(setSelected(selectedChanged(raw, selected)));
    }
  };

  const onPathClick = (location, evt) => {
    evt.preventDefault();
    const { type } = evt;

    if (type === "contextmenu" && mode === "floorPlan") {
      dispatch(setMarkers(markersAfterDelete(location, markers)));
      dispatch(setEdges(edgesAfterDelete(location, edges)));
      dispatch(setSelected(selectedChanged(location, selected, true)));
    } else if (type === "click") {
      if (handleSelect) {
        handleSelect(location);
      }
      dispatch(setSelected(selectedChanged(location, selected)));
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
}) => {
  return (
    <Svg width={dimension.width ?? 0} height={dimension.height ?? 0}>
      {edges &&
        edges.map(({ fromLocation, toLocation }, index) => (
          <Polyline
            key={"path" + index}
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
          />
        ))}
    </Svg>
  );
};

const PathWrapper = ({
  key,
  rotate,
  selected,
  mode,
  typeId,
  location,
  onPathClick,
}) => {
  const { x, y, locationTypeId } = location;
  const img = (id) => {
    if (id === 1) return stores;
    if (id === 4) return stairSvg;
    if (id === 3) return elevator;
    if (id === 10) return restroom;
  };
  if (locationTypeId !== 2) {
    return (
      <PlaceMarker
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
      {equal(location, selected) ? (
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
  const offset = (rotate) => {
    if (rotate === 90) return { x: -10, y: 30 };
    if (rotate === -90) return { x: 35, y: 4 };
    if (rotate === -180 || rotate === 180) return { x: 24, y: 32 };
    return { x: 0, y: 0 };
  };
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
  const markers = useSelector(selectMarkers);
  const edges = useSelector(selectEdges);
  const selected = useSelector(selectSelected);

  const onDelete = async () => {
    dispatch(setMarkers(markersAfterDelete(location, markers)));
    dispatch(setEdges(edgesAfterDelete(location, edges)));
    dispatch(setSelected(selectedChanged(location, selected, true)));
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

const StairLiftMenu = ({ location }) => {
  const dispatch = useDispatch();
  const markers = useSelector(selectMarkers);
  const edges = useSelector(selectEdges);
  const selected = useSelector(selectSelected);
  const connects = useSelector(selectToCreate);

  const handleSelect = (location) => {
    addLoc(location);
  };
  useEffect(() => {}, [location]);
  const addLoc = (location) => {
    dispatch(
      setToCreateMarkers([
        ...connects,
        { ...location, ...{ floorCode: selectFloor.floorCode } },
      ])
    );
  };
  const removeLoc = (location) => {
    dispatch(
      setToCreateMarkers([connects.filter(({ id }) => location.id !== id)])
    );
  };
  useEffect(() => {
    dispatch(loadAll());
  }, [dispatch]);
  const floors = useSelector(selectListFloorCode);
  const [selectFloor, setSelectFloor] = useState(null);
  const handleChange = (value) => {
    dispatch(setSelectedFloorId(value));
  };

  const onDelete = async () => {
    dispatch(setMarkers(markersAfterDelete(location, markers)));
    dispatch(setEdges(edgesAfterDelete(location, edges)));
    dispatch(setSelected(selectedChanged(location, selected, true)));
  };
  return (
    <Row>
      <div>
        <Menu title="Options" selectedKeys={["3"]}>
          <Menu.Item className="custom-menu-item" icon={<SaveOutlined />}>
            Save
          </Menu.Item>
          <div>
            <Select
              placeholder="Connect to floor"
              style={{ width: 180, margin: "0 16px", marginBottom: 8 }}
              onChange={handleChange}
              tokenSeparators={[","]}
            >
              {floors?.map((item) => (
                <Select.Option key={item.id}>
                  <div onClick={() => setSelectFloor(item)}>
                    Tầng {item.floorCode}
                  </div>
                </Select.Option>
              ))}
            </Select>
            <div style={{ marginLeft: 15 }}>
              {connects.map((item) => (
                <Tag key={item.id} closable onClose={() => removeLoc(item)}>
                  Tầng {item.floorCode}
                </Tag>
              ))}
            </div>
          </div>

          <Menu.Item
            onClick={onDelete}
            className="custom-menu-item"
            key="1"
            icon={<DeleteOutlined />}
          >
            Remove
          </Menu.Item>
        </Menu>
      </div>
      <ChooseStairLiftConnection
        handleSelect={handleSelect}
        floorPlanId={location.floorPlanId}
      />
    </Row>
  );
};
const ChooseStairLiftConnection = ({ floorPlanId, handleSelect }) => {
  const [scale, setScale] = useState(0.1);
  const src = useSelector(selectNextFloorImg);
  const markers = useSelector(selectNextFloorMarker);

  if (!src) {
    return <></>;
  }
  return (
    <div
      className="preview-wrapper"
      style={{
        width: 450,
        backgroundColor: "white",
        position: "absolute",
        left: 220,
        top: -50,
      }}
    >
      <TransformWrapper
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
        initialScale={0.3}
        minScale={0.3}
        maxScale={1}
        onZoom={(value) => {
          const { scale } = value.state;
          setScale(scale);
        }}
      >
        <TransformComponent>
          <ImageRealSize
            src={src}
            scale={scale}
            markers={markers ?? []}
            handleSelect={handleSelect}
            enabled={true}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

const PlaceMarker = ({
  src,
  location,
  selected,
  onPathClick,
  mode,
  typeId,
}) => {
  const { x, y, store, locationTypeId } = location;
  const getMenu = () => {
    if (mode === "floorPlan") return <></>;
    if (typeId != locationTypeId) return <></>;
    switch (locationTypeId) {
      case 3:
      case 4:
        return <StairLiftMenu location={location} />;
      default:
        return <DeleteMenu location={location} />;
    }
  };
  return (
    <Dropdown overlay={getMenu()} trigger={["contextMenu"]}>
      <g
        transform={`translate(${x - 17}, ${y - 17})`}
        onClick={(evt) => onPathClick(location, evt)}
      >
        <rect
          width="24"
          height="18"
          fill="white"
          transform="translate(0, 5)"
        ></rect>
        <image
          className={equal(location, selected) ? "img-red" : ""}
          href={src}
          height="25"
        />
        {store && <text transform="translate(0, 39)">{store.name}</text>}
      </g>
    </Dropdown>
  );
};
export default MapZoomPan;
