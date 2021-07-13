import { createSlice } from "@reduxjs/toolkit";
const Slice = createSlice({
  name: "building",
  initialState: {
    inChargeBuilding: { id: 12 },
  },
  reducers: {
    initBuildingIdLoggin: (state, { payload }) => {
      state.inChargeBuilding = payload;
    },
  },
});

//Floor plan selector to observe data
//#region [floors, totalFloor, pageSize, isLoading]
export const selectInChargeBuildingId = (state) => state.inChargeBuilding?.id;
export const selectInChargeBuilding = (state) => state.inChargeBuilding;
//#endregion

export default Slice.reducer;
