import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlan.slice";
import buildingReducer from "./building.slice";

export const Store = configureStore({
  reducer: {
    floorPlan: floorPlanReducer,
    building: buildingReducer,
  },
});
