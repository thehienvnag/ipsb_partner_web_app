import BuildingPage from "App/Containers/Admin/BuildingPage";
import FloorPlanPage from "App/Containers/BuildingManager/FloorPlanPage";
import LocatorTagPage from "App/Containers/BuildingManager/LocatorTagPage";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import AdHomePage from "../Containers/Admin/HomePage/index";
import BmHomePage from "../Containers/BuildingManager/HomePage/index";
import StorePage from "../Containers/BuildingManager/StorePage/index";
import LocationTypePage from "../Containers/BuildingManager/LocationTypePage/index";
import BuildingManagerPage from "App/Containers/Admin/BuildingManagerPage";
import StoreOwnerPage from "App/Containers/BuildingManager/StoreOwnerPage";
import LoginPage from "App/Containers/Auth/Login";
import { element } from "prop-types";
import ChangePasswordPage from "App/Containers/Auth/ChangePassword";
import RouteNames from "App/Constants/routesName";
const appRoutes = [
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <BmHomePage /> },
      {
        path: RouteNames.floorPlans,
        element: <FloorPlanPage />,
      },

      {
        path: RouteNames.stores,
        element: <StorePage />,
      },
      {
        path: RouteNames.locatorTags,
        element: <LocatorTagPage />,
      },
      {
        path: RouteNames.places,
        element: <LocationTypePage />,
      },
      { path: RouteNames.storeAccounts, element: <StoreOwnerPage /> },
      { path: RouteNames.buildings, element: <BuildingPage /> },
      { path: RouteNames.managerAccounts, element: <BuildingManagerPage /> },
    ],
  },
  {
    path: RouteNames.admin,
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },

  {
    path: "change-password",
    element: <ChangePasswordPage />,
  },
];

export default appRoutes;
