import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getAllLocationType, 
  postLocationType,
  putLocationType 
} from "App/Services/locationType.service";

//#region Async thunks locationType
const loadLocationTypes = createAsyncThunk(
  "locationType/loadLocationTypes",
  async (params = {}, thunkAPI) => {
    const data = await getAllLocationType(params);
    return data;
  }
);

const postLocationTypeForm = createAsyncThunk(
  "locationType/postLocationTypeForm",
  async (data, thunkAPI) => {
    return await postLocationType({ ...data});
  }
);
const putLocationTypeForm = createAsyncThunk(
  "locationType/putLocationTypeForm",
  async (data, thunkAPI) => {
    await putLocationType(data);
  }
);
//#endregion

const Slice = createSlice({
  name: "locationType",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load locationType state
    [loadLocationTypes.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadLocationTypes.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadLocationTypes.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Post locationType
    [postLocationTypeForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postLocationTypeForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [postLocationTypeForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Put locationType
    [putLocationTypeForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putLocationTypeForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [putLocationTypeForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//LocationType selector to observe data
//#region [locationType, totalLocationTypes, pageSize, isLoading]
export const selectListLocationType = (state) =>
  state.locationType.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.locationType.data?.totalCount;
export const selectPageSize = (state) => state.locationType.data?.pageSize;
export const selectIsLoading = (state) => state.locationType.isLoading;
//#endregion

/// Export reducer
export { loadLocationTypes, postLocationTypeForm, putLocationTypeForm};
export default Slice.reducer;
