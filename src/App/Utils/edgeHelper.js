import { pointInRect } from "App/Utils/utils";
import LocationHelper from "./locationHelper";
const stairLiftIds = [3, 4];
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
  static getFloorConnectEdges = (edges) =>
    edges.filter(
      ({ fromLocation, toLocation }) =>
        stairLiftIds.includes(fromLocation.locationTypeId) &&
        stairLiftIds.includes(toLocation.locationTypeId)
    );
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
  static display = (list, createdEdges, removedEdgeIds, typesSelect) => {
    const result = list?.content?.filter(
      ({ id }) => !removedEdgeIds.includes(id)
    );
    return [...(result ?? []), ...createdEdges].filter(
      ({ fromLocation, toLocation }) =>
        typesSelect.includes(fromLocation.locationTypeId) &&
        typesSelect.includes(toLocation.locationTypeId)
    );
  };
}
