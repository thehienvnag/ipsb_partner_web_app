import FloorPlanDetailPage from "App/Containers/BuildingManager/FloorPlanDetailPage";
import FloorPlanPage from "App/Containers/BuildingManager/FloorPlanPage";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import AdHomePage from "../Containers/Admin/HomePage/index";
import BmHomePage from "../Containers/BuildingManager/HomePage/index";
import StorePage from "../Containers/BuildingManager/StorePage/index";
const appRoutes = [
  {
    path: "building-manager",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <BmHomePage /> },
      { path: "/test2", element: <BmHomePage /> },
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
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
    ],
  },
];

export default appRoutes;
