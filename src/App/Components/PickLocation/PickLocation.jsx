import { getById as getFloorPlanById } from "App/Services/floorPlan.service";
import React, { useEffect, useState } from "react";
import IndoorMap from "../IndoorMap";

const PickLocation = ({
  floorPlanId,
  locationTypeId,
  initialValue,
  onChange,
  disabled
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isValuePresent, setIsValuePresent] = useState(false);
  useEffect(() => {
    getFloorPlanById(floorPlanId).then(({ imageUrl }) => setImgSrc(imageUrl));
  }, [floorPlanId]);

  return (
    <IndoorMap
      typeId={locationTypeId}
      mode="pickLocation"
      disabledPreview={true}
      src={imgSrc}
      floorPlanId={floorPlanId}
      initialValue={initialValue}
      disabled={disabled}
      onChange={(value) => {
        if (value) {
          setIsValuePresent(true);
        } else {
          setIsValuePresent(false);
        }
        onChange(value);
      }}
      isValuePresent={isValuePresent}
    />
  );
};

export default PickLocation;
