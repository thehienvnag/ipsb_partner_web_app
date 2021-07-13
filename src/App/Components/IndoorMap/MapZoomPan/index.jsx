import React, { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, Modal, Row, Divider, Radio, Typography } from "antd";
import { Svg, Circle, Polyline } from "react-svg-path";
import {
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { pointInRect, duplicateLocation } from "App/Utils/utils";
const MapZoomPan = ({ src }) => {
  if (!src) {
    return (
      <Wrapper>
        <h3>Please choose floor map image!</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper src={src}>
      <TransformWrapper
        doubleClick={{ disabled: true }}
        pinch={{ disabled: true }}
        minScale={0.3}
        maxScale={4}
      >
        <TransformComponent>
          <ImageRealSize src={src} />
        </TransformComponent>
      </TransformWrapper>
    </Wrapper>
  );
};

const Wrapper = ({ children, src }) => {
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
    <div className="cropper-rotate">
      <Button
        className="full-screen-btn"
        onClick={() => setModalVisible(true)}
        icon={<FullscreenOutlined />}
      ></Button>
      {children}
      <Modal
        title={
          <ModalTitle
            onRotateLeft={onRotateLeft}
            onRotateRight={onRotateRight}
            onDrawModeChange={onDrawModeChange}
          />
        }
        wrapClassName={`modal-wrapper${rotate}`}
        // width="90%"
        // className="map-modal"
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

const ImageRealSize = ({ src, rotate, scale, enabled }) => {
  console.log("build");
  const [dimension, setDimension] = useState({});
  const wrapperRef = useRef(null);
  const [mapState, setMapState] = useState({
    markers: [],
    edges: [],
    selected: null,
  });
  const selectedChanged = (location, selected) => {
    if (selected === location) return null;
    return location;
  };

  //#region onMapClick handle functions
  const initLocation = ({ left, top, right, bottom }, clientX, clientY) => {
    if (rotate === 180 || rotate === -180) {
      return {
        x: (right - clientX) / scale,
        y: (bottom - clientY) / scale,
      };
    } else if (rotate === 90) {
      return {
        x: (clientY - top) / scale,
        y: (right - clientX) / scale,
      };
    } else if (rotate === -90) {
      return {
        x: (bottom - clientY) / scale,
        y: (clientX - left) / scale,
      };
    } else if (rotate === 0) {
      return { x: (clientX - left) / scale, y: (clientY - top) / scale };
    }
  };

  const duplicateEdge = (edge, edges) => {
    return (
      edges.findIndex(
        (e) =>
          (e.fromLocation === edge.fromLocation &&
            e.toLocation === edge.toLocation) ||
          (e.toLocation === edge.fromLocation &&
            e.fromLocation === edge.toLocation)
      ) !== -1
    );
  };
  const createMarkers = (location, markers) => {
    const duplicate = duplicateLocation(location, markers);
    if (duplicate) return markers;
    return [...markers, duplicate ?? location];
  };
  const edgesIntersect = (location, edges, edgeIntersect) => {
    return [
      ...edges.filter((edge) => edgeIntersect !== edge),
      {
        fromLocation: location,
        toLocation: edgeIntersect.fromLocation,
      },
      { fromLocation: edgeIntersect.toLocation, toLocation: location },
    ];
  };
  const createEdges = (location, edges, selected) => {
    if (selected) {
      const edge = { fromLocation: selected, toLocation: location };
      const edgeIntersect = edges.find((edge) => pointInRect(edge, location));
      // Case of intersect
      if (edgeIntersect) return edgesIntersect(location, edges, edgeIntersect);
      // Case of duplicate edge
      if (!duplicateEdge(edge, edges)) return [...edges, edge];
    }
    return edges;
  };
  //#endregion
  const onMapLeftClick = async (evt) => {
    const { clientX, clientY, shiftKey } = evt;
    if (shiftKey) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const raw = initLocation(rect, clientX, clientY);
      const { selected, markers, edges } = mapState;
      console.log(selectedChanged(raw, selected));
      setMapState({
        markers: createMarkers(raw, markers),
        edges: createEdges(raw, edges, selected),
        selected: selectedChanged(raw, selected),
      });
    }
  };
  //#region onPathClick handle functions
  const markersAfterDelete = (location, markers) =>
    markers.filter((item) => item !== location);
  const edgesAfterDelete = (location, edges) =>
    edges.filter(
      ({ fromLocation, toLocation }) =>
        fromLocation !== location && toLocation !== location
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
        selected: selectedChanged(location, selected),
      });
    } else if (type === "click") {
      const { selected } = mapState;
      setMapState({
        ...mapState,
        ...{
          selected: selectedChanged(location, selected),
        },
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
        selectedLocation={mapState.selected}
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
  selectedLocation,
  onPathClick,
}) => {
  const offset = (rotate) => {
    if (rotate === 90) return { x: -10, y: 30 };
    if (rotate === -90) return { x: 35, y: 4 };
    if (rotate === -180 || rotate === 180) return { x: 24, y: 32 };
    return { x: 0, y: 0 };
  };
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
        markers.map((item, index) => {
          if (item === selectedLocation) {
            return (
              <>
                <circle
                  key={index + "c"}
                  cx={item.x - 0.8}
                  cy={item.y - 5.3}
                  r="10"
                  fill="white"
                  onClick={(evt) => onPathClick(item, evt)}
                  onContextMenu={(evt) => onPathClick(item, evt)}
                />
                <path
                  key={index + "p"}
                  onClick={(evt) => onPathClick(item, evt)}
                  onContextMenu={(evt) => onPathClick(item, evt)}
                  transform={`translate(${item.x - 12.4 + offset(rotate).x},${
                    item.y - 15.3 + offset(rotate).y
                  }) rotate(${-rotate})`}
                  fill="#ef5350"
                  d="M12 0c-5.522 0-10 4.395-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.42-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8 8 3.582 8 8-3.581 8-8 8zm5-9.585l-5.708 5.627-3.706-3.627 1.414-1.415 2.291 2.213 4.295-4.213 1.414 1.415z"
                />
              </>
            );
          }
          return (
            <PathWrapper
              key={"marker" + index}
              location={item}
              onPathClick={onPathClick}
            />
          );
        })}
    </Svg>
  );
};

const PathWrapper = ({ key, location, onPathClick }) => {
  const { x, y } = location;
  return (
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
  );
};
export default MapZoomPan;
