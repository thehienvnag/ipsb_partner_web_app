import { configureStore } from "@reduxjs/toolkit";
import floorPlanReducer from "./floorPlan.slice";
import locatorTagReducer from "./locatorTag.slice";
import buildingReducer from "./building.slice";
import edgeReducer from "./edge.slice";
import locationReducer from "./location.slice";
import accountReducer from "./account.slice";
import locationTypeReducer from "./locationType.slice";
import mapReducer from "./map.slice";
import indoorMapReducer from "./indoorMap.slice";
import authReducer from "./auth.slice";
import uiDataReducer from "./uiData.slice";
import couponReducer from "./coupon.slice";
import productReducer from "./product.slice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    floorPlan: floorPlanReducer,
    building: buildingReducer,
    edge: edgeReducer,
    location: locationReducer,
    account: accountReducer,
    locatorTag: locatorTagReducer,
    locationType: locationTypeReducer,
    indoorMap: indoorMapReducer,
    map: mapReducer,
    uiData: uiDataReducer,
    coupon: couponReducer,
    product: productReducer,
  },
});
