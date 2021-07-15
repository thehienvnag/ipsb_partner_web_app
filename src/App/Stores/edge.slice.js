import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getByFloorPlan } from "App/Services/edge.service";
//#region Async thunks floor plans
const loadEdgesOnFloor = createAsyncThunk(
  "edge/loadEdgesOnFloor",
  async (params = {}, thunkAPI) => {
    return await getByFloorPlan(params);
  }
);
//#endregion

const Slice = createSlice({
  name: "edge",
  initialState: {
    list: null,
    isLoading: false,
  },
  reducers: {
    removeEdges: (state, location) => {
      state.list = null;
    },
  },
  extraReducers: {
    //#region Load floor plans by buildingId state
    [loadEdgesOnFloor.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadEdgesOnFloor.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    [loadEdgesOnFloor.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [floors, totalFloor, pageSize, isLoading]
export const selectEdgesByFloorPlan = (state) => state.edge.list?.content ?? [];
export const selectEdgeLoading = (state) => state.edge.isLoading;
//#endregion

/// Export reducer
const { removeEdges } = Slice.actions;
export { loadEdgesOnFloor, removeEdges };
export default Slice.reducer;
