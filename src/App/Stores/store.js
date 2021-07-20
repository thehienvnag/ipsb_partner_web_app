import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlan.slice";
import locatorTagReducer from "./locatorTag.slice";
import buildingReducer from "./building.slice";
import edgeReducer from "./edge.slice";
import locationReducer from "./location.slice";
import accountReducer from "./account.slice";
import authReducer from "./auth.slice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    floorPlan: floorPlanReducer,
    building: buildingReducer,
    edge: edgeReducer,
    location: locationReducer,
    account: accountReducer,
    locatorTag: locatorTagReducer,
  },
});
