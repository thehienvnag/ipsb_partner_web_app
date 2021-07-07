import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFloorPlans } from "../Services/floorPlan.service";

//#region Async thunks floor plans
const loadFloorPlans = createAsyncThunk(
  "floorPlan/loadFloorPlans",
  async (params, thunkAPI) => {
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //#region Load floor plans api status
      .addCase(loadFloorPlans.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadFloorPlans.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(loadFloorPlans.rejected, (state, action) => {
        state.isLoading = false;
      });
    //#endregion
  },
});

//#region [Floor plan selector to observe data from store and update to Components]
export const selectListFloor = (state) => state.floorPlan.data?.content;
export const selectIsLoading = (state) => state.floorPlan.isLoading;
//#endregion

/// Export reducer
export { loadFloorPlans };
export default Slice.reducer;
