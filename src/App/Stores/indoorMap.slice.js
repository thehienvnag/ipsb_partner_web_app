import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getById } from "App/Services/floorPlan.service";
import { getByFloorIdForStairLift } from "App/Services/location.service";
import { postLocationsAndEdges } from "App/Services/floorPlan.service";
import LocationHelper from "App/Utils/locationHelper";
import EdgeHelper from "App/Utils/edgeHelper";
//#region Async thunks floor plans
const createLocation = createAsyncThunk(
  "indoorMap/createLocation",
  async (rawLocation, { getState, rejectWithValue }) => {
    const { location, edge, indoorMap } = getState();
    const duplicate = LocationHelper.duplicate(rawLocation, [
      ...(location.list?.content ?? []),
      ...(indoorMap.createdLocations ?? []),
    ]);
    if (duplicate) {
      return rejectWithValue(duplicate);
    }
    const edgeIntersect = EdgeHelper.findIntersects(
      [...(edge.list?.content ?? []), ...(indoorMap.createdEdges ?? [])],
      rawLocation
    );
    return { location: rawLocation, edgeIntersect };
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
  "map/setSelectedFloorId",
  async (floorId, thunkAPI) => {
    const floor = getById(floorId);
    const locations = getByFloorIdForStairLift(floorId);
    if (floor) {
      return {
        floorImg: (await floor).imageUrl,
        locations: await locations,
      };
    }
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
    nextFloorImg: null,
    nextFloorMarkers: [],
    toCreateMarkers: [],
    nextFloorSelected: null,
    selectedFloorId: null,
  },
  reducers: {
    setSelected: (state, { payload }) => {
      console.log("set selected");
      if (!state.selected) {
        state.selected = payload;
        return;
      }
      if (LocationHelper.equal(state.selected, payload)) {
        state.selected = null;
      } else {
        state.selected = payload;
      }
    },
    setNextFloorImg: (state, { payload }) => {
      state.nextFloorImg = payload;
    },
    setNextFloorMarkers: (state, { payload }) => {
      state.nextFloorMarkers = payload;
    },
    setNextFloorSelected: (state, { payload }) => {
      state.nextFloorSelected = payload;
    },
    setToCreateMarkers: (state, { payload }) => {
      state.toCreateMarkers = payload;
    },
    removeNextFloor: (state, action) => {
      state.nextFloorImg = null;
      state.nextFloorMarkers = null;
    },
  },
  extraReducers: {
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
      const { floorImg, locations } = payload;
      state.nextFloorImg = floorImg;
      state.nextFloorMarkers = locations;
    },
  },
});

//Floor plan selector to observe data
//#region [typesSelect, locationTypes]
const selectMarkers = ({ indoorMap, locationType, location }) => {
  const { createdLocations, removedLocationIds } = indoorMap;
  const { list } = location;
  const result = list?.content?.filter(
    ({ id }) => !removedLocationIds.includes(id)
  );
  return [...(result ?? []), ...createdLocations].filter(({ locationTypeId }) =>
    locationType.typesSelect.includes(locationTypeId)
  );
};

const selectEdges = ({ indoorMap, locationType, edge }) => {
  const { createdEdges, removedEdgeIds } = indoorMap;
  const { list } = edge;
  const result = list?.content?.filter(
    ({ id }) => !removedEdgeIds.includes(id)
  );
  return [...(result ?? []), ...createdEdges].filter(
    ({ fromLocation, toLocation }) =>
      locationType.typesSelect.includes(fromLocation.locationTypeId) &&
      locationType.typesSelect.includes(toLocation.locationTypeId)
  );
};

const selectSelected = ({ indoorMap }) => indoorMap.selected;
const selectCurrent = ({ indoorMap }) => indoorMap.current;
const selectNewLocation = ({ indoorMap }) =>
  indoorMap.markers.filter(({ id }) => !id)[0];
//#endregion
//#region next floor
const selectToCreate = ({ indoorMap }) => indoorMap.toCreateMarkers;
const selectNextFloorImg = ({ indoorMap }) => indoorMap.nextFloorImg;
const selectNextFloorMarker = ({ indoorMap }) => indoorMap.nextFloorMarkers;
const selectNextFloorSelected = ({ indoorMap }) => indoorMap.nextFloorSelected;
//#endregion

/// Export reducer
const {
  removeEdge,
  setSelected,
  setNextFloorImg,
  setNextFloorMarkers,
  setNextFloorSelected,
  removeNextFloor,
  setToCreateMarkers,
} = Slice.actions;
export {
  selectSelected,
  selectEdges,
  selectMarkers,
  selectCurrent,
  removeLocation,
  setSelected,
  selectNextFloorImg,
  selectNextFloorMarker,
  selectNextFloorSelected,
  selectToCreate,
  setNextFloorImg,
  setNextFloorMarkers,
  setNextFloorSelected,
  setSelectedFloorId,
  removeNextFloor,
  setToCreateMarkers,
  createLocation,
  selectNewLocation,
};
export default Slice.reducer;
