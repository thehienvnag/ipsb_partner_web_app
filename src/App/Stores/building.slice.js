import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBuildings } from "App/Services/building.service";

//#region Async thunks floor plans
const loadBuildings = createAsyncThunk(
  "building/loadBuildings",
  async (params = {}, thunkAPI) => {
    const data = await getBuildings(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "building",
  initialState: {
    inChargeBuilding: { id: 1 },
  },
  reducers: {
    initBuildingIdLoggin: (state, { payload }) => {
      state.inChargeBuilding = payload;
    },
  },
  extraReducers: {
    //#region Load building state
    [loadBuildings.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadBuildings.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadBuildings.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});


//Building selector to observe data
//#region [buildings, totalBuilding, pageSize, isLoading]
export const selectInChargeBuildingId = (state) => state.inChargeBuilding?.id;
export const selectInChargeBuilding = (state) => state.inChargeBuilding;

export const selectListBuilding = (state) =>
  state.building.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.building.data?.totalCount;
export const selectPageSize = (state) => state.building.data?.pageSize;
export const selectIsLoading = (state) => state.building.isLoading;
//#endregion

/// Export reducer
export { loadBuildings };
export default Slice.reducer;
