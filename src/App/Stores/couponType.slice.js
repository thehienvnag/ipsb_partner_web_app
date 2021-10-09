import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCouponType, postCouponType, putCouponType } from "App/Services/couponType.service";


//#region Async thunks couponType
const loadCouponTypes = createAsyncThunk(
  "couponType/loadCouponTypes",
  async (params = {}, thunkAPI) => {
    const data = await getAllCouponType(params);
    return data;
  }
);

const postCouponTypeForm = createAsyncThunk(
  "couponType/postCouponTypeForm",
  async (data, thunkAPI) => {
    return await postCouponType({ ...data});
  }
);
const putCouponTypeForm = createAsyncThunk(
  "couponType/putCouponTypeForm",
  async (data, thunkAPI) => {
    await putCouponType(data);
  }
);
//#endregion

const Slice = createSlice({
  name: "couponType",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load couponType state
    [loadCouponTypes.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadCouponTypes.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadCouponTypes.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Post couponType
    [postCouponTypeForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postCouponTypeForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [postCouponTypeForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Put couponType
    [putCouponTypeForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putCouponTypeForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [putCouponTypeForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//CouponType selector to observe data
//#region [couponType, totalLocationTypes, pageSize, isLoading]
export const selectListCouponType = (state) =>
  state.couponType.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.couponType.data?.totalCount;
export const selectPageSize = (state) => state.couponType.data?.pageSize;
export const selectIsLoading = (state) => state.couponType.isLoading;
//#endregion

/// Export reducer
export { loadCouponTypes, postCouponTypeForm, putCouponTypeForm};
export default Slice.reducer;
