import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocatorTags } from "../Services/locatorTag.service";

//#region Async thunks floor plans
const loadLocatorTags = createAsyncThunk(
  "locatorTag/loadLocatorTags",
  async (params = {}, thunkAPI) => {
    const { floorPlan } = thunkAPI.getState();

    if (floorPlan.currentFloorPlan) {
      Object.assign(params, { floorPlanId: floorPlan.currentFloorPlan.id });
    }
    const data = await getLocatorTags(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "locatorTag",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load floor plan state
    [loadLocatorTags.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadLocatorTags.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadLocatorTags.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [locatorTags, totalLocatorTags, pageSize, isLoading]
export const selectListLocatorTag = (state) =>
  state.locatorTag.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.locatorTag.data?.totalCount;
export const selectPageSize = (state) => state.locatorTag.data?.pageSize;
export const selectIsLoading = (state) => state.locatorTag.isLoading;
//#endregion

/// Export reducer
export { loadLocatorTags };
export default Slice.reducer;
