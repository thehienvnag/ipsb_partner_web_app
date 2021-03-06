import BuildingPage from "App/Containers/Admin/BuildingPage";
import FloorPlanPage from "App/Containers/BuildingManager/FloorPlanPage";
import LocatorTagPage from "App/Containers/BuildingManager/LocatorTagPage";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import StorePage from "../Containers/BuildingManager/StorePage/index";
import LocationTypePage from "../Containers/BuildingManager/LocationTypePage/index";
import BuildingManagerPage from "App/Containers/Admin/BuildingManagerPage";
import StoreOwnerPage from "App/Containers/BuildingManager/StoreOwnerPage";
import LoginPage from "App/Containers/Auth/Login";
import ChangePasswordPage from "App/Containers/Auth/ChangePassword";
import RouteNames from "App/Utils/Constants/routesName";
import RoleGuard from "App/Containers/Auth/Guards/RoleGuard";
import LoggedIn from "App/Containers/Auth/Guards/LoggedIn";
import ManageCouponPage from "App/Containers/StoreOwner/ManageCouponPage";
import ManageProductPage from "App/Containers/StoreOwner/ManageProductPage";
import TestCkeditorPage from "App/Containers/StoreOwner/CkeditorPage";
import LocationTypePageV2 from "App/Containers/Admin/LocationTypePage";
import CouponTypePage from "App/Containers/Admin/CouponTypePage";
import FacilityPage from "App/Containers/BuildingManager/FacilityPage";
import ForgotPasswordPage from "App/Containers/Auth/ForgotPassword";
import ForgotPasswordSuccessPage from "App/Containers/Auth/ForgotPasswordSuccess";
const appRoutes = [
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <RoleGuard />,
      },
      {
        path: RouteNames.floorPlans,
        element: (
          <RoleGuard role="Building Manager" component={<FloorPlanPage />} />
        ),
      },
      {
        path: RouteNames.stores,
        element: (
          <RoleGuard role="Building Manager" component={<StorePage />} />
        ),
      },
      {
        path: RouteNames.locatorTags,
        element: (
          <RoleGuard role="Building Manager" component={<LocatorTagPage />} />
        ),
      },
      {
        path: RouteNames.places,
        element: (
          <RoleGuard role="Building Manager" component={<LocationTypePage />} />
        ),
      },
      {
        path: RouteNames.storeAccounts,
        element: (
          <RoleGuard role="Building Manager" component={<StoreOwnerPage />} />
        ),
      },
      {
        path: RouteNames.facilities,
        element: (
          <RoleGuard role="Building Manager" component={<FacilityPage />} />
        ),
      },
      {
        path: RouteNames.buildings,
        element: <RoleGuard role="Admin" component={<BuildingPage />} />,
      },
      {
        path: RouteNames.locationTypes,
        element: <RoleGuard role="Admin" component={<LocationTypePageV2 />} />,
      },
      {
        path: RouteNames.managerAccounts,
        element: <RoleGuard role="Admin" component={<BuildingManagerPage />} />,
      },
      {
        path: RouteNames.couponTypes,
        element: <RoleGuard role="Admin" component={<CouponTypePage />} />,
      },
      {
        path: RouteNames.managerCoupons,
        element: (
          <RoleGuard role="Store Owner" component={<ManageCouponPage />} />
        ),
      },
      {
        path: RouteNames.managerProducts,
        element: (
          <RoleGuard role="Store Owner" component={<ManageProductPage />} />
        ),
      },
      {
        path: RouteNames.testCkeditor,
        element: (
          <RoleGuard role="Store Owner" component={<TestCkeditorPage />} />
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoggedIn component={<LoginPage />} />,
  },
  {
    path: "change-password",
    element: <LoggedIn component={<LoginPage />} />,
  },
  {
    path: "forgot-password-success",
    element: <LoggedIn component={<LoginPage />} />,
  },
  {
    path: "change-password/:token",
    element: <LoggedIn component={<ChangePasswordPage />} />,
  },
  {
    path: "forgot-password",
    element: <LoggedIn component={<ForgotPasswordPage />} />,
  },
  {
    path: "forgot-password-success/:token",
    element: <LoggedIn component={<ForgotPasswordSuccessPage />} />,
  },
];

export default appRoutes;
