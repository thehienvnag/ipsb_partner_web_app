import { pointInRect } from "App/Utils/utils";
import LocationHelper from "./locationHelper";
export default class EdgeHelper {
  static getRemovedList = (list, edgeToRemoved) =>
    list.filter((edge) => !this.equal(edge, edgeToRemoved));
  static equal = (one, that) =>
    (LocationHelper.equal(one.fromLocation, that.fromLocation) &&
      LocationHelper.equal(one.toLocation, that.toLocation)) ||
    (LocationHelper.equal(one.fromLocation, that.toLocation) &&
      LocationHelper.equal(one.toLocation, that.fromLocation));
  static duplicate = (edge, list) =>
    list.findIndex((e) => this.equal(e, edge)) !== -1;

  static findAll = (edges, location) =>
    edges.filter(
      ({ fromLocation, toLocation }) =>
        LocationHelper.equal(fromLocation, location) ||
        LocationHelper.equal(toLocation, location)
    );
  static findIntersects = (edges, location) =>
    edges?.find((edge) => pointInRect(edge, location));
  static initEdges = (fromLocation, toLocation, edgeIntersect) => {
    if (!fromLocation || !toLocation) return [];
    let result = [
      {
        fromLocation,
        toLocation,
      },
    ];
    if (edgeIntersect) {
      result.push(
        {
          fromLocation: toLocation,
          toLocation: edgeIntersect.fromLocation,
        },
        { fromLocation: edgeIntersect.toLocation, toLocation: toLocation }
      );
    }
    return result;
  };
}
