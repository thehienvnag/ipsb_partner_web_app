import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getById } from "App/Services/floorPlan.service";
import {
  getByFloorIdForStairLift,
  deleteLocations,
  postLocations,
} from "App/Services/location.service";
import { deleteEdges, postEdges } from "App/Services/edge.service";
import LocationHelper from "App/Utils/locationHelper";
import EdgeHelper from "App/Utils/edgeHelper";
//#region Async thunks floor plans
const createLocation = createAsyncThunk(
  "indoorMap/createLocation",
  async ({ rawLocation, typeId }, { getState, rejectWithValue }) => {
    const { location, edge, indoorMap, floorPlan } = getState();
    const duplicate = LocationHelper.duplicate(
      rawLocation,
      [
        ...(location.list?.content ?? []),
        ...(indoorMap.createdLocations ?? []),
      ],
      indoorMap.removedLocationIds
    );
    if (duplicate) {
      return rejectWithValue(duplicate);
    }
    const edgeIntersect = EdgeHelper.findIntersects(
      [...(edge.list?.content ?? []), ...(indoorMap.createdEdges ?? [])],
      rawLocation
    );
    return {
      location: {
        ...rawLocation,
        ...{ floorPlanId: floorPlan.currentFloorPlan.id },
      },
      edgeIntersect,
    };
  }
);
const removeLocation = createAsyncThunk(
  "indoorMap/removeLocation",
  async (location, { getState, rejectWithValue }) => {
    if (!location) return rejectWithValue("No location provided!!!");
    const {
      edge: { list },
      indoorMap: { createdEdges },
    } = getState();
    return {
      location: location,
      edgesRelated: EdgeHelper.findAll(
        [...(list?.content ?? []), ...(createdEdges ?? [])],
        location
      ),
    };
  }
);
const setSelectedFloorId = createAsyncThunk(
  "indoorMap/setSelectedFloorId",
  async (floorId, thunkAPI) => {
    if (floorId) {
      const floorPlan = getById(floorId);
      const locations = getByFloorIdForStairLift(floorId);
      if (floorPlan) {
        return {
          floorPlan: await floorPlan,
          locations: (await locations)?.content,
        };
      }
    }
  }
);
const createEdge = createAsyncThunk(
  "indoorMap/createEdge",
  async (toLocation, { getState, rejectWithValue }) => {
    const {
      edge,
      location,
      indoorMap: { selected, createdEdges, removedEdgeIds, createdLocations },
    } = getState();
    if (!location || !selected) return rejectWithValue();

    const edgeToCreate = { fromLocation: selected, toLocation: toLocation };
    const duplicate = EdgeHelper.find(
      EdgeHelper.display(edge.list, createdEdges, removedEdgeIds),
      edgeToCreate
    );
    const selectedNew = LocationHelper.find(
      [...(location.list?.content ?? []), ...(createdLocations ?? [])],
      selected
    );
    if (!duplicate) {
      return { edgeToCreate, selected: selectedNew };
    }
    return rejectWithValue();
  }
);
const removeEdge = createAsyncThunk(
  "indoorMap/removeEdge",
  async (edgeToRemove, { getState, rejectWithValue }) => {
    const {
      edge,
      location,
      indoorMap: {
        createdEdges,
        removedEdgeIds,
        createdLocations,
        removedLocationIds,
      },
    } = getState();
    const result = EdgeHelper.find(
      EdgeHelper.display(edge.list, createdEdges, removedEdgeIds),
      edgeToRemove
    );
    const selected = LocationHelper.find(
      LocationHelper.display(
        location.list,
        createdLocations,
        removedLocationIds
      ),
      edgeToRemove.toLocation
    );
    return result ? { edgeToRemove: result, selected } : rejectWithValue();
  }
);

const saveLocationAndEdges = createAsyncThunk(
  "indoorMap/saveLocationAndEdges",
  async (payload, { getState, rejectWithValue }) => {
    const {
      indoorMap: {
        createdEdges,
        removedEdgeIds,
        createdLocations,
        removedLocationIds,
      },
    } = getState();

    await deleteEdges(removedEdgeIds);

    await deleteLocations(removedLocationIds);

    const locations = await postLocations(createdLocations);
    const edgesToCreate = EdgeHelper.mapLocationsWithId(
      locations,
      createdEdges
    );
    await postEdges(edgesToCreate);
  }
);
//#endregion

const Slice = createSlice({
  name: "indoorMap",
  initialState: {
    createdLocations: [],
    removedLocationIds: [],
    createdEdges: [],
    removedEdgeIds: [],
    markers: [],
    edges: [],
    selected: null,
    openMenu: false,
    nextFloorPlan: null,
    nextFloorMarkers: [],
    facilityLocation: null,
    facilityName: null,
    facilityImg: null,
  },
  reducers: {
    setSelected: (state, { payload: { location, openMenu } }) => {
      if (!location || LocationHelper.equal(state.selected, location)) {
        state.selected = null;
      } else {
        state.selected = location;
      }
      if (openMenu) {
        state.openMenu = true;
      } else {
        state.openMenu = false;
      }
    },
    setFacilityLocation: (state, { payload }) => {
      const { locationName, init, ...location } = payload;
      if (location?.x) {
        state.facilityLocation = location;
        // state.selected = location;
        state.facilityName = locationName;
      } else {
        state.facilityLocation = null;
        // state.selected = null;
        state.facilityName = null;
      }
      if (init) {
        state.removedLocationIds = [];
      } else if (location?.id) {
        state.removedLocationIds = [payload.id];
      }
    },
    removeFacilityLocation: (state, { payload }) => {
      if (payload?.init) {
        state.removedLocationIds = [];
      } else if (state.facilityLocation?.id) {
        state.removedLocationIds = [state.facilityLocation.id];
      }
      state.facilityLocation = null;
      state.facilityName = null;
    },
  },
  extraReducers: {
    [createEdge.fulfilled]: (
      state,
      { payload: { edgeToCreate, selected } }
    ) => {
      state.createdEdges.push(edgeToCreate);
      state.selected = selected;
    },
    [removeEdge.fulfilled]: (
      state,
      { payload: { edgeToRemove, selected } }
    ) => {
      if (edgeToRemove.id) {
        state.removedEdgeIds.push(edgeToRemove.id);
      } else {
        state.createdEdges = EdgeHelper.getRemovedList(
          state.createdEdges,
          edgeToRemove
        );
      }
      state.selected = selected;
    },
    [removeLocation.rejected]: (state, { payload }) => {
      console.log("reject", payload);
    },
    [removeLocation.fulfilled]: (
      state,
      { payload: { location, edgesRelated } }
    ) => {
      if (location.id) {
        state.removedLocationIds.push(location.id);
      } else {
        state.createdLocations = LocationHelper.getRemovedList(
          state.createdLocations,
          location
        );
      }
      edgesRelated?.forEach((edge) => {
        if (edge.id) {
          state.removedEdgeIds.push(edge.id);
        } else {
          state.createdEdges = EdgeHelper.getRemovedList(
            state.createdEdges,
            edge
          );
        }
      });
    },
    [createLocation.fulfilled]: (
      state,
      { payload: { location, edgeIntersect } }
    ) => {
      state.createdLocations.push(location);
      if (state.selected) {
        if (edgeIntersect?.id) {
          state.removedEdgeIds.push(edgeIntersect.id);
        } else if (edgeIntersect) {
          state.createdEdges = EdgeHelper.getRemovedList(
            state.createdEdges,
            edgeIntersect
          );
        }
        const edgesToCreate = EdgeHelper.initEdges(
          state.selected,
          location,
          edgeIntersect
        );
        state.createdEdges.push(...edgesToCreate);
      }
      state.selected = location;
    },
    [createLocation.rejected]: (state, { payload }) => {
      if (state.selected) {
        state.createdEdges.push({
          fromLocation: state.selected,
          toLocation: payload,
        });
        state.selected = payload;
      }
    },
    [setSelectedFloorId.fulfilled]: (state, { payload }) => {
      const { floorPlan, locations } = payload;
      state.nextFloorPlan = floorPlan;
      state.nextFloorMarkers = locations;
    },
  },
});

//Floor plan selector to observe data
//#region [typesSelect, locationTypes]
const selectMarkers = ({ indoorMap, locationType, location, edge }) => {
  const {
    createdLocations,
    removedLocationIds,
    createdEdges,
    removedEdgeIds,
    facilityLocation,
  } = indoorMap;

  const locationsToDisplay = LocationHelper.display(
    location.list,
    createdLocations,
    removedLocationIds,
    locationType.typesSelect
  );
  const totalEdges = EdgeHelper.display(
    edge.list,
    createdEdges,
    removedEdgeIds,
    locationType.typesSelect
  );
  const floorConnectEdges = EdgeHelper.getFloorConnectEdges(totalEdges);
  const result = locationsToDisplay.map((loc) =>
    LocationHelper.appendEdge(floorConnectEdges, loc)
  );
  if (facilityLocation) {
    return [...result, facilityLocation];
  }
  return result;
};

const selectEdges = ({ indoorMap, locationType, edge }) => {
  const { createdEdges, removedEdgeIds } = indoorMap;
  const { list } = edge;
  const result = EdgeHelper.display(
    list,
    createdEdges,
    removedEdgeIds,
    locationType.typesSelect
  );
  return EdgeHelper.filterFloorConnect(result);
};

const selectSelected = ({
  edge,
  locationType,
  indoorMap: { selected, createdEdges, removedEdgeIds },
}) => {
  const totalEdges = EdgeHelper.display(
    edge.list,
    createdEdges,
    removedEdgeIds,
    locationType.typesSelect
  );
  const floorConnectEdges = EdgeHelper.getFloorConnectEdges(totalEdges);
  return selected
    ? LocationHelper.appendEdge(floorConnectEdges, selected)
    : null;
};
const selectOpenMenu = ({ indoorMap }) => indoorMap.openMenu;
const selectFacilityLocation = ({ indoorMap }) => indoorMap.facilityLocation;
const selectLocationName = ({ indoorMap }) => indoorMap.facilityName;
const selectNextFloorPlan = ({ indoorMap }) => indoorMap.nextFloorPlan;
const selectNextFloorMarkers = ({ indoorMap }) => indoorMap.nextFloorMarkers;
//#endregion

/// Export reducer
const { setSelected, setFacilityLocation, removeFacilityLocation } =
  Slice.actions;
export {
  selectMarkers,
  selectEdges,
  selectOpenMenu,
  selectSelected,
  selectNextFloorPlan,
  selectNextFloorMarkers,
  selectFacilityLocation,
  selectLocationName,
  createLocation,
  removeLocation,
  createEdge,
  removeEdge,
  saveLocationAndEdges,
  setSelected,
  setSelectedFloorId,
  setFacilityLocation,
  removeFacilityLocation,
};
export default Slice.reducer;
