import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlanSlice";

export const Store = configureStore({
  reducer: {
    floorPlan: floorPlanReducer,
  },
});
