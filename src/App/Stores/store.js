import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlan.slice";
import buildingReducer from "./building.slice";
import edgeReducer from "./edge.slice";
import locationReducer from "./location.slice";

export const Store = configureStore({
  reducer: {
    floorPlan: floorPlanReducer,
    building: buildingReducer,
    edge: edgeReducer,
    location: locationReducer,
  },
});
