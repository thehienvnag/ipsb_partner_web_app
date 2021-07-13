import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlan.slice";
import buildingReducer from "./building.slice";
import accountReducer from "./account.slice";

export const Store = configureStore({
  reducer: {
    floorPlan: floorPlanReducer,
    building: buildingReducer,
    account: accountReducer,
  },
});
