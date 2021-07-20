import { createSlice } from "@reduxjs/toolkit";
//#region Async thunks floor plans
const types = [
  { id: 1, name: "Cửa hàng" },
  { id: 2, name: "Đường đi" },
  { id: 3, name: "Thang máy" },
  { id: 4, name: "Cầu thang" },
  { id: 5, name: "Beacon" },
  { id: 6, name: "Checkout" },
  { id: 10, name: "Nhà vệ sinh" },
];
//#endregion
const Slice = createSlice({
  name: "locationType",
  initialState: {
    locationTypes: types,
    typesSelect: types.reduce((acc, { id }) => acc + "," + id, ""),
  },
  reducers: {
    setTypesSelect: (state, { payload }) => {
      state.typesSelect = payload.join(",");
    },
  },
});

//Floor plan selector to observe data
//#region [typesSelect, locationTypes]
const selectLocationTypes = (state) => state.locationType.locationTypes;
const selectTypesSelect = (state) => state.locationType.typesSelect;
//#endregion

/// Export reducer
const { setTypesSelect } = Slice.actions;
export { setTypesSelect, selectLocationTypes, selectTypesSelect };
export default Slice.reducer;
