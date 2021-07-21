import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { floorPlans } from "../Constants/endpoints";
import { postEdges, deleteEdges } from "../Services/edge.service";
import { postLocations, deleteLocations } from "../Services/location.service";
import { distance } from "App/Utils/utils";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAll = async ({ pageIndex = 1, pageSize = 5, buildingId }) => {
  const params = { pageIndex, pageSize, buildingId };
  const response = await axiosClient.get(floorPlans, { params });
  return response.data;
};
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.id] building id which contains floor plans
 */
export const getById = async (id) => {
  const response = await axiosClient.get(`${floorPlans}/${id}`);
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postFloorPlan = async (data) => {
  try {
    const dataPost = await postFormData(floorPlans, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
  }
};
/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putFloorPlan = async (data) => {
  try {
    const dataPut = await putFormData(floorPlans + "/" + data.id, data);
    return dataPut;
  } catch (error) {
    console.log(error?.message);
  }
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postLocationsAndEdges = async (
  prevLocs,
  prevEdges,
  newLocs,
  newEdges,
  connectEdges,
  floorPlanId
) => {
  try {
    const locConnects = createLocConnect(connectEdges);
    const { removedLocIds, removedEdgeIds, locs, edges } = createLocsAndEdges(
      prevLocs,
      prevEdges,
      [...(newLocs ?? []), ...locConnects],
      [...(newEdges ?? []), ...(connectEdges ?? [])],
      floorPlanId
    );

    if (removedEdgeIds.length) {
      deleteEdges(removedEdgeIds).then(
        () => removedLocIds.length && deleteLocations(removedLocIds)
      );
    }

    let locsCreate;
    let edgesCreate;
    if (locs.length) {
      locsCreate = await postLocations(locs);
    }

    if (edges.length) {
      edgesCreate = await postEdges(
        createEdgesData(edges, locsCreate, newLocs)
      );
    }
    return { locsCreate, edgesCreate };
  } catch (error) {
    console.log(error?.message);
  }
};
//#region Utils method for put & post locations/edges
const createLocConnect = (connects) => {
  const haveNoId = [];
  connects?.forEach(({ fromLocation, toLocation }) => {
    if (!fromLocation.id) {
      haveNoId.push(fromLocation);
    }
    if (!toLocation.id) {
      haveNoId.push(toLocation);
    }
  });
  return haveNoId;
};
const createLocsAndEdges = (
  prevLocs,
  prevEdges,
  newLocs,
  newEdges,
  floorPlanId
) => {
  const removedLocIds =
    prevLocs?.content
      ?.filter((item) => !newLocs.includes(item))
      .map(({ id }) => id) ?? [];
  const removedEdgeIds =
    prevEdges?.content
      ?.filter((item) => !newEdges.includes(item))
      .map(({ id }) => id) ?? [];
  const locs =
    newLocs.filter(({ id }) => !id).map((item) => ({ ...item, floorPlanId })) ??
    [];
  const edges =
    newEdges.filter(
      ({ id, fromLocation, toLocation }) =>
        !id && fromLocation.id !== toLocation.id
    ) ?? [];
  return { removedLocIds, removedEdgeIds, locs, edges };
};
const createEdgesData = (edges, locations, newLocs) => {
  if (edges && edges.length && !locations) {
    return edges.map(({ fromLocation, toLocation, floorCode }) => ({
      fromLocationId: fromLocation.id,
      toLocationId: toLocation.id,
      distance: floorCode ? 0 : distance(fromLocation, toLocation),
    }));
  }
  const allLocation = [...locations, ...newLocs];
  if (locations && locations.length) {
    return edges.map(({ fromLocation, toLocation }) => ({
      distance: distance(fromLocation, toLocation),
      fromLocationId: allLocation.find(
        ({ x, y }) => x === fromLocation.x && y === fromLocation.y
      )?.id,
      toLocationId: allLocation.find(
        ({ x, y }) => x === toLocation.x && y === toLocation.y
      )?.id,
    }));
  }
};
//#endregion
