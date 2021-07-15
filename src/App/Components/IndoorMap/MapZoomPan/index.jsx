import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEdgesOnFloor,
  selectEdgesByFloorPlan,
  selectEdgeLoading,
} from "App/Stores/edge.slice";
import {
  loadLocationByFloor,
  selectLocationByFloorPlan,
  selectLocationLoading,
} from "App/Stores/location.slice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, Modal, Row, Divider, Radio, Typography } from "antd";
import { Svg, Circle, Polyline } from "react-svg-path";
import {
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from "@ant-design/icons";
import { MdMyLocation } from "react-icons/md";
import "./index.scss";
import { pointInRect, duplicateLocation } from "App/Utils/utils";
const stairSvg = process.env.PUBLIC_URL + "/stairs.svg";
const restroom = process.env.PUBLIC_URL + "/restroom.svg";
const elevator = process.env.PUBLIC_URL + "/elevator.svg";
const stores = process.env.PUBLIC_URL + "/stores.svg";
const equal = (one, that) =>
  ((one?.id || that?.id) && one?.id === that?.id) || one === that;
const MapZoomPan = ({ disabledPreview, mode, types, src, floorPlanId }) => {
  const dispatch = useDispatch();
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
    <Wrapper
      disabledPreview={disabledPreview}
      mode={mode}
      src={src}
      types={types}
    >
      <TransformWrapper
        doubleClick={{ disabled: true }}
        pinch={{ disabled: true }}
        minScale={0.3}
        maxScale={4}
      >
        <TransformComponent>
          <ImageRealSize mode={mode} types={types} src={src} />
        </TransformComponent>
      </TransformWrapper>
    </Wrapper>
  );
};

const Wrapper = ({ disabledPreview, mode, types, children, src }) => {
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

  return (
    <div className={disabledPreview ? "without-preview" : "preview-wrapper"}>
      {disabledPreview ? (
        <Button
          className="without-preview-btn"
          onClick={() => setModalVisible(true)}
          icon={<MdMyLocation />}
        >
          Pick location
        </Button>
      ) : (
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
              types={types}
              src={src}
              mode={mode}
              scale={scale ?? 1}
              enabled={enableDrawMode}
              rotate={rotate}
            />
          </TransformComponent>
        </TransformWrapper>
      </Modal>
    </div>
  );
};

const ModalTitle = ({ onRotateLeft, onRotateRight, onDrawModeChange }) => {
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
      <Button
        icon={<RotateLeftOutlined />}
        shape="circle"
        onClick={onRotateLeft}
      ></Button>
      <Divider
        type="vertical"
        style={{ borderColor: "#9AA0A6", borderWidth: "2px", height: "36px" }}
      ></Divider>
      <Button
        icon={<RotateLeftOutlined />}
        shape="circle"
        onClick={onRotateLeft}
      ></Button>
      <Button
        icon={<RotateRightOutlined />}
        shape="circle"
        style={{ margin: "0 15px" }}
        onClick={onRotateRight}
      ></Button>
    </Row>
  );
};

const ImageRealSize = ({
  src,
  mode = "floorPlan",
  types = "",
  rotate,
  scale,
  enabled,
}) => {
  const [dimension, setDimension] = useState({});
  const wrapperRef = useRef(null);
  const [mapState, setMapState] = useState({
    markers: [],
    edges: [],
    selected: null,
  });
  const listEdges = useSelector(selectEdgesByFloorPlan);
  const listLocationOnFloor = useSelector(selectLocationByFloorPlan);

  useEffect(() => {
    setMapState({
      markers: listLocationOnFloor.filter(({ locationTypeId }) =>
        types.includes(locationTypeId)
      ),
      edges: listEdges.filter(
        ({ fromLocation, toLocation }) =>
          types.includes(fromLocation.locationTypeId) &&
          types.includes(toLocation.locationTypeId)
      ),
      selected: mapState.selected,
    });
  }, [listEdges, listLocationOnFloor, types]);

  const selectedChanged = (location, selected, isDelete) => {
    if (equal(selected, location)) return null;
    return isDelete ? null : location;
  };

  //#region onMapClick handle functions
  const initLocation = (
    { left, top, right, bottom },
    markers,
    clientX,
    clientY
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

    return duplicateLocation(location, markers) ?? location;
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
  const createMarkers = (location, markers) => {
    if (markers.findIndex((item) => equal(item, location)) !== -1)
      return markers;
    return [...markers, location];
  };

  /////////////THiếu chỗ này

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
  const createEdges = (location, markers, edges, selected) => {
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
  const onMapLeftClick = async (evt) => {
    const { clientX, clientY, shiftKey } = evt;
    if (shiftKey) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const { selected, markers, edges } = mapState;
      const raw = initLocation(rect, markers, clientX, clientY);
      setMapState({
        markers: createMarkers(raw, markers),
        edges: createEdges(raw, markers, edges, selected),
        selected: selectedChanged(raw, selected),
      });
    }
  };
  //#region onPathClick handle functions
  const markersAfterDelete = (location, markers) =>
    markers.filter((item) => !equal(item, location));
  const edgesAfterDelete = (location, edges) =>
    edges.filter(
      ({ fromLocation, toLocation }) =>
        !equal(fromLocation, location) && !equal(toLocation, location)
    );

  //#endregion
  const onPathClick = (location, evt) => {
    evt.preventDefault();
    const { type } = evt;
    if (type === "contextmenu") {
      const { markers, edges, selected } = mapState;
      setMapState({
        markers: markersAfterDelete(location, markers),
        edges: edgesAfterDelete(location, edges),
        selected: selectedChanged(location, selected, true),
      });
    } else if (type === "click") {
      console.log(location);
      const { selected } = mapState;
      setMapState({
        edges: mapState.edges,
        markers: mapState.markers,
        selected: selectedChanged(location, selected),
      });
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
        markers={mapState.markers}
        edges={mapState.edges}
        selected={mapState.selected}
        onPathClick={enabled ? onPathClick : () => {}}
      />
    </div>
  );
};

const SvgWrapper = ({
  dimension,
  rotate,
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
            selected={selected}
            onPathClick={onPathClick}
            rotate={rotate}
          />
        ))}
    </Svg>
  );
};

const PathWrapper = ({ key, rotate, selected, location, onPathClick }) => {
  const { x, y, locationTypeId } = location;
  if (locationTypeId === 1) {
    return (
      <PlaceMarker
        src={stores}
        location={location}
        selected={selected}
        onPathClick={onPathClick}
      />
    );
  }
  if (locationTypeId === 4) {
    return (
      <PlaceMarker
        src={stairSvg}
        location={location}
        selected={selected}
        onPathClick={onPathClick}
      />
    );
  }
  if (locationTypeId === 10) {
    return (
      <PlaceMarker
        src={restroom}
        location={location}
        selected={selected}
        onPathClick={onPathClick}
      />
    );
  }
  if (locationTypeId === 3) {
    return (
      <PlaceMarker
        src={elevator}
        location={location}
        selected={selected}
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

const PlaceMarker = ({ src, location, selected, onPathClick }) => {
  const { x, y } = location;
  return (
    <g
      transform={`translate(${x - 17}, ${y - 17})`}
      onClick={(evt) => onPathClick(location, evt)}
      onContextMenu={(evt) => onPathClick(location, evt)}
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
    </g>
  );
};
export default MapZoomPan;
