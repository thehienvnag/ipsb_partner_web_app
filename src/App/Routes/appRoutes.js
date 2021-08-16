import FloorPlanDetailPage from "App/Containers/BuildingManager/FloorPlanDetailPage";
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
const appRoutes = [
  {
    path: "building-manager",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <BmHomePage /> },
      {
        path: "/floor-plans",
        element: <FloorPlanPage />,
      },
      {
        path: "/floor-plans/:id",
        element: <FloorPlanDetailPage />,
      },
      {
        path: "/stores",
        element: <StorePage />,
      },
      {
        path: "/locator-tags",
        element: <LocatorTagPage />,
      },
      {
        path: "/location-type",
        element: <LocationTypePage />,
      },
      { path: "/manager-accounts", element: <StoreOwnerPage /> },
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
      { path: "/buildings", element: <BuildingPage /> },
      { path: "/manager-accounts", element: <BuildingManagerPage /> },
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
