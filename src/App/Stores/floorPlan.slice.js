import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAll,
  getById,
  postFloorPlan,
  postLocationsAndEdges,
  putFloorPlan,
} from "../Services/floorPlan.service";

//#region Async thunks floor plans
const loadAll = createAsyncThunk(
  "floorPlan/loadAll",
  async (params = {}, thunkAPI) => {
    const { building } = thunkAPI.getState();
    if (building.inChargeBuilding) {
      Object.assign(params, { buildingId: building.inChargeBuilding.id });
    }
    const data = await getAll(params);
    return data;
  }
);
const loadById = createAsyncThunk(
  "floorPlan/loadById",
  async (id, thunkAPI) => {
    return await getById(id);
  }
);
const postFloorPlanForm = createAsyncThunk(
  "floorPlan/postFloorPlanForm",
  async (data, thunkAPI) => {
    const { building } = thunkAPI.getState();
    const buildingId = building.inChargeBuilding?.id;
    return await postFloorPlan({ ...data, buildingId });
  }
);
const putFloorPlanForm = createAsyncThunk(
  "floorPlan/putForm",
  async (data, thunkAPI) => {
    await putFloorPlan(data);
  }
);
//#endregion

const Slice = createSlice({
  name: "floorPlan",
  initialState: {
    list: null,
    one: null,
    isLoading: false,
    currentFloorPlan: { id: 12 },
  },
  reducers: {
    removeCurrentFloor: (state, action) => {
      state.one = null;
    },
    setCurrentFloor: (state, action) => {
      state.currentFloorPlan = action.payload;
      console.log("Action: ", action);
    },
  },
  extraReducers: {
    //#region Load floor plans by buildingId state
    [loadAll.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadAll.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    [loadAll.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Load floor plan by id state
    [loadById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadById.fulfilled]: (state, { payload }) => {
      state.one = payload;
      state.isLoading = false;
    },
    [loadById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Post floorplan
    [postFloorPlanForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postFloorPlanForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [postFloorPlanForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Put floorplan
    [putFloorPlanForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putFloorPlanForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.currentFloorPlan = payload;
    },
    [putFloorPlanForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [floors, totalFloor, pageSize, isLoading]
export const selectListFloor = (state) =>
  state.floorPlan.list?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectListFloorCode = (state) =>
  state.floorPlan.list?.content.map(({ id, floorCode, imageUrl }) => ({
    id,
    floorCode,
    imageUrl,
  }));
export const selectCurrentFloorPlan = (state) =>
  state.floorPlan.currentFloorPlan;
export const selectOne = (state) => state.floorPlan.one;
export const selectTotalCount = (state) => state.floorPlan.list?.totalCount;
export const selectPageSize = (state) => state.floorPlan.list?.pageSize;
export const selectIsLoading = (state) => state.floorPlan.isLoading;
//#endregion

/// Export reducer
const { removeCurrentFloor, setCurrentFloor } = Slice.actions;
export {
  loadAll,
  loadById,
  removeCurrentFloor,
  setCurrentFloor,
  postFloorPlanForm,
  putFloorPlanForm,
};
export default Slice.reducer;
