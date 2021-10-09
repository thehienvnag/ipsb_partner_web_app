import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFacility } from "App/Services/facility.service";

//#region Async thunks accounts
const loadFacilitys = createAsyncThunk(
  "facility/loadFacilitys",
  async (params = {}, thunkAPI) => {
    const data = await getAllFacility(params);
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "facility",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    //#region Load facility state
    [loadFacilitys.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadFacilitys.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [loadFacilitys.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //#endregion
  },
});

//Facility selector to observe data
//#region [Facilitys, totalAccount, pageSize, isLoading]
export const selectInChargeAccountId = (state) => state.inChargeAccount?.id;
export const selectInChargeAccount = (state) => state.inChargeAccount;

export const selectListFacility = (state) => state.facility.data?.content;
export const selectTotalCount = (state) => state.facility.data?.totalCount;
export const selectPageSize = (state) => state.facility.data?.pageSize;
export const selectIsLoading = (state) => state.facility.isLoading;
//#endregion

/// Export reducer
export { loadFacilitys };
export default Slice.reducer;
