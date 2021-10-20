import pointInPolygon from "point-in-polygon";
export function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

export const nonNullKeyValue = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

export const inVnd = (num, n, x) => {
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export const isEmptyObj = (obj) =>
  obj &&
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
export const mergeDeduplicate = (arr) => {
  return [...new Set([].concat(...arr))];
};

export const chainTasks = (...fns) => {};

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

export const duplicateLocation = (p1, markers, radius = 30) =>
  markers.find((p2) => distance(p1, p2) <= radius);

export const distance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
//#endregion
