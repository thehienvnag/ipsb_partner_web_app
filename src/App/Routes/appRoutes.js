import FloorPlanDetailPage from "App/Containers/BuildingManager/FloorPlanDetailPage";
import BuildingPage from "App/Containers/Admin/BuildingPage";
import FloorPlanPage from "App/Containers/BuildingManager/FloorPlanPage";
import LocatorTagPage from "App/Containers/BuildingManager/LocatorTagPage";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import AdHomePage from "../Containers/Admin/HomePage/index";
import BmHomePage from "../Containers/BuildingManager/HomePage/index";
import StorePage from "../Containers/BuildingManager/StorePage/index";
import LocationTypePage from "../Containers/BuildingManager/LocationTypePage/index";
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
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
      { path: "/buildings", element: <BuildingPage /> },
    ],
  },
];

export default appRoutes;
