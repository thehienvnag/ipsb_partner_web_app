import { createSlice } from "@reduxjs/toolkit";
import {
  BiStoreAlt,
  BiMapAlt,
  BiMapPin,
  BiBuildings,
  BiGift,
} from "react-icons/bi";
import { RiSignalTowerFill, RiCoupon3Fill } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import RouteNames from "App/Utils/Constants/routesName";
import { FaYandexInternational, FaCity } from "react-icons/fa";

//#region Menu final data
const adminItems = [
  { 
    icon: <BiBuildings />, 
    title: "Buildings", 
    path: RouteNames.buildings 
  },
  {
    icon: <AiOutlineTeam />,
    title: "Building Managers",
    path: RouteNames.managerAccounts,
  },
  {
    icon: <BiMapPin />,
    title: "Location Types",
    path: RouteNames.locationTypes,
  },
  {
    icon: <RiCoupon3Fill />,
    title: "Coupon Types",
    path: RouteNames.couponTypes,
  },
  {
    icon: <FaYandexInternational />,
    title: "Product Category",
    path: RouteNames.productCategory,
  },
];
const buildingManagerItems = [
  { icon: <BiStoreAlt />, title: "Stores", path: RouteNames.stores },
  { icon: <BiMapAlt />, title: "Floor Plans", path: RouteNames.floorPlans },
  {
    icon: <RiSignalTowerFill />,
    title: "iBeacons",
    path: RouteNames.locatorTags,
  },
  {
    icon: <AiOutlineTeam />,
    title: "Store Owners",
    path: RouteNames.storeAccounts,
  },
  { icon: <FaCity />, title: "Facilities", path: RouteNames.facilities },
];
const storeOwnerItems = [
  { icon: <BiGift />, title: "Coupons", path: RouteNames.managerCoupons },
  {
    icon: <FaYandexInternational />,
    title: "Product",
    path: RouteNames.managerProducts,
  },
];
//#endregion

const Slice = createSlice({
  name: "uiData",
  initialState: {},
  reducers: {},
});

export const selectMenuItems = ({ auth: { data } }) => {
  if (!data?.role) return buildingManagerItems;
  if (data?.role === "Admin") return adminItems;
  if (data?.role === "Building Manager") return buildingManagerItems;
  return storeOwnerItems;
};

export default Slice.reducer;
