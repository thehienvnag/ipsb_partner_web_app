import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCouponInUse } from "App/Services/couponInUse.service";

//#region Async thunks couponInUse
const loadCouponInUses = createAsyncThunk(
  "couponInUse/loadCouponInUses",
  async (params = {}, thunkAPI) => {
    // const { store } = thunkAPI.getState();
    Object.assign(params, { storeId: 18 });
    // if (store.inchareStore) {
    //   //Object.assign(params, { storeId: store.inChargeStore.id });
    //   Object.assign(params, { storeId: 4 });
    // }
    const data = await getAllCouponInUse(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "couponInUse",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load couponInUse state
    [loadCouponInUses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadCouponInUses.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadCouponInUses.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//CouponInUse selector to observe data
//#region [CouponInUses, totalCouponInUses]
export const selectListCouponInUse = (state) =>
  state.couponInUse.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.couponInUse.data?.totalCount;
export const selectPageSize = (state) => state.couponInUse.data?.pageSize;
export const selectIsLoading = (state) => state.couponInUse.isLoading;
//#endregion

/// Export reducer
export { loadCouponInUses};
export default Slice.reducer;
