const distance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
const ibeaconLocationType = 6;
class LocationHelper {
  static getRemovedList = (list, p2) =>
    list.filter((p1) => !this.equal(p1, p2));
  static equal = (p1, p2) =>
    (p1?.x === p2?.x && p1?.y === p2?.y) ||
    (p1?.x === p2?.y && p1?.y === p2?.x);
  static includes = (list, p2) =>
    list?.findIndex((p1) => this.equal(p1, p2)) !== -1;
  static duplicate = (p1, markers, removeIds, radius = 30) =>
    markers
      .filter(({ id }) => !removeIds.includes(id))
      ?.filter(({ locationTypeId }) => locationTypeId !== ibeaconLocationType)
      .find((p2) => distance(p1, p2) <= radius);
  static find = (list, locationToFind) =>
    list.find((location) => this.equal(location, locationToFind));
  static initLocation = (
    { left, top, right, bottom },
    clientX,
    clientY,
    typeId,
    floorPlanId,
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
    return {
      ...location,
      locationTypeId: typeId,
      floorPlanId: floorPlanId,
    };
  };
  static appendEdge = (listEdges, location) => {
    const result = {
      ...location,
      ...{ floorConnects: location.floorConnects ?? [] },
    };
    listEdges.forEach(({ fromLocation, toLocation }) => {
      if (
        LocationHelper.equal(fromLocation, location) &&
        result.floorConnects.findIndex((item) =>
          this.equal(item, toLocation)
        ) === -1
      ) {
        result.floorConnects?.push(toLocation);
      }
      if (
        LocationHelper.equal(toLocation, location) &&
        result.floorConnects.findIndex((item) =>
          this.equal(item, fromLocation)
        ) === -1
      ) {
        result.floorConnects?.push(fromLocation);
      }
    });
    return { ...result };
  };
  static display = (
    list,
    createdLocations,
    removedLocationIds,
    typesSelect
  ) => {
    const resultWithoutRemoved = list?.content?.filter(
      ({ id }) => !removedLocationIds.includes(id)
    );
    const result = [
      ...(resultWithoutRemoved ?? []),
      ...createdLocations,
    ].filter(
      ({ locationTypeId }) => typesSelect?.includes(locationTypeId) ?? true
    );

    return result;
  };
}
export default LocationHelper;
