import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProduct,
  postProduct,
  deleteProduct,
} from "../Services/product.service";

//#region Async thunks coupon
const loadProducts = createAsyncThunk(
  "product/loadProducts",
  async (params = {}, thunkAPI) => {
    // const { store } = thunkAPI.getState();
    Object.assign(params, { storeId: 15 });
    // if (store.inchareStore) {
    //   //Object.assign(params, { storeId: store.inChargeStore.id });
    //   Object.assign(params, { storeId: 4 });
    // }
    const data = await getAllProduct(params);
    return data;
  }
);
const postProductForm = createAsyncThunk(
  "product/postProductForm",
  async (data, thunkAPI) => {
    const { store } = thunkAPI.getState();
    const storeId = store.inChargeStore?.id;
    return await postProduct({ ...data, storeId });
  }
);
const putProductForm = createAsyncThunk(
  "product/putProductForm",
  async (data, thunkAPI) => {
    await deleteProduct(data);
  }
);

//#endregion

const Slice = createSlice({
  name: "product",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load product state
    [loadProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadProducts.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Post product
    [postProductForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postProductForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [postProductForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
    //#region Put product
    [putProductForm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putProductForm.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [putProductForm.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Poduct selector to observe data
//#region [products, totalproducts, pageSize, isLoading]
export const selectListProduct = (state) =>
  state.product.data?.content.map((item, index) => ({
    ...{ key: index },
    ...item,
  }));
export const selectTotalCount = (state) => state.product.data?.totalCount;
export const selectPageSize = (state) => state.product.data?.pageSize;
export const selectIsLoading = (state) => state.product.isLoading;
//#endregion

/// Export reducer
export { loadProducts, postProductForm, putProductForm };
export default Slice.reducer;
