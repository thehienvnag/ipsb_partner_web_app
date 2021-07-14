import pointInPolygon from "point-in-polygon";
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
export const mergeDeduplicate = (arr) => {
  return [...new Set([].concat(...arr))];
};

//#region Map utils
const getParallel = ({ fromLocation, toLocation }, d, side) => {
  var dx = fromLocation.x - toLocation.x,
    dy = fromLocation.y - toLocation.y,
    dist = Math.sqrt(dx * dx + dy * dy) / 2;
  dx *= (side * d) / dist;
  dy *= (side * d) / dist;
  return [
    { x: fromLocation.x + dy, y: fromLocation.y - dx },
    { x: toLocation.x + dy, y: toLocation.y - dx },
  ];
};

export const pointInRect = (edge, { x, y }) => {
  const offset = 5;
  const l1 = getParallel(edge, offset, 1);
  const l2 = getParallel(edge, offset, -1);
  const p1 = [l1[0].x, l1[0].y];
  const p2 = [l1[1].x, l1[1].y];
  const p3 = [l2[1].x, l2[1].y];
  const p4 = [l2[0].x, l2[0].y];
  return pointInPolygon([x, y], [p1, p2, p3, p4]);
};

export const duplicateLocation = ({ x, y }, markers) =>
  markers.find((e) => Math.hypot(e.x - x, e.y - y) <= 30);
//#endregion
