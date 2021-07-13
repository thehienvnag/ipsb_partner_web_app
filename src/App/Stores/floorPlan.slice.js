import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFloorPlans } from "../Services/floorPlan.service";

//#region Async thunks floor plans
const loadFloorPlans = createAsyncThunk(
  "floorPlan/loadFloorPlans",
  async (params = {}, thunkAPI) => {
    const { building } = thunkAPI.getState();

    if (building.inChargeBuilding) {
      Object.assign(params, { buildingId: building.inChargeBuilding.id });
    }
    const data = await getFloorPlans(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "floorPlan",
  initialState: {
    data: null,
    isLoading: false,
    currentFloorPlan: {id : 12}
  },
  reducers: {},
  extraReducers: {
    //#region Load floor plan state
    [loadFloorPlans.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadFloorPlans.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadFloorPlans.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [floors, totalFloor, pageSize, isLoading]
export const selectListFloor = (state) =>
  state.floorPlan.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.floorPlan.data?.totalCount;
export const selectPageSize = (state) => state.floorPlan.data?.pageSize;
export const selectIsLoading = (state) => state.floorPlan.isLoading;
//#endregion

/// Export reducer
export { loadFloorPlans };
export default Slice.reducer;
