import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCoupon,
  postCoupon,
  putCoupon
} from "../Services/coupon.service";

//#region Async thunks coupon
const loadCoupons = createAsyncThunk(
  "coupon/loadCoupons",
  async (params = {}, thunkAPI) => {
    const { store } = thunkAPI.getState();
    Object.assign(params, { storeId: 15 });
    // if (store.inchareStore) {
    //   //Object.assign(params, { storeId: store.inChargeStore.id });
    //   Object.assign(params, { storeId: 4 });
    // }
    const data = await getAllCoupon(params);
    return data;
  }
);

const postCouponForm = createAsyncThunk(
  "coupon/postCouponForm",
  async (data, thunkAPI) => {
    const { store } = thunkAPI.getState();
    const storeId = store.inChargeStore?.id;
    return await postCoupon({ ...data, storeId });
  }
);
const putCouponForm = createAsyncThunk(
  "coupon/putForm",
  async (data, thunkAPI) => {
    await putCoupon(data);
  }
);
//#endregion

const Slice = createSlice({
  name: "coupon",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load coupon state
    [loadCoupons.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadCoupons.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadCoupons.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Post coupon
    [postCouponForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postCouponForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [postCouponForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Put coupon
    [putCouponForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putCouponForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [putCouponForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Coupon selector to observe data
//#region [coupons, totalCoupons, pageSize, isLoading]
export const selectListCoupon = (state) =>
  state.coupon.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.coupon.data?.totalCount;
export const selectPageSize = (state) => state.coupon.data?.pageSize;
export const selectIsLoading = (state) => state.coupon.isLoading;
//#endregion

/// Export reducer
export { loadCoupons, postCouponForm, putCouponForm};
export default Slice.reducer;
