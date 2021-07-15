import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getByFloorPlan } from "App/Services/location.service";
//#region Async thunks floor plans
const loadLocationByFloor = createAsyncThunk(
  "location/loadLocationOfBeaconType",
  async (params, thunkAPI) => {
    return await getByFloorPlan(params);
  }
);
//#endregion
const Slice = createSlice({
  name: "location",
  initialState: {
    list: null,
    isLoading: false,
  },
  reducers: {
    removeLocations: (state, action) => {
      state.list = null;
    },
  },
  extraReducers: {
    //#region Load floor plans by buildingId state
    [loadLocationByFloor.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadLocationByFloor.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    [loadLocationByFloor.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [floors, totalFloor, pageSize, isLoading]
export const selectLocationByFloorPlan = (state) =>
  state.location.list?.content ?? [];

export const selectLocationLoading = (state) => state.location.isLoading;
//#endregion

/// Export reducer
const { removeLocations } = Slice.actions;
export { loadLocationByFloor, removeLocations };
export default Slice.reducer;
