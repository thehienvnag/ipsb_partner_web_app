import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getById } from "App/Services/floorPlan.service";
import { getByFloorIdForStairLift } from "App/Services/location.service";
//#region Async thunks floor plans
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
const createLocation = createAsyncThunk(
  "map/setSelectedFloorId",
  async (floorId, { getState }) => {
    const { map, location, edge } = getState();
  }
);
//#endregion

const Slice = createSlice({
  name: "map",
  initialState: {
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
    setMarkers: (state, { payload }) => {
      state.markers = payload;
    },
    setEdges: (state, { payload }) => {
      state.edges = payload;
    },
    setSelected: (state, { payload }) => {
      state.selected = payload;
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
    [setSelectedFloorId.fulfilled]: (state, { payload }) => {
      const { floorImg, locations } = payload;
      state.nextFloorImg = floorImg;
      state.nextFloorMarkers = locations;
    },
  },
});

//Floor plan selector to observe data
//#region [typesSelect, locationTypes]
const selectMarkers = ({ map, locationType }) =>
  map.markers.filter(({ locationTypeId }) =>
    locationType.typesSelect.includes(locationTypeId)
  );
const selectEdges = ({ map, locationType }) =>
  map.edges.filter(
    ({ fromLocation, toLocation }) =>
      locationType.typesSelect.includes(fromLocation.locationTypeId) &&
      locationType.typesSelect.includes(toLocation.locationTypeId)
  );
const selectSelected = ({ map }) => map.selected;
const selectCurrent = ({ map }) => map.current;
const selectNewLocation = ({ map }) => map.markers.filter(({ id }) => !id)[0];
//#endregion
//#region next floor
const selectToCreate = ({ map }) => map.toCreateMarkers;
const selectNextFloorImg = ({ map }) => map.nextFloorImg;
const selectNextFloorMarker = ({ map }) => map.nextFloorMarkers;
const selectNextFloorSelected = ({ map }) => map.nextFloorSelected;
//#endregion

/// Export reducer
const {
  setMarkers,
  setEdges,
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
  setMarkers,
  setEdges,
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
