import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLocationType } from "App/Services/locationType.service";
//#region Async thunks location type
export const loadLocationTypes = createAsyncThunk(
  "locationType/loadLocationTypes",
  async (params, { dispatch }) => {
    const data = await getAllLocationType({ isAll: true });
    if (data) {
      return data.content;
    }
  }
);
//#endregion
const Slice = createSlice({
  name: "locationType",
  initialState: {
    locationTypes: null,
    typesSelect: null,
  },
  reducers: {
    setTypesSelect: (state, { payload }) => {
      state.typesSelect = payload.join(",");
    },
  },
  extraReducers: {
    [loadLocationTypes.fulfilled]: (state, { payload }) => {
      state.locationTypes = payload;
    },
  },
});

//Floor plan selector to observe data
//#region [typesSelect, locationTypes]
const selectLocationTypes = (state) => state.locationType.locationTypes;
const selectTypesSelect = (state) => state.locationType.typesSelect ?? "";
//#endregion

/// Export reducer
const { setTypesSelect } = Slice.actions;
export {
  setTypesSelect,
  selectLocationTypes,
  selectTypesSelect,
};
export default Slice.reducer;
