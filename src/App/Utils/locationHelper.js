const distance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

class LocationHelper {
  static getRemovedList = (list, p2) =>
    list.filter((p1) => !this.equal(p1, p2));
  static equal = (p1, p2) =>
    (p1.x === p2.x && p1.y === p2.y) || (p1.x === p2.y && p1.y === p2.x);
  static duplicate = (p1, markers, radius = 30) =>
    markers?.find((p2) => distance(p1, p2) <= radius);
  static initLocation = (
    { left, top, right, bottom },
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
    return {
      ...location,
      ...{ locationTypeId: typeId },
    };
  };
}
export default LocationHelper;
