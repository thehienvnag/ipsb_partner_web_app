import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccounts } from "App/Services/account.service";

//#region Async thunks accounts
const loadAccounts = createAsyncThunk(
  "account/loadAccounts",
  async (params = {}, thunkAPI) => {
    const data = await getAccounts(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "account",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load account state
    [loadAccounts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadAccounts.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadAccounts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Account selector to observe data
//#region [accounts, totalAccount, pageSize, isLoading]
export const selectInChargeAccountId = (state) => state.inChargeAccount?.id;
export const selectInChargeAccount = (state) => state.inChargeAccount;

export const selectListAccount = (state) => state.account.data?.content;
export const selectTotalCount = (state) => state.account.data?.totalCount;
export const selectPageSize = (state) => state.account.data?.pageSize;
export const selectIsLoading = (state) => state.account.isLoading;
//#endregion

/// Export reducer
export { loadAccounts };
export default Slice.reducer;
